package br.edu.ufop.web.carteira_investimentos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CarteiraInvestimentosApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarteiraInvestimentosApplication.class, args);
	}

}
