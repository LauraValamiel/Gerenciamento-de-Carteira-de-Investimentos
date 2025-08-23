package br.edu.ufop.web.carteira_investimentos.dtos;

import java.math.BigDecimal;
import java.util.Map;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvestimentosResumoDTO{

    BigDecimal totalInvestido;
    Map<EnumTiposAtivos, BigDecimal> totalPorTipo;
    Integer contagemAtivos;
}
