import React from 'react';
import type { Investimento } from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../api/investimentsApi';

interface InvestimentoTableInterface {
    investimentos: Investimento[];
    onEdit: (investiment: Investimento) => void;
    onDelete: () => void;
}

const InvestimentoTable: React.FC<InvestimentoTableInterface> = ({ investimentos, onEdit, onDelete }) => {

    const handleDelete = async (id: string) => {
        if(window.confirm('Tem certeza que deseja excluir este investimento?')){
            try{
                await api(`/investimentos${id}`, {
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
                                <td>{investimento.tipo}</td>
                                <td>{investimento.simbolo.toLowerCase()}</td>
                                <td className={isPositive ? 'positive' : 'negative'}>
                                    {profit.toFixed(2)}({profitPercent.toFixed(2)}%)
                                </td>
                                <td>{investimento.quantidade}</td>
                                <td>{`${investimento.precoCompra.toFixed(2)}`}</td>
                                <td>{`${investimento.precoMercado.toFixed(2)}`}</td>
                                <td>{`${investimento.valorInvestido}`}</td>
                                <td>{new Date(investimento.dataCompra).toLocaleDateString()}</td>
                                <td>
                                    <button className="icon-button" onClick={() => onEdit(investimento)}><FaEdit/></button>
                                    <button className="icon-button" onClick={() => handleDelete(investimento.id)}><FaTrash/></button>
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