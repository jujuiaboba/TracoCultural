# 🚀 Tutorial Completo - Integração Backend TracoCultural

## 📋 Índice
1. [Configuração Inicial](#1-configuração-inicial)
2. [Autenticação (CRÍTICO)](#2-autenticação-crítico)
3. [Gerenciamento de Usuários](#3-gerenciamento-de-usuários)
4. [Sistema de Eventos](#4-sistema-de-eventos)
5. [Sistema de Favoritos](#5-sistema-de-favoritos)
6. [Comentários e Feedbacks](#6-comentários-e-feedbacks)
7. [Dashboard Administrativo](#7-dashboard-administrativo)
8. [Testes e Validação](#8-testes-e-validação)

---

## 1. 🔧 Configuração Inicial

### 1.1 Alterar URL da API
**📁 Arquivo**: `src/services/api.js` (linha 4)

```javascript
// ANTES:
const API_BASE_URL = 'http://localhost:3001/api'

// DEPOIS - ALTERE PARA SUA URL:
const API_BASE_URL = 'http://SEU_SERVIDOR:PORTA/api'
// Exemplos:
// const API_BASE_URL = 'http://localhost:8080/api'
// const API_BASE_URL = 'https://meubackend.herokuapp.com/api'
```

### 1.2 Estrutura de Banco Necessária
Seu backend precisa das seguintes tabelas:

```sql
-- Usuários
users (id, name, email, password, role, avatar, created_at)

-- Eventos  
events (id, title, description, date, location, image, category, created_at)

-- Favoritos
favorites (id, user_id, event_id, created_at)

-- Comentários
comments (id, user_id, event_id, comment, rating, created_at)
```

---

## 2. 🔐 Autenticação (CRÍTICO)

### 2.1 Endpoint de Login
**🎯 IMPLEMENTAR PRIMEIRO**

```javascript
// POST /api/auth/login
// Body: { email: "user@email.com", password: "senha123" }

// RESPOSTA OBRIGATÓRIA:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com", 
    "role": "user" // ou "admin"
  }
}
```

**⚠️ IMPORTANTE**: O campo `role` determina se é admin ou usuário comum.

### 2.2 Endpoint de Registro

```javascript
// POST /api/auth/register
// Body: { name: "João", email: "joao@email.com", password: "senha123" }

// RESPOSTA IGUAL AO LOGIN:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "user"
  }
}
```

### 2.3 Middleware de Autenticação
Seu backend deve verificar o token em todas as rotas protegidas:

```javascript
// Header obrigatório nas rotas protegidas:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.4 Endpoint de Logout

```javascript
// POST /api/auth/logout
// Headers: Authorization: Bearer {token}
// Resposta: { message: "Logout realizado com sucesso" }
```

---

## 3. 👤 Gerenciamento de Usuários

### 3.1 Perfil do Usuário

```javascript
// GET /api/users/profile
// Headers: Authorization: Bearer {token}

// RESPOSTA:
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "user",
  "avatar": "https://exemplo.com/avatar.jpg",
  "created_at": "2024-01-01T10:00:00Z"
}
```

### 3.2 Atualizar Perfil

```javascript
// PUT /api/users/profile  
// Headers: Authorization: Bearer {token}
// Body: { name: "Novo Nome", email: "novo@email.com", avatar: "url" }

// RESPOSTA: Dados atualizados do usuário
```

### 3.3 Listar Usuários (Admin Only)

```javascript
// GET /api/users
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"

// RESPOSTA:
[
  {
    "id": 1,
    "name": "João Silva", 
    "email": "joao@email.com",
    "role": "user",
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

### 3.4 Deletar Usuário (Admin Only)

```javascript
// DELETE /api/users/:id
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"
```

---

## 4. 🎭 Sistema de Eventos

### 4.1 Listar Eventos (Público)

```javascript
// GET /api/events
// Sem autenticação necessária

// RESPOSTA:
[
  {
    "id": 1,
    "title": "Festival de Música",
    "description": "Grande festival com artistas locais",
    "date": "2024-12-25T20:00:00Z",
    "location": "Praça Central",
    "image": "https://exemplo.com/evento1.jpg",
    "category": "música",
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

### 4.2 Detalhes do Evento

```javascript
// GET /api/events/:id
// Sem autenticação necessária

// RESPOSTA: Objeto do evento com todos os detalhes
```

### 4.3 Criar Evento (Admin Only)

```javascript
// POST /api/events
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"
// Body: { title, description, date, location, image, category }
```

### 4.4 Atualizar Evento (Admin Only)

```javascript
// PUT /api/events/:id
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"
```

### 4.5 Deletar Evento (Admin Only)

```javascript
// DELETE /api/events/:id
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"
```

---

## 5. ⭐ Sistema de Favoritos

### 5.1 Listar Favoritos do Usuário

```javascript
// GET /api/favorites
// Headers: Authorization: Bearer {token}

// RESPOSTA:
[
  {
    "id": 1,
    "eventId": 5,
    "event": {
      "id": 5,
      "title": "Festival de Música",
      "description": "...",
      "date": "2024-12-25T20:00:00Z",
      "image": "https://exemplo.com/evento.jpg"
    },
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

### 5.2 Adicionar aos Favoritos

```javascript
// POST /api/favorites
// Headers: Authorization: Bearer {token}
// Body: { eventId: 5 }

// RESPOSTA: { message: "Evento adicionado aos favoritos" }
```

### 5.3 Remover dos Favoritos

```javascript
// DELETE /api/favorites/:eventId
// Headers: Authorization: Bearer {token}

// RESPOSTA: { message: "Evento removido dos favoritos" }
```

---

## 6. 💬 Comentários e Feedbacks

### 6.1 Listar Comentários do Evento

```javascript
// GET /api/events/:id/comments
// Sem autenticação necessária

// RESPOSTA:
[
  {
    "id": 1,
    "userId": 2,
    "user": {
      "name": "Maria Santos",
      "avatar": "https://exemplo.com/avatar.jpg"
    },
    "comment": "Evento incrível! Recomendo muito.",
    "rating": 5,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```

### 6.2 Adicionar Comentário

```javascript
// POST /api/events/:id/comments
// Headers: Authorization: Bearer {token}
// Body: { comment: "Texto do comentário", rating: 5 }

// RESPOSTA: Comentário criado com dados do usuário
```

### 6.3 Listar Todos os Feedbacks (Admin Only)

```javascript
// GET /api/feedbacks
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"

// RESPOSTA: Array com todos os comentários de todos os eventos
```

### 6.4 Deletar Feedback (Admin Only)

```javascript
// DELETE /api/feedbacks/:id
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"
```

---

## 7. 📊 Dashboard Administrativo

### 7.1 Estatísticas Gerais

```javascript
// GET /api/dashboard/stats
// Headers: Authorization: Bearer {token}
// Permissão: role === "admin"

// RESPOSTA:
{
  "totalUsers": 150,
  "totalEvents": 25, 
  "totalFeedbacks": 89,
  "recentActivity": [
    {
      "type": "user_registered",
      "message": "Novo usuário: João Silva",
      "date": "2024-01-01T10:00:00Z"
    },
    {
      "type": "event_created", 
      "message": "Evento criado: Festival de Música",
      "date": "2024-01-01T09:00:00Z"
    }
  ]
}
```

---

## 8. 🧪 Testes e Validação

### 8.1 Checklist de Implementação

**✅ Autenticação**
- [ ] Login retorna token e dados do usuário
- [ ] Register cria usuário e retorna token
- [ ] Middleware verifica token em rotas protegidas
- [ ] Logout invalida token

**✅ Usuários**
- [ ] GET /users/profile retorna dados do usuário logado
- [ ] PUT /users/profile atualiza dados
- [ ] GET /users lista usuários (admin only)
- [ ] DELETE /users/:id remove usuário (admin only)

**✅ Eventos**
- [ ] GET /events lista todos os eventos
- [ ] GET /events/:id retorna evento específico
- [ ] POST /events cria evento (admin only)
- [ ] PUT /events/:id atualiza evento (admin only)
- [ ] DELETE /events/:id remove evento (admin only)

**✅ Favoritos**
- [ ] GET /favorites lista favoritos do usuário
- [ ] POST /favorites adiciona evento aos favoritos
- [ ] DELETE /favorites/:eventId remove dos favoritos

**✅ Comentários**
- [ ] GET /events/:id/comments lista comentários
- [ ] POST /events/:id/comments adiciona comentário
- [ ] GET /feedbacks lista todos (admin only)
- [ ] DELETE /feedbacks/:id remove comentário (admin only)

**✅ Dashboard**
- [ ] GET /dashboard/stats retorna estatísticas (admin only)

### 8.2 Testando com o Frontend

1. **Inicie seu backend** na porta configurada
2. **Altere a URL** em `src/services/api.js`
3. **Teste o login** primeiro
4. **Verifique se o token** está sendo enviado nas requisições
5. **Teste cada funcionalidade** uma por vez

### 8.3 Debugging

**Problemas Comuns:**
- **CORS**: Configure CORS no backend para aceitar requisições do frontend
- **Token inválido**: Verifique se o middleware está validando corretamente
- **Campos faltando**: Certifique-se que as respostas têm todos os campos esperados

---

## 🎯 Ordem de Implementação Recomendada

1. **Autenticação** (login/register) - CRÍTICO
2. **Perfil do usuário** (get/update profile)
3. **Eventos** (listar/detalhes)
4. **Favoritos** (adicionar/remover/listar)
5. **Comentários** (listar/adicionar)
6. **Admin - Usuários** (listar/deletar)
7. **Admin - Eventos** (criar/editar/deletar)
8. **Admin - Dashboard** (estatísticas)

**🚀 Comece pela autenticação e vá testando cada parte antes de prosseguir!**