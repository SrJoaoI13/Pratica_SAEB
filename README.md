# Sistema de Controle de Estoque - SAEP

Sistema de controle de estoque desenvolvido com Spring Boot (backend) e React (frontend).

## Requisitos Funcionais

### RF01 - Autenticação
O sistema deve permitir que usuários realizem login.
- Validar usuário e senha
- Exibir mensagem de erro quando inválidos
- Retornar para tela de login

### RF02 - Logout
O sistema deve permitir logout.
- Encerrar sessão
- Retornar para tela de login

### RF03 - Cadastro de Produtos
O sistema deve permitir cadastrar produtos.
- Campos: Código, Nome, Categoria, Descrição, Quantidade Atual, Estoque Mínimo, Unidade, Peso, Data Cadastro

### RF04 - Listagem de Produtos
O sistema deve listar produtos automaticamente ao abrir a tela.

### RF05 - Busca de Produtos
O sistema deve permitir pesquisar produtos por Nome ou Categoria.

### RF06 - Alteração de Produto
O sistema deve permitir editar produtos cadastrados.

### RF07 - Exclusão de Produto
O sistema deve permitir excluir produtos.

### RF08 - Movimentação de Estoque
O sistema deve permitir Entrada e Saída de estoque.
- Quantidade
- Data
- Usuário responsável

### RF09 - Controle de Estoque Mínimo
Ao realizar uma saída, se quantidade_atual <= estoque_minimo, exibir alerta.

### RF10 - Histórico de Movimentações
O sistema deve registrar:
- Produto
- Tipo (Entrada/Saída)
- Quantidade
- Data
- Usuário

## Infraestrutura

### Tecnologias Utilizadas
- **Backend**: Java 25 + Spring Boot 4.0.6 + Spring Data JPA
- **Frontend**: React 19 + Vite + JavaScript
- **Banco de Dados**: MySQL 8.0
- **IDE**: IntelliJ IDEA / VS Code

### Requisitos de Sistema
- Java 25+
- Node.js 18+
- MySQL 8.0+
- Windows 10/11

### Estrutura de Pastas
```
Pratica_SAEB/
├── BackEnd/
│   └── Java/
│       └── src/
│           ├── main/
│           │   ├── java/com/example/demo/
│           │   │   ├── controller/
│           │   │   ├── model/
│           │   │   ├── repository/
│           │   │   └── DemoApplication.java
│           │   └── resources/
│           │       └── application.properties
│           └── pom.xml
├── FrontEnd/
│   └── saep-estoque/
│       ├── src/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── context/
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
├── saep_db.sql
├── update-fk.sql
└── README.md
```

## Manual do Usuário

### Instalação

#### 1. Banco de Dados
1. Abra o MySQL Workbench
2. Conecte-se ao seu servidor MySQL
3. Execute o script `saep_db.sql` para criar o banco e popular os dados
4. Execute o script `update-fk.sql` para configurar a exclusão em cascata

#### 2. Backend (Spring Boot)
1. Acesse a pasta `BackEnd/Java`
2. Edite o arquivo `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```
3. Execute a aplicação Spring Boot (usando sua IDE ou `mvnw spring-boot:run`)
4. O backend estará disponível em `http://localhost:8080`

#### 3. Frontend (React)
1. Acesse a pasta `FrontEnd/saep-estoque`
2. Instale as dependências: `npm install`
3. Execute o frontend: `npm run dev`
4. Acesse o sistema no navegador (o Vite mostrará o link, ex: `http://localhost:5173`)

### Usuários Padrão
| Usuário | Login | Senha |
|---------|-------|-------|
| Administrador | admin | 123 |
| Carlos | carlos | 123 |
| Maria | maria | 123 |

### Como Usar o Sistema

#### Tela de Login
1. Digite seu login e senha
2. Clique em "Entrar"

#### Tela Principal
1. Visualize a mensagem de boas-vindas
2. Selecione a opção desejada:
   - **Cadastro de Produtos**: Gerencie os produtos
   - **Gestão de Estoque**: Realize entradas e saídas
   - **Logout**: Sair do sistema

#### Cadastro de Produtos
1. Para **pesquisar**: Digite o nome ou categoria no campo de busca
2. Para **adicionar**: Clique em "Novo Produto", preencha os dados e clique em "Salvar"
3. Para **editar**: Clique em "Editar" na linha do produto, altere os dados e clique em "Salvar"
4. Para **excluir**: Clique em "Excluir" na linha do produto e confirme

#### Gestão de Estoque
1. Selecione o produto
2. Selecione o tipo de movimentação (Entrada ou Saída)
3. Digite a quantidade
4. Verifique a data
5. Clique em "Registrar"
6. Se a quantidade ficar abaixo do estoque mínimo, um alerta será exibido

## Algoritmo de Ordenação

O sistema utiliza o **Bubble Sort** para ordenar os produtos por nome.

### Implementação
```javascript
const bubbleSort = (arr) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j].nome.localeCompare(arr[j + 1].nome, 'pt-BR', { sensitivity: 'base' }) > 0) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};
```

### Funcionamento
1. Compara pares de elementos adjacentes
2. Troca-os se estiverem na ordem errada
3. Repete o processo até que nenhum swap seja necessário
4. Resultado: lista ordenada por nome em ordem alfabética (case insensitive)

## Testes/Evidências

### Casos de Teste

| Caso | Ação | Entrada | Resultado Esperado |
|------|------|---------|--------------------|
| 1 | Login válido | admin / 123 | Entra no sistema |
| 2 | Login inválido | admin / 999 | Mensagem de erro |
| 3 | Cadastrar produto | Dados válidos | Produto salvo |
| 4 | Editar produto | Novos dados válidos | Produto atualizado |
| 5 | Excluir produto | Confirmar exclusão | Produto removido |
| 6 | Entrada de estoque | +10 unidades | Quantidade atualizada |
| 7 | Saída de estoque | -5 unidades | Quantidade atualizada |
| 8 | Estoque mínimo | Quantidade <= mínimo | Alerta exibido |
| 9 | Buscar produto | Nome ou categoria | Produtos filtrados |
| 10 | Logout | Clicar em logout | Retorna à tela de login |

### Evidências de Funcionamento

#### Tela de Login
- Campo de usuário e senha
- Botão de entrar
- Mensagem de erro para credenciais inválidas

#### Tela Principal
- Mensagem de boas-vindas com nome do usuário
- Botões para navegação
- Botão de logout

#### Tela de Produtos
- Lista de produtos em tabela
- Campo de busca
- Botões de novo, editar e excluir
- Modal para cadastro/edição
- Modal de confirmação para exclusão

#### Tela de Estoque
- Seleção de produto
- Botões de rádio para entrada/saída
- Campo de quantidade
- Campo de data
- Botão de registrar
- Alertas de estoque mínimo
