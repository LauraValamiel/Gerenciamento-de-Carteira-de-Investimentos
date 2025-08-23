package br.edu.ufop.web.carteira_investimentos.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentosModel;

public interface IInvestimentosRepository extends JpaRepository<InvestimentosModel, UUID> {

    List<InvestimentosModel> findByTipo(EnumTiposAtivos tipo);


}
