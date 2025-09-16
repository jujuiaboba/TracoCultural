import React from 'react'
import AnimatedWaves from './AnimatedWaves'
import './WelcomePage.css'

const WelcomePage = () => {
  return (
    <main className="welcome-container">
      {/* Fundo com gradiente e ondas animadas cobrindo tela inteira */}
      <div className="background-gradient">
        <AnimatedWaves />
      </div>
      
      {/* Conteúdo principal centralizado */}
      <div className="content">
        <header>
          <h1 className="main-title">Para onde vamos hoje?</h1>
        </header>
        
        {/* Navegação com botões de ação */}
        <nav className="action-buttons">
          <button 
            className="btn btn-primary"
            aria-label="Entrar ou cadastrar-se na plataforma"
          >
            Entrar ou Cadastrar-se
          </button>
          <button 
            className="btn btn-secondary"
            aria-label="Cadastrar-se como criador de eventos"
          >
            Cadastrar como criador de eventos
          </button>
        </nav>
      </div>
    </main>
  )
}

export default WelcomePage