/**
 * TypeScript types for API service responses
 * These types define the expected return types for all API endpoints
 */

import { ExtractProductDataOutput, AnalyzeConsumptionDataOutput, SuggestMissingItemsOutput } from './ai-flows';

// ===============================
// Base Types
// ===============================

export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// ===============================
// User Types
// ===============================

export interface User extends BaseEntity {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  disabled?: boolean;
  customClaims?: Record<string, any>;
  familyId?: string | { id: string };
  settings?: Record<string, any>;
  isAdmin?: boolean;
  plan?: string;
  planExpirationDate?: string;
}

export interface CreateUserRequest {
  email: string;
  password?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  disabled?: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  disabled?: boolean;
  settings?: Record<string, any>;
}

// ===============================
// Family Types
// ===============================

export interface Family extends BaseEntity {
  name: string;
  members: string[]; // User IDs
  ownerId: string;
  familyComposition?: any;
  plan: 'free' | 'premium';
  settings?: {
    currency?: string;
    timezone?: string;
    notifications?: boolean;
  };
}

export interface CreateFamilyRequest {
  name: string;
  members?: string[];
  settings?: Family['settings'];
}

export interface UpdateFamilyRequest {
  name?: string;
  members?: string[];
  familyComposition?: any;
  settings?: Family['settings'];
}

// ===============================
// Product Types
// ===============================

export interface Product extends BaseEntity {
  id?: string; // Some components expect id instead of _id
  name: string;
  barcode?: string;
  brand?: string;
  category: string;
  subcategory?: string;
  description?: string;
  imageUrl?: string;
  averagePrice?: number;
  unit?: string; // UN, KG, L, etc.
  volume?: string;
}

export interface CreateProductRequest {
  name: string;
  barcode?: string;
  brand?: string;
  category: string;
  subcategory?: string;
  description?: string;
  imageUrl?: string;
  averagePrice?: number;
  unit?: string;
  volume?: string;
}

// ===============================
// Store Types
// ===============================

export interface Store extends BaseEntity {
  name: string;
  cnpj?: string;
  address?: string;
  location?: {
    latitude: number | null;
    longitude: number | null;
  };
  type?: string;
}

export interface CreateStoreRequest {
  name: string;
  cnpj?: string;
  address?: string;
  location?: {
    latitude: number | null;
    longitude: number | null;
  };
  type?: string;
}

// ===============================
// Category Types
// ===============================

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
}

// ===============================
// Purchase Types
// ===============================

export interface Purchase extends BaseEntity {
  id?: string; // Some components expect id instead of _id
  familyId: string;
  storeId: string;
  storeName: string;
  date: string;
  totalAmount: number;
  discount?: number;
  accessKey?: string | null;
  items?: PurchaseItem[];
}

export interface CreatePurchaseRequest {
  storeId: string;
  storeName: string;
  date: string;
  totalAmount: number;
  discount?: number;
  accessKey?: string | null;
}

export interface UpdatePurchaseRequest {
  storeId?: string;
  storeName?: string;
  date?: string;
  totalAmount?: number;
  discount?: number;
  accessKey?: string;
}

// ===============================
// Monthly Purchase Group Types
// ===============================

export interface MonthlyPurchaseGroup {
  /** Month and year in YYYY-MM format for sorting (e.g., "2024-01") */
  monthYear: string;
  /** Human-readable month and year for display (e.g., "January 2024") */
  displayName: string;
  /** Total amount spent for all purchases in this month */
  totalAmount: number;
  /** Number of purchases in this month */
  purchaseCount: number;
  /** Array of purchases for this month, sorted by date descending */
  purchases: Purchase[];
}

/**
 * Represents a month/year that has purchase data available
 * Used for insights, filtering, and analytics features
 */
export interface AvailableMonth {
  /** Month/year key in YYYY-MM format or 'no-date' for purchases without dates */
  monthYear: string;
  
  /** Human-readable display name (e.g., "January 2024" or "No Date") */
  displayName: string;
  
  /** Total number of purchases in this month */
  purchaseCount: number;
  
  /** Total amount spent in this month */
  totalAmount: number;
  
  /** Date of the earliest purchase in this month (null for no-date category) */
  earliestPurchase: string | null;
  
  /** Date of the latest purchase in this month (null for no-date category) */
  latestPurchase: string | null;
}

/**
 * Summary statistics for available months
 * Useful for insights and analytics dashboards
 */
export interface AvailableMonthsSummary {
  /** Total number of months with purchase data */
  totalMonths: number;
  
  /** Total number of purchases across all months */
  totalPurchases: number;
  
  /** Total amount spent across all months */
  totalAmount: number;
  
  /** Average purchases per month */
  averagePurchasesPerMonth: number;
  
  /** Average amount spent per month */
  averageAmountPerMonth: number;
  
  /** Earliest month with purchase data */
  earliestMonth: string | null;
  
  /** Latest month with purchase data */
  latestMonth: string | null;
  
  /** Month with the highest spending */
  highestSpendingMonth: AvailableMonth | null;
  
  /** Month with the most purchases */
  mostActiveMonth: AvailableMonth | null;
}

