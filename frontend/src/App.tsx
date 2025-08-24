/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardResumo from './components/CardResumo';
import InvestimentTable from './components/InvestimentosTable';
import InvestimentModal from './components/CreateInvestimentos';
import { FaPlus } from 'react-icons/fa';
import api from './api/investimentsApi';
import type { Investimento, InvestimentoPayload, ResumoInvestimento } from './types';
import './App.css';
import InvestimentosTable from './components/InvestimentosTable';
import CreateInvestimento from './components/CreateInvestimentos';

function App(){
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [resumo, setResumo] = useState<ResumoInvestimento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investimentoToEdit, setInvestimentoToEdit] = useState<Investimento | null>(null);

  const fetchData = async () => {
    try{

      const investimentosData = await api('/investimentos');
      const resumoData = await api('/investimentos/resumo');

      setInvestimentos(investimentosData);
      setResumo(resumoData);

    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setInvestimentoToEdit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInvestimentoToEdit(null);
  };

  const handleRefreshData = () => {
    handleCloseModal();
    fetchData();
  };

  const handleEdit = (investimento: Investimento) => {
    setInvestimentoToEdit(investimento);
    setIsModalOpen(true);
  };

  const totalValue = investimentos.reduce((sum, investiment) => sum + investiment.valorMercado, 0);

  const totalInvested = resumo?.totalInvestido ?? 0;

  const profit = totalValue - totalInvested;

  const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

  return (
    <div className="app-container">
      <Header numAtivos={resumo?.contagemAtivos ?? 0}/>
      <main>
        <div className="dashboard-grid">
            <CardResumo titulo="Valor Investido" valor={totalInvested}/>
            <CardResumo titulo="Valor Atual" valor={totalValue}/>
            <CardResumo
                titulo="Lucro/Prejuízo"
                valor={profit}
                change={`${profit >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%`}
                changeCor={profit >= 0 ? '#28a745' : '#dc3545'}
            />
            <CardResumo titulo="Total da Ativos" valor={resumo?.contagemAtivos.toString() ?? '0'}/> 
          </div>
          <div className="toolbar">
            <h2>Meus Investimentos</h2>
            <button className="button-primary" onClick={() => handleOpenModal()}><FaPlus/> Adicionar Investimento</button>
          </div>

        {resumo && <CardResumo resumo={resumo}/>}
        <InvestimentosTable 
            investimentos={investimentos}
            onEdit={handleEdit}
            onDelete={handleRefreshData}
        />
      </main>
      <CreateInvestimento
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleRefreshData}
          investimentoToEdit={investimentoToEdit}
      />
        

    </div>
    /*<div className="app-container">
      <Header numAtivos={resumo?.contagemAtivos ?? 0}/>
        <main>
          <div className="dashboard-grid">
            <CardResumo titulo="Valor Investido" valor={totalInvested}/>
            <CardResumo titulo="Valor Atual" valor={totalValue}/>
            <CardResumo
                titulo="Lucro/Prejuízo"
                valor={profit}
                change={`${profit >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%`}
                changeCor={profit >= 0 ? '#28a745' : '#dc3545'}
            />
            <CardResumo titulo="Total da Ativos" valor={resumo?.contagemAtivos.toString() ?? '0'}/> 
          </div>

          <div className="toolbar">
            <h2>Meus Investimentos</h2>
            <button className="button-primary" onClick={() => handleOpenModal()}><FaPlus/> Adicionar Investimento</button>
          </div>

          <InvestimentTable
              investimentos={investimentos}
              onEdit={handleOpenModal}
              onDelete={handleDeleteInvestimento}
          />
        </main>

        <InvestimentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveInvestimento}
            investimentoToEdit={investimentoToEdit}
        />

    </div>*/

  )

}

export default App;