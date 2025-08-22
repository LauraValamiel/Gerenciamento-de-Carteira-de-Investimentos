package br.edu.ufop.web.carteira_investimentos.dtos;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import java.math.BigDecimal;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvestimentsResumoDTO{

    BigDecimal totalInvestido;
    Map<EnumTiposAtivos, BigDecimal> totalPorTipo;
    Integer contagemAtivos;
}
