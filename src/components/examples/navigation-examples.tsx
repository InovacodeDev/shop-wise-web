import * as React from "react";
import { NavigationBar, NavigationBarItem } from "@/components/md3/navigation-bar";
import { NavigationRail, NavigationRailItem } from "@/components/md3/navigation-rail";
import { NavigationDrawer, NavigationDrawerItem, NavigationDrawerSection, useNavigationDrawer } from "@/components/md3/navigation-drawer";
import { FAB } from "@/components/md3/fab";
import { Button } from "@/components/md3/button";

// Mock icons - substitua pelos seus ícones reais
const HomeIcon = () => <div className="w-full h-full bg-current rounded" style={{ mask: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"/></svg>') center/contain no-repeat" }} />;
const SearchIcon = () => <div className="w-full h-full bg-current rounded-full border-2 border-current" />;
const FavoriteIcon = () => <div className="w-full h-full bg-current" style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />;
const ProfileIcon = () => <div className="w-full h-full bg-current rounded-full" />;
const MenuIcon = () => (
    <div className="w-full h-full flex flex-col justify-between py-1">
        <div className="h-0.5 bg-current" />
        <div className="h-0.5 bg-current" />
        <div className="h-0.5 bg-current" />
    </div>
);
const AddIcon = () => (
    <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-current" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-3 bg-current" />
        </div>
    </div>
);

/**
 * Exemplo de Navigation Bar para mobile
 */
export function NavigationBarExample() {
    const [activeTab, setActiveTab] = React.useState("home");

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Bar - Basic</h3>
                <div className="relative bg-surface-container-low p-4 rounded-lg">
                    <NavigationBar
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="relative" // Remove fixed para demo
                    >
                        <NavigationBarItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationBarItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationBarItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={3}
                        />
                        <NavigationBarItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                            dotBadge
                        />
                    </NavigationBar>
                </div>
                <p className="text-sm text-on-surface-variant">
                    Ativo: {activeTab}
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Bar - Compact</h3>
                <div className="relative bg-surface-container-low p-4 rounded-lg">
                    <NavigationBar
                        value={activeTab}
                        onValueChange={setActiveTab}
                        size="compact"
                        className="relative"
                    >
                        <NavigationBarItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationBarItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationBarItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge="99+"
                        />
                        <NavigationBarItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                        />
                    </NavigationBar>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Bar - Without Labels</h3>
                <div className="relative bg-surface-container-low p-4 rounded-lg">
                    <NavigationBar
                        value={activeTab}
                        onValueChange={setActiveTab}
                        showLabels={false}
                        className="relative"
                    >
                        <NavigationBarItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationBarItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationBarItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={3}
                        />
                        <NavigationBarItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                        />
                    </NavigationBar>
                </div>
            </div>
        </div>
    );
}

/**
 * Exemplo de Navigation Rail para desktop
 */
