# Gerenciamento de Carteira de Investimentos

## 📝 Descrição

Este projeto é um sistema de gerenciamento de carteira de investimentos. Ele permite que os usuários visualizem, adicionem, editem e removam seus investimentos, além de acompanhar um resumo de sua carteira. A aplicação é dividida em um backend RESTful desenvolvido em Java com Spring Boot e um frontend interativo construído com React. Esse é um trabalho prático desenvolvido para a disciplina CSI607 - Sistemas Web II, ministrada pelo Prof. Fernando Bernardes de Oliveira (UFOP - DECSI)

## ✨ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

### **Backend**
* **Java 17**.
* **Spring Boot 3.5.5**.
    * **Spring Data JPA**.
    * **Spring Web**.
    * **Validation**.
* **PostgreSQL**.
* **Lombok**.
* **Maven**.
* **Docker**.

### **Frontend**
* **React 19 + Vite**.
* **TypeScript**.
* **React Icons**.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente local.

### **Pré-requisitos**

* Docker e Docker Compose instalados.
* Java (JDK) 17 ou superior.
* Node.js e npm (ou yarn).
* Maven.

  
### Passo a passo

#### 1. Iniciar os Bancos de Dados com Docker

Primeiro, vamos iniciar os contêineres do PostgreSQL que servem como banco de dados para os microsserviços. Na raiz do projeto, execute:

```bash
docker compose -f .\compose.yaml up  
```
#### 2. Iniciar o sserviço do Backend

Agora, inicie o sserviço na sua IDE: 

* Execute a aplicação Spring Boot:
        ```bash
        ./mvnw spring-boot:run
        ```
    * O backend estará disponível em `http://localhost:3300`.

#### 3. Iniciar a Aplicação Frontend

Com o backend rodando, vamos iniciar a interface do usuário. Abra um novo terminal e execute os seguintes comandos:

```bash
# 1. Navegue até a pasta do frontend
cd frontend

# 2. Instale as dependências (só é necessário na primeira vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

#### 4. Acessar a Aplicação

Após seguir todos os passos, a aplicação estará disponível no seu navegador. Acesse o seguinte endereço: http://localhost:5174/

