import React from 'react';

interface HeaderInterface {
    numAtivos: number;
}

const Header: React.FC<HeaderInterface> = ({ numAtivos }) => {

    return (
        <header className="app-header">
            <div className="logo">
                <h1>Carteira de Investimentos</h1>
                <p>Gerencie sua carteira de investimentos</p>
            </div>
            <div className="assets-count-chip">
                {numAtivos} {numAtivos === 1 ? 'ativo' : 'ativos'}
            </div>
        </header>
    );

};

export default Header;