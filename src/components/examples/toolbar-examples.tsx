import React, { useState } from "react"
import {
    Toolbar,
    ToolbarItem,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarAction,
    ToolbarSpacer,
    DockedToolbar,
    FloatingToolbar,
    ControlledToolbar
} from "@/components/md3/toolbar"

// Ícones de exemplo (substituir pelos ícones reais do projeto)
const Icons = {
    Bold: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
        </svg>
    ),
    Italic: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
        </svg>
    ),
    Save: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
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
    Share: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
    ),
    Back: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
    ),
    Menu: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
    ),
    Add: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
    ),
    MoreVert: ({ className }: { className?: string }) => (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
    )
}

// Exemplo 1: Editor de Texto Básico
export const BasicEditorToolbar = () => {
    const [activeFormats, setActiveFormats] = useState<string[]>([])

    const toggleFormat = (format: string) => {
        setActiveFormats(prev =>
            prev.includes(format)
                ? prev.filter(f => f !== format)
                : [...prev, format]
        )
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Editor de Texto - Floating Toolbar</h2>

            <div className="relative">
                <div className="bg-surface-variant/30 rounded-lg p-6 min-h-[300px] mb-4">
                    <p className="text-on-surface-variant">
                        Selecione este texto para ver o toolbar de formatação...
                    </p>
                </div>

                <FloatingToolbar
                    colorScheme="standard"
                    position={{ bottom: 20 }}
                    className="left-1/2 transform -translate-x-1/2"
                >
                    <ToolbarGroup spacing="tight">
                        <ToolbarAction
                            emphasis={activeFormats.includes('bold') ? 'medium' : 'low'}
                            onClick={() => toggleFormat('bold')}
                        >
                            <Icons.Bold className="w-5 h-5" />
                        </ToolbarAction>
                        <ToolbarAction
                            emphasis={activeFormats.includes('italic') ? 'medium' : 'low'}
                            onClick={() => toggleFormat('italic')}
                        >
                            <Icons.Italic className="w-5 h-5" />
                        </ToolbarAction>
                    </ToolbarGroup>

                    <ToolbarSeparator />

                    <ToolbarAction emphasis="high">
                        <Icons.Save className="w-5 h-5" />
                    </ToolbarAction>
                </FloatingToolbar>
            </div>
        </div>
    )
}

// Exemplo 2: Toolbar Docked para Navegação
export const NavigationDockedToolbar = () => {
    const [currentTab, setCurrentTab] = useState('home')

    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'explore', label: 'Explorar' },
        { id: 'favorites', label: 'Favoritos' }
    ]

    return (
        <div className="relative min-h-screen bg-surface">
            <div className="p-8 pb-24">
                <h2 className="text-2xl font-bold mb-6">Navegação - Docked Toolbar</h2>
                <p className="text-on-surface-variant mb-4">
                    Conteúdo da página atual: {tabs.find(t => t.id === currentTab)?.label}
                </p>
                <div className="space-y-4">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="bg-surface-variant/30 rounded-lg p-4">
                            <p>Item de conteúdo {i + 1}</p>
                        </div>
                    ))}
                </div>
            </div>

            <DockedToolbar colorScheme="standard">
                <ToolbarAction emphasis="low">
                    <Icons.Back className="w-6 h-6" />
                </ToolbarAction>

                <ToolbarSpacer />

                <ToolbarGroup>
                    {tabs.map((tab) => (
                        <ToolbarAction
                            key={tab.id}
                            emphasis={currentTab === tab.id ? 'medium' : 'low'}
                            onClick={() => setCurrentTab(tab.id)}
                        >
                            <span className="text-sm font-medium">{tab.label}</span>
                        </ToolbarAction>
                    ))}
                </ToolbarGroup>

                <ToolbarSpacer />

                <ToolbarAction emphasis="low">
                    <Icons.Menu className="w-6 h-6" />
                </ToolbarAction>
            </DockedToolbar>
        </div>
    )
}

// Exemplo 3: Toolbar Vertical para Telas Grandes
export const VerticalFloatingToolbar = () => {
    const [selectedTool, setSelectedTool] = useState('edit')

    const tools = [
        { id: 'edit', icon: Icons.Edit, label: 'Editar' },
        { id: 'delete', icon: Icons.Delete, label: 'Excluir' },
        { id: 'share', icon: Icons.Share, label: 'Compartilhar' },
        { id: 'save', icon: Icons.Save, label: 'Salvar' }
    ]

    return (
        <div className="min-h-screen bg-surface p-8 relative">
            <h2 className="text-2xl font-bold mb-6">Toolbar Vertical - Telas Grandes</h2>

            <div className="max-w-4xl">
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="bg-surface-variant/30 rounded-lg p-6 aspect-square flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                        </div>
                    ))}
                </div>
            </div>

            <FloatingToolbar
                orientation="vertical"
                colorScheme="vibrant"
                position={{ right: 24 }}
                className="fixed top-1/2 transform -translate-y-1/2"
            >
                <ToolbarGroup spacing="tight">
                    {tools.map((tool) => {
                        const IconComponent = tool.icon
                        return (
                            <ToolbarAction
                                key={tool.id}
                                emphasis={selectedTool === tool.id ? 'high' : 'low'}
                                onClick={() => setSelectedTool(tool.id)}
                                title={tool.label}
                            >
                                <IconComponent className="w-5 h-5" />
                            </ToolbarAction>
                        )
                    })}
                </ToolbarGroup>
            </FloatingToolbar>
        </div>
    )
}

