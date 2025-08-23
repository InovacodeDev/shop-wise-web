import { ExtractProductDataOutput } from '@/types/ai-flows';
import type {
  // Auth types
  AuthResponse, SignUpRequest, SignInRequest, MeResponse, RefreshTokenResponse, RevokeTokenResponse,
  // User types
  User, CreateUserRequest, UpdateUserRequest,
  // Family types
  Family, CreateFamilyRequest, UpdateFamilyRequest,
  // Product types
  Product, CreateProductRequest,
  // Store types
  Store, CreateStoreRequest,
  // Category types
  Category, CreateCategoryRequest,
  // Purchase types
  Purchase, CreatePurchaseRequest, UpdatePurchaseRequest,
  // Purchase Item types
  PurchaseItem, CreatePurchaseItemRequest, UpdatePurchaseItemRequest,
  BulkUpdatePurchaseItemsResponse, BulkDeletePurchaseItemsResponse,
  // Pantry Item types
  PantryItem, CreatePantryItemRequest, UpdatePantryItemRequest,
  // Shopping List types
  ShoppingList, CreateShoppingListRequest, UpdateShoppingListRequest,
  // Shopping List Item types
  ShoppingListItem, CreateShoppingListItemRequest, UpdateShoppingListItemRequest,
  // Notification types
  Notification, CreateNotificationRequest, MarkNotificationAsReadResponse, MarkAllNotificationsAsReadResponse,
  // AI Flow types
  AnalyzeConsumptionRequest, ExtractDataFromPdfRequest, ExtractDataFromPageRequest,
  ExtractProductDataRequest, SuggestMissingItemsRequest, AnalyzeConsumptionDataOutput, SuggestMissingItemsOutput,
  // Generic types
  DeleteResponse
} from '@/types/api';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { logApiCall } from '@/lib/dev-utils';

