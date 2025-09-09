import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, ControlledTabs, SecondaryTabs } from "@/components/md3/tabs";

// Mock icons - substitua pelos seus ícones reais
const HomeIcon = ({ className = "" }: { className?: string }) => <div className={`w-full h-full bg-current rounded ${className}`} style={{ mask: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"/></svg>') center/contain no-repeat" }} />;
const SearchIcon = ({ className = "" }: { className?: string }) => <div className={`w-full h-full bg-current rounded-full border-2 border-current ${className}`} />;
const FavoriteIcon = ({ className = "" }: { className?: string }) => <div className={`w-full h-full bg-current ${className}`} style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }} />;
const ProfileIcon = ({ className = "" }: { className?: string }) => <div className={`w-full h-full bg-current rounded-full ${className}`} />;
const SettingsIcon = ({ className = "" }: { className?: string }) => (
    <div className={`w-full h-full bg-current rounded-full relative ${className}`}>
        <div className="absolute inset-2 border-2 border-white rounded-full" />
    </div>
);
const MailIcon = ({ className = "" }: { className?: string }) => (
    <div className={`w-full h-full bg-current relative ${className}`}>
        <div className="absolute inset-1 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 50% 60%)" }} />
    </div>
);
const ChartIcon = ({ className = "" }: { className?: string }) => (
    <div className={`w-full h-full bg-current relative ${className}`}>
        <div className="absolute bottom-0 left-1 right-1 h-2 bg-current" />
        <div className="absolute bottom-0 left-2 right-2 h-3 bg-white" />
    </div>
);
const DocumentIcon = ({ className = "" }: { className?: string }) => (
    <div className={`w-full h-full bg-current relative ${className}`}>
        <div className="absolute inset-1 bg-white" />
        <div className="absolute top-2 left-2 right-2 h-0.5 bg-current" />
        <div className="absolute top-3 left-2 right-3 h-0.5 bg-current" />
        <div className="absolute top-4 left-2 right-4 h-0.5 bg-current" />
    </div>
);

/**
 * Exemplo básico de Tabs
 */
export function BasicTabsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Basic Primary Tabs</h3>
                <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Account Settings</h4>
                        <p className="text-sm text-on-surface-variant">
                            Manage your account settings and preferences here.
                        </p>
                    </TabsContent>
                    <TabsContent value="password" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Password & Security</h4>
                        <p className="text-sm text-on-surface-variant">
                            Update your password and security settings.
                        </p>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Application Settings</h4>
                        <p className="text-sm text-on-surface-variant">
                            Configure your application preferences.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Secondary Tabs</h3>
                <SecondaryTabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Product Overview</h4>
                        <p className="text-sm text-on-surface-variant">
                            General information about the product and its main features.
                        </p>
                    </TabsContent>
                    <TabsContent value="specifications" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Technical Specifications</h4>
                        <p className="text-sm text-on-surface-variant">
                            Detailed technical specifications and requirements.
                        </p>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Customer Reviews</h4>
                        <p className="text-sm text-on-surface-variant">
                            Reviews and ratings from other customers.
                        </p>
                    </TabsContent>
                </SecondaryTabs>
            </div>
        </div>
    );
}

/**
 * Exemplo de Tabs com ícones
 */
export function IconTabsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Tabs with Icons</h3>
                <Tabs defaultValue="home" variant="primary-with-icon" className="w-full">
                    <TabsList>
                        <TabsTrigger value="home" icon={<HomeIcon />}>
                            Home
                        </TabsTrigger>
                        <TabsTrigger value="search" icon={<SearchIcon />}>
                            Search
                        </TabsTrigger>
                        <TabsTrigger value="favorites" icon={<FavoriteIcon />}>
                            Favorites
                        </TabsTrigger>
                        <TabsTrigger value="profile" icon={<ProfileIcon />}>
                            Profile
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="home" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <HomeIcon className="size-5" />
                            <h4 className="text-base font-medium">Home Dashboard</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Welcome to your home dashboard. Here you can see an overview of all your activities.
                        </p>
                    </TabsContent>
                    <TabsContent value="search" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <SearchIcon className="size-5" />
                            <h4 className="text-base font-medium">Search</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Search through your content and find what you're looking for.
                        </p>
                    </TabsContent>
                    <TabsContent value="favorites" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <FavoriteIcon className="size-5" />
                            <h4 className="text-base font-medium">Favorites</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Your favorited items and bookmarks are stored here.
                        </p>
                    </TabsContent>
                    <TabsContent value="profile" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <ProfileIcon className="size-5" />
                            <h4 className="text-base font-medium">User Profile</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Manage your profile information and personal settings.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

