import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

import { trackEvent } from "@/services/analytics-service";
import { useLingui } from '@lingui/react/macro';
import { apiService } from "@/services/api";

const preferencesSchema = z.object({
    theme: z.enum(["system", "light", "dark"]),
    notifications: z.boolean(),
});

type PreferencesData = z.infer<typeof preferencesSchema>;

export function PreferencesForm() {
    const { user, profile, reloadUser } = useAuth();
    const { toast } = useToast();
    const { t } = useLingui();

    const form = useForm<PreferencesData>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            theme: "system",
            notifications: true,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (profile?.settings) {
            form.reset({
                theme: profile.settings.theme ?? "system",
                notifications: profile.settings.notifications ?? true,
            });
        }
    }, [profile, form]);

    async function onSubmit(values: PreferencesData) {
        if (!user) {
            toast({
                variant: "destructive",
                title: t`Error`,
                description: t`You need to be logged in to save preferences.`,
            });
            return;
        }
        try {
            await apiService.updateUser(user.uid, { settings: values });

            await reloadUser();
            form.reset(values);
            toast({
                title: t`Success!`,
                description: t`Your preferences have been saved.`,
            });
            trackEvent("preferences_updated", values);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t`Error Saving`,
                description: t`An error occurred while saving your preferences. Please try again.`,
            });
        }
    }

    const { isDirty, isValid, isSubmitting } = form.formState;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t`Preferences`}</CardTitle>
                <CardDescription>{t`Customize the look and behavior of the app.`}</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="text-base font-medium mb-2">{t`Appearance`}</h4>
                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t`Theme`}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={t`Select a theme`}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="light">
                                                    {t`Light`}
                                                </SelectItem>
                                                <SelectItem value="dark">{t`Dark`}</SelectItem>
                                                <SelectItem value="system">
                                                    {t`System`}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div>
                            <h4 className="text-base font-medium mb-2">{t`Notifications`}</h4>
                            <FormField
                                control={form.control}
                                name="notifications"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                {t`Enable push notifications`}
                                            </FormLabel>
                                            <p className="text-sm text-muted-foreground">
                                                {t`Receive updates and suggestions.`}
                                            </p>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
                            {isSubmitting ? t`Saving...` : t`Save Preferences`}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
