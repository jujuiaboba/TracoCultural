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
      image: 'https://picsum.photos/260/160?random=1'
    },
    {
      id: 2,
      title: 'Exposição de Arte Moderna',
      state: 'RJ',
      type: 'Exposição',
      date: 'Daqui 3 dias',
      image: 'https://picsum.photos/260/160?random=2'
    },
    {
      id: 3,
      title: 'Peça Teatral Clássica',
      state: 'MG',
      type: 'Teatro',
      date: '15/12/2024',
      image: 'https://picsum.photos/260/160?random=3'
    },
    {
      id: 4,
      title: 'Workshop de Fotografia',
      state: 'RS',
      type: 'Workshop',
      date: 'Fim de semana',
      image: 'https://picsum.photos/260/160?random=4'
    },
    {
      id: 5,
      title: 'Cinema ao Ar Livre',
      state: 'PR',
      type: 'Cinema',
      date: 'Daqui 7 dias',
      image: 'https://picsum.photos/260/160?random=5'
    },
    {
      id: 6,
      title: 'Festival Gastronômico',
      state: 'SC',
      type: 'Festival',
      date: '20/12/2024',
      image: 'https://picsum.photos/260/160?random=6'
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