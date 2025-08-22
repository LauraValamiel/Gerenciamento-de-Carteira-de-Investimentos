package br.edu.ufop.web.carteira_investimentos.models;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_investiments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestimentsModel {

    @Id
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable= false)
    private EnumTiposAtivos tipo;

    @Column(nullable= false)
    private BigDecimal quantidade;

    @Column(nullable= false)
    private String simbolo;

    @Column(nullable= false)
    private BigDecimal precoCompra;

    @Column(nullable= false)
    private LocalDate dataCompra;

    @Column(nullable= false)
    private BigDecimal precoMercado;

    public BigDecimal getValorInvestido() {
        
        return precoCompra.multiply(quantidade);
    }

    public BigDecimal getValorMercado() {
        return precoMercado.multiply(quantidade);
    }

    public BigDecimal getGanhoOuPerda() {
        return getValorMercado().subtract(getValorInvestido());
    }


}