// Exemplo 4: Toolbar Controlado com Overflow
export const ControlledToolbarExample = () => {
    const [maxActions, setMaxActions] = useState(4)

    const allActions = [
        {
            id: 'edit',
            icon: <Icons.Edit className="w-5 h-5" />,
            label: 'Editar',
            emphasis: 'medium' as const
        },
        {
            id: 'delete',
            icon: <Icons.Delete className="w-5 h-5" />,
            label: 'Excluir',
            emphasis: 'low' as const
        },
        {
            id: 'share',
            icon: <Icons.Share className="w-5 h-5" />,
            label: 'Compartilhar',
            emphasis: 'low' as const
        },
        {
            id: 'save',
            icon: <Icons.Save className="w-5 h-5" />,
            label: 'Salvar',
            emphasis: 'high' as const
        },
        {
            id: 'add',
            icon: <Icons.Add className="w-5 h-5" />,
            label: 'Adicionar',
            emphasis: 'low' as const
        },
        {
            id: 'back',
            icon: <Icons.Back className="w-5 h-5" />,
            label: 'Voltar',
            emphasis: 'low' as const
        }
    ]

    const handleActionClick = (actionId: string) => {
        console.log('Action clicked:', actionId)
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Toolbar Controlado com Overflow</h2>

            <div className="mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Máximo de ações visíveis: {maxActions}
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="6"
                        value={maxActions}
                        onChange={(e) => setMaxActions(Number(e.target.value))}
                        className="w-48"
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <ControlledToolbar
                    variant="floating"
                    colorScheme="standard"
                    actions={allActions}
                    onActionClick={handleActionClick}
                    maxVisibleActions={maxActions}
                    overflowIcon={<Icons.MoreVert className="w-5 h-5" />}
                />
            </div>
        </div>
    )
}

// Exemplo 5: Múltiplos Toolbars com Diferentes Ênfases
export const MultipleToolbarsExample = () => {
    return (
        <div className="min-h-screen bg-surface p-8 relative">
            <h2 className="text-2xl font-bold mb-6">Múltiplos Toolbars - Design Adaptativo</h2>

            <div className="max-w-6xl mx-auto">
                <div className="bg-surface-variant/20 rounded-xl p-8 min-h-[400px]">
                    <h3 className="text-xl font-semibold mb-4">Área de Trabalho</h3>
                    <p className="text-on-surface-variant">
                        Conteúdo principal da aplicação...
                    </p>
                </div>
            </div>

            {/* Toolbar de Ações Primárias - Esquerda */}
            <FloatingToolbar
                orientation="vertical"
                colorScheme="vibrant"
                position={{ left: 24 }}
                className="fixed top-1/2 transform -translate-y-1/2"
            >
                <ToolbarGroup spacing="normal">
                    <ToolbarAction emphasis="high">
                        <Icons.Add className="w-5 h-5" />
                    </ToolbarAction>
                    <ToolbarAction emphasis="medium">
                        <Icons.Edit className="w-5 h-5" />
                    </ToolbarAction>
                </ToolbarGroup>
            </FloatingToolbar>

            {/* Toolbar de Ações Secundárias - Direita */}
            <FloatingToolbar
                orientation="vertical"
                colorScheme="standard"
                position={{ right: 24 }}
                className="fixed top-1/2 transform -translate-y-1/2"
            >
                <ToolbarGroup spacing="tight">
                    <ToolbarAction emphasis="low">
                        <Icons.Save className="w-5 h-5" />
                    </ToolbarAction>
                    <ToolbarAction emphasis="low">
                        <Icons.Share className="w-5 h-5" />
                    </ToolbarAction>
                    <ToolbarAction emphasis="low">
                        <Icons.Delete className="w-5 h-5" />
                    </ToolbarAction>
                </ToolbarGroup>
            </FloatingToolbar>

            {/* Toolbar Horizontal Inferior */}
            <FloatingToolbar
                colorScheme="standard"
                position={{ bottom: 24 }}
                className="fixed left-1/2 transform -translate-x-1/2"
            >
                <ToolbarGroup spacing="normal">
                    <ToolbarAction emphasis="low">
                        <Icons.Back className="w-5 h-5" />
                    </ToolbarAction>
                    <ToolbarSeparator />
                    <ToolbarAction emphasis="medium">
                        <span className="text-sm font-medium px-2">Desfazer</span>
                    </ToolbarAction>
                    <ToolbarAction emphasis="medium">
                        <span className="text-sm font-medium px-2">Refazer</span>
                    </ToolbarAction>
                </ToolbarGroup>
            </FloatingToolbar>
        </div>
    )
}

