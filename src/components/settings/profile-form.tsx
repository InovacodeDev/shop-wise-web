import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { updateProfile, linkWithPopup, OAuthProvider, AuthProvider } from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { Collections } from "@/lib/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { trackEvent } from "@/services/analytics-service";
import { useLingui } from '@lingui/react/macro';

const profileSchema = z.object({
    displayName: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6, { message: "Senha atual é obrigatória." }),
    newPassword: z.string().min(6, { message: "A nova senha deve ter pelo menos 6 caracteres." }),
});

export function ProfileForm() {
    const { user, reloadUser } = useAuth();
    const { toast } = useToast();
    const { t } = useLingui();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [linkedProviders, setLinkedProviders] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            profileForm.reset({
                displayName: user.displayName ?? "",
                email: user.email ?? "",
            });
            const providers = user.providerData.map((p) => p.providerId);
            setLinkedProviders(providers);
        }
    }, [user]);

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: "",
            email: "",
        },
        mode: "onChange",
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
        mode: "onChange",
    });

    async function onProfileSubmit(values: z.infer<typeof profileSchema>) {
        if (!auth.currentUser) return;
        try {
            await updateProfile(auth.currentUser, { displayName: values.displayName });

            // Save user data to Firestore
            const userRef = doc(db, Collections.Users, auth.currentUser.uid);
            await setDoc(
                userRef,
                {
                    displayName: values.displayName,
                },
                { merge: true }
            );

            await reloadUser();
            profileForm.reset(values); // Resets the dirty state
            toast({
                title: t`Success!`,
                description: t`Your profile has been updated.`,
            });
            trackEvent("profile_updated");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t`Error updating profile.`,
                description: error.message,
            });
        }
    }

    function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        console.log("Password change requested:", values);
        // Here you would implement password change logic with Firebase Auth
        passwordForm.reset(); // Resets the form after submission
    }

    const handleLinkAccount = async (provider: AuthProvider) => {
        if (!auth.currentUser) return;
        try {
            await linkWithPopup(auth.currentUser, provider);
            await reloadUser();
            toast({
                title: t`Account Linked`,
                description: t`Your account was linked successfully.`,
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t`Error Linking Account`,
                description: error.message,
            });
        }
    };

    const {
        isDirty: isProfileDirty,
        isValid: isProfileValid,
        isSubmitting: isProfileSubmitting,
    } = profileForm.formState;
    const {
        isDirty: isPasswordDirty,
        isValid: isPasswordValid,
        isSubmitting: isPasswordSubmitting,
    } = passwordForm.formState;

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t`Profile Information`}</CardTitle>
                    <CardDescription>{t`Update your personal details.`}</CardDescription>
                </CardHeader>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={profileForm.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t`Display Name`}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t`Email`}</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} disabled />
                                        </FormControl>
                                        <p className="text-xs text-muted-foreground">{t`Your email address cannot be changed.`}</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={!isProfileDirty || !isProfileValid || isProfileSubmitting}>
                                {t`Save Changes`}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t`Linked Accounts`}</CardTitle>
                    <CardDescription>{t`Connect other accounts for faster login.`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faGoogle} className="h-6 w-6" />
                            <span>Google</span>
                        </div>
                        <Button
                            variant="outline"
                            disabled={linkedProviders.includes("google.com")}
                            onClick={() => handleLinkAccount(googleProvider)}
                        >
                            {linkedProviders.includes("google.com") ? t`Connected` : t`Connect`}
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faApple} className="h-6 w-6" />
                            <span>Apple</span>
                        </div>
                        <Button
                            variant="outline"
                            disabled={linkedProviders.includes("apple.com")}
                            onClick={() => handleLinkAccount(new OAuthProvider("apple.com"))}
                        >
                            {linkedProviders.includes("apple.com") ? t`Connected` : t`Connect`}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t`Change Password`}</CardTitle>
                    <CardDescription>{t`Choose a new strong password.`}</CardDescription>
                </CardHeader>
                <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t`Current Password`}</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input type={showCurrentPassword ? "text" : "password"} {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? (
                                                    <FontAwesomeIcon
                                                        icon={faEyeSlash}
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <span className="sr-only">
                                                    {showCurrentPassword ? t`Hide password` : t`Show password`}
                                                </span>
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t`New Password`}</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input type={showNewPassword ? "text" : "password"} {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? (
                                                    <FontAwesomeIcon
                                                        icon={faEyeSlash}
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <span className="sr-only">
                                                    {showNewPassword ? t`Hide password` : t`Show password`}
                                                </span>
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                disabled={!isPasswordDirty || !isPasswordValid || isPasswordSubmitting}
                            >
                                {t`Change Password`}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
