import React, { useState } from 'react'

const AdminFeedbacks = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const feedbacks = [
    { id: 1, user: 'João Silva', event: 'Festival de Jazz', rating: 5, comment: 'Evento incrível!', date: '2024-12-15' },
    { id: 2, user: 'Maria Santos', event: 'Exposição de Arte', rating: 4, comment: 'Muito bom, recomendo.', date: '2024-12-14' },
    { id: 3, user: 'Pedro Costa', event: 'Teatro Clássico', rating: 3, comment: 'Poderia ser melhor.', date: '2024-12-13' }
  ]

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.event.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="admin-feedbacks">
      <div className="section-header">
        <h1>Feedbacks Recebidos</h1>
        <p>Visualize os feedbacks dos usuários</p>
      </div>

      <div className="feedbacks-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar feedbacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="feedbacks-grid">
        {filteredFeedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-header">
              <div className="feedback-user">
                <i className="bi bi-person-circle"></i>
                <span>{feedback.user}</span>
              </div>
              <div className="feedback-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`bi ${i < feedback.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                ))}
              </div>
            </div>
            <div className="feedback-event">
              <i className="bi bi-calendar-event"></i>
              <span>{feedback.event}</span>
            </div>
            <div className="feedback-comment">
              <p>"{feedback.comment}"</p>
            </div>
            <div className="feedback-date">
              <small>{feedback.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminFeedbacks