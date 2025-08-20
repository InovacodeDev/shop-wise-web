import { createFileRoute } from "@tanstack/react-router";
import { ShoppingListComponent } from "@/components/list/shopping-list-component-new";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLingui } from '@lingui/react/macro';
import { SideBarLayout } from '@/components/layout/sidebar-layout';


export const Route = createFileRoute("/list")({
    component: ListPage,
});

function ListPage() {
    const { t } = useLingui();

    return (
        <SideBarLayout>
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">{t`Shopping List`}</CardTitle>
                        <CardDescription>{t`Manage your active shopping list. Add, remove and check items.`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ShoppingListComponent />
                    </CardContent>
                </Card>
            </div>
        </SideBarLayout>
    );
}
