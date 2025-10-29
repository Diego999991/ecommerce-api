🛒 E-Commerce REST API

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?logo=sqlite)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens)

> API RESTful completa para e-commerce com autenticação JWT, gerenciamento de produtos, carrinho de compras e sistema de pedidos. Construída seguindo princípios de Clean Code e boas práticas de desenvolvimento.



---

## ✨ Funcionalidades

### 🔐 Autenticação & Autorização
- ✅ Registro e login de usuários
- ✅ Autenticação JWT com tokens de acesso
- ✅ Controle de acesso baseado em roles (user/admin)
- ✅ Proteção de rotas sensíveis
- ✅ Hash de senhas com bcrypt (10 rounds)
- ✅ Tokens com expiração configurável

### 🛍️ Gerenciamento de Produtos
- ✅ CRUD completo de produtos (Create, Read, Update, Delete)
- ✅ Busca e filtros por categoria
- ✅ Controle de estoque automático
- ✅ Suporte para imagens de produtos
- ✅ Apenas administradores podem gerenciar produtos
- ✅ Validação de dados de entrada

### 🛒 Carrinho de Compras
- ✅ Adicionar/remover produtos do carrinho
- ✅ Atualizar quantidades de itens
- ✅ Cálculo automático do total
- ✅ Validação de estoque em tempo real
- ✅ Carrinho isolado por usuário
- ✅ Prevenção de itens duplicados

### 📦 Sistema de Pedidos
- ✅ Criação de pedidos a partir do carrinho
- ✅ Histórico completo de pedidos do usuário
- ✅ Atualização de status do pedido (admin)
- ✅ Controle de estoque automático ao finalizar compra
- ✅ Transações seguras com Prisma
- ✅ Limpeza automática do carrinho após pedido

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js 20.x** - Runtime JavaScript
- **Express.js 4.x** - Framework web minimalista
- **Prisma 5.x** - ORM moderno e type-safe
- **SQLite** - Banco de dados leve (fácil migração para PostgreSQL)

### Autenticação & Segurança
- **JWT** - JSON Web Tokens para autenticação stateless
- **bcryptjs** - Hash seguro de senhas
- **CORS** - Configuração de origens permitidas
- **Zod** - Validação de schemas

### Ferramentas de Desenvolvimento
- **Nodemon** - Hot reload automático
- **Prisma Studio** - Interface visual para o banco de dados
- **Thunder Client / Postman** - Testes de API

---

## 🏗️ Arquitetura do Projeto

Estrutura organizada seguindo princípios de separação de responsabilidades:
```
ecommerce-api/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   ├── migrations/            # Histórico de migrações
│   └── dev.db                 # Banco SQLite (desenvolvimento)
│
├── src/
│   ├── config/
│   │   └── prisma.js          # Cliente Prisma singleton
│   │
│   ├── controllers/
│   │   ├── auth.controller.js    # Lógica de autenticação
│   │   ├── product.controller.js # Lógica de produtos
│   │   ├── cart.controller.js    # Lógica do carrinho
│   │   └── order.controller.js   # Lógica de pedidos
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js    # Validação JWT e roles
│   │
│   ├── routes/
│   │   ├── auth.routes.js        # Rotas de autenticação
│   │   ├── product.routes.js     # Rotas de produtos
│   │   ├── cart.routes.js        # Rotas do carrinho
│   │   └── order.routes.js       # Rotas de pedidos
│   │
│   ├── utils/
│   │   └── jwt.js                # Geração e validação de JWT
│   │
│   └── server.js                 # Entry point da aplicação
│
├── .env                       # Variáveis de ambiente (não commitado)
├── .env.example               # Template de variáveis
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Dependências e scripts
└── README.md                  # Este arquivo
```

---

## 📦 Instalação e Configuração

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **Git**

### Passo a Passo

