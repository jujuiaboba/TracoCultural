import React, { useState, useEffect } from 'react'

/**
 * Galeria de imagens para o modal de evento
 * 
 * Funcionalidades:
 * - Imagem principal grande com thumbnails abaixo
 * - Navegação por clique, teclado (setas) e touch (swipe)
 * - Carregamento lazy das imagens
 * - Lightbox opcional (clique amplia)
 * - Acessível via teclado
 * 
 * Props:
 * - images: array de URLs das imagens
 * - alt: texto alternativo base para as imagens
 */
const ImageGallery = ({ images = [], alt = 'Imagem do evento' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Fallback para quando não há imagens
  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop'
  ]

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsLightboxOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  // Funções de navegação
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  // Handlers de touch para swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Lightbox handlers
  const openLightbox = () => {
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  return (
    <div className="image-gallery">
      {/* Imagem principal */}
      <div 
        className="main-image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={displayImages[currentIndex]}
          alt={`${alt} - Imagem ${currentIndex + 1} de ${displayImages.length}`}
          className="main-image"
          loading="lazy"
          onClick={openLightbox}
          tabIndex="0"
          role="button"
          aria-label="Clique para ampliar imagem"
        />
        
        {/* Botões de navegação (apenas se houver múltiplas imagens) */}
        {displayImages.length > 1 && (
          <>
            <button
              className="nav-btn prev-btn"
              onClick={goToPrevious}
              aria-label="Imagem anterior"
              title="Imagem anterior"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <button
              className="nav-btn next-btn"
              onClick={goToNext}
              aria-label="Próxima imagem"
              title="Próxima imagem"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </>
        )}
        
        {/* Indicador de posição */}
        {displayImages.length > 1 && (
          <div className="image-counter">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails (apenas se houver múltiplas imagens) */}
      {displayImages.length > 1 && (
        <div className="thumbnails-container">
          <div className="thumbnails">
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Ver imagem ${index + 1}`}
                title={`Imagem ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${alt} - Miniatura ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da imagem"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={displayImages[currentIndex]}
              alt={`${alt} - Visualização ampliada`}
              className="lightbox-image"
            />
            
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Fechar visualização ampliada"
              title="Fechar"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            
            {displayImages.length > 1 && (
              <>
                <button
                  className="lightbox-nav prev"
                  onClick={goToPrevious}
                  aria-label="Imagem anterior"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                
                <button
                  className="lightbox-nav next"
                  onClick={goToNext}
                  aria-label="Próxima imagem"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery