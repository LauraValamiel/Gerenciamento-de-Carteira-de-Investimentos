import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CardResumo from './components/CardResumo';
import api from './api/investimentosApi';
import type { TiposAtivos, Investimento, InvestimentoPayload, ResumoInvestimento } from './types';
import './App.css';
import InvestimentosTable from './components/InvestimentosTable';
import CreateInvestimento from './components/CreateInvestimentos';

function App(){
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [resumo, setResumo] = useState<ResumoInvestimento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investimentoToEdit, setInvestimentoToEdit] = useState<Investimento | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<TiposAtivos | 'TODOS'>('TODOS');

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
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);

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

  const investimentosFiltrados = useMemo(() => {
    if(filtroTipo === 'TODOS'){
      return investimentos;
    }
    return investimentos.filter(investimento => investimento.tipo === filtroTipo);
  }, [investimentos, filtroTipo]);

  return (
    <div className="app-container">
      <Header totalAtivos={resumo?.contagemAtivos ?? 0}/>
      <main>
        {resumo && <CardResumo resumo={resumo} investimentos={investimentos}/>}
          <div className="investimentos-container">
           <InvestimentosTable 
              investimentos={investimentosFiltrados}
              onEdit={handleEdit}
              onDelete={handleRefreshData}
              onAddInvestimento={handleOpenModal}
              filtroPorTipo={filtroTipo}
              setFiltroPorTipo={setFiltroTipo}
          />
        </div>
      </main>
      <CreateInvestimento
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleRefreshData}
          investimentoToEdit={investimentoToEdit}
      />
    </div>

  )

}

export default App;