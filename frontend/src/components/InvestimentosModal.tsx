import React, { useState, useEffect } from 'react';
import type { Investimento, InvestimentoPayload, TiposAtivos } from '../types';

interface InvestimentoModalInterface {
    isOpen: boolean;
    onClose: () => void;
    onSave: (investimento: InvestimentoPayload) => void;
    investimentoToEdit: Investimento | null;
}

const InvestimentoModal: React.FC<InvestimentoModalInterface> = ({ isOpen, onClose, onSave, investimentoToEdit }) => {
    const initialState: InvestimentoPayload = {
        tipo: 'ACAO',
        simbolo: '',
        quantidade: 0,
        precoCompra: 0,
        dataCompra: new Date().toISOString().split('T')[0],
        precoMercado: 0,
    };

    const [form, setForm] = useState<InvestimentoPayload>(initialState);

    useEffect(() => {
        if(investimentoToEdit){
            setForm(investimentoToEdit);
        } else{
            setForm(initialState);
        }
    }, [investimentoToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'quantidade' || name === 'precoCompra' || name === 'precoMercado' ? parseFloat(value) : value}));

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{investimentoToEdit ? 'Editar Investimento' : 'Adicionar Novo Investimento'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tipo de Ativo</label>
                        <select name="tipo" value={form.tipo} onChange={handleChange} required>
                            <option value="ACAO">Ações</option>
                            <option value="CRIPTO">Criptomoedas</option>
                            <option value="FUNDO">Fundos</option>
                            <option value="RENDA_FIXA">Renda Fixa</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Símbolo</label>
                        <input type="text" name="simbolo" placeholder="Ex: BBAS3, BTC" value={form.simbolo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Quantidade</label>
                        <input type="text" name='quantidade' value={form.quantidade} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Preço de Compra (R$)</label>
                        <input type="number" step="0.01" name="precoCompra" value={form.precoCompra} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Preço de Mercado (R$)</label>
                        <input type="number" step="0.01" name="precoMercado" value={form.precoMercado} onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Data de Compra</label>
                        <input type="date" name="dataCompra" value={form.dataCompra} onChange={handleChange} required/>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="button-secondary" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="button-primary">{investimentoToEdit ? 'Atualizar' : 'Adicionar'}</button>
                    </div>
                </form>

            </div>

        </div>
    );

}

export default InvestimentoModal