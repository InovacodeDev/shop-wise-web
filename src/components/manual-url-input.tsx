import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faSpinner } from '@fortawesome/free-solid-svg-icons';
import type { ManualUrlInputProps } from '@/types/webcrawler';
import { useLingui } from '@lingui/react/macro';

export function ManualUrlInput({ onSubmit, isLoading = false, className = '' }: ManualUrlInputProps) {
    const { t } = useLingui();
    const [url, setUrl] = useState('');
    const [error, setError] = useState<string>('');

    const validateUrl = (url: string): boolean => {
        try {
            const urlObj = new URL(url);

            // Check if it looks like an NFCe URL
            const isNfceUrl =
                url.includes('nfce.') ||
                url.includes('nfce/') ||
                url.includes('fazenda.') ||
                url.includes('.gov.br') ||
                url.includes('nfe.');

            if (!isNfceUrl) {
                setError(t`Por favor, insira uma URL válida de NFCe`);
                return false;
            }

            setError('');
            return true;
        } catch {
            setError(t`Por favor, insira uma URL válida`);
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!url.trim()) {
            setError(t`Por favor, insira uma URL`);
            return;
        }

        if (validateUrl(url.trim())) {
            onSubmit(url.trim());
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);

        // Clear error when user starts typing
        if (error && newUrl.trim()) {
            setError('');
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="nfce-url">{t`URL da NFCe`}</Label>
                    <Input
                        id="nfce-url"
                        type="url"
                        placeholder={t`https://nfce.fazenda...`}
                        value={url}
                        onChange={handleUrlChange}
                        disabled={isLoading}
                        className={error ? 'border-red-500' : ''}
                    />
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}
                    <p className="text-sm text-gray-600">
                        {t`Cole aqui a URL da NFCe que você deseja analisar`}
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !url.trim()}
                >
                    {isLoading ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 mr-2 animate-spin" />
                            {t`Analisando...`}
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faLink} className="w-4 h-4 mr-2" />
                            {t`Analisar NFCe`}
                        </>
                    )}
                </Button>
            </form>

            <div className="text-xs text-gray-500 space-y-1">
                <p className="font-medium">{t`Como obter a URL da NFCe:`}</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>{t`Acesse o QR code da sua nota fiscal`}</li>
                    <li>{t`Use um leitor de QR code para obter a URL`}</li>
                    <li>{t`Cole a URL completa no campo acima`}</li>
                </ul>
            </div>
        </div>
    );
}
