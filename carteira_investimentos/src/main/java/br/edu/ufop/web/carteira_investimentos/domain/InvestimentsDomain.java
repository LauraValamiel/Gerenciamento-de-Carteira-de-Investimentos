package br.edu.ufop.web.carteira_investimentos.domain;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestimentsDomain {

    private UUID id;

    private EnumTiposAtivos tipo;

    private BigDecimal quantidade;

    private String simbolo;

    private BigDecimal precoCompra;

    private LocalDate dataCompra;

    private BigDecimal precoMercado;

}
