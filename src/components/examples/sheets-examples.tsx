import React, { useState } from "react"
import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetBody,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    BottomSheet,
    SideSheet
} from "@/components/ui/sheet"// Ícones de exemplo (substituir pelos ícones reais do projeto)
const Icons = {
    Share: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
    ),
    Edit: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
    ),
    Delete: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    ),
    Settings: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
        </svg>
    ),
    Filter: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </svg>
    ),
    Info: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z" />
        </svg>
    ),
    Menu: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    ),
    Download: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
    ),
    Copy: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
    ),
    Close: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    )
}

const ActionItem = ({
    icon,
    children,
    destructive = false,
    onClick
}: {
    icon: React.ReactNode
    children: React.ReactNode
    destructive?: boolean
    onClick?: () => void
}) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 w-full px-6 py-4 text-left transition-colors hover:bg-surface-variant/50 active:bg-surface-variant ${destructive ? 'text-error hover:bg-error/10' : 'text-on-surface'
            }`}
    >
        <div className="w-6 h-6 flex items-center justify-center">
            {icon}
        </div>
        <span className="font-medium">{children}</span>
    </button>
)// Exemplo 1: Action Sheet (Bottom Sheet com ações contextuais)
export const ActionSheetExample = () => {
    const [selectedItem, setSelectedItem] = useState("Documento importante.pdf")

    const handleAction = (action: string) => {
        console.log(`Ação: ${action} no item: ${selectedItem}`)
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Action Sheet - Bottom Sheet</h2>

            <div className="max-w-md">
                <div className="bg-surface-variant/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            📄
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium">{selectedItem}</h3>
                            <p className="text-sm text-on-surface-variant">256 KB • Hoje</p>
                        </div>

                        <Sheet>
                            <SheetTrigger className="p-2 hover:bg-surface-variant/50 rounded-full">
                                <Icons.Menu className="w-5 h-5" />
                            </SheetTrigger>

                            <BottomSheet size="compact" dragEnabled>
                                <SheetHeader>
                                    <SheetTitle>{selectedItem}</SheetTitle>
                                    <SheetDescription>Escolha uma ação para continuar</SheetDescription>
                                </SheetHeader>

                                <SheetBody className="p-0">
                                    <div className="space-y-0">
                                        <ActionItem
                                            icon={<Icons.Share className="w-5 h-5" />}
                                            onClick={() => handleAction('compartilhar')}
                                        >
                                            Compartilhar
                                        </ActionItem>
                                        <ActionItem
                                            icon={<Icons.Download className="w-5 h-5" />}
                                            onClick={() => handleAction('download')}
                                        >
                                            Baixar
                                        </ActionItem>
                                        <ActionItem
                                            icon={<Icons.Copy className="w-5 h-5" />}
                                            onClick={() => handleAction('copiar')}
                                        >
                                            Copiar link
                                        </ActionItem>
                                        <ActionItem
                                            icon={<Icons.Edit className="w-5 h-5" />}
                                            onClick={() => handleAction('renomear')}
                                        >
                                            Renomear
                                        </ActionItem>
                                        <ActionItem
                                            icon={<Icons.Delete className="w-5 h-5" />}
                                            onClick={() => handleAction('excluir')}
                                            destructive
                                        >
                                            Excluir
                                        </ActionItem>
                                    </div>
                                </SheetBody>
                            </BottomSheet>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Exemplo 2: Filtros Avançados (Side Sheet)
export const FilterSideSheetExample = () => {
    const [filters, setFilters] = useState({
        category: "",
        priceRange: [0, 1000],
        brand: "",
        rating: 0,
        inStock: false
    })

    const [results, setResults] = useState(24)

    const categories = [
        "Eletrônicos",
        "Roupas",
        "Casa e Jardim",
        "Esportes",
        "Livros"
    ]

    const brands = [
        "Samsung",
        "Apple",
        "Nike",
        "Adidas",
        "Sony"
    ]

    const applyFilters = () => {
        // Simular aplicação de filtros
        setResults(Math.floor(Math.random() * 50) + 1)
    }

    const clearFilters = () => {
        setFilters({
            category: "",
            priceRange: [0, 1000],
            brand: "",
            rating: 0,
            inStock: false
        })
        setResults(24)
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Filtros Avançados - Side Sheet</h2>

            <div className="flex items-center justify-between mb-6">
                <p className="text-on-surface-variant">{results} produtos encontrados</p>

                <Sheet>
                    <SheetTrigger className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-full">
                        <Icons.Filter className="w-4 h-4" />
                        Filtros
                    </SheetTrigger>

                    <SideSheet side="right" size="default">
                        <SheetHeader>
                            <SheetTitle>Filtrar produtos</SheetTitle>
                            <SheetDescription>Refine sua busca com os filtros abaixo</SheetDescription>
                        </SheetHeader>

                        <SheetBody>
                            <div className="space-y-6">
                                {/* Categoria */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Categoria</label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                    >
                                        <option value="">Todas as categorias</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Faixa de Preço */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters({
                                            ...filters,
                                            priceRange: [filters.priceRange[0], Number(e.target.value)]
                                        })}
                                        className="w-full"
                                    />
                                </div>

                                {/* Marca */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Marca</label>
                                    <select
                                        value={filters.brand}
                                        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                        className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                    >
                                        <option value="">Todas as marcas</option>
                                        {brands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Avaliação */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Avaliação mínima</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => setFilters({ ...filters, rating: star })}
                                                className={`w-8 h-8 ${star <= filters.rating ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                            >
                                                ⭐
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Em estoque */}
                                <div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filters.inStock}
                                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                                            className="rounded"
                                        />
                                        <span className="text-sm">Apenas produtos em estoque</span>
                                    </label>
                                </div>
                            </div>
                        </SheetBody>

                        <SheetFooter>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 border border-outline rounded-lg hover:bg-surface-variant/50"
                            >
                                Limpar
                            </button>
                            <SheetClose className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90">
                                <button onClick={applyFilters}>
                                    Aplicar filtros
                                </button>
                            </SheetClose>
                        </SheetFooter>
                    </SideSheet>
                </Sheet>
            </div>

            {/* Grid de produtos simulado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: Math.min(results, 9) }, (_, i) => (
                    <div key={i} className="bg-surface-variant/20 rounded-lg p-4">
                        <div className="w-full h-32 bg-surface-variant/50 rounded mb-3"></div>
                        <h3 className="font-medium">Produto {i + 1}</h3>
                        <p className="text-sm text-on-surface-variant">R$ {(Math.random() * 500 + 50).toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Exemplo 3: Painel de Detalhes (Side Sheet Expandido)
export const DetailsPanelExample = () => {
    const products = [
        {
            id: 1,
            name: "Smartphone Galaxy X",
            price: "R$ 2.999,00",
            image: "📱",
            description: "Smartphone de última geração com câmera tripla e tela AMOLED de 6.7 polegadas.",
            specs: {
                "Processador": "Snapdragon 8 Gen 2",
                "Memória": "12GB RAM",
                "Armazenamento": "256GB",
                "Bateria": "5000mAh",
                "Tela": "6.7\" AMOLED 120Hz",
                "Câmera": "108MP + 12MP + 8MP"
            },
            reviews: 4.5,
            inStock: true
        },
        {
            id: 2,
            name: "Notebook ProBook",
            price: "R$ 4.599,00",
            image: "💻",
            description: "Notebook profissional para trabalho e jogos com placa de vídeo dedicada.",
            specs: {
                "Processador": "Intel Core i7-12700H",
                "Memória": "16GB DDR4",
                "Armazenamento": "512GB SSD",
                "Placa de Vídeo": "RTX 3060 6GB",
                "Tela": "15.6\" Full HD 144Hz",
                "Sistema": "Windows 11 Pro"
            },
            reviews: 4.8,
            inStock: false
        }
    ]

    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Painel de Detalhes - Side Sheet Expandido</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {products.map(product => (
                    <div key={product.id} className="bg-surface-variant/20 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-surface-variant/50 rounded-lg flex items-center justify-center text-2xl">
                                {product.image}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-primary text-xl font-bold">{product.price}</p>
                                <p className="text-sm text-on-surface-variant mt-1">
                                    ⭐ {product.reviews} • {product.inStock ? 'Em estoque' : 'Indisponível'}
                                </p>

                                <Sheet>
                                    <SheetTrigger
                                        className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        Ver detalhes
                                    </SheetTrigger>

                                    <SideSheet side="right" size="expanded">
                                        <SheetHeader>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-surface-variant/50 rounded-lg flex items-center justify-center text-xl">
                                                    {product.image}
                                                </div>
                                                <div className="flex-1">
                                                    <SheetTitle>{product.name}</SheetTitle>
                                                    <SheetDescription>{product.price} • ⭐ {product.reviews}</SheetDescription>
                                                </div>
                                            </div>
                                        </SheetHeader>

                                        <SheetBody>
                                            <div className="space-y-6">
                                                {/* Status */}
                                                <div>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.inStock
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.inStock ? '✓ Em estoque' : '✗ Indisponível'}
                                                    </span>
                                                </div>

                                                {/* Descrição */}
                                                <div>
                                                    <h4 className="font-semibold mb-2">Descrição</h4>
                                                    <p className="text-on-surface-variant">{product.description}</p>
                                                </div>

                                                {/* Especificações */}
                                                <div>
                                                    <h4 className="font-semibold mb-3">Especificações técnicas</h4>
                                                    <div className="space-y-3">
                                                        {Object.entries(product.specs).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between py-2 border-b border-outline-variant/50">
                                                                <span className="text-on-surface-variant">{key}</span>
                                                                <span className="font-medium">{value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Avaliações */}
                                                <div>
                                                    <h4 className="font-semibold mb-3">Avaliações</h4>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-2xl font-bold">{product.reviews}</span>
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map(star => (
                                                                <span key={star} className={`text-lg ${star <= Math.floor(product.reviews) ? 'text-yellow-400' : 'text-gray-300'
                                                                    }`}>
                                                                    ⭐
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-on-surface-variant">(127 avaliações)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SheetBody>

                                        <SheetFooter>
                                            <button
                                                disabled={!product.inStock}
                                                className={`flex-1 py-3 rounded-lg font-medium ${product.inStock
                                                    ? 'bg-primary text-on-primary hover:bg-primary/90'
                                                    : 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                                                    }`}
                                            >
                                                {product.inStock ? 'Adicionar ao carrinho' : 'Produto indisponível'}
                                            </button>
                                        </SheetFooter>
                                    </SideSheet>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Exemplo 4: Formulário Multi-step (Bottom Sheet)
export const MultiStepFormExample = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        preferences: {
            notifications: false,
            newsletter: false,
            marketing: false
        }
    })

    const totalSteps = 3

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = () => {
        console.log('Formulário enviado:', formData)
        alert('Conta criada com sucesso!')
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome completo</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                placeholder="Digite seu nome completo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Telefone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                placeholder="(11) 99999-9999"
                            />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Endereço completo</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                rows={4}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                                placeholder="Rua, número, bairro, cidade, CEP"
                            />
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-4">
                        <h4 className="font-medium">Preferências de comunicação</h4>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.preferences.notifications}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        preferences: { ...formData.preferences, notifications: e.target.checked }
                                    })}
                                    className="rounded"
                                />
                                <span>Receber notificações push</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.preferences.newsletter}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        preferences: { ...formData.preferences, newsletter: e.target.checked }
                                    })}
                                    className="rounded"
                                />
                                <span>Receber newsletter semanal</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.preferences.marketing}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        preferences: { ...formData.preferences, marketing: e.target.checked }
                                    })}
                                    className="rounded"
                                />
                                <span>Receber ofertas e promoções</span>
                            </label>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.name && formData.email && formData.phone
            case 2:
                return formData.address
            case 3:
                return true
            default:
                return false
        }
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Formulário Multi-step - Bottom Sheet</h2>

            <div className="flex justify-center">
                <Sheet>
                    <SheetTrigger className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90">
                        Criar conta
                    </SheetTrigger>

                    <BottomSheet size="expanded" dragEnabled={false}>
                        <SheetHeader>
                            <SheetTitle>Criar nova conta</SheetTitle>
                            <SheetDescription>
                                Passo {currentStep} de {totalSteps}
                            </SheetDescription>

                            {/* Progress indicator */}
                            <div className="flex gap-2 mt-4">
                                {Array.from({ length: totalSteps }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 h-2 rounded-full ${i + 1 <= currentStep ? 'bg-primary' : 'bg-surface-variant'
                                            }`}
                                    />
                                ))}
                            </div>
                        </SheetHeader>

                        <SheetBody>
                            {renderStepContent()}
                        </SheetBody>

                        <SheetFooter>
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-4 py-2 rounded-lg border ${currentStep === 1
                                    ? 'border-surface-variant text-on-surface-variant cursor-not-allowed'
                                    : 'border-outline hover:bg-surface-variant/50'
                                    }`}
                            >
                                Anterior
                            </button>

                            {currentStep === totalSteps ? (
                                <SheetClose className="flex-1">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!isStepValid()}
                                        className={`w-full py-2 rounded-lg font-medium ${isStepValid()
                                            ? 'bg-primary text-on-primary hover:bg-primary/90'
                                            : 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                                            }`}
                                    >
                                        Criar conta
                                    </button>
                                </SheetClose>
                            ) : (
                                <button
                                    onClick={nextStep}
                                    disabled={!isStepValid()}
                                    className={`flex-1 py-2 rounded-lg font-medium ${isStepValid()
                                        ? 'bg-primary text-on-primary hover:bg-primary/90'
                                        : 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                                        }`}
                                >
                                    Próximo
                                </button>
                            )}
                        </SheetFooter>
                    </BottomSheet>
                </Sheet>
            </div>
        </div>
    )
}

