package br.edu.ufop.web.carteira_investimentos.controllers;


import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.DeleteInvestimentDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentsResumoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentsDTO;
import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.services.InvestimentsService;
import lombok.AllArgsConstructor;




@RestController
@AllArgsConstructor
@RequestMapping("investiments")
public class InvestimentsController {

    private final InvestimentsService investimentsService;

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Investiments service is running");
    }

    @GetMapping
    public ResponseEntity<List<InvestimentsDTO>> getAllInvestiments() {

        List<InvestimentsDTO> investimentsList = investimentsService.getAllInvestiments();

        return ResponseEntity.ok(investimentsList);
    }

    
    @PostMapping
    public ResponseEntity<InvestimentsDTO> createInvestiments(@RequestBody CreateInvestimentsDTO createInvestimentsDTO) {
        
        InvestimentsDTO investimentsDTO = investimentsService.createInvestiments(createInvestimentsDTO);

        return ResponseEntity.ok(investimentsDTO);
    }
    

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<InvestimentsDTO>> getInvestimentsByTipo(@PathVariable EnumTiposAtivos tipo) {

        List<InvestimentsDTO> investimentsDTOList = investimentsService.getInvestimentsByTipo(tipo);

        if (investimentsDTOList.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(investimentsDTOList);

    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestimentsDTO> getById(@PathVariable String id) {
        InvestimentsDTO investimentsDTO = investimentsService.getInvestimentsById(UUID.fromString(id));

        if (investimentsDTO == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(investimentsDTO);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<InvestimentsDTO> updateInvestiment(@PathVariable String id, @RequestBody UpdateInvestimentsDTO updateInvestimentsDTO) {

        updateInvestimentsDTO.setId(UUID.fromString(id));

        InvestimentsDTO investimentsDTO = investimentsService.updateInvestiments(updateInvestimentsDTO);

        if(investimentsDTO == null){
            return ResponseEntity.notFound().build();

        }
        
        return ResponseEntity.ok(investimentsDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteInvestiment(@PathVariable UUID id){
        
        DeleteInvestimentDTO deleteInvestimentDTO = new DeleteInvestimentDTO(id);

        investimentsService.deleteInvestiment(deleteInvestimentDTO);

        return ResponseEntity.ok("Investiment has been deleted");

    }

    
    @GetMapping("/resumo")
    public ResponseEntity<InvestimentsResumoDTO> getResumo() {

        return ResponseEntity.ok(investimentsService.getInvestimentsResumo());

    }
    

    

}
