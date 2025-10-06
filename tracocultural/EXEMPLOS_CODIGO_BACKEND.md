# 💻 Exemplos de Código Backend - TracoCultural

## 🔧 Configuração Base (Node.js + Express)

### package.json
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "mysql2": "^3.6.0",
    "dotenv": "^16.0.0"
  }
}
```

### server.js
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

## 🔐 Autenticação

### middleware/auth.js
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
```

### routes/auth.js
```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário no banco
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = users[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // RESPOSTA OBRIGATÓRIA PARA O FRONTEND
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se email já existe
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    // Gerar token
    const token = jwt.sign(
      { id: result.insertId, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // RESPOSTA OBRIGATÓRIA PARA O FRONTEND
    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role: 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
  // Aqui você pode invalidar o token se usar blacklist
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
```

---

## 👤 Usuários

### routes/users.js
```javascript
const express = require('express');
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, role, avatar, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// PUT /api/users/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    await db.execute(
      'UPDATE users SET name = ?, email = ?, avatar = ? WHERE id = ?',
      [name, email, avatar, req.user.id]
    );

    // Retornar dados atualizados
    const [users] = await db.execute(
      'SELECT id, name, email, role, avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// GET /api/users (Admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// DELETE /api/users/:id (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
```

---

## 🎭 Eventos

### routes/events.js
```javascript
const express = require('express');
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/events (Público)
router.get('/', async (req, res) => {
  try {
    const [events] = await db.execute(
      'SELECT * FROM events ORDER BY date ASC'
    );

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// GET /api/events/:id (Público)
router.get('/:id', async (req, res) => {
  try {
    const [events] = await db.execute(
      'SELECT * FROM events WHERE id = ?',
      [req.params.id]
    );

    if (events.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    res.json(events[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// POST /api/events (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, date, location, image, category } = req.body;

    const [result] = await db.execute(
      'INSERT INTO events (title, description, date, location, image, category) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, date, location, image, category]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      date,
      location,
      image,
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// PUT /api/events/:id (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, date, location, image, category } = req.body;

    await db.execute(
      'UPDATE events SET title = ?, description = ?, date = ?, location = ?, image = ?, category = ? WHERE id = ?',
      [title, description, date, location, image, category, req.params.id]
    );

    res.json({ message: 'Evento atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// DELETE /api/events/:id (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Evento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
```

---

## ⭐ Favoritos

### routes/favorites.js
```javascript
const express = require('express');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [favorites] = await db.execute(`
      SELECT f.id, f.event_id as eventId, f.created_at,
             e.title, e.description, e.date, e.location, e.image, e.category
      FROM favorites f
      JOIN events e ON f.event_id = e.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `, [req.user.id]);

    // Formatar resposta para o frontend
    const formattedFavorites = favorites.map(fav => ({
      id: fav.id,
      eventId: fav.eventId,
      event: {
        id: fav.eventId,
        title: fav.title,
        description: fav.description,
        date: fav.date,
        location: fav.location,
        image: fav.image,
        category: fav.category
      },
      created_at: fav.created_at
    }));

    res.json(formattedFavorites);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// POST /api/favorites
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.body;

    // Verificar se já está nos favoritos
    const [existing] = await db.execute(
      'SELECT id FROM favorites WHERE user_id = ? AND event_id = ?',
      [req.user.id, eventId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Evento já está nos favoritos' });
    }

    // Adicionar aos favoritos
    await db.execute(
      'INSERT INTO favorites (user_id, event_id) VALUES (?, ?)',
      [req.user.id, eventId]
    );

    res.status(201).json({ message: 'Evento adicionado aos favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// DELETE /api/favorites/:eventId
router.delete('/:eventId', authMiddleware, async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM favorites WHERE user_id = ? AND event_id = ?',
      [req.user.id, req.params.eventId]
    );

    res.json({ message: 'Evento removido dos favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
```

---

## 💬 Comentários

### routes/comments.js (adicionar ao events.js)
```javascript
// GET /api/events/:id/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const [comments] = await db.execute(`
      SELECT c.id, c.user_id as userId, c.comment, c.rating, c.created_at,
             u.name as userName, u.avatar as userAvatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.event_id = ?
      ORDER BY c.created_at DESC
    `, [req.params.id]);

    // Formatar resposta
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      userId: comment.userId,
      user: {
        name: comment.userName,
        avatar: comment.userAvatar
      },
      comment: comment.comment,
      rating: comment.rating,
      created_at: comment.created_at
    }));

    res.json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// POST /api/events/:id/comments
router.post('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const eventId = req.params.id;

    const [result] = await db.execute(
      'INSERT INTO comments (user_id, event_id, comment, rating) VALUES (?, ?, ?, ?)',
      [req.user.id, eventId, comment, rating]
    );

    // Retornar comentário criado com dados do usuário
    const [newComment] = await db.execute(`
      SELECT c.id, c.comment, c.rating, c.created_at,
             u.name as userName, u.avatar as userAvatar
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      id: newComment[0].id,
      userId: req.user.id,
      user: {
        name: newComment[0].userName,
        avatar: newComment[0].userAvatar
      },
      comment: newComment[0].comment,
      rating: newComment[0].rating,
      created_at: newComment[0].created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});
```

---

## 📊 Dashboard

### routes/dashboard.js
```javascript
const express = require('express');
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Contar usuários
    const [userCount] = await db.execute('SELECT COUNT(*) as total FROM users');
    
    // Contar eventos
    const [eventCount] = await db.execute('SELECT COUNT(*) as total FROM events');
    
    // Contar comentários
    const [commentCount] = await db.execute('SELECT COUNT(*) as total FROM comments');

    // Atividade recente
    const [recentActivity] = await db.execute(`
      SELECT 'user_registered' as type, 
             CONCAT('Novo usuário: ', name) as message,
             created_at as date
      FROM users 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    res.json({
      totalUsers: userCount[0].total,
      totalEvents: eventCount[0].total,
      totalFeedbacks: commentCount[0].total,
      recentActivity: recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
```

---

## 🗄️ Configuração do Banco

### config/database.js
```javascript
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tracocultural',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
```

### .env
```env
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=tracocultural
PORT=3001
```

### SQL para criar tabelas
```sql
CREATE DATABASE tracocultural;
USE tracocultural;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL,
  location VARCHAR(255),
  image TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, event_id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Inserir usuário admin padrão
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@tracocultural.com', '$2a$10$hash_da_senha_aqui', 'admin');
```

---

## 🚀 Como Usar

1. **Copie os códigos** para seus arquivos
2. **Configure o banco** com o SQL fornecido
3. **Ajuste as variáveis** no .env
4. **Instale as dependências**: `npm install`
5. **Inicie o servidor**: `npm start`
6. **Teste com o frontend** alterando a URL em `api.js`

**🎯 Comece implementando na ordem: Auth → Users → Events → Favorites → Comments → Dashboard**