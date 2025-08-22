package br.edu.ufop.web.carteira_investimentos.converters;


import br.edu.ufop.web.carteira_investimentos.domain.InvestimentsDomain;
import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentsModel;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvestimentsConverter {


    public static InvestimentsDTO toInvestimentsDTO(InvestimentsModel investimentsModel){
        if (investimentsModel == null){
            return null;
        }

        InvestimentsDTO investimentsDTO = new InvestimentsDTO();
        investimentsDTO.setId(investimentsModel.getId());
        investimentsDTO.setTipo(investimentsModel.getTipo());
        investimentsDTO.setSimbolo(investimentsModel.getSimbolo().toUpperCase());
        investimentsDTO.setQuantidade(investimentsModel.getQuantidade());
        investimentsDTO.setPrecoCompra(investimentsModel.getPrecoCompra());
        investimentsDTO.setDataCompra(investimentsModel.getDataCompra());
        investimentsDTO.setPrecoMercado(investimentsModel.getPrecoMercado());
        //investimentsDTO.setValorInvestido(investimentsModel.getValorInvestido());
        //investimentsDTO.setValorMercado(investimentsModel.getValorMercado());
        //investimentsDTO.setGanhoOuPerda(investimentsModel.getGanhoOuPerda());


        
        return investimentsDTO;

    }


    public static InvestimentsModel toInvestimentsModel(InvestimentsDomain investimentsDomain){
        return InvestimentsModel.builder()
        .tipo(investimentsDomain.getTipo())
        .simbolo(investimentsDomain.getSimbolo())
        .quantidade(investimentsDomain.getQuantidade())
        .precoCompra(investimentsDomain.getPrecoCompra())
        .dataCompra(investimentsDomain.getDataCompra())
        .precoMercado(investimentsDomain.getPrecoMercado())
        .build();
    }

    public static InvestimentsDomain toInvestimentsDomain(CreateInvestimentsDTO createInvestimentsDTO){

        return InvestimentsDomain.builder()
        .tipo(createInvestimentsDTO.getTipo())
        .simbolo(createInvestimentsDTO.getSimbolo())
        .quantidade(createInvestimentsDTO.getQuantidade())
        .precoCompra(createInvestimentsDTO.getPrecoCompra())
        .dataCompra(createInvestimentsDTO.getDataCompra())
        .precoMercado(createInvestimentsDTO.getPrecoMercado())
        .build();

    }

    public static InvestimentsDomain toInvestimentsDomain(UpdateInvestimentsDTO updateInvestimentsDTO){
        
        return InvestimentsDomain.builder()
        .precoMercado(updateInvestimentsDTO.getPrecoMercado())
        .build();

    }


}
