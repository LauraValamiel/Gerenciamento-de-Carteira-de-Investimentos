package br.edu.ufop.web.carteira_investimentos.enums;

import lombok.Getter;

@Getter
public enum EnumTiposAtivos {

    ACAO(1, "Ações da bolsa"),
    CRIPTO(2, "Criptomoedas"),
    FUNDO(3, "Fundos de Investimentos"),
    RENDA_FIXA(4, "Títulos de Renda Fixa"),
    OUTRO(5, "Outros");

    private final Integer id;
    private final String descricao;

    EnumTiposAtivos(Integer id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    

}
