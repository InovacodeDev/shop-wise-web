import { createFileRoute } from '@tanstack/react-router'
import { PdfImportComponent } from "@/components/scan/pdf-import-component";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuth } from '@/hooks/use-auth';
import { savePurchase } from "./actions";
import { ManualPurchaseForm } from "@/components/scan/manual-purchase-form";
import type { PurchaseData, ItemData } from "@/components/scan/manual-purchase-form";
import type { ExtractProductDataOutput } from "@/types/ai-flows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/services/analytics-service";
import { useLingui } from '@lingui/react/macro';
import { SideBarLayout } from '@/components/layout/sidebar-layout';

export const Route = createFileRoute('/scan')({
    component: ScanPage,
})

function ScanPage() {
    const { t } = useLingui();
    const { user, profile } = useAuth();
    const { toast } = useToast();

    const handleSavePurchase = async (purchaseData: ExtractProductDataOutput | PurchaseData, products: any[], entryMethod: 'import' | 'manual') => {
        if (!user || !profile || !profile.familyId) {
            toast({
                variant: 'destructive',
                title: t`Error`,
                description: t`You need to be logged in to perform this action.`,
            });
            return;
        }

        const result = await savePurchase(purchaseData, products, profile.familyId, user.uid, entryMethod);

        if (result.error) {
            toast({
                variant: 'destructive',
                title: t`Save Error`,
                description: result.error,
            });
        } else {
            toast({
                title: t`Success!`,
                description: t`Purchase saved successfully!`,
            });
            trackEvent('purchase_saved', {
                method: entryMethod,
                itemCount: products.length,
                totalAmount: products.reduce((acc, item) => acc + item.price, 0)
            });
        }
    };


    return (
        <SideBarLayout>
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">{t`Add New Purchase`}</CardTitle>
                        <CardDescription>
                            {t`You can import a purchase from a PDF fiscal receipt or enter the details manually.`}
                        </CardDescription>
                    </CardHeader>
                    <div className="p-6 pt-0">
                        <Tabs defaultValue="scan" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="scan"><FontAwesomeIcon icon={faFilePdf} className="mr-2 h-4 w-4" /> {t`Import PDF`}</TabsTrigger>
                                <TabsTrigger value="manual"><FontAwesomeIcon icon={faKeyboard} className="mr-2 h-4 w-4" /> {t`Manual Entry`}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="scan" className="mt-6">
                                <PdfImportComponent onSave={(data, prods) => handleSavePurchase(data, prods, 'import')} />
                            </TabsContent>
                            <TabsContent value="manual" className="mt-6">
                                <ManualPurchaseForm onSave={(data, prods) => handleSavePurchase(data, prods, 'manual')} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </Card>
            </div>
        </SideBarLayout>
    );
}
