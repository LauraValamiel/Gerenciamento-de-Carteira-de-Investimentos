import React from 'react';

interface CardResumoInterface {
    titulo: string;
    valor: string;
    change?: string;
    changeCor?: string;
}

const CardResumo: React.FC<CardResumoInterface> = ({ titulo, valor, change, changeCor = 'green'}) => {

    return (
        <div className="summary-card">
            <span className="card-title">{titulo}</span>
            <span className="card-value">{valor}</span>
            {change && (
                <span className="card-change" style={{ color: changeCor}}>
                    {change}
                </span>
            )}
        </div>
    );

};

export default CardResumo;