// ===============================
// Purchase Item Types
// ===============================

export interface PurchaseItem extends BaseEntity {
  id?: string; // Some components expect id instead of _id
  purchaseId: string;
  productId?: string | null;
  name?: string;
  quantity: number;
  price: number;
  unitPrice?: number;
  barcode?: string;
  category?: string;
  meta?: Record<string, unknown>;
  // Additional fields used in components
  totalPrice?: number;
  purchaseDate?: string;
  storeName?: string;
  productName?: string;
  productBarcode?: string;
  productVolume?: string;
  productBrand?: string;
  productCategory?: string;
  productSubcategory?: string;
}

export interface CreatePurchaseItemRequest {
  productId?: string | null;
  name?: string;
  quantity: number;
  price: number;
  unitPrice?: number;
  barcode?: string;
  category?: string;
  meta?: Record<string, unknown>;
}

export interface UpdatePurchaseItemRequest {
  productId?: string | null;
  name?: string;
  quantity?: number;
  price?: number;
  unitPrice?: number;
  barcode?: string;
  category?: string;
  meta?: Record<string, unknown>;
}

export interface BulkUpdatePurchaseItemsRequest {
  items: CreatePurchaseItemRequest[];
}

export interface BulkUpdatePurchaseItemsResponse {
  success: boolean;
  itemsCreated?: number;
  itemsUpdated?: number;
  errors?: string[];
}

export interface BulkDeletePurchaseItemsRequest {
  itemIds: string[];
}

export interface BulkDeletePurchaseItemsResponse {
  success: boolean;
  itemsDeleted?: number;
  errors?: string[];
}

// ===============================
// Pantry Item Types
// ===============================

export interface PantryItem extends BaseEntity {
  familyId: string;
  productId?: string;
  name: string;
  quantity: number;
  unit?: string;
  expirationDate?: string;
  location?: string;
  notes?: string;
}

export interface CreatePantryItemRequest {
  productId?: string;
  name: string;
  quantity: number;
  unit?: string;
  expirationDate?: string;
  location?: string;
  notes?: string;
}

export interface UpdatePantryItemRequest {
  productId?: string;
  name?: string;
  quantity?: number;
  unit?: string;
  expirationDate?: string;
  location?: string;
  notes?: string;
}

// ===============================
// Shopping List Types
// ===============================

export interface ShoppingList extends BaseEntity {
  id?: string; // Some components expect id instead of _id
  familyId: string;
  name: string;
  description?: string;
  isActive?: boolean;
  status?: string; // Used in components
  createdBy?: string; // Used in components
  items?: ShoppingListItem[];
}

export interface CreateShoppingListRequest {
  name: string;
  description?: string;
  isActive?: boolean;
  status?: string;
}

export interface UpdateShoppingListRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

// ===============================
// Shopping List Item Types
// ===============================

export interface ShoppingListItem extends BaseEntity {
  id?: string; // Some components expect id instead of _id
  listId: string;
  productId?: string;
  name: string;
  quantity: number;
  unit?: string;
  isCompleted?: boolean;
  checked?: boolean; // Used in components
  notes?: string;
  estimatedPrice?: number;
}

export interface CreateShoppingListItemRequest {
  productId?: string;
  name: string;
  quantity: number;
  unit?: string;
  isCompleted?: boolean;
  checked?: boolean;
  notes?: string;
  estimatedPrice?: number;
}

export interface UpdateShoppingListItemRequest {
  productId?: string;
  name?: string;
  quantity?: number;
  unit?: string;
  isCompleted?: boolean;
  checked?: boolean;
  notes?: string;
  estimatedPrice?: number;
}

// ===============================
// Notification Types
// ===============================

export interface Notification extends BaseEntity {
  familyId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead?: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface MarkNotificationAsReadResponse {
  success: boolean;
  notificationId: string;
}

export interface MarkAllNotificationsAsReadResponse {
  success: boolean;
  markedCount: number;
}

// ===============================
// Auth Types
// ===============================

export interface AuthResponse {
  token: string;
  refresh?: string;
  user?: User;
  uid?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
  totp?: string;
}

export interface MeResponse {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
}

export interface RefreshTokenRequest {
  token?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refresh?: string;
}

export interface RevokeTokenResponse {
  success: boolean;
}

// ===============================
// AI Flow Types (re-exported for convenience)
// ===============================

export interface AnalyzeConsumptionRequest {
  consumptionData: string;
  language?: string;
}

export interface ExtractDataFromPdfRequest {
  pdfDataUri: string;
}

export interface ExtractDataFromPageRequest {
  pageDataUri: string;
}

export interface ExtractProductDataRequest {
  receiptImage: string;
}

export interface SuggestMissingItemsRequest {
  purchaseHistory: string;
  familySize: number;
}

// Re-export AI flow output types
export type {
  ExtractProductDataOutput,
  AnalyzeConsumptionDataOutput,
  SuggestMissingItemsOutput
} from './ai-flows';

// ===============================
// Generic API Response Types
// ===============================

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface DeleteResponse {
  success: boolean;
  deletedId: string;
}

export interface BulkOperationResponse {
  success: boolean;
  processed: number;
  errors?: string[];
}