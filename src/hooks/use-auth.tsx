import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiService } from "@/services/api";
import { identifyUser, clearUserIdentity } from "@/services/analytics-service";
import { useRouter } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface Profile {
    uid: string;
    displayName: string;
    email: string;
    familyId: string | null;
    family?: {
        adults: number;
        children: number;
        pets: number;
    };
    settings?: {
        theme: "system" | "light" | "dark";
        notifications: boolean;
    };
    isAdmin?: boolean;
    plan?: string;
    planExpirationDate?: Date;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    reloadUser: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (user: User) => {
        try {
            const userData = await apiService.getUser(user.uid);
            const familyIdString = typeof userData.familyId === "string"
                ? userData.familyId
                : userData.familyId?.id || null;
            console.log({ familyId: userData.familyId, familyIdString });

            const profileData: Profile = {
                uid: user.uid,
                displayName: userData.displayName,
                email: userData.email,
                familyId: familyIdString,
                settings: userData.settings,
                isAdmin: userData.isAdmin,
                plan: userData.plan || "free",
                planExpirationDate: userData.planExpirationDate,
            };

            // Fetch family data if familyId exists
            if (familyIdString) {
                try {
                    const familyData = await apiService.getFamily(familyIdString);
                    profileData.family = familyData.familyComposition;
                } catch (error) {
                    console.warn("Could not fetch family data:", error);
                }
            }
            setProfile(profileData);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setProfile(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            setUser(user);
            if (user) {
                await fetchUserProfile(user);
                identifyUser(user.uid);
            } else {
                setProfile(null);
                clearUserIdentity();
                // Clear any tokens stored in the API client
                try {
                    apiService.setBackendAuthToken(null);
                    apiService.clearBackendRefreshToken();
                    apiService.clearFirebaseToken();
                } catch (e) {
                    console.warn('Error clearing API tokens on sign-out:', e);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const reloadUser = async () => {
        setLoading(true);
        try {
            await auth.currentUser?.reload();
            const currentUser = auth.currentUser;
            setUser(currentUser);
            if (currentUser) {
                await fetchUserProfile(currentUser);
            }
        } catch (error) {
            console.error("Error reloading user:", error);
        } finally {
            setLoading(false);
        }
    };

    return <AuthContext.Provider value={{ user, profile, loading, reloadUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useRequireAuth = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.navigate({ to: "/login" });
        }
    }, [user, loading, router]);

    return { user, loading };
};
