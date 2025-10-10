# Integração com Backend - TracoCultural

## Configuração da API

O projeto está configurado para se conectar com o backend em `http://localhost:8080/api/v1`

### Estrutura de Serviços

#### 1. AuthService (`src/services/authService.js`)
- `login(email, password)` - Login do usuário
- `register(userData)` - Cadastro de novo usuário
- `logout()` - Logout do usuário
- `getCurrentUser()` - Obter dados do usuário atual

#### 2. EventService (`src/services/eventService.js`)
- `getAllEvents()` - Listar todos os eventos
- `getEventById(id)` - Obter evento específico
- `createEvent(eventData)` - Criar novo evento (admin)
- `updateEvent(id, eventData)` - Atualizar evento (admin)
- `deleteEvent(id)` - Deletar evento (admin)
- `searchEvents(query)` - Buscar eventos

#### 3. UserService (`src/services/userService.js`)
- `getUserProfile()` - Obter perfil do usuário
- `updateProfile(userData)` - Atualizar perfil
- `getFavorites()` - Obter eventos favoritos
- `addToFavorites(eventId)` - Adicionar aos favoritos
- `removeFromFavorites(eventId)` - Remover dos favoritos
- `getAllUsers()` - Listar usuários (admin)

#### 4. FeedbackService (`src/services/feedbackService.js`)
- `createFeedback(feedbackData)` - Criar feedback
- `getFeedbacks()` - Obter feedbacks (admin)
- `getEventComments(eventId)` - Obter comentários do evento
- `addComment(eventId, comment)` - Adicionar comentário

### Contextos

#### AuthContext (`src/context/AuthContext.jsx`)
Gerencia o estado de autenticação global:
- `user` - Dados do usuário logado
- `loading` - Estado de carregamento
- `isAuthenticated` - Se o usuário está logado
- `isAdmin` - Se o usuário é admin
- `login()`, `register()`, `logout()` - Métodos de autenticação

#### EventContext (`src/context/EventContext.jsx`)
Gerencia o estado dos eventos:
- `events` - Lista de eventos
- `loading` - Estado de carregamento
- `error` - Mensagens de erro
- `fetchEvents()`, `searchEvents()`, `createEvent()`, etc.

### Hooks Customizados

#### useFavorites (`src/hooks/useFavorites.js`)
- `favorites` - Lista de favoritos
- `addToFavorites()`, `removeFromFavorites()` - Gerenciar favoritos
- `isFavorite(eventId)` - Verificar se é favorito

### Estrutura de Dados Esperada

#### Usuário
```json
{
  "id": "string",
  "nome": "string",
  "email": "string",
  "role": "USER|ADMIN",
  "createdAt": "datetime"
}
```

#### Evento
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "type": "SHOW|EXHIBITION|THEATER|CINEMA|FESTIVAL|WORKSHOP",
  "startDate": "datetime",
  "endDate": "datetime",
  "location": {
    "name": "string",
    "address": "string",
    "city": "string",
    "state": "string"
  },
  "image": "string",
  "organizer": {
    "id": "string",
    "name": "string"
  },
  "tickets": {
    "available": "boolean",
    "url": "string"
  }
}
```

### Autenticação

O sistema usa JWT tokens armazenados no localStorage. O token é automaticamente incluído em todas as requisições através do interceptor do axios.

### Tratamento de Erros

- Erros 401 (não autorizado) redirecionam para a página de login
- Erros de rede são tratados com mensagens amigáveis
- Estados de loading são gerenciados nos contextos

### Configuração

Para alterar a URL base da API, edite o arquivo `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```