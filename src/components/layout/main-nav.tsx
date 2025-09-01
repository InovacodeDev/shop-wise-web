import { SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useLingui } from '@lingui/react/macro';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartColumn,
    faCog,
    faHome,
    faList,
    faMicroscope,
    faPlusCircle,
    faShield,
    faShieldHalved,
    faShoppingBasket,
    faUsers,
    faSignOutAlt,
    faUser,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines, faMessage } from "@fortawesome/free-regular-svg-icons";
import { apiService } from "@/services/api";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { trackEvent } from "@/services/analytics-service";
import { Link, useRouter } from "@tanstack/react-router";

export function MainNav() {
    const router = useRouter();
    const { profile, reloadUser } = useAuth();
    const { t } = useLingui();
    const isAdmin = profile?.isAdmin || false;
    const { state } = useSidebar();

    const menuItems = [
        { href: "/home", label: t`Insights`, icon: faHome },
        { href: "/list", label: t`Shopping List`, icon: faList },
        { href: "/purchases", label: t`Add Purchase`, icon: faPlusCircle },
        // New finance entries
        { href: "/investments", label: t`Investments`, icon: faChartColumn },
        { href: "/budgets", label: t`Budgets`, icon: faFileLines },
        { href: "/goals", label: t`Goals`, icon: faFileLines },
        { href: "/credit-cards", label: t`Credit Cards`, icon: faFileLines },
        { href: "/achievements", label: t`Achievements`, icon: faFileLines },
        { href: "/education", label: t`Education`, icon: faFileLines },
        { href: "/bank", label: t`Bank`, icon: faFileLines },
        { href: "/projections", label: t`Projections`, icon: faChartColumn },
    ];

    const settingsMenuItems = [
        { href: "/family", label: t`Family`, icon: faUserGroup },
        { href: "/settings", label: t`My Account`, icon: faUser },
    ];

    const adminMenuItems = [
        { href: "/admin", label: t`Admin Dashboard`, icon: faShieldHalved },
        { href: "/admin/users", label: t`Manage Users`, icon: faUsers },
        { href: "/admin/reports", label: t`Usage Reports`, icon: faChartColumn },
        { href: "/admin/market-insights", label: t`Market Insights`, icon: faShoppingBasket },
        { href: "/admin/settings", label: t`Global Settings`, icon: faCog },
        { href: "/admin/notifications", label: t`Manage Notifications`, icon: faMessage },
        { href: "/admin/audit", label: t`Audit & Tests`, icon: faMicroscope },
        { href: "/admin/security", label: t`Security`, icon: faShield },
        { href: "/admin/logs", label: t`System Logs`, icon: faFileLines },
    ];

    const handleSignOut = async () => {
        // Attempt to revoke server-side refresh token (clears HttpOnly cookie)
        try {
            await apiService.revoke();
        } catch (e) {
            // ignore
        }
        // Clear backend tokens (client-side)
        try {
            apiService.clearAuthState();
        } catch (e) {
            console.warn('Error clearing tokens on logout:', e);
        }

        // Reload auth context so UI updates
        try {
            await reloadUser();
        } catch {
            // ignore
        }

        trackEvent("user_logged_out");
        router.navigate({ to: "/" });
    };

    const isActive = (href: string) => {
        const pathname = window.location.pathname;
        if (href === "/admin") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <SidebarContent>
            <SidebarMenu>
                {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link to={item.href}>
                            <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label} asChild={false}>
                                <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                                <span
                                    className={cn(
                                        "transition-all duration-300 ease-in-out",
                                        state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarMenu className="mt-auto">
                <p
                    className={cn(
                        "px-4 py-2 text-xs font-semibold text-muted-foreground transition-opacity duration-300",
                        state === "collapsed" ? "opacity-0 h-0" : "opacity-100 h-auto"
                    )}
                >
                    {t`Settings`}
                </p>
                {settingsMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link to={item.href}>
                            <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label} asChild={false}>
                                <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                                <span
                                    className={cn(
                                        "transition-all duration-300 ease-in-out",
                                        state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={t`Sair`} asChild={false}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
                                <span
                                    className={cn(
                                        "transition-all duration-300 ease-in-out",
                                        state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                                    )}
                                >
                                    {t`Sign out`}
                                </span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t`Are you sure you want to sign out?`}</AlertDialogTitle>
                            <AlertDialogDescription>{t`You will be redirected to the home page.`}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button onClick={handleSignOut}>{t`Yes, sign out`}</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {isAdmin && (
                    <>
                        <p
                            className={cn(
                                "px-4 py-2 text-xs font-semibold text-muted-foreground transition-opacity duration-300",
                                state === "collapsed" ? "opacity-0 h-0" : "opacity-100 h-auto"
                            )}
                        >
                            {t`Administration`}
                        </p>
                        {adminMenuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link to={item.href}>
                                    <SidebarMenuButton
                                        isActive={isActive(item.href)}
                                        tooltip={item.label}
                                        asChild={false}
                                    >
                                        <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
                                        <span
                                            className={cn(
                                                "transition-all duration-300 ease-in-out",
                                                state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </>
                )}
            </SidebarMenu>
        </SidebarContent>
    );
}
