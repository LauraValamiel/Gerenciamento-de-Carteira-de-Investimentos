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

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CardResumo from './components/CardResumo';
import InvestimentTable from './components/InvestimentosTable';
import InvestimentModal from './components/InvestimentosModal';
import { FaPlus } from 'react-icons/fa';
import logo from './assets/icone.svg'
import * as api from './api/investimentsApi';
import type { Investimento, InvestimentoPayload, ResumoInvestimento } from './types';
import './App.css';

function App(){
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [resumo, setResumo] = useState<ResumoInvestimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvestimento, setEditingInvestimento] = useState<Investimento | null>(null);

  const fetchData = useCallback(async () => {
    try{
      setLoading(true);
      const [investimentsData, resumoData] = await Promise.all([
        api.getInvestments(),
        api.getResumo(),
      ]);
      setInvestimentos(investimentsData);
      setResumo(resumoData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (investiment: Investimento | null = null) => {
    setEditingInvestimento(investiment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInvestimento(null);
  }

  const handleSaveInvestimento = async (payload: InvestimentoPayload) => {
    try{
      if(editingInvestimento){
        await api.updateInvestimento(editingInvestimento.id, payload.precoMercado);
      } else{
        await api.createInvestimento(payload);
      }

      fetchData();
      handleCloseModal();

    } catch (error) {
      console.error("Erro ao salvar investimento:", error);
    }
  };

  const handleDeleteInvestimento = async (id: string) => {
    if(window.confirm("Tem certeza que deseja remover este investimento?")){
      try{
        await api.deleteInvestimento(id);
        fetchData();
      } catch (error) {
        console.error("Erro ao deletar investimento:", error);
      }
    }
  };

  const totalValue = investimentos.reduce((sum, investiment) => sum + investiment.valorMercado, 0);
  const totalInvested = resumo?.totalInvestido ?? 0;
  const profit = totalValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;
  
  if(loading){
    return <div className="loading">Carregando...</div>
  }

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
            investimentoToEdit={editingInvestimento}
        />

    </div>
  )

}

export default App;