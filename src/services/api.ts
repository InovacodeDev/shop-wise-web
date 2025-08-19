import { auth } from '@/lib/firebase';

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001';

class ApiService {
  private baseURL = 'http://localhost:3000';

  private async getAuthToken(): Promise<string | null> {
    // Try to get token from localStorage first
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      return storedToken;
    }

    // Fallback to Firebase auth if available
    try {
      const { auth } = await import('@/lib/firebase');
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        localStorage.setItem('authToken', token);
        return token;
      }
    } catch (error) {
      console.warn('Firebase auth not available:', error);
    }

    return null;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // AI endpoints
  async analyzeConsumptionData(data: {
    consumptionData: string;
    language?: string;
  }) {
    return this.makeRequest<{ analysis: string }>('/ai/analyze-consumption', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async extractDataFromPdf(data: { pdfDataUri: string }) {
    return this.makeRequest<any>('/ai/extract-from-pdf', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async extractDataFromPage(data: { pageDataUri: string }) {
    return this.makeRequest<any>('/ai/extract-from-page', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async extractProductData(data: { receiptImage: string }) {
    return this.makeRequest<any>('/ai/extract-from-product-qr', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async suggestMissingItems(data: {
    purchaseHistory: string;
    familySize: number;
  }) {
    return this.makeRequest<{ suggestedItems: string[] }>('/ai/suggest-missing-items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Families endpoints
  async createFamily(data: any) {
    return this.makeRequest<any>('/families', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getFamily(id: string) {
    return this.makeRequest<any>(`/families/${id}`);
  }

  async updateFamily(id: string, data: any) {
    return this.makeRequest<any>(`/families/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async getUser(id: string) {
    return this.makeRequest<any>(`/users/${id}`);
  }

  async updateUser(id: string, data: any) {
    return this.makeRequest<any>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async getProduct(id: string) {
    return this.makeRequest<any>(`/products/${id}`);
  }

  // Stores endpoints
  async getStores() {
    return this.makeRequest<any[]>('/stores');
  }

  async createStore(data: any) {
    return this.makeRequest<any>('/stores', {
      method: 'POST',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  // Purchases endpoints
  async getPurchases(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/purchases`);
  }

  async createPurchase(familyId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPurchase(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`);
  }

  async updatePurchase(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deletePurchase(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${id}`, {
      method: 'DELETE',
    });
  }

  // Pantry Items endpoints
  async getPantryItems(familyId: string) {
    return this.makeRequest<any[]>(`/families/${familyId}/pantry-items`);
  }

  async createPantryItem(familyId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPantryItem(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items/${id}`);
  }

  async updatePantryItem(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/pantry-items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async getShoppingList(familyId: string, id: string) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${id}`);
  }

  async updateShoppingList(familyId: string, id: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async updateShoppingListItem(familyId: string, listId: string, itemId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/shopping-lists/${listId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
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
      body: JSON.stringify(data),
    });
  }

  async updatePurchaseItem(familyId: string, purchaseId: string, itemId: string, data: any) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deletePurchaseItem(familyId: string, purchaseId: string, itemId: string) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async bulkUpdatePurchaseItems(familyId: string, purchaseId: string, items: any[]) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'PATCH',
      body: JSON.stringify({ items }),
    });
  }

  async bulkDeletePurchaseItems(familyId: string, purchaseId: string, itemIds: string[]) {
    return this.makeRequest<any>(`/families/${familyId}/purchases/${purchaseId}/items/bulk`, {
      method: 'DELETE',
      body: JSON.stringify({ itemIds }),
    });
  }
}

export const apiService = new ApiService();
