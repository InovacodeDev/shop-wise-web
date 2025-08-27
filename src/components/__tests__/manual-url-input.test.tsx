import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ManualUrlInput } from '../manual-url-input';

describe('ManualUrlInput', () => {
    it('renders the component correctly', () => {
        const mockOnSubmit = vi.fn();
        
        render(<ManualUrlInput onSubmit={mockOnSubmit} />);

        expect(screen.getByText('URL da NFCe')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('https://nfce.fazenda...')).toBeInTheDocument();
        expect(screen.getByText('Analisar NFCe')).toBeInTheDocument();
    });

    it('validates URL correctly', () => {
        const mockOnSubmit = vi.fn();
        
        render(<ManualUrlInput onSubmit={mockOnSubmit} />);
        
        const input = screen.getByPlaceholderText('https://nfce.fazenda...');
        const button = screen.getByText('Analisar NFCe');

        // Test invalid URL
        fireEvent.change(input, { target: { value: 'invalid-url' } });
        fireEvent.click(button);
        
        expect(screen.getByText('Por favor, insira uma URL válida')).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit with valid NFCe URL', () => {
        const mockOnSubmit = vi.fn();
        
        render(<ManualUrlInput onSubmit={mockOnSubmit} />);
        
        const input = screen.getByPlaceholderText('https://nfce.fazenda...');
        const button = screen.getByText('Analisar NFCe');
        
        const validUrl = 'https://nfce.fazenda.sp.gov.br/qrcode?p=35220316716114000119650010000000001000000001|2|1|1|6DD5...';
        
        fireEvent.change(input, { target: { value: validUrl } });
        fireEvent.click(button);
        
        expect(mockOnSubmit).toHaveBeenCalledWith(validUrl);
    });

    it('shows loading state when isLoading is true', () => {
        const mockOnSubmit = vi.fn();
        
        render(<ManualUrlInput onSubmit={mockOnSubmit} isLoading={true} />);
        
        expect(screen.getByText('Analisando...')).toBeInTheDocument();
        
        const input = screen.getByPlaceholderText('https://nfce.fazenda...');
        expect(input).toBeDisabled();
    });
});
