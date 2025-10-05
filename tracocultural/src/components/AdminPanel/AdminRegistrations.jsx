import React, { useState } from 'react'

const AdminRegistrations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const registrations = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', date: '2024-12-15', status: 'pendente' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', date: '2024-12-14', status: 'aprovado' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', date: '2024-12-13', status: 'rejeitado' }
  ]

  const filteredRegistrations = registrations.filter(reg => 
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-registrations">
      <div className="section-header">
        <h1>Cadastros Pendentes</h1>
        <p>Gerencie os cadastros de usuários</p>
      </div>

      <div className="registrations-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar cadastros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="registrations-table">
        <div className="table-header">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Data</span>
          <span>Status</span>
          <span>Ações</span>
        </div>
        
        {filteredRegistrations.map(registration => (
          <div key={registration.id} className="table-row">
            <span className="reg-name">{registration.name}</span>
            <span className="reg-email">{registration.email}</span>
            <span className="reg-date">{registration.date}</span>
            <span className={`reg-status ${registration.status}`}>{registration.status}</span>
            <div className="reg-actions">
              <button className="action-btn approve">
                <i className="bi bi-check"></i>
              </button>
              <button className="action-btn reject">
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminRegistrations