import React from 'react'
import { Link } from 'react-router-dom'
import StarfieldBackground from './StarfieldBackground'
import './WelcomePage.css'

const WelcomePage = () => {

  return (
    <main className="welcome-container">
      {/* Fundo com estrelas cadentes */}
      <StarfieldBackground />
      
      {/* Conteúdo principal centralizado */}
      <div className="content">
        <header>
          <img src="/src/assets/TRAÇO.png" alt="TracoCultural" className="welcome-logo" />
          <h1 className="main-title">Para onde vamos hoje?</h1>
        </header>
        
        {/* Navegação com botões de ação */}
        <nav className="action-buttons">
          <Link 
            to="/login"
            className="btn btn-primary"
            aria-label="Entrar ou cadastrar-se na plataforma"
          >
            Entre ou Cadastre-se
          </Link>
        </nav>
      </div>
    </main>
  )
}

export default WelcomePage