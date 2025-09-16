import React, { useState } from 'react'

const EventCard = ({ event }) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // Implementar lógica de favoritos
    console.log(`Evento ${event.title} ${isFavorited ? 'removido dos' : 'adicionado aos'} favoritos`)
  }

  const handleViewInfo = () => {
    // Implementar navegação para detalhes do evento
    console.log('Ver informações do evento:', event.title)
  }

  return (
    <div className="event-card">
      {/* Imagem do evento */}
      <div className="event-image">
        <img 
          src={event.image} 
          alt={event.title}
          loading="lazy"
        />
      </div>
      
      {/* Informações do evento */}
      <div className="event-info">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-details">
          {event.state} | {event.type}
        </p>
        <p className="event-date">{event.date}</p>
        
        {/* Botões de ação */}
        <div className="event-actions">
          <button 
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorited ? '❤️' : '🤍'}
          </button>
          <button 
            className="info-btn"
            onClick={handleViewInfo}
            aria-label="Ver informações do evento"
            title="Ver informações"
          >
            🔎 Ver mais
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard