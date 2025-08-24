package br.edu.ufop.web.carteira_investimentos.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

import org.springframework.stereotype.Service;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;

@Service
public class SimulacaoMercadoService {

    private final Random random = new Random();

    public BigDecimal getNovoPreco(BigDecimal precoAntigo, EnumTiposAtivos tipoAtivo){
        
        double volatilidade;

        switch (tipoAtivo) {
            case ACAO:
                volatilidade = 0.05;
                break;
            case CRIPTO:
                volatilidade = 0.10;
                break;
            case FUNDO:
                volatilidade = 0.02;
                break;
            case RENDA_FIXA:
                volatilidade = 0.005;
                break;
            default: //outros
                volatilidade = 0.01;
                break;
        }

        double mudancaPercentual = (random.nextDouble() * 2 - 1) * volatilidade;

        BigDecimal fatorDeMudanca = new BigDecimal(1+ mudancaPercentual);

        BigDecimal novoPreco = precoAntigo.multiply(fatorDeMudanca);

        if (novoPreco.compareTo(BigDecimal.ZERO) < 0){
            novoPreco = BigDecimal.ZERO;
        }

        return novoPreco.setScale(2, RoundingMode.HALF_UP);

    }

}
