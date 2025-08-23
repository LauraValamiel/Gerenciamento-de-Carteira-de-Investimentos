package br.edu.ufop.web.carteira_investimentos.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvestimentosDTO{
    UUID id;
    EnumTiposAtivos tipo;
    String simbolo;
    BigDecimal quantidade;
    BigDecimal precoCompra;
    LocalDate dataCompra;
    BigDecimal precoMercado;
    BigDecimal valorInvestido;
    BigDecimal valorMercado;
    BigDecimal ganhoOuPerda;

}
