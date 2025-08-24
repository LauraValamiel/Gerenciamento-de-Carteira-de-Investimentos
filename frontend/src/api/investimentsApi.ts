/*import axios from  'axios';
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
}*/

const SERVER = 'http://localhost:3300'

const api = async (endpoint: string, config?: RequestInit) => {
    try{
        console.log(`Endpoint: (TL) ${SERVER}${endpoint}`)

        const result = await fetch(SERVER + endpoint, config)

        if (!result.ok){
            throw new Error(`Erro na requisição: ${result.status} ${result.statusText}`);

        } 

        return result.json()

    } catch (error){
        console.error("Falha ao buscar dado da API:", error);
        throw error;
    }

    
    
}

export default api