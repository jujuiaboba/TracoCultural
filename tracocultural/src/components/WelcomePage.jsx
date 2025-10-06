import React, { useState } from 'react'
import StarfieldBackground from './StarfieldBackground'
import LoginPage from './LoginPage'
import './WelcomePage.css'

const WelcomePage = ({ onLogin }) => {

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
          <button 
            className="btn btn-primary"
            onClick={() => onLogin('', 'redirect')}
            aria-label="Entrar ou cadastrar-se na plataforma"
          >
            Entre ou Cadastre-se
          </button>
        </nav>
      </div>
    </main>
  )
}

export default WelcomePage