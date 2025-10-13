import React, { useState } from 'react'

const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const events = [
    { id: 1, title: 'Festival de Jazz', location: 'São Paulo', date: '2024-12-20', status: 'ativo' },
    { id: 2, title: 'Exposição de Arte', location: 'Rio de Janeiro', date: '2024-12-25', status: 'ativo' },
    { id: 3, title: 'Teatro Clássico', location: 'Belo Horizonte', date: '2024-12-30', status: 'pendente' }
  ]

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-events">
      <div className="section-header">
        <h1>Gerenciar Eventos</h1>
        <p>Administre os eventos da plataforma</p>
      </div>

      <div className="events-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn">
          <i className="bi bi-plus"></i>
          Novo Evento
        </button>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=180&fit=crop" alt={event.title} />
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p><i className="bi bi-geo-alt"></i> {event.location}</p>
              <p><i className="bi bi-calendar"></i> {event.date}</p>
              <span className={`event-status ${event.status}`}>{event.status}</span>
            </div>
            <div className="event-actions">
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

export default AdminEvents