// Exemplo 5: Configurações Avançadas (Side Sheet com Navegação)
export const AdvancedSettingsExample = () => {
    const [selectedSection, setSelectedSection] = useState('account')
    const [settings, setSettings] = useState({
        account: {
            name: "João Silva",
            email: "joao@exemplo.com",
            phone: "(11) 99999-9999"
        },
        privacy: {
            profileVisible: true,
            showEmail: false,
            allowMessages: true
        },
        notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: false
        }
    })

    const sections = [
        { id: 'account', label: 'Conta', icon: '👤' },
        { id: 'privacy', label: 'Privacidade', icon: '🔒' },
        { id: 'notifications', label: 'Notificações', icon: '🔔' }
    ]

    const renderSectionContent = () => {
        switch (selectedSection) {
            case 'account':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome</label>
                            <input
                                type="text"
                                value={settings.account.name}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    account: { ...settings.account, name: e.target.value }
                                })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <input
                                type="email"
                                value={settings.account.email}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    account: { ...settings.account, email: e.target.value }
                                })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Telefone</label>
                            <input
                                type="tel"
                                value={settings.account.phone}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    account: { ...settings.account, phone: e.target.value }
                                })}
                                className="w-full p-3 border border-outline-variant rounded-lg bg-surface"
                            />
                        </div>
                    </div>
                )

            case 'privacy':
                return (
                    <div className="space-y-4">
                        {Object.entries(settings.privacy).map(([key, value]) => (
                            <label key={key} className="flex items-center justify-between cursor-pointer">
                                <span className="font-medium">
                                    {key === 'profileVisible' && 'Perfil público'}
                                    {key === 'showEmail' && 'Mostrar e-mail'}
                                    {key === 'allowMessages' && 'Permitir mensagens'}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        privacy: { ...settings.privacy, [key]: e.target.checked }
                                    })}
                                    className="rounded"
                                />
                            </label>
                        ))}
                    </div>
                )

            case 'notifications':
                return (
                    <div className="space-y-4">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                            <label key={key} className="flex items-center justify-between cursor-pointer">
                                <span className="font-medium">
                                    {key === 'email' && 'Notificações por e-mail'}
                                    {key === 'push' && 'Notificações push'}
                                    {key === 'sms' && 'Notificações por SMS'}
                                    {key === 'marketing' && 'E-mails promocionais'}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        notifications: { ...settings.notifications, [key]: e.target.checked }
                                    })}
                                    className="rounded"
                                />
                            </label>
                        ))}
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Configurações Avançadas - Side Sheet com Navegação</h2>

            <div className="flex justify-center">
                <Sheet>
                    <SheetTrigger className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90">
                        <Icons.Settings className="w-5 h-5" />
                        Configurações
                    </SheetTrigger>

                    <SideSheet side="right" size="expanded">
                        <SheetHeader>
                            <SheetTitle>Configurações</SheetTitle>
                            <SheetDescription>Gerencie suas preferências e dados</SheetDescription>
                        </SheetHeader>

                        <SheetBody className="p-0">
                            <div className="flex h-full">
                                {/* Navigation Sidebar */}
                                <div className="w-48 border-r border-outline-variant bg-surface-variant/20">
                                    <nav className="p-4 space-y-1">
                                        {sections.map(section => (
                                            <button
                                                key={section.id}
                                                onClick={() => setSelectedSection(section.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedSection === section.id
                                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                                    : 'hover:bg-surface-variant/50'
                                                    }`}
                                            >
                                                <span className="text-lg">{section.icon}</span>
                                                <span className="font-medium">{section.label}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        {sections.find(s => s.id === selectedSection)?.label}
                                    </h3>
                                    {renderSectionContent()}
                                </div>
                            </div>
                        </SheetBody>

                        <SheetFooter>
                            <button className="px-4 py-2 border border-outline rounded-lg hover:bg-surface-variant/50">
                                Cancelar
                            </button>
                            <SheetClose className="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90">
                                Salvar alterações
                            </SheetClose>
                        </SheetFooter>
                    </SideSheet>
                </Sheet>
            </div>
        </div>
    )
}

// Componente principal com todos os exemplos
const SheetsExamples = () => {
    const [currentExample, setCurrentExample] = useState('action-sheet')

    const examples = [
        { id: 'action-sheet', title: 'Action Sheet', component: ActionSheetExample },
        { id: 'filter-sheet', title: 'Filtros', component: FilterSideSheetExample },
        { id: 'details-panel', title: 'Painel Detalhes', component: DetailsPanelExample },
        { id: 'multi-step', title: 'Multi-step Form', component: MultiStepFormExample },
        { id: 'settings', title: 'Configurações', component: AdvancedSettingsExample }
    ]

    const CurrentComponent = examples.find(ex => ex.id === currentExample)?.component || ActionSheetExample

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-surface p-4">
                <h1 className="text-2xl font-bold mb-4">Exemplos - Material Design 3 Sheets</h1>
                <div className="flex flex-wrap gap-2">
                    {examples.map((example) => (
                        <button
                            key={example.id}
                            onClick={() => setCurrentExample(example.id)}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentExample === example.id
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-variant hover:bg-primary/10'
                                }`}
                        >
                            {example.title}
                        </button>
                    ))}
                </div>
            </nav>

            <CurrentComponent />
        </div>
    )
}

export default SheetsExamples