export function NavigationRailExample() {
    const [activeItem, setActiveItem] = React.useState("home");

    return (
        <div className="flex gap-8">
            {/* Standard Rail */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Rail - Standard</h3>
                <div className="relative bg-surface-container-low rounded-lg overflow-hidden">
                    <NavigationRail
                        variant="standard"
                        value={activeItem}
                        onValueChange={setActiveItem}
                        size="compact"
                        header={
                            <FAB size="small">
                                <AddIcon />
                            </FAB>
                        }
                    >
                        <NavigationRailItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationRailItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationRailItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={5}
                        />
                        <NavigationRailItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                            dotBadge
                        />
                    </NavigationRail>
                </div>
                <p className="text-sm text-on-surface-variant">
                    Ativo: {activeItem}
                </p>
            </div>

            {/* Expanded Rail */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Navigation Rail - Expanded</h3>
                <div className="relative bg-surface-container-low rounded-lg overflow-hidden">
                    <NavigationRail
                        variant="expanded"
                        value={activeItem}
                        onValueChange={setActiveItem}
                        size="compact"
                        header={
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-secondary-container rounded-full flex items-center justify-center">
                                    <span className="text-xs font-medium">A</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium truncate">My App</h4>
                                    <p className="text-xs text-on-surface-variant">v1.0.0</p>
                                </div>
                            </div>
                        }
                    >
                        <NavigationRailItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationRailItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationRailItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={5}
                        />
                        <NavigationRailItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile Settings"
                            dotBadge
                        />
                    </NavigationRail>
                </div>
            </div>
        </div>
    );
}

/**
 * Exemplo de Navigation Drawer (Deprecated)
 */
export function NavigationDrawerExample() {
    const { open, openDrawer, closeDrawer } = useNavigationDrawer();
    const [activeItem, setActiveItem] = React.useState("home");

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button onClick={openDrawer} variant="outlined">
                    <MenuIcon />
                    Open Drawer (Deprecated)
                </Button>
                <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    ⚠️ Use Navigation Rail instead
                </div>
            </div>

            <p className="text-sm text-on-surface-variant">
                Ativo: {activeItem}
            </p>

            <NavigationDrawer
                open={open}
                onClose={closeDrawer}
                variant="modal"
                modal
                value={activeItem}
                onValueChange={setActiveItem}
                header={
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center">
                            <span className="text-lg font-medium">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium">John Doe</h3>
                            <p className="text-sm text-on-surface-variant truncate">
                                john@example.com
                            </p>
                        </div>
                    </div>
                }
                footer={
                    <div className="text-xs text-on-surface-variant text-center">
                        Version 1.0.0
                    </div>
                }
            >
                <NavigationDrawerSection title="Principal">
                    <NavigationDrawerItem
                        value="home"
                        icon={<HomeIcon />}
                        label="Home"
                    />
                    <NavigationDrawerItem
                        value="search"
                        icon={<SearchIcon />}
                        label="Search"
                    />
                    <NavigationDrawerItem
                        value="favorites"
                        icon={<FavoriteIcon />}
                        label="Favorites"
                        badge={3}
                    />
                </NavigationDrawerSection>

                <NavigationDrawerSection title="Conta" showDivider>
                    <NavigationDrawerItem
                        value="profile"
                        icon={<ProfileIcon />}
                        label="Profile"
                    />
                    <NavigationDrawerItem
                        value="settings"
                        icon={<ProfileIcon />}
                        label="Settings"
                        dotBadge
                    />
                </NavigationDrawerSection>
            </NavigationDrawer>
        </div>
    );
}

/**
 * Exemplo de sistema de navegação responsivo
 */
export function ResponsiveNavigationExample() {
    const [activeItem, setActiveItem] = React.useState("home");

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Sistema de Navegação Responsivo</h2>

            <div className="border border-outline-variant rounded-lg overflow-hidden">
                <div className="bg-surface-container p-4 border-b border-outline-variant">
                    <h3 className="font-medium">Mobile View (Navigation Bar)</h3>
                    <p className="text-sm text-on-surface-variant">Visível apenas em telas pequenas</p>
                </div>

                <div className="p-4 md:hidden">
                    <NavigationBar
                        value={activeItem}
                        onValueChange={setActiveItem}
                        className="relative bg-surface-container border border-outline-variant"
                    >
                        <NavigationBarItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationBarItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationBarItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={3}
                        />
                        <NavigationBarItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                        />
                    </NavigationBar>
                </div>

                <div className="hidden md:block p-4">
                    <p className="text-sm text-on-surface-variant text-center py-8">
                        Navigation Bar está oculto em telas médias/grandes
                    </p>
                </div>
            </div>

            <div className="border border-outline-variant rounded-lg overflow-hidden">
                <div className="bg-surface-container p-4 border-b border-outline-variant">
                    <h3 className="font-medium">Desktop View (Navigation Rail)</h3>
                    <p className="text-sm text-on-surface-variant">Visível apenas em telas médias/grandes</p>
                </div>

                <div className="hidden md:flex p-4">
                    <NavigationRail
                        variant="standard"
                        value={activeItem}
                        onValueChange={setActiveItem}
                        size="compact"
                        className="bg-surface-container border border-outline-variant"
                        header={
                            <FAB size="small">
                                <AddIcon />
                            </FAB>
                        }
                    >
                        <NavigationRailItem
                            value="home"
                            icon={<HomeIcon />}
                            label="Home"
                        />
                        <NavigationRailItem
                            value="search"
                            icon={<SearchIcon />}
                            label="Search"
                        />
                        <NavigationRailItem
                            value="favorites"
                            icon={<FavoriteIcon />}
                            label="Favorites"
                            badge={3}
                        />
                        <NavigationRailItem
                            value="profile"
                            icon={<ProfileIcon />}
                            label="Profile"
                        />
                    </NavigationRail>

                    <div className="flex-1 flex items-center justify-center ml-4">
                        <div className="text-center">
                            <h4 className="font-medium">Área de Conteúdo Principal</h4>
                            <p className="text-sm text-on-surface-variant">
                                Item ativo: {activeItem}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:hidden p-4">
                    <p className="text-sm text-on-surface-variant text-center py-8">
                        Navigation Rail está oculto em telas pequenas
                    </p>
                </div>
            </div>

            <div className="text-sm text-on-surface-variant space-y-1">
                <p><strong>Item ativo:</strong> {activeItem}</p>
                <p><strong>Como testar:</strong> Redimensione a janela do navegador para ver as diferentes versões</p>
            </div>
        </div>
    );
}

/**
 * Exemplo completo - combine todos os componentes
 */
export function CompleteNavigationExample() {
    return (
        <div className="space-y-12 p-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Material Design 3 - Navigation Components</h1>
                <p className="text-on-surface-variant">
                    Exemplos de implementação dos componentes de navegação do MD3
                </p>
            </div>

            <NavigationBarExample />

            <div className="border-t border-outline-variant pt-8">
                <NavigationRailExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <NavigationDrawerExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <ResponsiveNavigationExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">💡 Recomendações</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Use <strong>Navigation Bar</strong> para navegação móvel (3-5 itens)</li>
                        <li>• Use <strong>Navigation Rail</strong> para navegação desktop</li>
                        <li>• Evite <strong>Navigation Drawer</strong> (deprecated no MD3)</li>
                        <li>• Combine ambos para uma experiência responsiva ideal</li>
                        <li>• Navigation Rail expanded substitui o Navigation Drawer</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CompleteNavigationExample;
