import React, { useState, useEffect, useRef } from 'react'
import ImageGallery from './ImageGallery'
import CommentsSection from './CommentsSection'
import './EventModal.css'

/**
 * Modal de detalhes do evento - Componente principal
 * 
 * Props esperadas:
 * - event: objeto com dados do evento (ver schema no final do arquivo)
 * - isOpen: boolean para controlar visibilidade
 * - onClose: função callback para fechar modal
 * 
 * Funcionalidades:
 * - Focus trap (tab cycle dentro do modal)
 * - Fecha com Esc, clique no overlay ou botão X
 * - Responsivo (grid 2-col desktop, empilhado mobile)
 * - Acessibilidade completa (ARIA, focus management)
 */
const EventModal = ({ event, isOpen, onClose }) => {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Focus trap - elementos focáveis dentro do modal
  const getFocusableElements = () => {
    if (!modalRef.current) return []
    return modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  }

  // Gerenciamento de foco ao abrir/fechar modal
  useEffect(() => {
    if (isOpen) {
      // Salva elemento que tinha foco antes do modal
      previousFocusRef.current = document.activeElement
      
      // Foca no botão fechar após animação
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
      
      // Previne scroll do body e esconde estrelas
      document.body.style.overflow = 'hidden'
      const starfield = document.querySelector('.starfield-background')
      if (starfield) {
        starfield.style.display = 'none'
      }
    } else {
      // Restaura foco ao elemento anterior e mostra estrelas
      previousFocusRef.current?.focus()
      document.body.style.overflow = 'unset'
      const starfield = document.querySelector('.starfield-background')
      if (starfield) {
        starfield.style.display = 'block'
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      const starfield = document.querySelector('.starfield-background')
      if (starfield) {
        starfield.style.display = 'block'
      }
    }
  }, [isOpen])

  // Handlers de teclado (Esc para fechar, Tab para focus trap)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap com Tab
      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements()
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          // Shift + Tab (navegação reversa)
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          // Tab normal
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Handlers de ações
  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // Aqui integraria com API para salvar favorito
  }

  const handleShare = () => {
    setShowShareMenu(!showShareMenu)
  }

  const handleTickets = () => {
    if (event?.tickets?.url) {
      window.open(event.tickets.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleMapView = () => {
    // Abrir mapa externo ou modal de mapa
    const { lat, lng } = event?.location || {}
    if (lat && lng) {
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank')
    }
  }

  if (!isOpen || !event) return null

  return (
    <div 
      className="event-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-title"
      aria-describedby="event-meta"
    >
      <div 
        className="event-modal-content"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Cabeçalho do modal com ações */}
        <header className="modal-header">
          <button
            className="action-btn"
            onClick={handleFavorite}
            aria-pressed={isFavorited}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          
          <div className="share-container">
            <button
              className="action-btn"
              onClick={handleShare}
              aria-label="Compartilhar evento"
              title="Compartilhar"
            >
              <i className="bi bi-share"></i>
            </button>
            
            {showShareMenu && (
              <div className="share-menu">
                <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  <i className="bi bi-link-45deg"></i> Copiar link
                </button>
                <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(event.title + ' - ' + window.location.href)}`)}>
                  <i className="bi bi-whatsapp"></i> WhatsApp
                </button>
              </div>
            )}
          </div>
          
          <button
            ref={closeButtonRef}
            className="close-btn"
            onClick={onClose}
            aria-label="Fechar modal"
            title="Fechar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </header>

        {/* Conteúdo principal - Grid 2 colunas no desktop */}
        <div className="modal-body">
          {/* Coluna esquerda - Galeria */}
          <div className="gallery-section">
            <ImageGallery images={event.images || []} alt={event.title} />
          </div>

          {/* Coluna direita - Metadados e ações */}
          <div className="info-section">
            <div className="event-header">
              <h1 id="event-title" className="event-title">{event.title}</h1>
              
              {event.organizer && (
                <a 
                  href={event.organizer.profileUrl} 
                  className="organizer-link"
                  aria-label={`Ver perfil de ${event.organizer.name}`}
                >
                  Por {event.organizer.name}
                </a>
              )}
              
              <div id="event-meta" className="event-meta">
                <span>{event.state} | {event.type}</span>
              </div>
            </div>

            <div className="event-details">
              <div className="detail-item">
                <i className="bi bi-calendar3" aria-hidden="true"></i>
                <div>
                  <strong>Data e horário</strong>
                  <p>{formatEventDate(event.startDate, event.endDate)}</p>
                </div>
              </div>

              {event.location && (
                <div className="detail-item">
                  <i className="bi bi-geo-alt" aria-hidden="true"></i>
                  <div>
                    <strong>Local</strong>
                    <p>{event.location.name}</p>
                    <p className="address">{event.location.address}</p>
                    
                    {/* Ações próximas ao local */}
                    <div className="location-actions">
                      <button 
                        className="map-btn-small"
                        onClick={handleMapView}
                        aria-label="Ver localização no mapa"
                      >
                        <i className="bi bi-map"></i> Ver no mapa
                      </button>
                      
                      {event.tickets?.available && (
                        <button 
                          className="tickets-btn-small"
                          onClick={handleTickets}
                          aria-label="Comprar ingressos"
                        >
                          <i className="bi bi-ticket-perforated"></i>
                          Comprar Ingressos
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ações principais - removidas */}
            <div className="primary-actions" style={{display: 'none'}}>
              <button 
                className="map-btn"
                onClick={handleMapView}
                aria-label="Ver localização no mapa"
              >
                <i className="bi bi-map"></i> Ver no mapa
              </button>
              
              {event.tickets?.available && (
                <button 
                  className="tickets-btn"
                  onClick={handleTickets}
                  aria-label="Comprar ingressos"
                >
                  <i className="bi bi-ticket-perforated"></i>
                  Comprar Ingressos
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Seção de informações detalhadas */}
        <div className="detailed-info">
          <h2>Informações</h2>
          <div 
            className="description"
            dangerouslySetInnerHTML={{ __html: event.description || 'Descrição não disponível.' }}
          />
          
          {event.policies && (
            <div className="policies">
              <h3>Políticas e Informações</h3>
              <ul>
                <li>Política de reembolso disponível no site do organizador</li>
                <li>Sujeito a disponibilidade de ingressos</li>
                <li>Consulte restrições de idade</li>
              </ul>
            </div>
          )}
        </div>

        {/* Seção de comentários/feedbacks */}
        <CommentsSection eventId={event.id} />
      </div>
    </div>
  )
}

// Função auxiliar para formatação de data
const formatEventDate = (startDate, endDate) => {
  if (!startDate) return 'Data a definir'
  
  const start = new Date(startDate)
  const now = new Date()
  const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hoje'
  if (diffDays === 1) return 'Amanhã'
  if (diffDays > 1 && diffDays <= 7) return `Daqui ${diffDays} dias`
  
  return start.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default EventModal

/**
 * Schema esperado para o objeto event:
 * 
 * {
 *   id: "string",
 *   title: "string",
 *   organizer: {
 *     id: "string",
 *     name: "string",
 *     profileUrl: "string"
 *   },
 *   images: ["url1", "url2", ...],
 *   type: "Show/Exposição/Teatro/etc",
 *   state: "SP",
 *   location: {
 *     name: "Teatro X",
 *     address: "Rua Y, 123",
 *     lat: -23.5,
 *     lng: -46.6
 *   },
 *   startDate: "2025-12-15T19:00:00Z",
 *   endDate: "2025-12-15T22:00:00Z",
 *   description: "html/markdown",
 *   tickets: {
 *     available: true,
 *     url: "https://..."
 *   },
 *   policies: {...},
 *   social: {
 *     facebook: "...",
 *     instagram: "..."
 *   }
 * }
 */