/**
 * Exemplo de Tabs com badges
 */
export function BadgedTabsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Tabs with Badges</h3>
                <Tabs defaultValue="inbox" className="w-full">
                    <TabsList>
                        <TabsTrigger value="inbox" badge={12}>
                            Inbox
                        </TabsTrigger>
                        <TabsTrigger value="sent">
                            Sent
                        </TabsTrigger>
                        <TabsTrigger value="drafts" badge={3}>
                            Drafts
                        </TabsTrigger>
                        <TabsTrigger value="spam" dotBadge>
                            Spam
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="inbox" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Inbox (12 messages)</h4>
                        <div className="space-y-2">
                            <div className="p-2 bg-surface-variant rounded text-sm">New message from John</div>
                            <div className="p-2 bg-surface-variant rounded text-sm">Meeting reminder</div>
                            <div className="p-2 bg-surface-variant rounded text-sm">Project update</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="sent" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Sent Messages</h4>
                        <p className="text-sm text-on-surface-variant">
                            Your sent messages will appear here.
                        </p>
                    </TabsContent>
                    <TabsContent value="drafts" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Drafts (3 unsaved)</h4>
                        <div className="space-y-2">
                            <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                                Draft: Meeting notes
                            </div>
                            <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                                Draft: Project proposal
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="spam" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Spam (has new messages)</h4>
                        <p className="text-sm text-on-surface-variant">
                            Spam messages are automatically filtered here.
                        </p>
                    </TabsContent>
                </Tabs>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Icon Tabs with Badges</h3>
                <Tabs defaultValue="messages" variant="primary-with-icon" className="w-full">
                    <TabsList>
                        <TabsTrigger value="messages" icon={<MailIcon />} badge={5}>
                            Messages
                        </TabsTrigger>
                        <TabsTrigger value="notifications" icon={<SettingsIcon />} dotBadge>
                            Alerts
                        </TabsTrigger>
                        <TabsTrigger value="reports" icon={<ChartIcon />}>
                            Reports
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="messages" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Messages (5 unread)</h4>
                        <p className="text-sm text-on-surface-variant">You have 5 unread messages.</p>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">System Alerts</h4>
                        <p className="text-sm text-on-surface-variant">New system notifications available.</p>
                    </TabsContent>
                    <TabsContent value="reports" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Analytics Reports</h4>
                        <p className="text-sm text-on-surface-variant">View your analytics and reports.</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

/**
 * Exemplo de Tabs controláveis
 */
export function ControlledTabsExample() {
    const [activeTab, setActiveTab] = React.useState("overview");
    const [secondaryTab, setSecondaryTab] = React.useState("details");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Controlled Tabs</h3>
                <div className="mb-4 text-sm text-on-surface-variant">
                    Active tab: <span className="font-medium">{activeTab}</span>
                </div>

                <ControlledTabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Overview Dashboard</h4>
                        <p className="text-sm text-on-surface-variant mb-4">
                            Current active tab: {activeTab}
                        </p>

                        <div className="mt-4">
                            <h5 className="text-sm font-medium mb-2">Secondary Navigation</h5>
                            <SecondaryTabs value={secondaryTab} onValueChange={setSecondaryTab}>
                                <TabsList>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="summary">Summary</TabsTrigger>
                                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                                </TabsList>
                                <TabsContent value="details" className="mt-2 p-3 bg-surface-variant/30 rounded">
                                    <p className="text-sm">Detailed view of your overview data.</p>
                                </TabsContent>
                                <TabsContent value="summary" className="mt-2 p-3 bg-surface-variant/30 rounded">
                                    <p className="text-sm">Summary of key metrics and information.</p>
                                </TabsContent>
                                <TabsContent value="timeline" className="mt-2 p-3 bg-surface-variant/30 rounded">
                                    <p className="text-sm">Timeline of recent activities and events.</p>
                                </TabsContent>
                            </SecondaryTabs>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Analytics Dashboard</h4>
                        <p className="text-sm text-on-surface-variant">
                            Current active tab: {activeTab}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-surface-variant/30 rounded">
                                <div className="text-sm font-medium">Page Views</div>
                                <div className="text-2xl font-bold text-primary">1,234</div>
                            </div>
                            <div className="p-3 bg-surface-variant/30 rounded">
                                <div className="text-sm font-medium">Users</div>
                                <div className="text-2xl font-bold text-primary">567</div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Application Settings</h4>
                        <p className="text-sm text-on-surface-variant">
                            Current active tab: {activeTab}
                        </p>
                        <div className="mt-4 space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Enable notifications</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm">Auto-save changes</span>
                            </label>
                        </div>
                    </TabsContent>
                </ControlledTabs>
            </div>
        </div>
    );
}

