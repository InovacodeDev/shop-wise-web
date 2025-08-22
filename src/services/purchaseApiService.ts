import { apiService } from "@/services/api";
import type { PurchaseData } from "@/components/scan/manual-purchase-form";
import type { ExtractProductDataOutput } from "@/types/ai-flows";
import type { Purchase, CreatePurchaseItemRequest } from "@/types/api";

type ProductInput = {
    id?: string;
    productId?: string;
    quantity?: number;
    price?: number;
    meta?: Record<string, unknown>;
};

export async function savePurchase(
    familyId: string, 
    userId: string, 
    purchaseData: ExtractProductDataOutput | PurchaseData, 
    products: ProductInput[], 
    entryMethod: 'import' | 'manual'
): Promise<{ success: boolean; purchaseId: string }> {
    if (!familyId || !userId) {
        throw new Error("Family ID and User ID are required.");
    }
    
    if ('accessKey' in purchaseData && purchaseData.accessKey) {
        const sanitizedKeyAccess = purchaseData.accessKey.replace(/\s/g, '');
        try {
            const existingPurchases = await apiService.getPurchases(familyId);
            const duplicate = existingPurchases.find((p: any) => p.accessKey === sanitizedKeyAccess);
            if (duplicate) {
                throw new Error('Este cupom fiscal já foi importado.');
            }
        } catch (error: any) {
            if (error.message === 'Este cupom fiscal já foi importado.') {
                throw error;
            }
            console.warn('Could not check for duplicate purchases:', error);
        }
    }

    const totalAmount = products.reduce((acc, item) => {
        const itemTotal = item.price || 0;
        return acc + itemTotal;
    }, 0);
    
    let purchaseDate: string;
    if (purchaseData.date instanceof Date) {
        purchaseDate = purchaseData.date.toISOString();
    } else if (typeof purchaseData.date === 'string') {
        const dateParts = purchaseData.date.split(/[\/-]/);
        if (dateParts.length === 3) {
            let year, month, day;
            if (dateParts[0].length === 4) { // YYYY-MM-DD
                year = parseInt(dateParts[0], 10);
                month = parseInt(dateParts[1], 10) - 1;
                day = parseInt(dateParts[2], 10);
            } else { // DD/MM/YYYY
                day = parseInt(dateParts[0], 10);
                month = parseInt(dateParts[1], 10) - 1;
                year = parseInt(dateParts[2], 10);
            }
            purchaseDate = new Date(year, month, day).toISOString();
        } else {
            purchaseDate = new Date().toISOString();
        }
    } else {
        purchaseDate = new Date().toISOString();
    }

    let storeId = 'unknown';
    if (entryMethod === 'import' && 'cnpj' in purchaseData && purchaseData.cnpj) {
        try {
            const storeData = {
                name: purchaseData.storeName,
                cnpj: purchaseData.cnpj,
                address: purchaseData.address || '',
                location: {
                    latitude: (purchaseData as any).latitude || null,
                    longitude: (purchaseData as any).longitude || null,
                },
                type: 'farmacia', // TODO
            };
            const store = await apiService.createStore(storeData);
            storeId = store._id;
        } catch (error) {
            console.warn('Could not create store, using unknown:', error);
        }
    }

    // Create purchase via API
    const purchaseDataForApi = {
        storeId: storeId,
        storeName: purchaseData.storeName,
        date: purchaseDate,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        discount: 'discount' in purchaseData ? (purchaseData.discount || 0) : 0,
        accessKey: 'accessKey' in purchaseData && purchaseData.accessKey ? purchaseData.accessKey.replace(/\s/g, '') : null,
    };

    try {
        const purchase = await apiService.createPurchase(familyId, purchaseDataForApi);

        // If the backend supports purchase items, create them via API.
        // We attempt to create items if products were supplied.
        if (products && products.length && purchase?._id) {
            // Use bulk endpoint to create/update items on the purchase
            const items: CreatePurchaseItemRequest[] = products.map((p) => ({
                productId: p.id ?? p.productId ?? undefined,
                quantity: p.quantity ?? 1,
                price: p.price ?? 0,
                meta: p.meta ?? {},
            }));
            // Prefer bulk update so we can create many items in one call
            try {
                const purchaseId = purchase.id || purchase._id;
                if (purchaseId) {
                    await apiService.bulkUpdatePurchaseItems(familyId, purchaseId, items);
                }
            } catch (e) {
                // If bulk endpoint fails, log and continue — purchase succeeded.
                console.warn('bulkUpdatePurchaseItems failed, skipping attaching items:', e);
            }
        }

        return { success: true, purchaseId: purchase.id || purchase._id };
    } catch (error) {
        console.error('Error saving purchase via API:', error);
        throw error;
    }
}

// Wrapper functions to use API endpoints
export async function getPurchases(familyId: string): Promise<Purchase[]> {
    return apiService.getPurchases(familyId);
}

export async function getPurchase(familyId: string, purchaseId: string): Promise<Purchase> {
    return apiService.getPurchase(familyId, purchaseId);
}

export async function updatePurchase(familyId: string, purchaseId: string, data: any): Promise<Purchase> {
    return apiService.updatePurchase(familyId, purchaseId, data);
}

export async function deletePurchase(familyId: string, purchaseId: string): Promise<{ success: boolean; deletedId: string }> {
    return apiService.deletePurchase(familyId, purchaseId);
}
