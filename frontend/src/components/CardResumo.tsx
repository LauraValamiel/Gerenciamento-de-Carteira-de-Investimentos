import React from 'react';
import type { ResumoInvestimento, Investimento } from '../types';

interface CardResumoInterface {
    resumo: ResumoInvestimento;
    investimentos: Investimento[];
}

const CardResumo: React.FC<CardResumoInterface> = ({ resumo, investimentos }) => {

    const totalValorMercado = investimentos.reduce((acc, investimento) => acc + investimento.valorMercado, 0);
    const lucroPrejuizoTotal = totalValorMercado - resumo.totalInvestido;
    const percentLucroPrejuizo = resumo.totalInvestido > 0 ? (lucroPrejuizoTotal / resumo.totalInvestido) * 100 : 0;

    const isPositive = lucroPrejuizoTotal >= 0;
    const profitClass = isPositive ? 'positive' : 'negative';

    return (
        <div className="card-resumo-container">
            <div className="card-resumo">
                <h3>Valor Total Investido</h3>
                <p>{resumo.totalInvestido}</p>
            </div>
            <div className="card-resumo">
                <h3>Valor Total Atual</h3>
                <p>{totalValorMercado}</p>
            </div>
            <div className="card-resumo">
                <h3>Lucro/Prejuízo Total</h3>
                <p className={profitClass}>{percentLucroPrejuizo.toFixed(2)}%</p>
            </div>
        </div>
    );

};

export default CardResumo;