/**
 * Exemplo de Tabs scrollable
 */
export function ScrollableTabsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Scrollable Tabs</h3>
                <p className="text-sm text-on-surface-variant mb-4">
                    When there are too many tabs to fit, they become scrollable. The first tab is offset 52dp from the left edge.
                </p>

                <Tabs defaultValue="australia" type="scrollable" className="w-full">
                    <TabsList>
                        <TabsTrigger value="australia">Australia</TabsTrigger>
                        <TabsTrigger value="brazil">Brazil</TabsTrigger>
                        <TabsTrigger value="canada">Canada</TabsTrigger>
                        <TabsTrigger value="denmark">Denmark</TabsTrigger>
                        <TabsTrigger value="egypt">Egypt</TabsTrigger>
                        <TabsTrigger value="france">France</TabsTrigger>
                        <TabsTrigger value="germany">Germany</TabsTrigger>
                        <TabsTrigger value="hungary">Hungary</TabsTrigger>
                        <TabsTrigger value="india">India</TabsTrigger>
                        <TabsTrigger value="japan">Japan</TabsTrigger>
                    </TabsList>
                    <TabsContent value="australia" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Australia</h4>
                        <p className="text-sm text-on-surface-variant">Information about Australia.</p>
                    </TabsContent>
                    <TabsContent value="brazil" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Brazil</h4>
                        <p className="text-sm text-on-surface-variant">Information about Brazil.</p>
                    </TabsContent>
                    <TabsContent value="canada" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Canada</h4>
                        <p className="text-sm text-on-surface-variant">Information about Canada.</p>
                    </TabsContent>
                    <TabsContent value="denmark" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Denmark</h4>
                        <p className="text-sm text-on-surface-variant">Information about Denmark.</p>
                    </TabsContent>
                    <TabsContent value="egypt" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Egypt</h4>
                        <p className="text-sm text-on-surface-variant">Information about Egypt.</p>
                    </TabsContent>
                    <TabsContent value="france" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">France</h4>
                        <p className="text-sm text-on-surface-variant">Information about France.</p>
                    </TabsContent>
                    <TabsContent value="germany" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Germany</h4>
                        <p className="text-sm text-on-surface-variant">Information about Germany.</p>
                    </TabsContent>
                    <TabsContent value="hungary" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Hungary</h4>
                        <p className="text-sm text-on-surface-variant">Information about Hungary.</p>
                    </TabsContent>
                    <TabsContent value="india" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">India</h4>
                        <p className="text-sm text-on-surface-variant">Information about India.</p>
                    </TabsContent>
                    <TabsContent value="japan" className="mt-4 p-4 border border-outline-variant rounded-lg">
                        <h4 className="text-base font-medium mb-2">Japan</h4>
                        <p className="text-sm text-on-surface-variant">Information about Japan.</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

/**
 * Exemplo de Tabs aninhados (Primary + Secondary)
 */
