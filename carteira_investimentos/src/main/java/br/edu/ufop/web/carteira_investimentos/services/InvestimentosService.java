package br.edu.ufop.web.carteira_investimentos.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import br.edu.ufop.web.carteira_investimentos.converters.InvestimentosConverter;
import br.edu.ufop.web.carteira_investimentos.domain.InvestimentosDomain;
import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.DeleteInvestimentoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentosResumoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentosModel;
import br.edu.ufop.web.carteira_investimentos.repositories.IInvestimentosRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class InvestimentosService {

    private final IInvestimentosRepository investimentosRepository;
    private final SimulacaoMercadoService simulacaoMercadoService;

    public List<InvestimentosDTO> getAllInvestimentos(){

        List<InvestimentosModel> investimentosModelList = investimentosRepository.findAll();

        return investimentosModelList
            .stream()
            .filter(Objects::nonNull)
            .map(InvestimentosConverter::toInvestimentosDTO)
            .toList();

    }

    public InvestimentosResumoDTO getInvestimentosResumo(){

        List<InvestimentosModel> investimentosModelList = investimentosRepository.findAll();

        
        BigDecimal totalInvestido = investimentosModelList.stream()
            .map(InvestimentosModel::getValorInvestido)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<EnumTiposAtivos, BigDecimal> totalPorTipo = investimentosModelList.stream()
            .collect(Collectors.groupingBy(
                InvestimentosModel::getTipo,
                Collectors.mapping(InvestimentosModel::getValorInvestido,
                                    Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                )
            ));

        Integer quantidadeAtivos = investimentosModelList.size();

        return new InvestimentosResumoDTO(totalInvestido, totalPorTipo, quantidadeAtivos);

    }

    public InvestimentosDTO getInvestimentosById(UUID id){

        return investimentosRepository.findById(id)
                .map(InvestimentosConverter::toInvestimentosDTO)
                .orElse(null);

    }

    public List<InvestimentosDTO> getInvestimentosByTipo(EnumTiposAtivos tipo){

        List<InvestimentosModel> investimentosModelList = investimentosRepository.findByTipo(tipo);


        return investimentosModelList.stream()
                .map(InvestimentosConverter::toInvestimentosDTO)
                .toList();

    }

    public InvestimentosDTO createInvestimentos(CreateInvestimentosDTO createInvestimentosDTO) {

        InvestimentosDomain investimentosDomain = InvestimentosConverter.toInvestimentosDomain(createInvestimentosDTO);

        investimentosDomain.setPrecoMercado(investimentosDomain.getPrecoCompra());

        InvestimentosModel investimentosModel = InvestimentosConverter.toInvestimentosModel(investimentosDomain);

        return InvestimentosConverter.toInvestimentosDTO(investimentosRepository.save(investimentosModel));

    }

    public InvestimentosDTO updateInvestimentos(UpdateInvestimentosDTO updateInvestimentosDTO){

        Optional<InvestimentosModel> optionalInvestimentosModel = investimentosRepository.findById(updateInvestimentosDTO.getId());

        if(optionalInvestimentosModel.isEmpty()){
            throw new RuntimeException("Investimento não encontrado para atualização");
        }

        InvestimentosModel investimentosModel = optionalInvestimentosModel.get();
        InvestimentosDomain investimentosDomain = InvestimentosConverter.toInvestimentosDomain(updateInvestimentosDTO);

        investimentosModel.setTipo(investimentosDomain.getTipo());
        investimentosModel.setSimbolo(investimentosDomain.getSimbolo());
        investimentosModel.setQuantidade(investimentosDomain.getQuantidade());
        investimentosModel.setPrecoCompra(investimentosDomain.getPrecoCompra());
        investimentosModel.setDataCompra(investimentosDomain.getDataCompra());

        return InvestimentosConverter.toInvestimentosDTO(investimentosRepository.save(investimentosModel));

    }

    public void deleteInvestimento(DeleteInvestimentoDTO deleteInvestimentoDTO){

        Optional<InvestimentosModel> optionalInvestimentosModel = investimentosRepository.findById(deleteInvestimentoDTO.id());
        
        if (optionalInvestimentosModel.isEmpty()){
            throw new RuntimeException("Investiment not found");
        }

        investimentosRepository.delete(optionalInvestimentosModel.get());

    }

    @Scheduled(fixedRate = 10000)
    public void updateValorMercado(){
        System.out.println("Executando atualizações de preços de mercado...");
        List<InvestimentosModel> investimentos = investimentosRepository.findAll();
        
        for (InvestimentosModel investimentosModel : investimentos){
            BigDecimal precoAntigo = investimentosModel.getPrecoMercado();
            BigDecimal novoPreco = simulacaoMercadoService.getNovoPreco(precoAntigo, investimentosModel.getTipo());
            investimentosModel.setPrecoMercado(novoPreco);
        }

        investimentosRepository.saveAll(investimentos);
        System.out.println(investimentos.size() + "ativos foram atualizados.");

    }


}
