import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

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
        const resp = await this.makeRequest<{ token: string; refresh?: string }>('/auth/refresh', {
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

  // No cached firebase token fallback — rely on backend-issued JWT exclusively

    return null;
  }

  private async makeRequest<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      url: endpoint,
      ...config,
    });
    
    return response.data;
  }

  // AI endpoints
  async analyzeConsumptionData(data: {
    consumptionData: string;
    language?: string;
  }) {
    return this.makeRequest<{ analysis: string }>('/ai/analyze-consumption', {
      method: 'POST',
      data: data,
    });
  }

  async extractDataFromPdf(data: { pdfDataUri: string }) {
    return this.makeRequest<any>('/ai/extract-from-pdf', {
      method: 'POST',
      data: data,
    });
  }

  async extractDataFromPage(data: { pageDataUri: string }) {
    return this.makeRequest<any>('/ai/extract-from-page', {
      method: 'POST',
      data: data,
    });
  }

  async extractProductData(data: { receiptImage: string }) {
    return this.makeRequest<any>('/ai/extract-from-product-qr', {
      method: 'POST',
      data: data,
    });
  }

  async suggestMissingItems(data: {
    purchaseHistory: string;
    familySize: number;
  }) {
    return this.makeRequest<{ suggestedItems: string[] }>('/ai/suggest-missing-items', {
      method: 'POST',
      data: data,
    });
  }

  // Families endpoints
  async createFamily(data: any) {
    return this.makeRequest<any>('/families', {
      method: 'POST',
      data: data,
    });
  }

  async getFamily(id: string) {
    return this.makeRequest<any>(`/families/${id}`);
  }

  async updateFamily(id: string, data: any) {
    return this.makeRequest<any>(`/families/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteFamily(id: string) {
    return this.makeRequest<any>(`/families/${id}`, {
      method: 'DELETE',
    });
  }

  // Users endpoints
  async createUser(data: any) {
    return this.makeRequest<any>('/users', {
      method: 'POST',
      data: data,
    });
  }

  async getUser(id: string) {
    return this.makeRequest<any>(`/users/${id}`);
  }

  /** Get current authenticated user (requires backend JWT cookie or Authorization header) */
  async getMe() {
    return this.makeRequest<any>('/auth/me');
  }

  async updateUser(id: string, data: any) {
    return this.makeRequest<any>(`/users/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteUser(id: string) {
    return this.makeRequest<any>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Products endpoints
  async getProducts() {
    return this.makeRequest<any[]>('/products');
  }

  async createProduct(data: any) {
    return this.makeRequest<any>('/products', {
      method: 'POST',
      data: data,
    });
  }

  async getProduct(id: string) {
    return this.makeRequest<any>(`/products/${id}`);
  }

  // Stores endpoints
  async getStores() {
    return this.makeRequest<any[]>('/stores');
  }

  async createStore(data: any): Promise<{ id: string } & Record<string, any>> {
    return this.makeRequest<{ id: string } & Record<string, any>>('/stores', {
      method: 'POST',
      data: data,
    });
  }

  async getStore(id: string) {
    return this.makeRequest<any>(`/stores/${id}`);
  }

  // Categories endpoints
  async getCategories() {
    return this.makeRequest<any[]>('/categories');
  }

  async createCategory(data: any) {
    return this.makeRequest<any>('/categories', {
      method: 'POST',
      data: data,
    });
  }

  // Purchases endpoints
  async getPurchases(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/purchases`);
  }

  async createPurchase(familyId: string, data: any): Promise<{ id: string } & Record<string, any>> {
    return this.makeRequest<{ id: string } & Record<string, any>>(`/families/${familyId}/purchases`, {
      method: 'POST',
      data: data,
    });
  }

  async getPurchase(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`);
  }

  async updatePurchase(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePurchase(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth endpoints
  async revoke() {
    return this.makeRequest<any>('/auth/revoke', { method: 'POST' });
  }

  // Backend auth
  async signUp(data: { email: string; password: string; displayName?: string }) {
    return this.makeRequest<any>('/auth/signup', { method: 'POST', data });
  }

  async signIn(data: { email: string; password: string; totp?: string }) {
    return this.makeRequest<any>('/auth/signin', { method: 'POST', data });
  }

  // Pantry Items endpoints
  async getPantryItems(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/pantry-items`);
  }

  async createPantryItem(familyId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items`, {
      method: 'POST',
      data: data,
    });
  }

  async getPantryItem(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items/${id}`);
  }

  async updatePantryItem(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePantryItem(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping Lists endpoints
  async getShoppingLists(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/shopping-lists`);
  }

  async createShoppingList(familyId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists`, {
      method: 'POST',
      data: data,
    });
  }

  async getShoppingList(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${id}`);
  }

  async updateShoppingList(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${id}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteShoppingList(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${id}`, {
      method: 'DELETE',
    });
  }

  // Shopping List Items endpoints
  async getShoppingListItems(familyId: string, listId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/shopping-lists/${listId}/items`);
  }

  async createShoppingListItem(familyId: string, listId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${listId}/items`, {
      method: 'POST',
      data: data,
    });
  }

  async updateShoppingListItem(familyId: string, listId: string, itemId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${listId}/items/${itemId}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deleteShoppingListItem(familyId: string, listId: string, itemId: string) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${listId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Notifications endpoints
  async getNotifications(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/notifications`);
  }

  async createNotification(familyId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/notifications`, {
      method: 'POST',
      data: data,
    });
  }

  async markNotificationAsRead(familyId: string, notificationId: string) {
    return this.makeRequest<any>(`/families/${familyId}/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead(familyId: string) {
    return this.makeRequest<any>(`/families/${familyId}/notifications/mark-all-read`, {
      method: 'PATCH',
    });
  }

  async deleteNotification(familyId: string, notificationId: string) {
    return this.makeRequest<any>(`/families/${familyId}/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // Purchase Items endpoints
  async getPurchaseItems(familyId: string, purchaseId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/purchases/${purchaseId}/items`);
  }

  async createPurchaseItem(familyId: string, purchaseId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items`, {
      method: 'POST',
      data: data,
    });
  }

  async updatePurchaseItem(familyId: string, purchaseId: string, itemId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'PATCH',
      data: data,
    });
  }

  async deletePurchaseItem(familyId: string, purchaseId: string, itemId: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async bulkUpdatePurchaseItems(familyId: string, purchaseId: string, items: any[]): Promise<{ success: boolean } & Record<string, any>> {
    return this.makeRequest<{ success: boolean } & Record<string, any>>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'PATCH',
      data: { items },
    });
  }

  async bulkDeletePurchaseItems(familyId: string, purchaseId: string, itemIds: string[]) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'DELETE',
      data: { itemIds },
    });
  }
}

export const apiService = new ApiService();