export function NestedTabsExample() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Nested Tabs (Primary + Secondary)</h3>
                <p className="text-sm text-on-surface-variant mb-4">
                    Primary tabs control the main content areas, while Secondary tabs provide sub-navigation within each area.
                </p>

                <Tabs defaultValue="products" variant="primary" className="w-full">
                    <TabsList>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="support">Support</TabsTrigger>
                    </TabsList>

                    <TabsContent value="products" className="mt-4">
                        <div className="border border-outline-variant rounded-lg p-4">
                            <h4 className="text-base font-medium mb-4">Products Catalog</h4>

                            {/* Secondary Tabs within Products */}
                            <SecondaryTabs defaultValue="electronics">
                                <TabsList>
                                    <TabsTrigger value="electronics">Electronics</TabsTrigger>
                                    <TabsTrigger value="clothing">Clothing</TabsTrigger>
                                    <TabsTrigger value="books">Books</TabsTrigger>
                                    <TabsTrigger value="home">Home & Garden</TabsTrigger>
                                </TabsList>
                                <TabsContent value="electronics" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Electronics</h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>• Smartphones</div>
                                        <div>• Laptops</div>
                                        <div>• Tablets</div>
                                        <div>• Headphones</div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="clothing" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Clothing</h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>• Shirts</div>
                                        <div>• Pants</div>
                                        <div>• Dresses</div>
                                        <div>• Shoes</div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="books" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Books</h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>• Fiction</div>
                                        <div>• Non-fiction</div>
                                        <div>• Technical</div>
                                        <div>• Children's</div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="home" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Home & Garden</h5>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>• Furniture</div>
                                        <div>• Decoration</div>
                                        <div>• Garden Tools</div>
                                        <div>• Kitchen</div>
                                    </div>
                                </TabsContent>
                            </SecondaryTabs>
                        </div>
                    </TabsContent>

                    <TabsContent value="services" className="mt-4">
                        <div className="border border-outline-variant rounded-lg p-4">
                            <h4 className="text-base font-medium mb-4">Our Services</h4>

                            <SecondaryTabs defaultValue="consulting">
                                <TabsList>
                                    <TabsTrigger value="consulting">Consulting</TabsTrigger>
                                    <TabsTrigger value="development">Development</TabsTrigger>
                                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                                </TabsList>
                                <TabsContent value="consulting" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Consulting Services</h5>
                                    <p className="text-sm">Expert advice and strategic planning for your business needs.</p>
                                </TabsContent>
                                <TabsContent value="development" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Development Services</h5>
                                    <p className="text-sm">Custom software development and implementation solutions.</p>
                                </TabsContent>
                                <TabsContent value="maintenance" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Maintenance Services</h5>
                                    <p className="text-sm">Ongoing support and maintenance for your systems.</p>
                                </TabsContent>
                            </SecondaryTabs>
                        </div>
                    </TabsContent>

                    <TabsContent value="support" className="mt-4">
                        <div className="border border-outline-variant rounded-lg p-4">
                            <h4 className="text-base font-medium mb-4">Customer Support</h4>

                            <SecondaryTabs defaultValue="faq">
                                <TabsList>
                                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                                    <TabsTrigger value="contact">Contact</TabsTrigger>
                                    <TabsTrigger value="tickets">Tickets</TabsTrigger>
                                </TabsList>
                                <TabsContent value="faq" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Frequently Asked Questions</h5>
                                    <p className="text-sm">Find answers to common questions about our products and services.</p>
                                </TabsContent>
                                <TabsContent value="contact" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Contact Information</h5>
                                    <p className="text-sm">Get in touch with our support team through various channels.</p>
                                </TabsContent>
                                <TabsContent value="tickets" className="mt-4 p-3 bg-surface-variant/30 rounded">
                                    <h5 className="text-sm font-medium mb-2">Support Tickets</h5>
                                    <p className="text-sm">Track and manage your support requests and tickets.</p>
                                </TabsContent>
                            </SecondaryTabs>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

/**
 * Exemplo completo demonstrando todos os recursos
 */
export function CompleteTabsExample() {
    return (
        <div className="space-y-12 p-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Material Design 3 - Tabs Component</h1>
                <p className="text-on-surface-variant mb-8">
                    Exemplos completos do componente Tabs seguindo as especificações do MD3
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                    <h3 className="font-semibold text-amber-900 mb-2">📋 Recursos Demonstrados</h3>
                    <ul className="text-sm text-amber-800 space-y-1">
                        <li>• <strong>Primary Tabs</strong>: Navegação principal com diferentes alturas</li>
                        <li>• <strong>Secondary Tabs</strong>: Sub-navegação com indicador simplificado</li>
                        <li>• <strong>Icon Support</strong>: Tabs com ícones (altura 64dp)</li>
                        <li>• <strong>Badge System</strong>: Contadores e indicadores de ponto</li>
                        <li>• <strong>Scrollable Tabs</strong>: Para muitos items (offset 52dp)</li>
                        <li>• <strong>Controlled State</strong>: Gerenciamento de estado externo</li>
                        <li>• <strong>Nested Tabs</strong>: Combinação Primary + Secondary</li>
                    </ul>
                </div>
            </div>

            <BasicTabsExample />

            <div className="border-t border-outline-variant pt-8">
                <IconTabsExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <BadgedTabsExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <ControlledTabsExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <ScrollableTabsExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <NestedTabsExample />
            </div>

            <div className="border-t border-outline-variant pt-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">✨ Especificações Material Design 3</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                        <div>
                            <strong>Dimensões:</strong>
                            <ul className="mt-1 space-y-0.5">
                                <li>• Altura (texto): 48dp</li>
                                <li>• Altura (ícone + texto): 64dp</li>
                                <li>• Indicador primário: 3dp altura</li>
                                <li>• Indicador secundário: 2dp altura</li>
                            </ul>
                        </div>
                        <div>
                            <strong>Comportamento:</strong>
                            <ul className="mt-1 space-y-0.5">
                                <li>• Scrollable: offset 52dp</li>
                                <li>• Ícones: 24dp tamanho</li>
                                <li>• Badge overlap: 6dp no ícone</li>
                                <li>• Indicador mínimo: 24dp largura</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompleteTabsExample;
