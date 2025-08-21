import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiService } from "@/services/api";
import { identifyUser, clearUserIdentity } from "@/services/analytics-service";
import { useRouter } from "@tanstack/react-router";

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
    user: { uid: string } | null;
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
    const [user, setUser] = useState<{ uid: string } | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (user: { uid: string }) => {
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
        (async () => {
            setLoading(true);
            try {
                // Attempt to call backend /auth/me to determine current authenticated user
                try {
                    const res = await apiService.getMe();
                    const me = res?.user ?? res;
                    if (me?.uid) {
                        setUser({ uid: me.uid });
                        await fetchUserProfile({ uid: me.uid });
                        identifyUser(me.uid);
                    } else {
                        setUser(null);
                        setProfile(null);
                        clearUserIdentity();
                    }
                } catch (e) {
                    console.warn('Could not fetch user profile on mount:', e);
                    setUser(null);
                    setProfile(null);
                    clearUserIdentity();
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const reloadUser = async () => {
        setLoading(true);
        try {
            try {
                const res = await apiService.getMe();
                const me = res?.user ?? res;
                if (me?.uid) {
                    setUser({ uid: me.uid });
                    await fetchUserProfile({ uid: me.uid });
                } else {
                    setUser(null);
                    setProfile(null);
                }
            } catch (e) {
                console.warn('Error reloading user profile:', e);
                setUser(null);
                setProfile(null);
            }
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
