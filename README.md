# Sistema de Controle de Estoque - SAEP

Sistema de controle de estoque desenvolvido com Spring Boot (backend) e React (frontend).

## Requisitos
- Java 25
- Node.js
- MySQL 8.0

## Instalação

### Banco de Dados
1. Execute o script `saep_db.sql` no MySQL para criar o banco e popular os dados.

### Backend (Spring Boot)
1. Acesse a pasta `BackEnd/Java`
2. Edite o arquivo `src/main/resources/application.properties` para configurar seu usuário e senha do MySQL
3. Execute a aplicação Spring Boot (usando sua IDE ou `mvnw spring-boot:run`)

### Frontend (React)
1. Acesse a pasta `FrontEnd/saep-estoque`
2. Instale as dependências: `npm install`
3. Execute o frontend: `npm run dev`

## Usuários Padrão
- Admin: login `admin`, senha `123`
- Carlos: login `carlos`, senha `123`
- Maria: login `maria`, senha `123`
