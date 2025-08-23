import React from 'react';
import type { Investimento } from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface InvestimentoTableInterface {
    investimentos: Investimento[];
    onEdit: (investiment: Investimento) => void;
    onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

const InvestimentoTable: React.FC<InvestimentoTableInterface> = ({ investimentos, onEdit, onDelete }) => {

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Símbolo</th>
                        <th>Quantidade</th>
                        <th>Preço Compra</th>
                        <th>Preço Atual</th>
                        <th>Valor Investido</th>
                        <th>Lucro/Prejuízo</th>
                        <th>Data Compra</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {investimentos.map((investimento) => {
                        const profit = investimento.valorMercado - investimento.valorInvestido;
                        const profitPercent = (profit/investimento.valorInvestido) * 100;
                        const isPositive = profit >= 0;

                        return (
                            <tr key={investimento.id}>
                                <td><span className={`chip chip-${investimento.tipo.toLowerCase()}`}>{investimento.tipo}</span></td>
                                <td>{investimento.simbolo}</td>
                                <td>{investimento.quantidade}</td>
                                <td>{`${investimento.precoCompra}`}</td>
                                <td>{`${investimento.precoMercado}`}</td>
                                <td>{`${investimento.valorInvestido}`}</td>
                                <td className={isPositive ? 'positive' : 'negative'}>
                                    {profit}
                                    <span>({isPositive ? '+' : ''}{profitPercent.toFixed(2)}%)</span>
                                    </td>
                                    <td>{formatDate(investimento.dataCompra)}</td>
                                    <td>
                                        <button className="icon-button" onClick={() => onEdit(investimento)}><FaEdit/></button>
                                        <button className="icon-button" onClick={() => onDelete(investimento.id)}><FaTrash/></button>
                                    </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InvestimentoTable;