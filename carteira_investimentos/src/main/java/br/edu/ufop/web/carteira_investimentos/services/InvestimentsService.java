package br.edu.ufop.web.carteira_investimentos.services;

import br.edu.ufop.web.carteira_investimentos.converters.InvestimentsConverter;
import br.edu.ufop.web.carteira_investimentos.domain.InvestimentsDomain;
import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.DeleteInvestimentDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentsResumoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentsModel;
import br.edu.ufop.web.carteira_investimentos.repositories.IInvestimentsRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map;


import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvestimentsService {

    private final IInvestimentsRepository investimentsRepository;

    public List<InvestimentsDTO> getAllInvestiments(){

        List<InvestimentsModel> investimentsModelList = investimentsRepository.findAll();

        return investimentsModelList
            .stream()
            .filter(Objects::nonNull)
            .map(InvestimentsConverter::toInvestimentsDTO)
            .toList();

    }

    public InvestimentsResumoDTO getInvestimentsResumo(){

        List<InvestimentsModel> investimentsModelList = investimentsRepository.findAll();

        
        BigDecimal totalInvestido = investimentsModelList.stream()
            .map(InvestimentsModel::getValorInvestido)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<EnumTiposAtivos, BigDecimal> totalPorTipo = investimentsModelList.stream()
            .collect(Collectors.groupingBy(
                InvestimentsModel::getTipo,
                Collectors.mapping(InvestimentsModel::getValorInvestido,
                                    Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                )
            ));

        Integer quantidadeAtivos = investimentsModelList.size();

        return new InvestimentsResumoDTO(totalInvestido, totalPorTipo, quantidadeAtivos);

    }

    public InvestimentsDTO getInvestimentsById(UUID id){

        return investimentsRepository.findById(id)
                .map(InvestimentsConverter::toInvestimentsDTO)
                .orElse(null);

    }

    public List<InvestimentsDTO> getInvestimentsByTipo(EnumTiposAtivos tipo){

        List<InvestimentsModel> investimentsModelList = investimentsRepository.findByTipo(tipo);


        return investimentsModelList.stream()
                .map(InvestimentsConverter::toInvestimentsDTO)
                .toList();

    }

    public InvestimentsDTO createInvestiments(CreateInvestimentsDTO createInvestimentsDTO) {

        InvestimentsDomain investimentsDomain = InvestimentsConverter.toInvestimentsDomain(createInvestimentsDTO);

        InvestimentsModel investimentsModel = InvestimentsConverter.toInvestimentsModel(investimentsDomain);

        return InvestimentsConverter.toInvestimentsDTO(investimentsRepository.save(investimentsModel));

    }

    public InvestimentsDTO updateInvestiments(UpdateInvestimentsDTO updateInvestimentsDTO){

        Optional<InvestimentsModel> optionalInvestimentsModel = investimentsRepository.findById(updateInvestimentsDTO.getId());

        if(optionalInvestimentsModel.isEmpty()){
            return null;
        }

        InvestimentsModel investimentsModel = optionalInvestimentsModel.get();
        InvestimentsDomain investimentsDomain = InvestimentsConverter.toInvestimentsDomain(updateInvestimentsDTO);

        investimentsModel.setPrecoMercado(investimentsDomain.getPrecoMercado());

        return InvestimentsConverter.toInvestimentsDTO(investimentsRepository.save(investimentsModel));

    }

    public void deleteInvestiment(DeleteInvestimentDTO deleteInvestimentDTO){

        Optional<InvestimentsModel> optionalInvestimentsModel = investimentsRepository.findById(deleteInvestimentDTO.id());
        
        if (optionalInvestimentsModel.isEmpty()){
            throw new RuntimeException("Investiment not found");
        }

        investimentsRepository.delete(optionalInvestimentsModel.get());

    }


}