#### 1. Clone o repositório
```bash
git clone https://github.com/Diego999991/ecommerce-api.git
cd ecommerce-api
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="seu-secret-super-seguro-mude-em-producao"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANTE:** Em produção, use um `JWT_SECRET` forte e único!

#### 4. Execute as migrations do banco de dados
```bash
npx prisma migrate dev
```

Isso irá:
- Criar o banco de dados SQLite
- Criar todas as tabelas
- Gerar o Prisma Client

#### 5. (Opcional) Abra o Prisma Studio
```bash
npx prisma studio
```

Interface visual do banco em: `http://localhost:5555`

#### 6. Inicie o servidor
```bash
npm run dev
```

A API estará disponível em: **http://localhost:3000** 🚀

---

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

---

## 🔐 Endpoints de Autenticação

### 1. Registrar Usuário

Cria um novo usuário no sistema.

**Endpoint:**
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Validações:**
- `name`: obrigatório
- `email`: obrigatório, formato válido, único
- `password`: obrigatório, mínimo 6 caracteres

**Response (201 Created):**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "abc123-def456-ghi789",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user",
    "createdAt": "2025-01-27T22:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros Possíveis:**
- `400` - Campos obrigatórios faltando
- `400` - Email já cadastrado
- `400` - Senha muito curta

---

### 2. Login

Autentica um usuário e retorna um token JWT.

**Endpoint:**
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "abc123-def456-ghi789",
    "name": "João Silva",
    "email": "joao@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros Possíveis:**
- `400` - Email ou senha faltando
- `401` - Credenciais inválidas

---

### 3. Ver Perfil

Retorna os dados do usuário autenticado.

**Endpoint:**
```http
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": "abc123-def456-ghi789",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "user",
  "createdAt": "2025-01-27T22:00:00.000Z"
}
```

**Erros Possíveis:**
- `401` - Token não fornecido
- `401` - Token inválido ou expirado
- `404` - Usuário não encontrado

---

## 🛍️ Endpoints de Produtos

### 1. Listar Produtos

Lista todos os produtos com filtros opcionais.

**Endpoint:**
```http
GET /api/products
```

**Query Parameters (opcionais):**
- `category` - Filtrar por categoria
- `search` - Buscar por nome

**Exemplo:**
```http
GET /api/products?category=Eletrônicos&search=notebook
```

**Response (200 OK):**
```json
[
  {
    "id": "prod-123",
    "name": "Notebook Dell Inspiron 15",
    "description": "Intel i7, 16GB RAM, SSD 512GB",
    "price": 3500.00,
    "stock": 10,
    "category": "Eletrônicos",
    "imageUrl": "https://exemplo.com/notebook.jpg",
    "createdAt": "2025-01-27T20:00:00.000Z",
    "updatedAt": "2025-01-27T20:00:00.000Z"
  }
]
```

---

### 2. Buscar Produto por ID

**Endpoint:**
```http
GET /api/products/:id
```

**Response (200 OK):**
```json
{
  "id": "prod-123",
  "name": "Notebook Dell Inspiron 15",
  "description": "Intel i7, 16GB RAM, SSD 512GB",
  "price": 3500.00,
  "stock": 10,
  "category": "Eletrônicos",
  "imageUrl": "https://exemplo.com/notebook.jpg",
  "createdAt": "2025-01-27T20:00:00.000Z",
  "updatedAt": "2025-01-27T20:00:00.000Z"
}
```

**Erros Possíveis:**
- `404` - Produto não encontrado

---

### 3. Criar Produto (Admin)

**Endpoint:**
```http
POST /api/products
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "name": "Mouse Logitech MX Master 3",
  "description": "Mouse ergonômico sem fio",
  "price": 350.00,
  "stock": 25,
  "category": "Periféricos",
  "imageUrl": "https://exemplo.com/mouse.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "Produto criado com sucesso",
  "product": {
    "id": "prod-456",
    "name": "Mouse Logitech MX Master 3",
    "description": "Mouse ergonômico sem fio",
    "price": 350.00,
    "stock": 25,
    "category": "Periféricos",
    "imageUrl": "https://exemplo.com/mouse.jpg",
    "createdAt": "2025-01-27T21:00:00.000Z",
    "updatedAt": "2025-01-27T21:00:00.000Z"
  }
}
```

