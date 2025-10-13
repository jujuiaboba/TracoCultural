import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../estilos/HomePage.css'

const Home = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    carregarEventos()
  }, [])

  const carregarEventos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8080/api/evento', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const adicionarFavorito = async (eventId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8080/api/favorito/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        carregarEventos()
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>TracoCultural</h1>
        <nav className="user-menu">
          <span>Olá, {user?.name}</span>
          <button onClick={() => navigate('/favoritos')}>Favoritos</button>
          <button onClick={handleLogout}>Sair</button>
        </nav>
      </header>

      <main className="events-section">
        <h2>Eventos Culturais</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Data:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Local:</strong> {event.location}</p>
                <button 
                  onClick={() => adicionarFavorito(event.id)}
                  className={`favorite-btn ${event.isFavorite ? 'favorited' : ''}`}
                >
                  {event.isFavorite ? '❤️ Favoritado' : '🤍 Favoritar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home