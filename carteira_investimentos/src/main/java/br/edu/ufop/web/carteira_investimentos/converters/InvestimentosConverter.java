package br.edu.ufop.web.carteira_investimentos.converters;

import br.edu.ufop.web.carteira_investimentos.domain.InvestimentosDomain;
import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentosModel;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvestimentosConverter {

    public static InvestimentosDTO toInvestimentosDTO(InvestimentosModel investimentosModel){
        if (investimentosModel == null){
            return null;
        }

        InvestimentosDTO investimentosDTO = new InvestimentosDTO();
        investimentosDTO.setId(investimentosModel.getId());
        investimentosDTO.setTipo(investimentosModel.getTipo());
        investimentosDTO.setSimbolo(investimentosModel.getSimbolo().toUpperCase());
        investimentosDTO.setQuantidade(investimentosModel.getQuantidade());
        investimentosDTO.setPrecoCompra(investimentosModel.getPrecoCompra());
        investimentosDTO.setDataCompra(investimentosModel.getDataCompra());
        investimentosDTO.setPrecoMercado(investimentosModel.getPrecoMercado());
        
        return investimentosDTO;

    }

    public static InvestimentosModel toInvestimentosModel(InvestimentosDomain investimentosDomain){
        return InvestimentosModel.builder()
        .tipo(investimentosDomain.getTipo())
        .simbolo(investimentosDomain.getSimbolo())
        .quantidade(investimentosDomain.getQuantidade())
        .precoCompra(investimentosDomain.getPrecoCompra())
        .dataCompra(investimentosDomain.getDataCompra())
        .precoMercado(investimentosDomain.getPrecoMercado())
        .build();
    }

    public static InvestimentosDomain toInvestimentosDomain(CreateInvestimentosDTO createInvestimentosDTO){

        return InvestimentosDomain.builder()
        .tipo(createInvestimentosDTO.getTipo())
        .simbolo(createInvestimentosDTO.getSimbolo())
        .quantidade(createInvestimentosDTO.getQuantidade())
        .precoCompra(createInvestimentosDTO.getPrecoCompra())
        .dataCompra(createInvestimentosDTO.getDataCompra())
        .build();

    }

    public static InvestimentosDomain toInvestimentosDomain(UpdateInvestimentosDTO updateInvestimentosDTO){
        
        return InvestimentosDomain.builder()
        .tipo(updateInvestimentosDTO.getTipo())
        .simbolo(updateInvestimentosDTO.getSimbolo())
        .quantidade(updateInvestimentosDTO.getQuantidade())
        .precoCompra(updateInvestimentosDTO.getPrecoCompra())
        .dataCompra(updateInvestimentosDTO.getDataCompra())
        .build();

    }

}