**Erros Possíveis:**
- `400` - Campos obrigatórios faltando
- `400` - Preço inválido
- `400` - Estoque negativo
- `401` - Não autenticado
- `403` - Não é administrador

---

### 4. Atualizar Produto (Admin)

**Endpoint:**
```http
PUT /api/products/:id
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:** (todos os campos opcionais)
```json
{
  "name": "Mouse Logitech MX Master 3S",
  "price": 380.00,
  "stock": 30
}
```

**Erros Possíveis:**
- `401` - Não autenticado
- `403` - Não é administrador
- `404` - Produto não encontrado

---

### 5. Deletar Produto (Admin)

**Endpoint:**
```http
DELETE /api/products/:id
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200 OK):**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

## 🛒 Endpoints do Carrinho

### 1. Ver Carrinho

**Endpoint:**
```http
GET /api/cart
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "cart-item-123",
      "quantity": 2,
      "product": {
        "id": "prod-123",
        "name": "Notebook Dell Inspiron 15",
        "price": 3500.00,
        "stock": 10
      }
    }
  ],
  "total": "7000.00",
  "itemCount": 1
}
```

---

### 2. Adicionar Item ao Carrinho

**Endpoint:**
```http
POST /api/cart/items
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "prod-123",
  "quantity": 2
}
```

**Response (201 Created):**
```json
{
  "message": "Item adicionado ao carrinho",
  "cartItem": {
    "id": "cart-item-123",
    "quantity": 2,
    "product": {
      "id": "prod-123",
      "name": "Notebook Dell Inspiron 15",
      "price": 3500.00
    }
  }
}
```

**Erros Possíveis:**
- `400` - ProductId ou quantity faltando
- `400` - Quantidade inválida
- `400` - Estoque insuficiente
- `404` - Produto não encontrado

---

### 3. Atualizar Quantidade

**Endpoint:**
```http
PUT /api/cart/items/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 3
}
```

---

### 4. Remover Item do Carrinho

**Endpoint:**
```http
DELETE /api/cart/items/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Item removido do carrinho"
}
```

---

### 5. Limpar Carrinho

**Endpoint:**
```http
DELETE /api/cart
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Carrinho limpo com sucesso"
}
```

---

## 📦 Endpoints de Pedidos

### 1. Criar Pedido

Cria um pedido a partir dos itens do carrinho.

**Endpoint:**
```http
POST /api/orders
```

**Headers:**
```
Authorization: Bearer {token}
```

**Não precisa de body!** O pedido é criado automaticamente a partir do carrinho.

**Response (201 Created):**
```json
{
  "message": "Pedido criado com sucesso",
  "order": {
    "id": "order-789",
    "userId": "user-123",
    "total": 7000.00,
    "status": "pending",
    "createdAt": "2025-01-27T22:00:00.000Z",
    "items": [
      {
        "id": "order-item-001",
        "quantity": 2,
        "price": 3500.00,
        "product": {
          "id": "prod-123",
          "name": "Notebook Dell Inspiron 15"
        }
      }
    ]
  }
}
```

**O que acontece:**
1. ✅ Valida estoque de todos os produtos
2. ✅ Cria o pedido
3. ✅ Diminui o estoque dos produtos
4. ✅ Limpa o carrinho

**Erros Possíveis:**
- `400` - Carrinho vazio
- `400` - Estoque insuficiente

---

### 2. Listar Meus Pedidos

**Endpoint:**
```http
GET /api/orders/my-orders
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "id": "order-789",
    "total": 7000.00,
    "status": "pending",
    "createdAt": "2025-01-27T22:00:00.000Z",
    "items": [...]
  }
]
```

---

### 3. Buscar Pedido Específico

**Endpoint:**
```http
GET /api/orders/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

---

### 4. Atualizar Status do Pedido (Admin)

**Endpoint:**
```http
PATCH /api/orders/:id/status
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Status válidos:**
- `pending` - Pendente
- `processing` - Processando
- `shipped` - Enviado
- `delivered` - Entregue
- `cancelled` - Cancelado

---

## 🧪 Guia de Testes

