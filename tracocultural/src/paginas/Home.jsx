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
          <img src="src/assets/EVENTOCABELOS.jpg" alt="Beleza em Foco 2025" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">💇‍♀️ Beleza em Foco 2025</h3>
            <p className="event-type">Beleza</p>
            <p className="event-date">12 a 14 de março de 2025</p>
            <p className="event-location">📍 São Paulo – SP</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOCARROS.jpg" alt="Car Date" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🚗 Car Date – Encontro Automotivo</h3>
            <p className="event-type">Automotivo</p>
            <p className="event-date">25 de abril de 2025</p>
            <p className="event-location">📍 Curitiba – PR</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOCINEMA.jpg" alt="CinemaLivre" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🎬 CinemaLivre</h3>
            <p className="event-type">Cinema</p>
            <p className="event-date">3 e 4 de maio de 2025</p>
            <p className="event-location">📍 Belo Horizonte – MG</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOCULTIVO.jpg" alt="Cultivo Coletivo 2025" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🌱 Cultivo Coletivo 2025</h3>
            <p className="event-type">Sustentabilidade</p>
            <p className="event-date">10 de junho de 2025</p>
            <p className="event-location">📍 Florianópolis – SC</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOEMPRESA.jpg" alt="BusiExpo 2025" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">💼 BusiExpo 2025</h3>
            <p className="event-type">Negócios</p>
            <p className="event-date">22 a 24 de agosto de 2025</p>
            <p className="event-location">📍 Brasília – DF</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOFESTA.jpg" alt="Fresio Festival" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🎉 Fresio Festival</h3>
            <p className="event-type">Festival</p>
            <p className="event-date">7 e 8 de setembro de 2025</p>
            <p className="event-location">📍 Recife – PE</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOFESTIVAL.jpg" alt="Festival do Dia das Crianças" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🎠 Festival do Dia das Crianças</h3>
            <p className="event-type">Infantil</p>
            <p className="event-date">12 de outubro de 2025</p>
            <p className="event-location">📍 Salvador – BA</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOLIVROS.jpg" alt="Book Fair" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">📚 Book Fair – Feira Literária</h3>
            <p className="event-type">Literatura</p>
            <p className="event-date">19 a 22 de outubro de 2025</p>
            <p className="event-location">📍 Porto Alegre – RS</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTONATAL.jpg" alt="Natal Encantado de Gramado" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🎄 Natal Encantado de Gramado</h3>
            <p className="event-type">Natal</p>
            <p className="event-date">5 a 28 de dezembro de 2025</p>
            <p className="event-location">📍 Gramado – RS</p>
            <div className="event-actions">
              <button className="btn-ver-mais">Ver mais</button>
              <button className="btn-favoritar"><i className="bi bi-heart"></i></button>
            </div>
          </div>
        </div>

        <div className="event-card">
          <img src="src/assets/EVENTOTEATRO.jpg" alt="Os Quintessenciais" className="event-image" />
          <div className="event-content">
            <h3 className="event-title">🎭 Os Quintessenciais – A Comédia do Ano</h3>
            <p className="event-type">Teatro</p>
            <p className="event-date">15 de novembro de 2025</p>
            <p className="event-location">📍 Rio de Janeiro – RJ</p>
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