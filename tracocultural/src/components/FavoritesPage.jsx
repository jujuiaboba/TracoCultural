import React, { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import Navbar from './Navbar'
import StarfieldBackground from './StarfieldBackground'
import EventModal from './EventModal'
import './HomePage.css'
import './FavoritesPage.css'

const FavoritesPage = ({ onBack, onLogout, onExploreEvents, onHomeClick, onProfileClick, onSettingsClick }) => {
  // Estados do componente
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favoriteEvents, setFavoriteEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      const favorites = await userService.getFavorites()
      setFavoriteEvents(favorites)
    } catch (err) {
      setError('Erro ao carregar favoritos')
      console.error('Erro ao carregar favoritos:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handler para remover evento dos favoritos
  const handleRemoveFavorite = async (eventId) => {
    try {
      await userService.removeFromFavorites(eventId)
      setFavoriteEvents(prev => prev.filter(event => event.id !== eventId))
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
    }
  }

  // Handler para ver evento
  const handleViewEvent = (event) => {
    const expandedEvent = {
      ...event,
      organizer: { id: '1', name: 'Produtora Cultural SP', profileUrl: '#' },
      images: [event.image],
      location: { name: 'Centro Cultural', address: 'Rua das Artes, 123', lat: -23.5505, lng: -46.6333 },
      startDate: '2024-12-20T20:00:00Z',
      description: '<p>Um evento incrível que promete emocionar todos os participantes.</p>',
      tickets: { available: true, url: 'https://example.com/tickets' }
    }
    setSelectedEvent(expandedEvent)
    setIsModalOpen(true)
  }

  // Handler para explorar eventos
  const handleExploreEvents = () => {
    onExploreEvents ? onExploreEvents() : onBack()
  }

  return (
    <div className="favorites-page">
      <Navbar 
        onLogout={onLogout} 
        onProfileClick={onProfileClick}
        onFavoritesClick={() => {}}
        onSettingsClick={onSettingsClick}
        onHomeClick={onHomeClick}
        currentPage="favorites"
      />
      
      {/* Fundo animado com estrelas */}
      <StarfieldBackground />
      
      {/* Conteúdo principal */}
      <main className="favorites-content">
        
        {/* Cabeçalho da página */}
        <header className="favorites-header">
          <div className="header-title">
            <i className="bi bi-heart-fill"></i>
            <h1>Meus Favoritos</h1>
          </div>
          <p className="header-subtitle">Aqui estão os eventos que você salvou</p>
        </header>

        {/* Área principal com cards */}
        {loading ? (
          <div className="loading">Carregando favoritos...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : favoriteEvents.length > 0 ? (
          <div className="favorites-grid">
            {favoriteEvents.map(event => (
              <div key={event.id} className="event-card">
                {/* Imagem do evento */}
                <div className="event-image">
                  <img src={event.image} alt={event.title} loading="lazy" />
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
                      className="favorite-btn favorited"
                      onClick={() => handleRemoveFavorite(event.id)}
                      aria-label="Remover dos favoritos"
                      title="Remover dos favoritos"
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                    <button 
                      className="info-btn"
                      onClick={() => handleViewEvent(event)}
                      aria-label="Ver informações do evento"
                      title="Ver informações"
                    >
                      <i className="bi bi-search"></i> Ver mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado vazio */
          <div className="empty-state">
            <div className="empty-content">
              <i className="bi bi-emoji-frown"></i>
              <h2>Nenhum evento favoritado</h2>
              <p>Você ainda não favoritou nenhum evento. Explore e salve os que mais gostar!</p>
              <button 
                className="explore-btn"
                onClick={handleExploreEvents}
              >
                Explorar Eventos
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Modal de evento */}
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default FavoritesPage