import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../estilos/FavoritesPage.css'

const Favoritos = ({ user, onLogout }) => {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      titulo: 'Festival de Música',
      data: '2024-02-15',
      local: 'Centro Cultural'
    }
  ])

  const removerFavorito = (id) => {
    setFavoritos(favoritos.filter(evento => evento.id !== id))
  }

  if (!user) {
    return (
      <div className="favorites-page">
        <p>Você precisa estar logado para ver esta página.</p>
        <Link to="/logar">Fazer login</Link>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <h1>Meus Favoritos</h1>
        <nav>
          <Link to="/home">Home</Link>
          <button onClick={onLogout}>Sair</button>
        </nav>
      </header>

      <main className="favorites-content">
        {favoritos.length === 0 ? (
          <p>Você ainda não tem eventos favoritos.</p>
        ) : (
          <div className="favoritos-lista">
            {favoritos.map(evento => (
              <div key={evento.id} className="favorito-card">
                <h3>{evento.titulo}</h3>
                <p><strong>Data:</strong> {evento.data}</p>
                <p><strong>Local:</strong> {evento.local}</p>
                <button onClick={() => removerFavorito(evento.id)}>
                  Remover dos Favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Favoritos