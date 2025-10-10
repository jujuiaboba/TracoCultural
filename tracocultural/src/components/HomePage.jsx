import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventContext'
import Navbar from './Navbar'
import SearchSection from './SearchSection'
import EventsSection from './EventsSection'
import StarfieldBackground from './StarfieldBackground'
import EventModal from './EventModal'
import FavoritesPage from './FavoritesPage'
import SettingsPage from './SettingsPage'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { events, loading, error, searchEvents } = useEvents()
  
  // Estados do componente
  const [selectedState, setSelectedState] = useState('SP')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ type: '', location: '', date: '' })
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Handler para clique em evento
  const handleEventClick = (event) => {
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

  // Handler para favoritos
  const handleFavoritesClick = () => {
    setShowFavorites(true)
  }

  // Handler para configurações
  const handleSettingsClick = () => {
    setShowSettings(true)
  }

  // Handler para voltar ao início
  const handleHomeClick = () => {
    setShowFavorites(false)
    setShowSettings(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  // Renderização condicional para página de favoritos
  if (showFavorites) {
    return (
      <FavoritesPage 
        onBack={() => setShowFavorites(false)} 
        onLogout={handleLogout}
        onExploreEvents={() => setShowFavorites(false)}
        onHomeClick={handleHomeClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
      />
    )
  }

  // Renderização condicional para página de configurações
  if (showSettings) {
    return (
      <SettingsPage 
        onBack={() => setShowSettings(false)} 
        onLogout={handleLogout}
        onHomeClick={handleHomeClick}
        onProfileClick={handleProfileClick}
        onFavoritesClick={handleFavoritesClick}
      />
    )
  }

  return (
    <div className="home-container">
      {/* Fundo animado com estrelas */}
      <StarfieldBackground />
      
      {/* Navbar fixa no topo */}
      <Navbar currentPage="home" />
      
      {/* Conteúdo principal */}
      <main className="home-content">
        {/* Seção de pesquisa e filtros */}
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          onSearch={searchEvents}
        />
        
        {loading && <div className="loading">Carregando eventos...</div>}
        {error && <div className="error">{error}</div>}
        
        {/* Seção "O que vamos fazer?" */}
        <EventsSection 
          title="O que vamos fazer?"
          events={events}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          showLocationIcon={true}
          layout="carousel"
          onEventClick={handleEventClick}
        />
        
        {/* Seção "Mais pelo Brasil!" */}
        <EventsSection 
          title="Mais pelo Brasil."
          events={events}
          layout="grid"
          onEventClick={handleEventClick}
        />
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

export default HomePage