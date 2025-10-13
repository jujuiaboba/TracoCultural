import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../estilos/FavoritesPage.css'

const Favoritos = () => {
  const navigate = useNavigate()
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarFavoritos()
  }, [])

  const carregarFavoritos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/favorito', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setFavoritos(data)
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
    } finally {
      setLoading(false)
    }
  }

  const removerFavorito = async (eventId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8080/api/favorito/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        carregarFavoritos()
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="favorites-container">
      <header className="favorites-header">
        <button onClick={() => navigate('/home')} className="back-btn">← Voltar</button>
        <h1>Meus Favoritos</h1>
      </header>

      <main className="favorites-content">
        {favoritos.length === 0 ? (
          <p className="empty-message">Você ainda não tem eventos favoritos.</p>
        ) : (
          <div className="favorites-grid">
            {favoritos.map(event => (
              <div key={event.id} className="favorite-card">
                <img src={event.image} alt={event.title} />
                <div className="favorite-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Local:</strong> {event.location}</p>
                  <button 
                    onClick={() => removerFavorito(event.id)}
                    className="remove-favorite-btn"
                  >
                    Remover dos Favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Favoritos