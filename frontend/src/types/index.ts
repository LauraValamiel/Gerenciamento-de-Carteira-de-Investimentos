export type TiposAtivos = 'ACAO' | 'CRIPTO' | 'FUNDO' | 'RENDA_FIXA' | 'OUTRO';

export interface Investimento {
    
    id: string;
    tipo: TiposAtivos;
    simbolo: string;
    quantidade: number;
    precoCompra: number;
    dataCompra: string;
    precoMercado: number;
    valorInvestido: number;
    valorMercado: number;
    ganhoOuPerda: number;

}

export interface ResumoInvestimento {
    totalInvestido: number;
    totalPorTipo: Record<TiposAtivos, number>;
    contagemAtivos: number;
}

export interface InvestimentoPayload {
    tipo: TiposAtivos;
    simbolo: string;
    quantidade: number;
    precoCompra: number;
    dataCompra: string;
    precoMercado: number;
}