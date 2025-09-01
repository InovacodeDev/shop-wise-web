import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faLock } from '@fortawesome/free-solid-svg-icons';
import { FeatureCode } from '../../types/api';
import { usePremiumFeature } from '../../hooks/useSubscription';

interface PremiumFeatureGuardProps {
    feature: FeatureCode;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    showUpgrade?: boolean;
    onUpgradePress?: () => void;
}

const FEATURE_NAMES: Record<FeatureCode, string> = {
    basic_finances: 'Controle Básico de Finanças',
    advanced_finances: 'Finanças Avançadas',
    investments: 'Portfólio de Investimentos',
    gamification: 'Sistema de Conquistas',
    education: 'Educação Financeira',
    offline_sync: 'Sincronização Offline',
    bank_integration: 'Integração Bancária',
    advanced_reports: 'Relatórios Avançados',
    unlimited_storage: 'Armazenamento Ilimitado',
    priority_support: 'Suporte Prioritário',
};

const PremiumFeatureGuard: React.FC<PremiumFeatureGuardProps> = ({
    feature,
    children,
    fallback,
    showUpgrade = true,
    onUpgradePress,
}) => {
    const { hasAccess, canUpgrade, plans } = usePremiumFeature(feature);

    if (hasAccess) {
        return <>{children}</>;
    }

    if (fallback) {
        return <>{fallback}</>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-[300px]">
            <div className="mb-4 p-4 bg-gray-100 rounded-full">
                <FontAwesomeIcon icon={faLock} className="h-12 w-12 text-gray-500" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Recurso Premium
            </h3>

            <p className="text-gray-600 text-center mb-6 max-w-md">
                {FEATURE_NAMES[feature]} está disponível apenas para usuários premium.
            </p>

            {showUpgrade && canUpgrade && (
                <div className="text-center">
                    <button
                        onClick={onUpgradePress}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <FontAwesomeIcon icon={faCrown} className="h-5 w-5" />
                        Fazer Upgrade
                    </button>

                    <p className="text-sm text-gray-500 mt-2">
                        Planos a partir de R$ {Math.min(...plans.map(p => p.price)).toFixed(2)}/mês
                    </p>
                </div>
            )}

            <p className="text-sm text-gray-400 text-center mt-4 max-w-sm">
                Faça upgrade para acessar este e muitos outros recursos avançados.
            </p>
        </div>
    );
};

export default PremiumFeatureGuard;
