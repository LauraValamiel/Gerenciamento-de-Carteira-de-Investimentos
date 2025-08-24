import React from 'react';
import type { Investimento, TiposAtivos } from '../types';
import { FaEdit, FaFilter, FaPlus, FaTrash } from 'react-icons/fa';
import api from '../api/investimentosApi';

interface InvestimentoTableInterface {
    investimentos: Investimento[];
    onEdit: (investiment: Investimento) => void;
    onDelete: () => void;
    onAddInvestimento: () => void;
    filtroPorTipo: TiposAtivos | 'TODOS';
    setFiltroPorTipo: (tipo: TiposAtivos | 'TODOS') => void;

}

const InvestimentoTable: React.FC<InvestimentoTableInterface> = ({ investimentos, onEdit, onDelete, onAddInvestimento, filtroPorTipo, setFiltroPorTipo }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm('Tem certeza que deseja excluir este investimento?')){
            try{
                await api(`/investimentos/${id}`, {
                    method: 'DELETE',
                });
                alert('Investimento excluído com sucessso!');
                onDelete();
            } catch (error){
                console.error('Erro ao excluir investimento: ', error);
                alert('Falha ao excluir o investimento.')
            }
        }
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const investimentosOrdenados = [...investimentos].sort((a, b) => {
        const lucroA = (a.quantidade * a.precoMercado) - (a.quantidade * a.precoCompra);
        const lucroB = (b.quantidade * b.precoMercado) - (b.quantidade * b.precoCompra);
        return lucroB - lucroA;
    });

    return (
        <>
            <div className="filter-section">
                <div className="filter-container">
                    <FaFilter size={14} />
                    <label htmlFor="filter-select">Filtrar por tipo:</label>
                    <select id="filter-select" value={filtroPorTipo} onChange={(e) => setFiltroPorTipo(e.target.value as TiposAtivos | 'TODOS')}>
                        <option value="TODOS">Todos os tipos</option>
                        <option value="ACAO">Ações</option>
                        <option value="FUNDO">Fundos de Investimentos</option>
                        <option value="CRIPTO">Criptomoedas</option>
                        <option value="RENDA_FIXA">Renda Fixa</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </div>
            </div>
        <div className="toolbar">
            <h2>Meus Investimentos</h2>
                <button onClick={onAddInvestimento} className="button-primary">
                    <FaPlus />
                    Adicionar Ativo
                </button>
        </div>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Símbolo</th>
                                <th>Quantidade</th>
                                <th>Preço Compra (R$)</th>
                                <th>Preço Atual (R$)</th>
                                <th>Valor Investido</th>
                                <th>Valor Atual</th>
                                <th>Lucro/Prejuízo</th>
                                <th>Data Compra</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investimentosOrdenados.map((investimento) => {
                                const valorInvestido = investimento.quantidade * investimento.precoCompra;
                                const valorMercado = investimento.quantidade * investimento.precoMercado;
                                const ganhoOuPerda = valorMercado - valorInvestido;
                                const profitPercent = valorInvestido > 0 ? (ganhoOuPerda / valorInvestido) * 100 : 0;
                                const profitClass = ganhoOuPerda >= 0 ? 'positive' : 'negative';

                                return (
                                    <tr key={investimento.id}>
                                        <td><span className={`chip ${investimento.tipo}`}>{investimento.tipo.replace('_', ' ')}</span></td>
                                        <td>{investimento.simbolo}</td>
                                        <td>{investimento.quantidade}</td>
                                        <td>{formatCurrency(investimento.precoCompra)}</td>
                                        <td>{formatCurrency(investimento.precoMercado)}</td>
                                        <td>{formatCurrency(valorInvestido)}</td>
                                        <td>{formatCurrency(valorMercado)}</td>
                                        <td className={profitClass}>
                                            {formatCurrency(ganhoOuPerda)}
                                            <span className={profitClass}>({profitPercent.toFixed(2)}%)</span>
                                        </td>
                                        <td>{new Date(investimento.dataCompra).toLocaleDateString()}</td>
                                        <td>
                                            <button className="button-icon" onClick={() => onEdit(investimento)}><FaEdit /></button>
                                            <button className="button-icon delete" onClick={() => handleDelete(investimento.id)}><FaTrash /></button>
                                    </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </>
    );
};

export default InvestimentoTable;