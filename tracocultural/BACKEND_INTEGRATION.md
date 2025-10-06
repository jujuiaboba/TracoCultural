# 🔗 Guia de Integração Backend - TracoCultural

## 📍 Pontos de Integração Marcados

### 🔧 Configuração Principal
- **Arquivo**: `src/services/api.js`
- **Linha 4**: `const API_BASE_URL = 'http://localhost:3001/api'` 
  - ⚠️ **ALTERAR** para a URL do seu backend

### 🔐 Autenticação (PRIORIDADE ALTA)

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**: `{ email, password }`
- **Resposta esperada**:
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "user@email.com",
    "role": "user" // ou "admin"
  }
}
```

#### Registro
- **Endpoint**: `POST /api/auth/register`
- **Body**: `{ name, email, password }`
- **Resposta esperada**: Igual ao login

#### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer {token}`

### 👤 Usuários

#### Perfil do Usuário
- **Endpoint**: `GET /api/users/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Resposta**:
```json
{
  "id": 1,
  "name": "Nome",
  "email": "email@email.com",
  "role": "user",
  "avatar": "url_da_imagem"
}
```

#### Atualizar Perfil
- **Endpoint**: `PUT /api/users/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ name, email, avatar, etc }`

#### Listar Usuários (Admin)
- **Endpoint**: `GET /api/users`
- **Headers**: `Authorization: Bearer {token}`
- **Permissão**: Apenas admin

### 🎭 Eventos

#### Listar Eventos
- **Endpoint**: `GET /api/events`
- **Resposta**:
```json
[
  {
    "id": 1,
    "title": "Nome do Evento",
    "description": "Descrição",
    "date": "2024-01-01T10:00:00Z",
    "location": "Local",
    "image": "url_da_imagem",
    "category": "categoria"
  }
]
```

#### Detalhes do Evento
- **Endpoint**: `GET /api/events/:id`

#### Criar Evento (Admin)
- **Endpoint**: `POST /api/events`
- **Headers**: `Authorization: Bearer {token}`
- **Permissão**: Apenas admin

### ⭐ Favoritos

#### Listar Favoritos
- **Endpoint**: `GET /api/favorites`
- **Headers**: `Authorization: Bearer {token}`

#### Adicionar aos Favoritos
- **Endpoint**: `POST /api/favorites`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ eventId }`

#### Remover dos Favoritos
- **Endpoint**: `DELETE /api/favorites/:eventId`
- **Headers**: `Authorization: Bearer {token}`

### 💬 Comentários/Feedbacks

#### Comentários do Evento
- **Endpoint**: `GET /api/events/:id/comments`
- **Resposta**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "user": { "name": "Nome do Usuário" },
    "comment": "Texto do comentário",
    "rating": 5,
    "date": "2024-01-01T10:00:00Z"
  }
]
```

#### Adicionar Comentário
- **Endpoint**: `POST /api/events/:id/comments`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ comment, rating }`

### 📊 Dashboard Admin

#### Estatísticas
- **Endpoint**: `GET /api/dashboard/stats`
- **Headers**: `Authorization: Bearer {token}`
- **Permissão**: Apenas admin
- **Resposta**:
```json
{
  "totalUsers": 150,
  "totalEvents": 25,
  "totalFeedbacks": 89,
  "recentActivity": [...]
}
```

## 🚀 Próximos Passos

1. **Configure a URL do backend** em `src/services/api.js`
2. **Implemente os endpoints** listados acima
3. **Teste a autenticação** primeiro
4. **Implemente eventos** e favoritos
5. **Adicione comentários** e dashboard

## 🔍 Arquivos com Comentários TODO

- `src/services/api.js` - Todos os endpoints
- `src/context/AuthContext.jsx` - Lógica de autenticação
- Procure por `// TODO:` nos arquivos para localizar pontos de integração

## ⚡ Dicas Importantes

- O frontend já está preparado para receber dados reais
- Interceptors do axios adicionam automaticamente o token
- Erros 401 redirecionam para login automaticamente
- Estados de loading já estão implementados