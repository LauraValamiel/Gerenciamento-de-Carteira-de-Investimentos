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

import br.edu.ufop.web.carteira_investimentos.dtos.CreateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.DeleteInvestimentoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.InvestimentosResumoDTO;
import br.edu.ufop.web.carteira_investimentos.dtos.UpdateInvestimentosDTO;
import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.services.InvestimentosService;
import lombok.AllArgsConstructor;




@RestController
@AllArgsConstructor
@RequestMapping("investimentos")
public class InvestimentosController {

    private final InvestimentosService investimentosService;

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Investments service is running");
    }

    @GetMapping
    public ResponseEntity<List<InvestimentosDTO>> getAllInvestimentos() {

        List<InvestimentosDTO> investimentosList = investimentosService.getAllInvestimentos();

        return ResponseEntity.ok(investimentosList);
    }

    
    @PostMapping
    public ResponseEntity<InvestimentosDTO> createInvestimentos(@RequestBody CreateInvestimentosDTO createInvestimentosDTO) {
        
        InvestimentosDTO investimentosDTO = investimentosService.createInvestimentos(createInvestimentosDTO);

        return ResponseEntity.ok(investimentosDTO);
    }
    

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<InvestimentosDTO>> getInvestimentosByTipo(@PathVariable EnumTiposAtivos tipo) {

        List<InvestimentosDTO> investimentosDTOList = investimentosService.getInvestimentosByTipo(tipo);

        if (investimentosDTOList.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(investimentosDTOList);

    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestimentosDTO> getById(@PathVariable String id) {
        InvestimentosDTO investimentosDTO = investimentosService.getInvestimentosById(UUID.fromString(id));

        if (investimentosDTO == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(investimentosDTO);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<InvestimentosDTO> updateInvestimento(@PathVariable String id, @RequestBody UpdateInvestimentosDTO updateInvestimentosDTO) {

        updateInvestimentosDTO.setId(UUID.fromString(id));

        InvestimentosDTO investimentosDTO = investimentosService.updateInvestimentos(updateInvestimentosDTO);

        if(investimentosDTO == null){
            return ResponseEntity.notFound().build();

        }
        
        return ResponseEntity.ok(investimentosDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteInvestimento(@PathVariable UUID id){
        
        DeleteInvestimentoDTO deleteInvestimentoDTO = new DeleteInvestimentoDTO(id);

        investimentosService.deleteInvestimento(deleteInvestimentoDTO);

        return ResponseEntity.ok("Investiment has been deleted");

    }

    
    @GetMapping("/resumo")
    public ResponseEntity<InvestimentosResumoDTO> getResumo() {

        return ResponseEntity.ok(investimentosService.getInvestimentosResumo());

    }
    

    

}