// Exemplo 6: Toolbar com Estados Diferentes
export const ToolbarStatesExample = () => {
    const [mode, setMode] = useState<'view' | 'edit' | 'selection'>('view')
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const getToolbarForMode = () => {
        switch (mode) {
            case 'view':
                return (
                    <FloatingToolbar colorScheme="standard">
                        <ToolbarAction
                            emphasis="medium"
                            onClick={() => setMode('edit')}
                        >
                            <Icons.Edit className="w-5 h-5" />
                            <span className="ml-2 text-sm">Editar</span>
                        </ToolbarAction>
                    </FloatingToolbar>
                )

            case 'edit':
                return (
                    <FloatingToolbar colorScheme="vibrant">
                        <ToolbarAction
                            emphasis="low"
                            onClick={() => setMode('view')}
                        >
                            <Icons.Back className="w-5 h-5" />
                        </ToolbarAction>

                        <ToolbarSpacer />

                        <ToolbarGroup>
                            <ToolbarAction emphasis="medium">
                                <Icons.Bold className="w-5 h-5" />
                            </ToolbarAction>
                            <ToolbarAction emphasis="medium">
                                <Icons.Italic className="w-5 h-5" />
                            </ToolbarAction>
                        </ToolbarGroup>

                        <ToolbarSpacer />

                        <ToolbarAction emphasis="high">
                            <Icons.Save className="w-5 h-5" />
                        </ToolbarAction>
                    </FloatingToolbar>
                )

            case 'selection':
                return (
                    <FloatingToolbar colorScheme="vibrant">
                        <ToolbarAction
                            emphasis="low"
                            onClick={() => {
                                setMode('view')
                                setSelectedItems([])
                            }}
                        >
                            <Icons.Back className="w-5 h-5" />
                        </ToolbarAction>

                        <ToolbarSpacer />

                        <span className="text-sm font-medium px-2">
                            {selectedItems.length} selecionados
                        </span>

                        <ToolbarSpacer />

                        <ToolbarGroup>
                            <ToolbarAction emphasis="medium">
                                <Icons.Share className="w-5 h-5" />
                            </ToolbarAction>
                            <ToolbarAction emphasis="low">
                                <Icons.Delete className="w-5 h-5" />
                            </ToolbarAction>
                        </ToolbarGroup>
                    </FloatingToolbar>
                )
        }
    }

    return (
        <div className="p-8 bg-surface min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Toolbar com Estados Diferentes</h2>

            <div className="mb-6 space-x-4">
                <button
                    onClick={() => setMode('view')}
                    className={`px-4 py-2 rounded-lg ${mode === 'view' ? 'bg-primary text-on-primary' : 'bg-surface-variant'
                        }`}
                >
                    Modo Visualização
                </button>
                <button
                    onClick={() => setMode('edit')}
                    className={`px-4 py-2 rounded-lg ${mode === 'edit' ? 'bg-primary text-on-primary' : 'bg-surface-variant'
                        }`}
                >
                    Modo Edição
                </button>
                <button
                    onClick={() => setMode('selection')}
                    className={`px-4 py-2 rounded-lg ${mode === 'selection' ? 'bg-primary text-on-primary' : 'bg-surface-variant'
                        }`}
                >
                    Modo Seleção
                </button>
            </div>

            <div className="relative">
                <div className="bg-surface-variant/20 rounded-lg p-6 min-h-[300px] mb-20">
                    <p className="text-on-surface-variant mb-4">
                        Modo atual: <strong>{mode}</strong>
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 6 }, (_, i) => (
                            <div
                                key={i}
                                className={`bg-surface-variant/50 rounded p-4 cursor-pointer transition-colors ${selectedItems.includes(`item-${i}`) ? 'bg-primary/20' : ''
                                    }`}
                                onClick={() => {
                                    if (mode === 'selection') {
                                        setSelectedItems(prev =>
                                            prev.includes(`item-${i}`)
                                                ? prev.filter(id => id !== `item-${i}`)
                                                : [...prev, `item-${i}`]
                                        )
                                    }
                                }}
                            >
                                Item {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
                    {getToolbarForMode()}
                </div>
            </div>
        </div>
    )
}

// Componente principal com todos os exemplos
const ToolbarExamples = () => {
    const [currentExample, setCurrentExample] = useState('basic')

    const examples = [
        { id: 'basic', title: 'Editor Básico', component: BasicEditorToolbar },
        { id: 'navigation', title: 'Navegação Docked', component: NavigationDockedToolbar },
        { id: 'vertical', title: 'Toolbar Vertical', component: VerticalFloatingToolbar },
        { id: 'controlled', title: 'Controlado', component: ControlledToolbarExample },
        { id: 'multiple', title: 'Múltiplos Toolbars', component: MultipleToolbarsExample },
        { id: 'states', title: 'Estados Diferentes', component: ToolbarStatesExample }
    ]

    const CurrentComponent = examples.find(ex => ex.id === currentExample)?.component || BasicEditorToolbar

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-surface p-4">
                <h1 className="text-2xl font-bold mb-4">Exemplos - Material Design 3 Toolbar</h1>
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

export default ToolbarExamples