### Ferramentas Recomendadas

- **Thunder Client** (extensão VSCode)
- **Postman**
- **cURL** (linha de comando)
- **Insomnia**

### Sequência de Testes Recomendada

#### 1️⃣ Registrar Usuário Normal
```http
POST http://localhost:3000/api/auth/register

Body:
{
  "name": "Diego Teste",
  "email": "diego@test.com",
  "password": "123456"
}
```

**✅ Copie o token retornado!**

---

#### 2️⃣ Criar Usuário Admin

**Opção A:** Registre outro usuário e mude o `role` no Prisma Studio
```bash
# Abrir Prisma Studio
npx prisma studio

# Acessar: http://localhost:5555
# 1. Clique em "User"
# 2. Encontre o usuário
# 3. Mude "role" de "user" para "admin"
# 4. Save
```

**Opção B:** Use o SQL direto (avançado)

---

#### 3️⃣ Login como Admin
```http
POST http://localhost:3000/api/auth/login

Body:
{
  "email": "admin@test.com",
  "password": "123456"
}
```

**✅ Copie o token do admin!**

---

#### 4️⃣ Criar Produtos (como Admin)
```http
POST http://localhost:3000/api/products

Headers:
Authorization: Bearer {admin_token}

Body:
{
  "name": "Notebook Dell Inspiron 15",
  "description": "Intel i7, 16GB RAM, SSD 512GB",
  "price": 3500.00,
  "stock": 10,
  "category": "Eletrônicos"
}
```

**Crie mais produtos:**
```json
{
  "name": "Mouse Logitech MX Master 3",
  "description": "Mouse ergonômico sem fio",
  "price": 350.00,
  "stock": 25,
  "category": "Periféricos"
}
```
```json
{
  "name": "Teclado Mecânico Keychron K2",
  "description": "Teclado mecânico wireless RGB",
  "price": 450.00,
  "stock": 15,
  "category": "Periféricos"
}
```

---

#### 5️⃣ Listar Produtos (público)
```http
GET http://localhost:3000/api/products
```

**✅ Copie o `id` de um produto!**

---

#### 6️⃣ Adicionar ao Carrinho (como usuário)
```http
POST http://localhost:3000/api/cart/items

Headers:
Authorization: Bearer {user_token}

Body:
{
  "productId": "cole-id-do-produto-aqui",
  "quantity": 2
}
```

---

#### 7️⃣ Ver Carrinho
```http
GET http://localhost:3000/api/cart

Headers:
Authorization: Bearer {user_token}
```

---

#### 8️⃣ Criar Pedido
```http
POST http://localhost:3000/api/orders

Headers:
Authorization: Bearer {user_token}
```

---

#### 9️⃣ Ver Meus Pedidos
```http
GET http://localhost:3000/api/orders/my-orders

Headers:
Authorization: Bearer {user_token}
```

---

## 🗄️ Modelo de Dados (Prisma Schema)
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  orders    Order[]
  cart      CartItem[]
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Float
  stock       Int
  category    String
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orderItems  OrderItem[]
  cartItems   CartItem[]
}

