import React, { useState } from 'react'
import Navbar from './Navbar'
import SearchSection from './SearchSection'
import EventsSection from './EventsSection'
import AnimatedWaves from './AnimatedWaves'
import EventModal from './EventModal'
import './HomePage.css'

const HomePage = ({ onLogout, onProfileClick }) => {
  const [selectedState, setSelectedState] = useState('SP')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    date: ''
  })
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEventClick = (event) => {
    const expandedEvent = {
      ...event,
      organizer: { id: '1', name: 'Produtora Cultural SP', profileUrl: '#' },
      images: [event.image, 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop'],
      location: { name: 'Centro Cultural', address: 'Rua das Artes, 123', lat: -23.5505, lng: -46.6333 },
      startDate: '2024-12-20T20:00:00Z',
      description: '<p>Um evento incrível que promete emocionar todos os participantes.</p>',
      tickets: { available: true, url: 'https://example.com/tickets' }
    }
    setSelectedEvent(expandedEvent)
    setIsModalOpen(true)
  }

  return (
    <div className="home-container">
      {/* Fundo animado com ondas */}
      <div className="home-background">
        <AnimatedWaves />
      </div>
      
      {/* Navbar fixa no topo */}
      <Navbar onLogout={onLogout} onProfileClick={onProfileClick} />
      
      {/* Conteúdo principal */}
      <main className="home-content">
        {/* Seção de pesquisa e filtros */}
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        
        {/* Seção "O que vamos fazer?" */}
        <EventsSection 
          title="O que vamos fazer?"
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          showLocationIcon={true}
          layout="carousel"
          onEventClick={handleEventClick}
        />
        
        {/* Seção "Mais pelo Brasil!" */}
        <EventsSection 
          title="Mais pelo Brasil."
          layout="grid"
          onEventClick={handleEventClick}
        />
      </main>
      
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default HomePage