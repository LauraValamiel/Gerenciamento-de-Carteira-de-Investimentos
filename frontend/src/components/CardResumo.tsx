import React from 'react';
import type { ResumoInvestimento, Investimento } from '../types';

interface CardResumoInterface {
    resumo: ResumoInvestimento;
    investimentos: Investimento[];
}

const CardResumo: React.FC<CardResumoInterface> = ({ resumo, investimentos }) => {

    const totalValorMercado = investimentos.reduce((acc, investimento) => acc + (investimento.quantidade * investimento.precoMercado), 0);
    const totalInvestido = investimentos.reduce((acc, investimento) => acc + (investimento.quantidade * investimento.precoCompra), 0)
    const lucroPrejuizoTotal = totalValorMercado - totalInvestido;
    const percentLucroPrejuizo = totalInvestido > 0 ? (lucroPrejuizoTotal / totalInvestido) * 100 : 0;

    const isPositive = lucroPrejuizoTotal >= 0;
    const profitClass = isPositive ? 'positive' : 'negative';

    const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className="dashboard-grid">
            <div className="summary-card">
                <h3 className="card-tittle">Valor Total Investido</h3>
                <p className="card-value">{formatCurrency(totalInvestido)}</p>
            </div>
            <div className="summary-card">
                <h3 className="card-tittle">Valor Total Atual</h3>
                <p className="card-value">{formatCurrency(totalValorMercado)}</p>
            </div>
            <div className="summary-card">
                <h3 className="card-tittle">Lucro/Prejuízo</h3>
                <p className={`card-value ${profitClass}`}>{formatCurrency(lucroPrejuizoTotal)}</p>
            </div>
            <div className="summary-card">
                <h3 className="card-tittle">Rentabilidade</h3>
                <p className={`card-value ${profitClass}`}>{percentLucroPrejuizo.toFixed(2)}%</p>
            </div>

        </div>
    );

};

export default CardResumo;