model Order {
  id        String      @id @default(uuid())
  userId    String
  total     Float
  status    String      @default("pending")
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  
  order     Order    @relation(fields: [orderId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
}

model CartItem {
  id        String   @id @default(uuid())
  userId    String
  productId String
  quantity  Int
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
}
```

---

## 🔐 Segurança

### Implementações de Segurança

✅ **Senhas:**
- Hash com bcrypt (10 rounds)
- Nunca armazenadas em texto plano
- Nunca retornadas em responses

✅ **Autenticação:**
- JWT com expiração configurável
- Token necessário para rotas protegidas
- Validação em middleware dedicado

✅ **Autorização:**
- Role-based access control (RBAC)
- Rotas admin protegidas
- Validação de propriedade de recursos

✅ **Banco de Dados:**
- Prisma protege contra SQL Injection
- Queries parametrizadas
- Validação de tipos

✅ **Validação:**
- Validação de inputs
- Sanitização de dados
- Mensagens de erro genéricas

### Recomendações para Produção

- [ ] Use PostgreSQL ao invés de SQLite
- [ ] Configure HTTPS
- [ ] Implemente rate limiting
- [ ] Adicione logs estruturados
- [ ] Use variáveis de ambiente seguras
- [ ] Configure CORS adequadamente
- [ ] Adicione helmet.js para headers de segurança
- [ ] Implemente refresh tokens
- [ ] Adicione monitoramento (Sentry, etc)

---

## 📝 Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev              # Inicia servidor com nodemon (hot reload)

# Produção
npm start                # Inicia servidor de produção

# Prisma
npm run prisma:studio    # Abre interface visual do banco
npm run prisma:migrate   # Executa novas migrations

# Banco de Dados
npx prisma migrate dev   # Criar nova migration
npx prisma migrate reset # Resetar banco (apaga dados!)
npx prisma generate      # Gerar Prisma Client
npx prisma studio        # Interface visual
```

---

## 🚀 Deploy

### Preparar para Produção

**1. Migrar para PostgreSQL:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
```

**2. Atualizar `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"  // mudou de sqlite
  url      = env("DATABASE_URL")
}
```

**3. Executar migrations:**
```bash
npx prisma migrate deploy
```

---

### Plataformas de Deploy Recomendadas

#### **Railway** ⭐ (Recomendado)
- Deploy fácil com PostgreSQL incluso
- Free tier generoso
- SSL automático

**Steps:**
```bash
# 1. Instalar Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Criar projeto
railway init

# 4. Adicionar PostgreSQL
railway add

# 5. Deploy
railway up
```

---

#### **Render**
- Free tier com banco de dados
- Deploy automático do GitHub
- SSL incluso

**Steps:**
1. Conecte seu repositório GitHub
2. Adicione PostgreSQL addon
3. Configure variáveis de ambiente
4. Deploy automático

---

#### **Heroku**
- Clássico e confiável
- Addons disponíveis
- Fácil escalar
```bash
# Instalar CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create nome-do-app

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main
```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

### Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature:
```bash
   git checkout -b feature/MinhaNovaFeature
```
3. **Commit** suas mudanças:
```bash
   git commit -m 'Add: nova feature incrível'
```
4. **Push** para a branch:
```bash
   git push origin feature/MinhaNovaFeature
```
5. Abra um **Pull Request**

### Padrões de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
refactor: refatora código
test: adiciona testes
chore: tarefas gerais

---

## 📝 Roadmap

### Em Desenvolvimento
- [ ] Implementar testes automatizados (Jest + Supertest)
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Sistema de refresh tokens
- [ ] Rate limiting por usuário

### Futuras Funcionalidades
- [ ] Sistema de avaliações e comentários de produtos
- [ ] Upload de múltiplas imagens por produto
- [ ] Integração com gateway de pagamento (Stripe/PayPal)
- [ ] Notificações por email (SendGrid)
- [ ] Sistema de cupons de desconto
- [ ] Filtros avançados de produtos (preço, marca, etc)
- [ ] Wishlist (lista de desejos)
- [ ] Histórico de visualizações
- [ ] Recomendações de produtos
- [ ] Dashboard de analytics para admin
- [ ] Exportação de relatórios (CSV, PDF)
- [ ] WebSocket para atualizações em tempo real

---



---

## 👨‍💻 Autor

**Diego**

- 🐙 GitHub: [@Diego999991](https://github.com/Diego999991)
- 💼 LinkedIn: [Diego Nobrega](https://www.linkedin.com/in/diego-n%C3%B3brega-042a69352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- 📧 Email: nbmdiego@gmail.com


---

## 🙏 Agradecimentos

- [Prisma](https://www.prisma.io/) - ORM incrível
- [Express.js](https://expressjs.com/) - Framework minimalista
- [Node.js](https://nodejs.org/) - Runtime JavaScript
- Comunidade open-source

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão?

- 🐛 Abra uma [Issue](https://github.com/Diego999991/ecommerce-api/issues)
- 💬 Inicie uma [Discussion](https://github.com/Diego999991/ecommerce-api/discussions)
