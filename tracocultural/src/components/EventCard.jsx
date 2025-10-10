import React, { useState } from 'react'
import { useFavorites } from '../hooks/useFavorites'

const EventCard = ({ event, onEventClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [loading, setLoading] = useState(false)
  
  const isFavorited = isFavorite(event.id)

  const handleFavorite = async () => {
    try {
      setLoading(true)
      if (isFavorited) {
        await removeFromFavorites(event.id)
      } else {
        await addToFavorites(event.id)
      }
    } catch (error) {
      console.error('Erro ao alterar favorito:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewInfo = () => {
    onEventClick?.(event)
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
            disabled={loading}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          <button 
            className="info-btn"
            onClick={handleViewInfo}
            aria-label="Ver informações do evento"
            title="Ver informações"
          >
            <i className="bi bi-search"></i> Ver mais
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard