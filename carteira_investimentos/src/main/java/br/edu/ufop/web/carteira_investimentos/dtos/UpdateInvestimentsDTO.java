package br.edu.ufop.web.carteira_investimentos.dtos;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInvestimentsDTO {

    private UUID id;
    private BigDecimal precoMercado;

}
