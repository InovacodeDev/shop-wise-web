import React from 'react';
import { cn } from '@/lib/utils';
import { useLingui } from '@lingui/react/macro';

interface LoadingProps {
    text?: string;
    description?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    layout?: 'horizontal' | 'vertical';
}

export function Loading({
    text,
    description,
    className = '',
    size = 'md',
    layout = 'horizontal'
}: LoadingProps) {
    const { t } = useLingui();
    const defaultText = text || t`Loading...`;
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    const paddingClasses = {
        sm: 'p-4',
        md: 'p-8',
        lg: 'p-12'
    };

    if (layout === 'vertical') {
        return (
            <div className={cn(`flex flex-col items-center justify-center space-y-4 ${paddingClasses[size]}`, className)}>
                <div className={cn("animate-spin rounded-full border-b-2 border-primary", sizeClasses[size])}></div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold">{defaultText}</h3>
                    {description && (
                        <p className="text-muted-foreground text-center mt-2">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn(`flex items-center justify-center ${paddingClasses[size]}`, className)}>
            <div className={cn("animate-spin rounded-full border-b-2 border-primary", sizeClasses[size])}></div>
            <span className="ml-2">{defaultText}</span>
        </div>
    );
}
