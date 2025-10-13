import React, { useState } from 'react'

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'user', status: 'ativo' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'user', status: 'ativo' },
    { id: 3, name: 'Admin Sistema', email: 'admin@tracocultural.com', role: 'admin', status: 'ativo' }
  ]

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-users">
      <div className="section-header">
        <h1>Usuários Cadastrados</h1>
        <p>Gerencie os usuários da plataforma</p>
      </div>

      <div className="users-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Tipo</span>
          <span>Status</span>
          <span>Ações</span>
        </div>
        
        {filteredUsers.map(user => (
          <div key={user.id} className="table-row">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
            <span className={`user-role ${user.role}`}>{user.role === 'admin' ? 'Admin' : 'Usuário'}</span>
            <span className={`user-status ${user.status}`}>{user.status}</span>
            <div className="user-actions">
              <button className="action-btn edit">
                <i className="bi bi-pencil"></i>
              </button>
              <button className="action-btn delete">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsers