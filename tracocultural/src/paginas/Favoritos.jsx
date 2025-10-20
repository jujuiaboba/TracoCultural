import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import '../estilos/FavoritesPage.css'
import '../estilos/Modal.css'

const Favoritos = ({ user, onLogout }) => {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      image: 'src/assets/EVENTOCABELOS.jpg',
      titulo: '💇♀️ Beleza em Foco 2025',
      tipo: 'Beleza',
      data: '12 a 14 de março de 2025',
      local: 'São Paulo – SP'
    },
    {
      id: 2,
      image: 'src/assets/EVENTOCINEMA.jpg',
      titulo: '🎬 CinemaLivre',
      tipo: 'Cinema',
      data: '3 e 4 de maio de 2025',
      local: 'Belo Horizonte – MG'
    },
    {
      id: 3,
      image: 'src/assets/EVENTOFESTA.jpg',
      titulo: '🎉 Fresio Festival',
      tipo: 'Festival',
      data: '7 e 8 de setembro de 2025',
      local: 'Recife – PE'
    }
  ])
  const navigate = useNavigate()

  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(evento => evento.id !== id))
  }



  return (
    <div className="favorites-page">
      <Navbar onLogout={onLogout} />

      {/* Título */}
      <section className="title-section">
        <h2 className="main-title">Meus Eventos Favoritos</h2>
      </section>

      {/* Lista de Favoritos */}
      <main className="favorites-content">
        {favoritos.length === 0 ? (
          <div className="empty-favorites">
            <p>Você ainda não tem eventos favoritos.</p>
            <button className="btn-explore" onClick={() => navigate('/home')}>Explorar Eventos</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoritos.map(evento => (
              <div key={evento.id} className="favorite-card">
                <img src={evento.image} alt={evento.titulo} className="favorite-image" />
                <div className="favorite-content">
                  <h3 className="favorite-title">{evento.titulo}</h3>
                  <p className="favorite-type">{evento.tipo}</p>
                  <p className="favorite-date">{evento.data}</p>
                  <p className="favorite-location">📍 {evento.local}</p>
                  <div className="favorite-actions">
                    <button className="btn-ver-mais">Ver mais</button>
                    <button className="btn-remover" onClick={() => removerFavorito(evento.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
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