import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/md3/button";
import { Input } from "@/components/md3/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { suggestMissingItems } from "../../routes/list/actions";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWandMagicSparkles, faPlus, faShareNodes, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/use-auth";
import { apiService } from "@/services/api";
import { useLingui } from '@lingui/react/macro';
import { trackEvent } from "@/services/analytics-service";
import type { ShoppingList as ApiShoppingList } from "@/types/api";

interface ListItem {
    id: string;
    name: string;
    checked: boolean;
    quantity: number;
    unit: string;
}

interface ShoppingList {
    id: string;
    name: string;
    status: string;
    createdAt: string;
    createdBy: string;
}

export function ShoppingListComponent() {
    const { t } = useLingui();
    const { profile } = useAuth();
    const [items, setItems] = useState<ListItem[]>([]);
    const [activeListId, setActiveListId] = useState<string | null>(null);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQty, setNewItemQty] = useState("1");
    const [newItemUnit, setNewItemUnit] = useState("UN");
    const [loading, setLoading] = useState(true);
    const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const { toast } = useToast();

    const getOrCreateActiveList = useCallback(
        async (familyId: string, userId: string) => {
            try {
                // Get existing active list
                const lists = await apiService.getShoppingLists(familyId);
                const activeList = lists.find((list: ApiShoppingList) => list.status === "active");

                console.log({ activeList });
                if (activeList) {
                    return activeList.id || activeList._id;
                } else {
                    // Create new active list
                    const newList = await apiService.createShoppingList(familyId, {
                        name: t`Main Shopping List`,
                        status: "active",
                    });
                    return newList.id || newList._id;
                }
            } catch (error) {
                console.error("Error getting or creating active list:", error);
                toast({
                    variant: "destructive",
                    title: t`Error`,
                    description: t`Could not load shopping list`,
                });
                return null;
            }
        },
        [t, toast]
    );

    const loadItems = useCallback(async (familyId: string, listId: string) => {
        try {
            const items = await apiService.getShoppingListItems(familyId, listId);
            setItems(items.map(item => ({
                id: item.id || item._id,
                name: item.name,
                checked: item.checked || item.isCompleted || false,
                quantity: item.quantity,
                unit: item.unit || ''
            })));
        } catch (error) {
            console.error("Error loading items:", error);
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`Could not load shopping list items`,
            });
        } finally {
            setLoading(false);
        }
    }, [toast, t]);

    useEffect(() => {
        if (!profile?.familyId || !profile.uid) return;

        setLoading(true);
        getOrCreateActiveList(profile.familyId, profile.uid).then((listId) => {
            if (listId) {
                setActiveListId(listId);
                loadItems(profile.familyId!, listId);
            }
        });
    }, [profile, getOrCreateActiveList, loadItems]);

    const handleAddItem = async () => {
        if (newItemName.trim() !== "" && Number(newItemQty) > 0 && profile?.familyId && activeListId) {
            try {
                await apiService.createShoppingListItem(profile.familyId, activeListId, {
                    name: newItemName.trim(),
                    checked: false,
                    quantity: Number(newItemQty),
                    unit: newItemUnit,
                });

                // Reload items
                loadItems(profile.familyId, activeListId);

                setNewItemName("");
                setNewItemQty("1");
                setNewItemUnit("UN");
                trackEvent("shopping_list_item_added", {
                    item_name: newItemName.trim(),
                    quantity: Number(newItemQty),
                    unit: newItemUnit,
                });
            } catch (error) {
                console.error("Error adding item:", error);
                toast({
                    variant: "destructive",
                    title: t`Error`,
                    description: t`Could not add item to shopping list`,
                });
            }
        }
    };

    const handleToggleItem = async (item: ListItem) => {
        if (!profile?.familyId || !activeListId) return;

        try {
            await apiService.updateShoppingListItem(profile.familyId, activeListId, item.id, {
                checked: !item.checked
            });

            // Update local state
            setItems(items.map(i => i.id === item.id ? { ...i, checked: !item.checked } : i));
        } catch (error) {
            console.error("Error toggling item:", error);
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`Could not update item`,
            });
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!profile?.familyId || !activeListId) return;

        try {
            await apiService.deleteShoppingListItem(profile.familyId, activeListId, id);

            // Update local state
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`Could not delete item`,
            });
        }
    };

    const handleGetSuggestions = async () => {
        if (!profile?.familyId) return;

        setIsLoadingSuggestions(true);
        trackEvent("shopping_list_ai_suggestion_requested");

        try {
            // Try to get purchase history from monthly API first, fallback to flat list
            let purchaseHistory = '';
            try {
                const monthlyGroups = await apiService.getPurchasesByMonth(profile.familyId);
                // Convert monthly groups to flat purchase history for AI
                const allPurchases = monthlyGroups.flatMap(group => group.purchases);
                purchaseHistory = allPurchases.map((purchase: any) =>
                    `${purchase.storeName} - ${new Date(purchase.date).toLocaleDateString()} - R$ ${purchase.totalAmount}`
                ).join('\n');
            } catch (monthlyError) {
                console.warn("Monthly purchase data failed, using flat list for AI suggestions:", monthlyError);
                // Fallback to flat purchase list
                const purchases = await apiService.getPurchases(profile.familyId);
                purchaseHistory = purchases.map((purchase: any) =>
                    `${purchase.storeName} - ${new Date(purchase.date).toLocaleDateString()} - R$ ${purchase.totalAmount}`
                ).join('\n');
            }

            const familySize = (profile.family?.adults || 1) + (profile.family?.children || 1);

            const result = await suggestMissingItems({
                purchaseHistory,
                familySize,
            });

            if (result.error) {
                toast({
                    variant: "destructive",
                    title: t`Error getting suggestions`,
                    description: result.error,
                });
            } else {
                setSuggestedItems(result.suggestedItems);
            }
        } catch (error) {
            console.error("Error getting suggestions:", error);
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`Could not get AI suggestions`,
            });
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const handleAddSuggestedItem = async (itemName: string) => {
        if (!profile?.familyId || !activeListId) return;

        try {
            await apiService.createShoppingListItem(profile.familyId, activeListId, {
                name: itemName,
                checked: false,
                quantity: 1,
                unit: "UN",
            });

            // Reload items
            loadItems(profile.familyId, activeListId);

            // Remove from suggestions
            setSuggestedItems(suggestedItems.filter(item => item !== itemName));

            trackEvent("shopping_list_item_added", {
                item_name: itemName,
                source: "ai_suggestion",
            });
        } catch (error) {
            console.error("Error adding suggested item:", error);
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`Could not add suggested item`,
            });
        }
    };

    const pendingItems = items.filter((item) => !item.checked);
    const completedItems = items.filter((item) => item.checked);

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{t`Shopping List`}</h2>
                    <Button
                        onClick={handleGetSuggestions}
                        disabled={isLoadingSuggestions}
                        variant="outlined"
                        size="sm"
                    >
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4 mr-2" />
                        {isLoadingSuggestions ? t`Getting suggestions...` : t`AI Suggestions`}
                    </Button>
                </div>

                {suggestedItems.length > 0 && (
                    <Alert>
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
                        <AlertTitle>{t`AI Suggestions`}</AlertTitle>
                        <AlertDescription>
                            <div className="mt-2 space-y-2">
                                {suggestedItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span>{item}</span>
                                        <Button
                                            size="sm"
                                            onClick={() => handleAddSuggestedItem(item)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-6">
                        <Input
                            placeholder={t`Item name`}
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            type="number"
                            placeholder={t`Qty`}
                            value={newItemQty}
                            onChange={(e) => setNewItemQty(e.target.value)}
                            min="1"
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                        />
                    </div>
                    <div className="col-span-2">
                        <Select value={newItemUnit} onValueChange={setNewItemUnit}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UN">{t`Unit`}</SelectItem>
                                <SelectItem value="KG">{t`Kg`}</SelectItem>
                                <SelectItem value="L">{t`Liter`}</SelectItem>
                                <SelectItem value="G">{t`Gram`}</SelectItem>
                                <SelectItem value="ML">{t`ML`}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-2">
                        <Button onClick={handleAddItem} className="w-full">
                            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {pendingItems.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">{t`To Buy`} ({pendingItems.length})</h3>
                        <div className="space-y-2">
                            {pendingItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            checked={item.checked}
                                            onCheckedChange={() => handleToggleItem(item)}
                                        />
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {item.quantity} {item.unit}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {completedItems.length > 0 && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-3">{t`Completed`} ({completedItems.length})</h3>
                            <div className="space-y-2">
                                {completedItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg opacity-60">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={item.checked}
                                                onCheckedChange={() => handleToggleItem(item)}
                                            />
                                            <span className="line-through">{item.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {item.quantity} {item.unit}
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {items.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">{t`No items in your shopping list yet.`}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {t`Add items above or use AI suggestions to get started.`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
