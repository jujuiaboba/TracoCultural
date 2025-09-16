import React, { useState } from 'react'
import EventCard from './EventCard'

const EventsSection = ({ title, selectedState, setSelectedState, showLocationIcon, layout }) => {
  const [showStateModal, setShowStateModal] = useState(false)
  
  const states = [
    'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'DF', 'PE', 'CE', 'MA'
  ]

  // Eventos fictícios para demonstração
  const mockEvents = [
    {
      id: 1,
      title: 'Festival de Jazz',
      state: 'SP',
      type: 'Show',
      date: 'Hoje',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=240&h=140&fit=crop'
    },
    {
      id: 2,
      title: 'Exposição de Arte Moderna',
      state: 'RJ',
      type: 'Exposição',
      date: 'Daqui 3 dias',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=240&h=140&fit=crop'
    },
    {
      id: 3,
      title: 'Peça Teatral Clássica',
      state: 'MG',
      type: 'Teatro',
      date: '15/12/2024',
      image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=240&h=140&fit=crop'
    },
    {
      id: 4,
      title: 'Workshop de Fotografia',
      state: 'RS',
      type: 'Workshop',
      date: 'Fim de semana',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=240&h=140&fit=crop'
    },
    {
      id: 5,
      title: 'Cinema ao Ar Livre',
      state: 'PR',
      type: 'Cinema',
      date: 'Daqui 7 dias',
      image: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?w=240&h=140&fit=crop'
    },
    {
      id: 6,
      title: 'Festival Gastronômico',
      state: 'SC',
      type: 'Festival',
      date: '20/12/2024',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=240&h=140&fit=crop'
    }
  ]

  const handleStateSelect = (state) => {
    if (setSelectedState) {
      setSelectedState(state)
    }
    setShowStateModal(false)
  }

  return (
    <section className="events-section">
      {/* Título da seção com ícone de localização */}
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {showLocationIcon && (
          <button 
            className="location-btn"
            onClick={() => setShowStateModal(true)}
            aria-label="Selecionar estado"
            title={`Estado atual: ${selectedState}`}
          >
            📍 {selectedState}
          </button>
        )}
      </div>
      
      {/* Lista de eventos */}
      <div className={`events-container ${layout}`}>
        {mockEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {/* Modal de seleção de estado */}
      {showStateModal && (
        <div className="state-modal-overlay" onClick={() => setShowStateModal(false)}>
          <div className="state-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Selecione um estado</h3>
            <div className="states-grid">
              {states.map(state => (
                <button
                  key={state}
                  className={`state-option ${state === selectedState ? 'active' : ''}`}
                  onClick={() => handleStateSelect(state)}
                >
                  {state}
                </button>
              ))}
            </div>
            <button 
              className="close-modal-btn"
              onClick={() => setShowStateModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default EventsSection