import axios from  'axios';
import type { Investimento, ResumoInvestimento, InvestimentoPayload } from '../types';


const apiCliente = axios.create({
    baseURL: 'http://localhost:3300/investimentos', 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getInvestments = async (): Promise<Investimento[]> => {
    const response = await apiCliente.get('/');
    return response.data;
};

export const getResumo = async (): Promise<ResumoInvestimento> => {
    const response = await apiCliente.get('/resumo');
    return response.data;
};

export const createInvestimento = async (investimento: InvestimentoPayload): Promise<Investimento> => {
    const response = await apiCliente.post('/', investimento);
    return response.data;
};

export const updateInvestimento = async (id: string, precoMercado: number): Promise<Investimento> => {
    const response = await apiCliente.put(`/${id}`, { precoMercado });
    return response.data;
};

export const deleteInvestimento = async (id: string): Promise<void> => {
    await apiCliente.delete(`/${id}`)
}