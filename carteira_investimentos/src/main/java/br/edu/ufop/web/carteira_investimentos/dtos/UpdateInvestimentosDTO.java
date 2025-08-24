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
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInvestimentosDTO {

    private UUID id;
    private EnumTiposAtivos tipo;
    private String simbolo;
    private BigDecimal quantidade;
    private BigDecimal precoCompra;
    private LocalDate dataCompra;

}
