# 🧑‍🔧 API Mecânica

API RESTful para o gerenciamento de clientes, veículos e agendamentos de uma oficina mecânica.

---

## 📝 Descrição

Este projeto fornece os endpoints necessários para:

✔ Cadastrar, listar, atualizar e remover clientes  
✔ Cadastrar e gerenciar veículos associados  
✔ Criar e controlar agendamentos  
✔ Autenticação com JWT e segurança com bcrypt  

---

## 🛠️ Tecnologias Utilizadas

### 📌 Back-end (`/api`)
- **Node.js + TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger** (documentação)
- **Zod** (validações)
- **Bcryptjs**

### 🎨 Front-end (`/frontend`)
- **React + TypeScript**
- **Vite**
- **Material UI (MUI)** — Estilo Glassmorphism
- **React Router**
- **Axios** (requisições à API)

---

## 🚀 Como Executar a Aplicação

### 📋 Pré-requisitos
- Node.js 18+
- NPM ou Yarn
- Banco PostgreSQL rodando

---

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Brunocmv1/api-mecanica.git
cd api-mecanica
```

### 2️⃣ Configure as variáveis de ambiente:
* Altere o nome do `.env.example` para `.env` 
* Mude a linha para seu usuário, senha e nome do banco 
**OU**
* Crie um arquivo chamado `.env` na raiz do projeto.
* Copie o conteúdo abaixo para dentro do arquivo `.env` e substitua pelos seus dados:


  ```env
    # URL de conexão com o banco de dados PostgreSQL
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@localhost:5432/NOME_DO_BANCO"
  ```
### 3️⃣ Configure o Backend

  ```bash
    cd api

    # Instale dependências
    npm install

    # Gere o Prisma Client
    npx prisma generate

    # Execute migrações
    npx prisma migrate dev

    # Povoamento do Banco (cria o Gerente Admin)
    npx ts-node src/scripts/seed.ts
  ```
**Inicie o servidor:**

  ```bash
    npm run dev
  ```
* Servidor rodando em: http://localhost:3333
* Swagger disponível em: http://localhost:3333/api-docs

    
### 4️⃣ Configure o Frontend
Abra um novo terminal (mantendo a API rodando) e volte para a raiz do projeto.

Acesse a pasta do Frontend:

   ```bash
    cd frontend
   ```
   ```bash
    # Instale dependências
    npm install

    # Inicie o servidor de desenvolvimento
    npm run dev
   ```
* Aplicação disponível em: http://localhost:5173/

## 📚Endpoints da API

### 🔐 Autenticação
   ```bash
    POST /login
    Content-Type: application/json

    {
     "email": "admin@mecanica.com",
     "senha": "123456"
    }
   ```

#### 👥 Gerentes
* `POST /gerentes` - Cria um novo gerente.
* `GET /gerentes` - Lista todos os gerentes.
* `GET /gerentes/:id` - Obtém um gerente pelo ID.
* `PUT /gerentes/:id` - Atualiza um gerente.
* `DELETE /gerentes/:id` - Remove um gerente.

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

## 📖 Swagger UI
Acesse a documentação interativa em:
  ```bash
    http://localhost:3333/api-docs
  ```
## 👨‍💻 Autores

**Bruno Cavalcante**

* **LinkedIn**: [https://www.linkedin.com/in/brunocavalcantemvf]
* **GitHub**: [https://github.com/Brunocmv1]

**Matheus Calixto**

* **LinkedIn**: [https://www.linkedin.com/in/matheus-calixto-/]
* **GitHub**: [https://github.com/MatCalixto]
