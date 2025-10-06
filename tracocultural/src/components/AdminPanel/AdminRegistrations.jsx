import React, { useState } from 'react'

const AdminRegistrations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const registrations = [
    { id: 1, eventName: 'Festival de Jazz no Parque', organizerName: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', eventDate: '2024-03-15', location: 'Parque Ibirapuera, SP', contactMethod: 'WhatsApp', date: '2024-12-15', status: 'pendente' },
    { id: 2, eventName: 'Exposição de Arte Contemporânea', organizerName: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', eventDate: '2024-04-20', location: 'Galeria Municipal, RJ', contactMethod: 'E-mail', date: '2024-12-14', status: 'aprovado' },
    { id: 3, eventName: 'Teatro Infantil - Os Três Porquinhos', organizerName: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', eventDate: '2024-02-28', location: 'Teatro Municipal, MG', contactMethod: 'Telefone', date: '2024-12-13', status: 'rejeitado' }
  ]

  const filteredRegistrations = registrations.filter(reg => 
    reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.organizerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-registrations">
      <div className="section-header">
        <h1>Solicitações de Eventos</h1>
        <p>Gerencie solicitações de cadastro de eventos recebidas via contato externo</p>
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
          <span>Evento</span>
          <span>Organizador</span>
          <span>Contato</span>
          <span>Data do Evento</span>
          <span>Local</span>
          <span>Status</span>
          <span>Ações</span>
        </div>
        
        {filteredRegistrations.map(registration => (
          <div key={registration.id} className="table-row">
            <span className="reg-name">{registration.eventName}</span>
            <span className="reg-organizer">{registration.organizerName}</span>
            <span className="reg-contact">{registration.phone}<br/><small>via {registration.contactMethod}</small></span>
            <span className="reg-date">{registration.eventDate}</span>
            <span className="reg-location">{registration.location}</span>
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