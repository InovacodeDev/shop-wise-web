/**
 * Exemplos de uso dos tipos financeiros implementados no projeto web
 * Este arquivo demonstra como utilizar todos os tipos disponíveis
 * para desenvolvimento de funcionalidades financeiras
 */
import type {
    Account,
    Achievement,
    BalanceProjection,
    BankAccount,
    Budget,
    CreditCard,
    EducationalContent,
    Expense,
    Goal,
    Investment,
    Plan,
    RecurringTransaction,
    Subscription,
    UserFeatures,
} from './api';

// ================================
// EXEMPLO DE USO - DESPESAS E CONTAS
// ================================

// Exemplo de despesa
export const exampleExpense: Expense = {
    _id: 'exp_123',
    userId: 'user_456',
    categoryId: 'cat_food',
    category: {
        _id: 'cat_food',
        name: 'Alimentação',
        color: '#EF4444',
        icon: 'utensils',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    amount: 150.5,
    date: '2024-01-15T14:30:00Z',
    paymentMethod: 'credit_card',
    description: 'Compras no supermercado',
    accountId: 'acc_123',
    tags: ['mercado', 'semanal'],
    isRecurring: false,
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
};

// Exemplo de conta
export const exampleAccount: Account = {
    _id: 'acc_123',
    userId: 'user_456',
    name: 'Conta Corrente Nubank',
    currentBalance: 2500.75,
    type: 'checking',
    institution: 'Nubank',
    accountNumber: '12345-6',
    isActive: true,
    color: '#8B5CF6',
    iconName: 'bank',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
};

// ================================
// EXEMPLO DE USO - INVESTIMENTOS
// ================================

export const exampleInvestment: Investment = {
    _id: 'inv_123',
    userId: 'user_456',
    name: 'Carteira de Ações Tech',
    type: 'stocks',
    asset: 'PETR4',
    quantity: 100,
    averagePrice: 25.5,
    totalInvested: 2550.0,
    currentPrice: 28.75,
    currentValue: 2875.0,
    profitability: 325.0,
    profitabilityPercent: 12.75,
    lastUpdated: '2024-01-15T16:00:00Z',
    broker: 'XP Investimentos',
    notes: 'Investimento em tecnologia para longo prazo',
    isActive: true,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z',
};

// ================================
// EXEMPLO DE USO - CARTÃO DE CRÉDITO
// ================================

export const exampleCreditCard: CreditCard = {
    _id: 'card_123',
    userId: 'user_456',
    name: 'Cartão Itaú Platinum',
    lastFourDigits: '4321',
    cardType: 'visa',
    creditLimit: 8000.0,
    currentBalance: 1250.75,
    availableLimit: 6749.25,
    dueDay: 15,
    closingDay: 10,
    isActive: true,
    color: '#DC2626',
    iconName: 'credit-card',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
};

// ================================
// EXEMPLO DE USO - ORÇAMENTOS
// ================================

export const exampleBudget: Budget = {
    _id: 'budget_123',
    userId: 'user_456',
    categoryId: 'cat_food',
    name: 'Orçamento Alimentação',
    limit: 1200.0,
    period: 'monthly',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
    isActive: true,
    color: '#EF4444',
    iconName: 'utensils',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
};

// ================================
// EXEMPLO DE USO - METAS FINANCEIRAS
// ================================

export const exampleGoal: Goal = {
    _id: 'goal_123',
    userId: 'user_456',
    name: 'Fundo de Emergência',
    targetAmount: 10000.0,
    currentAmount: 3200.0,
    targetDate: '2024-12-31T00:00:00Z',
    priority: 'high',
    categoryId: 'cat_savings',
    isActive: true,
    color: '#10B981',
    iconName: 'shield',
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
};

// ================================
// EXEMPLO DE USO - SISTEMA DE PLANOS
// ================================

export const examplePlan: Plan = {
    _id: 'plan_professional',
    name: 'Professional',
    description: 'Suite financeira completa com integração bancária',
    price: 59.9,
    currency: 'BRL',
    interval: 'monthly',
    features: [
        {
            name: 'Controle Básico de Finanças',
            description: 'Registro de despesas, contas e categorias',
            code: 'basic_finances',
            isEnabled: true,
        },
        {
            name: 'Orçamentos Avançados',
            description: 'Sistema completo de orçamentos',
            code: 'advanced_finances',
            isEnabled: true,
        },
        {
            name: 'Portfólio de Investimentos',
            description: 'Acompanhamento completo de investimentos',
            code: 'investments',
            isEnabled: true,
        },
        {
            name: 'Integração Bancária',
            description: 'Sincronização automática com bancos',
            code: 'bank_integration',
            isEnabled: true,
        },
        {
            name: 'Relatórios Avançados',
            description: 'Analytics detalhados e projeções',
            code: 'advanced_reports',
            isEnabled: true,
        },
    ],
    isActive: true,
    maxUsers: 5,
    trialDays: 14,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
};

export const exampleSubscription: Subscription = {
    _id: 'sub_123',
    userId: 'user_456',
    planId: 'plan_professional',
    status: 'active',
    startDate: '2024-01-01T00:00:00Z',
    autoRenew: true,
    paymentMethod: 'credit_card',
    lastPaymentDate: '2024-01-01T00:00:00Z',
    nextPaymentDate: '2024-02-01T00:00:00Z',
    amount: 59.9,
    currency: 'BRL',
    features: ['basic_finances', 'advanced_finances', 'investments', 'bank_integration', 'advanced_reports'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
};

export const exampleUserFeatures: UserFeatures = {
    userId: 'user_456',
    features: {
        basic_finances: true,
        advanced_finances: true,
        investments: true,
        gamification: true,
        education: true,
        offline_sync: true,
        bank_integration: true,
        advanced_reports: true,
        unlimited_storage: true,
        priority_support: true,
    },
    subscription: {
        planId: 'plan_professional',
        planName: 'Professional',
        status: 'active',
        endDate: '2024-02-01T00:00:00Z',
    },
};

// ================================
// EXEMPLO DE USO - FUNCIONALIDADES AVANÇADAS
// ================================

export const exampleRecurringTransaction: RecurringTransaction = {
    _id: 'rec_123',
    userId: 'user_456',
    name: 'Salário',
    amount: 5000.0,
    frequency: 'monthly',
    startDate: '2024-01-01T00:00:00Z',
    categoryId: 'cat_income',
    accountId: 'acc_123',
    paymentMethod: 'bank_transfer',
    description: 'Salário mensal da empresa',
    isActive: true,
    nextDueDate: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
};

export const exampleBalanceProjection: BalanceProjection = {
    userId: 'user_456',
    projectionPeriod: '1year',
    currentBalance: 15000.0,
    projectedBalance: 45000.0,
    monthlyIncome: 5000.0,
    monthlyExpenses: 3200.0,
    recurringTransactions: [exampleRecurringTransaction],
    projections: [
        {
            date: '2024-02-01T00:00:00Z',
            balance: 18000.0,
            income: 5000.0,
            expenses: 3200.0,
            description: 'Projeção para fevereiro',
        },
        {
            date: '2024-03-01T00:00:00Z',
            balance: 21000.0,
            income: 5000.0,
            expenses: 3200.0,
            description: 'Projeção para março',
        },
    ],
    alerts: [
        {
            type: 'warning',
            message: 'Considere reduzir gastos em lazer',
            projectedDate: '2024-06-01T00:00:00Z',
        },
    ],
};

export const exampleBankAccount: BankAccount = {
    _id: 'bank_123',
    userId: 'user_456',
    bankName: 'Banco do Brasil',
    accountNumber: '12345-6',
    accountType: 'checking',
    balance: 8750.5,
    lastSync: '2024-01-15T16:30:00Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
};

export const exampleAchievement: Achievement = {
    _id: 'ach_123',
    userId: 'user_456',
    name: 'Investidor Experiente',
    description: 'Realizou 10 transações de investimento',
    iconName: 'trending-up',
    category: 'investment',
    points: 150,
    unlockedAt: '2024-01-15T16:30:00Z',
    createdAt: '2024-01-15T16:30:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
};

export const exampleEducationalContent: EducationalContent = {
    _id: 'edu_123',
    title: 'Como Criar um Orçamento Pessoal Eficaz',
    content: 'Aprenda passo a passo como organizar suas finanças...',
    category: 'budgeting',
    difficulty: 'beginner',
    estimatedReadTime: 10,
    tags: ['orçamento', 'finanças pessoais', 'planejamento'],
    isPremium: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
};

// ================================
// CONSTANTES ÚTEIS PARA DESENVOLVIMENTO
// ================================

export const PAYMENT_METHODS = [
    { value: 'cash', label: 'Dinheiro' },
    { value: 'credit_card', label: 'Cartão de Crédito' },
    { value: 'debit_card', label: 'Cartão de Débito' },
    { value: 'bank_transfer', label: 'Transferência Bancária' },
    { value: 'pix', label: 'PIX' },
    { value: 'other', label: 'Outro' },
] as const;

export const INVESTMENT_TYPES = [
    { value: 'stocks', label: 'Ações' },
    { value: 'bonds', label: 'Títulos' },
    { value: 'funds', label: 'Fundos' },
    { value: 'crypto', label: 'Criptomoedas' },
    { value: 'real_estate', label: 'Imóveis' },
    { value: 'other', label: 'Outros' },
] as const;

export const BUDGET_PERIODS = [
    { value: 'daily', label: 'Diário' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' },
] as const;

export const GOAL_PRIORITIES = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
] as const;

export const SUBSCRIPTION_STATUSES = [
    { value: 'trial', label: 'Teste Gratuito' },
    { value: 'active', label: 'Ativo' },
    { value: 'canceled', label: 'Cancelado' },
    { value: 'expired', label: 'Expirado' },
    { value: 'past_due', label: 'Vencido' },
] as const;

// ================================
// TYPE GUARDS PARA VALIDAÇÃO
// ================================

export const isExpense = (obj: any): obj is Expense => {
    return obj && typeof obj === 'object' && '_id' in obj && 'userId' in obj && 'amount' in obj;
};

export const isInvestment = (obj: any): obj is Investment => {
    return obj && typeof obj === 'object' && '_id' in obj && 'type' in obj && 'asset' in obj;
};

export const isCreditCard = (obj: any): obj is CreditCard => {
    return obj && typeof obj === 'object' && '_id' in obj && 'lastFourDigits' in obj && 'creditLimit' in obj;
};

export const isSubscription = (obj: any): obj is Subscription => {
    return obj && typeof obj === 'object' && '_id' in obj && 'planId' in obj && 'status' in obj;
};

// ================================
// UTILITY FUNCTIONS
// ================================

export const formatCurrency = (amount: number, currency = 'BRL'): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(amount);
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(2).replace('.', ',')}%`;
};

export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const calculateProfitability = (
    currentValue: number,
    totalInvested: number,
): {
    amount: number;
    percentage: number;
} => {
    const amount = currentValue - totalInvested;
    const percentage = totalInvested > 0 ? (amount / totalInvested) * 100 : 0;

    return { amount, percentage };
};
