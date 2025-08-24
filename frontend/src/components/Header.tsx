import React from 'react';
import { FaPlus } from 'react-icons/fa';
import logoIcon from '../assets/icone.png';

interface HeaderInterface {
    totalAtivos: number;
}

const Header: React.FC<HeaderInterface> = ({ totalAtivos }) => {

    return (
        <header className="app-header">
            <div className="logo">
                <img src={logoIcon} alt="Ícone da Carteira" />
                <div>
                    <h1>Minha Carteira de Investimentos</h1>
                    <p>Gerencie sua carteira de investimentos</p>
                </div>
                
            </div>
            <div className="assets-count-chip">
                {totalAtivos} Ativos na Carteira
            </div>
        </header>
    );

};

export default Header;