import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../estilos/HomePage.css'

const Home = () => {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const navigate = useNavigate()

  const handleSair = () => {
    navigate('/')
  }

  return (
    <div className="home-page">
      {/* Navbar Superior */}
      <header className="navbar">
        <div className="navbar-brand">
          <img src="src/assets/TRAÇO.png" alt="TraçoCultural" className="navbar-logo" />
        </div>
        <nav className="navbar-nav">
          <button className="nav-button"><i className="bi bi-heart"></i> Eventos Favoritos</button>
          <button className="nav-button"><i className="bi bi-person"></i> Meu Perfil</button>
          <button className="nav-button"><i className="bi bi-gear"></i> Configurações</button>
          <button className="nav-button" onClick={handleSair}><i className="bi bi-box-arrow-right"></i> Sair</button>
        </nav>
      </header>

      {/* Barra de Pesquisa com Localização */}
      <section className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Pesquisar eventos..."
          />
          <select className="location-select">
            <option>AC</option><option>AL</option><option>AP</option><option>AM</option>
            <option>BA</option><option>CE</option><option>DF</option><option>ES</option>
            <option>GO</option><option>MA</option><option>MT</option><option>MS</option>
            <option>MG</option><option>PA</option><option>PB</option><option>PR</option>
            <option>PE</option><option>PI</option><option>RJ</option><option>RN</option>
            <option>RS</option><option>RO</option><option>RR</option><option>SC</option>
            <option selected>SP</option><option>SE</option><option>TO</option>
          </select>
          <button className="filter-button" onClick={() => setShowFilterModal(true)}>Filtros</button>
        </div>
      </section>

      {/* Título */}
      <section className="title-section">
        <h2 className="main-title">O que vamos fazer?</h2>
      </section>

      {/* Grade de Cards de Eventos */}
      <main className="events-grid">
        <div className="event-card">
          <img src="https://via.placeholder.com/300x200" alt="Evento" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">Festival de Música</h3>
            <p className="event-type">Música</p>
            <p className="event-date">15 de Fevereiro</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="https://via.placeholder.com/300x200" alt="Evento" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">Exposição de Arte</h3>
            <p className="event-type">Arte</p>
            <p className="event-date">20 de Fevereiro</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="https://via.placeholder.com/300x200" alt="Evento" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">Teatro Contemporâneo</h3>
            <p className="event-type">Teatro</p>
            <p className="event-date">25 de Fevereiro</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="https://via.placeholder.com/300x200" alt="Evento" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">Dança Folclórica</h3>
            <p className="event-type">Dança</p>
            <p className="event-date">28 de Fevereiro</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Filtros */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Filtros</h3>
            <div className="filter-group">
              <label>Categoria:</label>
              <select>
                <option>Todas</option>
                <option>Música</option>
                <option>Arte</option>
                <option>Teatro</option>
                <option>Dança</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Data:</label>
              <input type="date" />
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowFilterModal(false)}>Aplicar</button>
              <button onClick={() => setShowFilterModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home