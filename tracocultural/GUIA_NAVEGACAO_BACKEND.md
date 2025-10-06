# 🧭 Guia de Navegação - Como Encontrar e Implementar no Backend

## 📂 Estrutura Típica de Backend que Você Deve Procurar

```
seu-backend/
├── routes/          # 🎯 AQUI ESTÃO OS ENDPOINTS
│   ├── auth.js      # Login, register, logout
│   ├── users.js     # Perfil, listar usuários
│   ├── events.js    # CRUD de eventos
│   ├── favorites.js # Sistema de favoritos
│   └── dashboard.js # Estatísticas admin
├── controllers/     # 🎯 OU AQUI (se usar MVC)
├── middleware/      # 🔐 Autenticação e permissões
├── models/          # 🗄️ Estrutura do banco
└── server.js        # 🚀 Arquivo principal
```

---

## 🔍 Como Localizar Cada Funcionalidade

### 1. 🔐 **AUTENTICAÇÃO** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/auth.js` ou `controllers/auth.js`
- `routes/login.js` ou `auth/login.js`
- Qualquer arquivo com "auth", "login", "register"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.post('/login', ...)
app.post('/register', ...)
app.post('/logout', ...)

// Ou:
router.post('/auth/login', ...)
router.post('/auth/register', ...)
```

**✅ O que implementar:**
- **Login**: Receber email/senha → Validar → Retornar token + dados do usuário
- **Register**: Receber dados → Criar usuário → Retornar token + dados
- **Logout**: Invalidar token (opcional)

---

### 2. 👤 **USUÁRIOS** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/users.js` ou `controllers/users.js`
- `routes/profile.js`
- Qualquer arquivo com "user", "profile"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.get('/users/profile', ...)
app.put('/users/profile', ...)
app.get('/users', ...)        // Lista usuários (admin)
app.delete('/users/:id', ...) // Deletar usuário (admin)
```

**✅ O que implementar:**
- **GET /users/profile**: Retornar dados do usuário logado
- **PUT /users/profile**: Atualizar dados do usuário
- **GET /users**: Listar todos os usuários (só admin)
- **DELETE /users/:id**: Deletar usuário (só admin)

---

### 3. 🎭 **EVENTOS** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/events.js` ou `controllers/events.js`
- Qualquer arquivo com "event", "evento"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.get('/events', ...)         // Listar eventos
app.get('/events/:id', ...)     // Detalhes do evento
app.post('/events', ...)        // Criar evento (admin)
app.put('/events/:id', ...)     // Editar evento (admin)
app.delete('/events/:id', ...)  // Deletar evento (admin)
```

**✅ O que implementar:**
- **GET /events**: Listar todos os eventos (público)
- **GET /events/:id**: Detalhes de um evento (público)
- **POST /events**: Criar evento (só admin)
- **PUT /events/:id**: Editar evento (só admin)
- **DELETE /events/:id**: Deletar evento (só admin)

---

### 4. ⭐ **FAVORITOS** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/favorites.js` ou `controllers/favorites.js`
- Pode estar dentro de `routes/users.js`
- Qualquer arquivo com "favorite", "favorito"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.get('/favorites', ...)           // Listar favoritos do usuário
app.post('/favorites', ...)          // Adicionar aos favoritos
app.delete('/favorites/:eventId', ...)  // Remover dos favoritos
```

**✅ O que implementar:**
- **GET /favorites**: Listar favoritos do usuário logado
- **POST /favorites**: Adicionar evento aos favoritos
- **DELETE /favorites/:eventId**: Remover evento dos favoritos

---

### 5. 💬 **COMENTÁRIOS** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/comments.js` ou `controllers/comments.js`
- Pode estar dentro de `routes/events.js`
- Qualquer arquivo com "comment", "feedback", "review"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.get('/events/:id/comments', ...)    // Comentários do evento
app.post('/events/:id/comments', ...)   // Adicionar comentário
app.get('/feedbacks', ...)              // Todos os feedbacks (admin)
app.delete('/feedbacks/:id', ...)       // Deletar feedback (admin)
```

**✅ O que implementar:**
- **GET /events/:id/comments**: Listar comentários de um evento
- **POST /events/:id/comments**: Adicionar comentário a um evento
- **GET /feedbacks**: Listar todos os comentários (só admin)
- **DELETE /feedbacks/:id**: Deletar comentário (só admin)

---

### 6. 📊 **DASHBOARD ADMIN** - Procure por:

**📁 Arquivos para encontrar:**
- `routes/dashboard.js` ou `controllers/dashboard.js`
- `routes/admin.js`
- Qualquer arquivo com "dashboard", "admin", "stats"

**🔍 O que procurar dentro:**
```javascript
// Procure por rotas como:
app.get('/dashboard/stats', ...)  // Estatísticas gerais
app.get('/admin/stats', ...)
```

**✅ O que implementar:**
- **GET /dashboard/stats**: Retornar estatísticas (total usuários, eventos, comentários)

---

## 🔐 Middleware de Autenticação - Procure por:

**📁 Arquivos para encontrar:**
- `middleware/auth.js`
- `middleware/authentication.js`
- `utils/auth.js`
- Pode estar no início dos arquivos de rota

**🔍 O que procurar:**
```javascript
// Procure por funções como:
function authenticateToken(req, res, next)
function verifyToken(req, res, next)
function authMiddleware(req, res, next)
function isAdmin(req, res, next)
```

**✅ O que implementar:**
- Verificar se o token JWT é válido
- Extrair dados do usuário do token
- Verificar se o usuário é admin (para rotas administrativas)

---

## 🗄️ Banco de Dados - Procure por:

**📁 Arquivos para encontrar:**
- `models/` (se usar ORM como Sequelize, Mongoose)
- `config/database.js`
- `db/` ou `database/`
- Arquivos SQL de migração

**🔍 Tabelas que você precisa:**
```sql
users (id, name, email, password, role, avatar)
events (id, title, description, date, location, image, category)
favorites (id, user_id, event_id)
comments (id, user_id, event_id, comment, rating)
```

---

## 🎯 Estratégia de Implementação

### **PASSO 1: Encontre o arquivo principal**
- Procure por `server.js`, `app.js`, `index.js`
- Veja como as rotas estão organizadas

### **PASSO 2: Localize a autenticação**
- Encontre onde está o login/register
- Implemente primeiro (é a base de tudo)

### **PASSO 3: Siga a ordem:**
1. **Autenticação** (login/register)
2. **Perfil do usuário** (get/update profile)
3. **Eventos** (listar/detalhes)
4. **Favoritos** (adicionar/remover/listar)
5. **Comentários** (listar/adicionar)
6. **Admin** (usuários/dashboard)

### **PASSO 4: Teste cada parte**
- Use Postman ou Insomnia para testar
- Teste antes de prosseguir para a próxima

---

## 🔍 Dicas para Encontrar Rapidamente

### **Busque por palavras-chave nos arquivos:**
- `Ctrl+Shift+F` (VS Code) para buscar em todo o projeto
- Procure por: "login", "register", "events", "favorites", "comments"

### **Veja as rotas existentes:**
- Procure por `app.get`, `app.post`, `router.get`, `router.post`
- Veja a estrutura de URLs que já existe

### **Identifique o padrão:**
- Se tem `/api/` no início das URLs
- Como está organizado (por funcionalidade ou por método)

---

## ⚠️ Pontos Críticos

### **1. URL Base**
- Certifique-se que a URL no frontend (`api.js`) bate com seu backend
- Exemplo: se seu backend roda em `localhost:8080`, altere no `api.js`

### **2. Estrutura de Resposta**
- **Login/Register DEVE retornar**: `{ token, user: { id, name, email, role } }`
- **Eventos DEVE retornar**: Array com objetos contendo `id, title, description, date, location, image`

### **3. Autenticação**
- Todas as rotas protegidas devem verificar o token
- Token deve ser enviado como: `Authorization: Bearer {token}`

### **4. Permissões Admin**
- Rotas de admin devem verificar se `user.role === 'admin'`
- Usuários comuns não podem acessar rotas administrativas

---

## 🚀 Começe Agora!

1. **Abra seu projeto backend**
2. **Procure pela estrutura de pastas** descrita acima
3. **Encontre o arquivo de autenticação** primeiro
4. **Implemente login/register** seguindo as especificações
5. **Teste com o frontend** alterando a URL no `api.js`
6. **Continue com as outras funcionalidades** na ordem sugerida

**💡 Lembre-se: Implemente uma funcionalidade por vez e teste antes de prosseguir!**