import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../estilos/HomePage.css'

const Home = ({ user, onLogout }) => {
  const [eventos, setEventos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Simulação de dados de eventos
    const eventosSimulados = [
      {
        id: 1,
        titulo: 'Festival de Música',
        data: '2024-02-15',
        local: 'Centro Cultural',
        descricao: 'Festival com artistas locais'
      },
      {
        id: 2,
        titulo: 'Exposição de Arte',
        data: '2024-02-20',
        local: 'Museu da Cidade',
        descricao: 'Exposição de arte contemporânea'
      }
    ]
    setEventos(eventosSimulados)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout()
      navigate('/')
    }
  }



  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Bem-vindo, {user?.nome || 'Usuário'}!</h1>
        <nav>
          <Link to="/favoritos">Favoritos</Link>
          <button onClick={handleLogout}>Sair</button>
        </nav>
      </header>

      <main className="home-content">
        <h2>Eventos Culturais</h2>
        <div className="eventos-lista">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card">
              <h3>{evento.titulo}</h3>
              <p><strong>Data:</strong> {evento.data}</p>
              <p><strong>Local:</strong> {evento.local}</p>
              <p>{evento.descricao}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home