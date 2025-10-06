# 🧑‍🔧 API Mecânica - Backend

Um projeto de API RESTful para o gerenciamento de uma oficina mecânica.

## Descrição

Esta API foi desenvolvida para facilitar o gerenciamento de clientes, veículos e agendamentos de uma oficina mecânica. O sistema permite o cadastro, consulta, atualização e exclusão de informações essenciais para o dia a dia do negócio.

## Tecnologias Utilizadas

* **Node.js + + TypeScript**
* **Express.js**
* **Prisma** (ORM)
* **PostgreSQL** (Banco de Dados)
* **Swagger** (Documentação da API)
* **Zod**(Validação de esquemas)

## 🚀 Como Executar a Aplicação

Siga os passos abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos:**
* Node.js (versão 18 ou superior)
* NPM ou Yarn
* Um banco do PostgreSQL rodando

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Brunocmv1/api-mecanica.git
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd api-mecanica
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    * Altere o nome do `.env.example` para `.env`
    * Mude a linha para seu usuário, senha e nome do banco

    **OU**
    
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Copie o conteúdo abaixo para dentro do arquivo `.env` e substitua pelos seus dados:

    ```env
    # URL de conexão com o banco de dados PostgreSQL
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/NOME_DO_BANCO"
    ```

5.  **Execute as migrações do banco de dados com o Prisma:**
    ```bash
    npx prisma generate

    npx prisma migrate dev
    ```

6.  **Inicie a aplicação:**
    ```bash
    npm run dev
    ```

## 📚Endpoints da API

**Swagger UI**
* Acesse a documentação interativa em: http://localhost:3000/api-docs

#### 👥 Clientes
* `POST /clientes` - Cria um novo cliente.
* `GET /clientes` - Lista todos os clientes.
* `GET /clientes/:id` - Obtém um cliente pelo ID.
* `PUT /clientes/:id` - Atualiza um cliente.
* `DELETE /clientes/:id` - Remove um cliente.

#### 🚗 Veículos
* `POST /veiculos` - Cria um novo veículo, associando a um cliente.
* `GET /veiculos` - Lista todos os veículos.
* `GET /veiculos/:id` - Obtém um veículo pelo ID.
* `PUT /veiculos/:id` - Atualiza um veículo.
* `DELETE /veiculos/:id` - Remove um veículo.
* `GET /veiculos/cliente/:id` - Obtém um veículo pelo ID do cliente.

#### 📅 Agendamentos
* `POST /agendamentos` - Cria um novo agendamento.
* `GET /agendamentos` - Lista todos os agendamentos.
* `GET /agendamentos/veiculo/:id` - Obtém os agendamentos do veículo pelo ID do veículo.
* `GET /agendamentos/cliente/:id` - Obtém os agendamentos do cliente pelo ID do cliente.
* `PUT /agendamentos/:id` - Atualiza um agendamento.
* `DELETE /agendamentos/:id` - Remove um agendamento.

## Autor

**Bruno Cavalcante**

* **LinkedIn**: [https://www.linkedin.com/in/brunocavalcantemvf]
* **GitHub**: [https://github.com/Brunocmv1]
