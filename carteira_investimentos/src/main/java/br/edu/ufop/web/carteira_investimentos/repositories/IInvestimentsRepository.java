package br.edu.ufop.web.carteira_investimentos.repositories;

import br.edu.ufop.web.carteira_investimentos.enums.EnumTiposAtivos;
import br.edu.ufop.web.carteira_investimentos.models.InvestimentsModel;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IInvestimentsRepository extends JpaRepository<InvestimentsModel, UUID> {

    List<InvestimentsModel> findByTipo(EnumTiposAtivos tipo);


}