export class ApiService {
  // Use VITE_API_URL if provided, otherwise default to '/api' so dev server can proxy and avoid CORS
  private baseURL = (import.meta.env.VITE_API_URL as string) || '/api';
  private axiosInstance: AxiosInstance;
  // In-memory token store (safer than always using localStorage)
  private inMemoryBackendToken: string | null = null;
  private inMemoryBackendRefreshToken: string | null = null;
  // Toggle to persist tokens in localStorage for compatibility; default false for safer behavior
  private persistTokens: boolean = (import.meta.env.VITE_PERSIST_TOKENS as string) === 'true' || false;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
            // Send credentials (cookies) in case the backend uses cookie-based sessions
            withCredentials: true,
    });

    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Verbose request logging for debugging
        try {
          const token = await this.getAuthToken();
          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.warn('Error retrieving auth token for request:', e);
        }
        console.debug('[api] Request:', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: (config as any).data,
        });
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Verbose response logging
        console.debug('[api] Response:', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        const url = error.config?.url;
        const serverMessage = error.response?.data?.message;

        // If 401/403, try to refresh token once and retry request
        if ((status === 401 || status === 403) && !(error.config as any)?._retry) {
          console.warn(`[api] Received ${status} for ${url} — attempting token refresh and retry`);
          (error.config as any)._retry = true;
          try {
            const newToken = await this.refreshAuthToken();
            if (newToken) {
              (error.config as any).headers = (error.config as any).headers || {};
              (error.config as any).headers.Authorization = `Bearer ${newToken}`;
              const retryResponse = await this.axiosInstance.request(error.config);
              console.debug('[api] Retry response after token refresh:', {
                url: retryResponse.config.url,
                status: retryResponse.status,
                data: retryResponse.data,
              });
              return retryResponse;
            }
          } catch (refreshError) {
            console.warn('[api] Token refresh or retry failed:', refreshError);
            // fallthrough to throw original error info
          }
        }

        const message = serverMessage || error.message || `HTTP error! status: ${status}`;
        const err: any = new Error(message);
        err.status = status;
        err.url = url;
        err.response = error.response?.data;
        console.error('[api] Error response:', { url, status, response: error.response?.data });
        throw err;
      }
    );
  }

  /** Save the application's backend token (JWT) in localStorage and use it for requests */
  public setBackendAuthToken(token: string | null) {
    this.inMemoryBackendToken = token;
    if (this.persistTokens) {
      if (token) localStorage.setItem('backendAuthToken', token);
      else localStorage.removeItem('backendAuthToken');
    }
  }

  public setBackendRefreshToken(token: string | null) {
    this.inMemoryBackendRefreshToken = token;
    if (this.persistTokens) {
      if (token) localStorage.setItem('backendRefreshToken', token);
      else localStorage.removeItem('backendRefreshToken');
    }
  }

  public clearBackendRefreshToken() {
    this.inMemoryBackendRefreshToken = null;
    if (this.persistTokens) localStorage.removeItem('backendRefreshToken');
  }

  /** Clear auth tokens from memory and storage (client-side cleanup) */
  public clearAuthState() {
    this.setBackendAuthToken(null);
    this.clearBackendRefreshToken();
    if (this.persistTokens) {
      localStorage.removeItem('backendAuthToken');
      localStorage.removeItem('backendRefreshToken');
    }
  }

  /** Force refresh the backend JWT using the backend refresh endpoint (cookie or token-based). */
  public async refreshAuthToken(): Promise<string | null> {
    try {
      // Prefer backend refresh token passed in-memory or persisted
      const refreshToken = this.inMemoryBackendRefreshToken ?? (this.persistTokens ? localStorage.getItem('backendRefreshToken') : null);
      try {
        const resp = await this.makeRequest<RefreshTokenResponse>('/auth/refresh', {
          method: 'POST',
          data: refreshToken ? { token: refreshToken } : {},
        });
        if (resp?.token) {
          this.setBackendAuthToken(resp.token);
          this.setBackendRefreshToken(resp.refresh ?? null);
          return resp.token;
        }
      } catch (ex) {
        console.warn('Backend refresh failed:', ex);
      }
    } catch (e) {
      console.warn('Unable to refresh auth token:', e);
    }
    return null;
  }

  private async getAuthToken(): Promise<string | null> {
    // Prefer backend-issued JWT
    // Prefer backend-issued JWT in memory, then persisted
    if (this.inMemoryBackendToken) return this.inMemoryBackendToken;
    if (this.persistTokens) {
      const backendToken = localStorage.getItem('backendAuthToken');
      if (backendToken) return backendToken;
    }
    return null;
  }

  private async makeRequest<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    // Log API call for debugging duplicate calls
    logApiCall(endpoint, config.method || 'GET');
    
    const response = await this.axiosInstance.request<T>({
      url: endpoint,
      ...config,
    });
    
    return response.data;
  }

  // AI endpoints
  async analyzeConsumptionData(data: AnalyzeConsumptionRequest): Promise<AnalyzeConsumptionDataOutput> {
    return this.makeRequest<AnalyzeConsumptionDataOutput>('/ai/analyze-consumption', {
      method: 'POST',
      data: data,
    });
  }

  async extractDataFromPdf(data: ExtractDataFromPdfRequest): Promise<ExtractProductDataOutput> {
    return this.makeRequest<ExtractProductDataOutput>('/ai/extract-from-pdf', {
      method: 'POST',
      data: data,
    });
  }

  async extractDataFromPage(data: ExtractDataFromPageRequest): Promise<ExtractProductDataOutput> {
    return this.makeRequest<ExtractProductDataOutput>('/ai/extract-from-page', {
      method: 'POST',
      data: data,
    });
  }

  async extractProductData(data: ExtractProductDataRequest): Promise<ExtractProductDataOutput> {
    return this.makeRequest<ExtractProductDataOutput>('/ai/extract-from-product-qr', {
      method: 'POST',
      data: data,
    });
  }

  async suggestMissingItems(data: SuggestMissingItemsRequest): Promise<SuggestMissingItemsOutput> {
    return this.makeRequest<SuggestMissingItemsOutput>('/ai/suggest-missing-items', {
      method: 'POST',
      data: data,
    });
  }

  // Families endpoints
  async createFamily(data: CreateFamilyRequest): Promise<Family> {
    return this.makeRequest<Family>('/families', {
      method: 'POST',
      data: data,
    });
  }

  async getFamily(id: string): Promise<Family> {
    return this.makeRequest<Family>(`/families/${id}`);
  }

  async updateFamily(id: string, data: UpdateFamilyRequest): Promise<Family> {
    return this.makeRequest<Family>(`/families/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteFamily(id: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${id}`, {
      method: 'DELETE',
    });
  }

  // Users endpoints
  async createUser(data: CreateUserRequest): Promise<User> {
    return this.makeRequest<User>('/users', {
      method: 'POST',
      data: data,
    });
  }

  async getUser(id: string): Promise<User> {
    return this.makeRequest<User>(`/users/${id}`);
  }

  async getMe(): Promise<MeResponse> {
    return this.makeRequest<MeResponse>('/auth/me');
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    return this.makeRequest<User>(`/users/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteUser(id: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Products endpoints
  async getProducts(): Promise<Product[]> {
    return this.makeRequest<Product[]>('/products');
  }

  async createProduct(data: CreateProductRequest): Promise<Product> {
    return this.makeRequest<Product>('/products', {
      method: 'POST',
      data: data,
    });
  }

  async getProduct(id: string): Promise<Product> {
    return this.makeRequest<Product>(`/products/${id}`);
  }

  // Stores endpoints
  async getStores(): Promise<Store[]> {
    return this.makeRequest<Store[]>('/stores');
  }

  async createStore(data: CreateStoreRequest): Promise<Store> {
    return this.makeRequest<Store>('/stores', {
      method: 'POST',
      data: data,
    });
  }

  async getStore(id: string): Promise<Store> {
    return this.makeRequest<Store>(`/stores/${id}`);
  }

  // Categories endpoints
  async getCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>('/categories');
  }

  async createCategory(data: CreateCategoryRequest): Promise<Category> {
    return this.makeRequest<Category>('/categories', {
      method: 'POST',
      data: data,
    });
  }

  // Purchases endpoints
  async getPurchases(familyId: string): Promise<Purchase[]> {
    return this.makeRequest<Purchase[]>(`/families/${familyId}/purchases`);
  }

  async createPurchase(familyId: string, data: CreatePurchaseRequest): Promise<Purchase> {
    return this.makeRequest<Purchase>(`/families/${familyId}/purchases`, {
      method: 'POST',
      data: data,
    });
  }

  async getPurchase(familyId: string, id: string): Promise<Purchase> {
    return this.makeRequest<Purchase>(`/families/${familyId}/purchases/${id}`);
  }

  async updatePurchase(familyId: string, id: string, data: UpdatePurchaseRequest): Promise<Purchase> {
    return this.makeRequest<Purchase>(`/families/${familyId}/purchases/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePurchase(familyId: string, id: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/purchases/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth endpoints
  async revoke(): Promise<RevokeTokenResponse> {
    return this.makeRequest<RevokeTokenResponse>('/auth/revoke', { method: 'POST' });
  }

  // Backend auth
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const resp = await this.makeRequest<AuthResponse>('/auth/signup', { method: 'POST', data });
    await this.handleAuthResponse(resp);
    return resp;
  }

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const resp = await this.makeRequest<AuthResponse>('/auth/signin', { method: 'POST', data });
    await this.handleAuthResponse(resp);
    return resp;
  }

  /**
   * New helper matching backend signIn signature: email, password, totp?
   * Returns backend response and stores tokens/uid automatically.
   */
  async login(email: string, password: string, totp?: string): Promise<AuthResponse> {
    const resp = await this.makeRequest<AuthResponse>('/auth/signin', {
      method: 'POST',
      data: { email, password, totp },
    });
    await this.handleAuthResponse(resp);
    return resp;
  }

  /**
   * Parse authentication response from backend and persist tokens.
   * Expected shape: { token?: string, refresh?: string, user?: {...} }
   */
  private async handleAuthResponse(resp: AuthResponse) {
    if (!resp) return;
    try {
      if (resp.token) {
        this.setBackendAuthToken(resp.token);
      }
      if (resp.refresh) {
        this.setBackendRefreshToken(resp.refresh);
      }
      if (resp.uid) {
        // store user id for convenience
        try {
          this.inMemoryBackendUserUid = resp.uid;
          if (this.persistTokens) localStorage.setItem('backendUserUid', resp.uid);
        } catch (e) {
          /* ignore */
        }
      }
      // Optionally persist tokens if configured
      if (this.persistTokens) {
        if (resp.token) localStorage.setItem('backendAuthToken', resp.token);
        if (resp.refresh) localStorage.setItem('backendRefreshToken', resp.refresh);
      }
    } catch (e) {
      console.warn('Error handling auth response:', e);
    }
  }

  private inMemoryBackendUserUid: string | null = null;

  /** Return the stored backend user UID (if any) */
  public getCurrentUid(): string | null {
    if (this.inMemoryBackendUserUid) return this.inMemoryBackendUserUid;
    if (this.persistTokens) return localStorage.getItem('backendUserUid');
    return null;
  }

  /** Return stored tokens for debugging or consumption */
  public getStoredTokens() {
    return {
      token: this.inMemoryBackendToken ?? (this.persistTokens ? localStorage.getItem('backendAuthToken') : null),
      refresh: this.inMemoryBackendRefreshToken ?? (this.persistTokens ? localStorage.getItem('backendRefreshToken') : null),
      uid: this.getCurrentUid(),
    };
  }

  // Pantry Items endpoints
  async getPantryItems(familyId: string): Promise<PantryItem[]> {
    return this.makeRequest<PantryItem[]>(`/families/${familyId}/pantry-items`);
  }

  async createPantryItem(familyId: string, data: CreatePantryItemRequest): Promise<PantryItem> {
    return this.makeRequest<PantryItem>(`/families/${familyId}/pantry-items`, {
      method: 'POST',
      data: data,
    });
  }

  async getPantryItem(familyId: string, id: string): Promise<PantryItem> {
    return this.makeRequest<PantryItem>(`/families/${familyId}/pantry-items/${id}`);
  }

  async updatePantryItem(familyId: string, id: string, data: UpdatePantryItemRequest): Promise<PantryItem> {
    return this.makeRequest<PantryItem>(`/families/${familyId}/pantry-items/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePantryItem(familyId: string, id: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/pantry-items/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping Lists endpoints
  async getShoppingLists(familyId: string): Promise<ShoppingList[]> {
    return this.makeRequest<ShoppingList[]>(`/families/${familyId}/shopping-lists`);
  }

  async createShoppingList(familyId: string, data: CreateShoppingListRequest): Promise<ShoppingList> {
    return this.makeRequest<ShoppingList>(`/families/${familyId}/shopping-lists`, {
      method: 'POST',
      data: data,
    });
  }

  async getShoppingList(familyId: string, id: string): Promise<ShoppingList> {
    return this.makeRequest<ShoppingList>(`/families/${familyId}/shopping-lists/${id}`);
  }

  async updateShoppingList(familyId: string, id: string, data: UpdateShoppingListRequest): Promise<ShoppingList> {
    return this.makeRequest<ShoppingList>(`/families/${familyId}/shopping-lists/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteShoppingList(familyId: string, id: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/shopping-lists/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping List Items endpoints
  async getShoppingListItems(familyId: string, listId: string): Promise<ShoppingListItem[]> {
    return this.makeRequest<ShoppingListItem[]>(`/families/${familyId}/shopping-lists/${listId}/items`);
  }

  async createShoppingListItem(familyId: string, listId: string, data: CreateShoppingListItemRequest): Promise<ShoppingListItem> {
    return this.makeRequest<ShoppingListItem>(`/families/${familyId}/shopping-lists/${listId}/items`, {
      method: 'POST',
      data: data,
    });
  }

  async updateShoppingListItem(familyId: string, listId: string, itemId: string, data: UpdateShoppingListItemRequest): Promise<ShoppingListItem> {
    return this.makeRequest<ShoppingListItem>(`/families/${familyId}/shopping-lists/${listId}/items/${itemId}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteShoppingListItem(familyId: string, listId: string, itemId: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/shopping-lists/${listId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Notifications endpoints
  async getNotifications(familyId: string): Promise<Notification[]> {
    return this.makeRequest<Notification[]>(`/families/${familyId}/notifications`);
  }

  async createNotification(familyId: string, data: CreateNotificationRequest): Promise<Notification> {
    return this.makeRequest<Notification>(`/families/${familyId}/notifications`, {
      method: 'POST',
      data: data,
    });
  }

  async markNotificationAsRead(familyId: string, notificationId: string): Promise<MarkNotificationAsReadResponse> {
    return this.makeRequest<MarkNotificationAsReadResponse>(`/families/${familyId}/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead(familyId: string): Promise<MarkAllNotificationsAsReadResponse> {
    return this.makeRequest<MarkAllNotificationsAsReadResponse>(`/families/${familyId}/notifications/mark-all-read`, {
      method: 'PATCH',
    });
  }

  async deleteNotification(familyId: string, notificationId: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // Purchase Items endpoints
  async getPurchaseItems(familyId: string, purchaseId: string): Promise<PurchaseItem[]> {
    return this.makeRequest<PurchaseItem[]>(`/families/${familyId}/purchases/${purchaseId}/items`);
  }

  async createPurchaseItem(familyId: string, purchaseId: string, data: CreatePurchaseItemRequest): Promise<PurchaseItem> {
    return this.makeRequest<PurchaseItem>(`/families/${familyId}/purchases/${purchaseId}/items`, {
      method: 'POST',
      data: data,
    });
  }

  async updatePurchaseItem(familyId: string, purchaseId: string, itemId: string, data: UpdatePurchaseItemRequest): Promise<PurchaseItem> {
    return this.makeRequest<PurchaseItem>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePurchaseItem(familyId: string, purchaseId: string, itemId: string): Promise<DeleteResponse> {
    return this.makeRequest<DeleteResponse>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async bulkUpdatePurchaseItems(familyId: string, purchaseId: string, items: CreatePurchaseItemRequest[]): Promise<BulkUpdatePurchaseItemsResponse> {
    return this.makeRequest<BulkUpdatePurchaseItemsResponse>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'PATCH',
      data: { items },
    });
  }

  async bulkDeletePurchaseItems(familyId: string, purchaseId: string, itemIds: string[]): Promise<BulkDeletePurchaseItemsResponse> {
    return this.makeRequest<BulkDeletePurchaseItemsResponse>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'DELETE',
      data: { itemIds },
    });
  }
}

export const apiService = new ApiService();
