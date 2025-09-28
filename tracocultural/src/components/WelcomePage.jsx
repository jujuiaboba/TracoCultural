import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import CreatorRegisterPage from './CreatorRegisterPage'
import HomePage from './HomePage'
import './WelcomePage.css'

const WelcomePage = ({ onLogin }) => {
  const [currentPage, setCurrentPage] = useState('welcome')
  
  if (currentPage === 'login') {
    return <LoginPage 
      onBack={() => setCurrentPage('welcome')} 
      onRegister={() => setCurrentPage('register')}
      onLogin={onLogin}
    />
  }
  
  if (currentPage === 'register') {
    return <RegisterPage onBack={() => setCurrentPage('welcome')} />
  }
  
  if (currentPage === 'creator-register') {
    return <CreatorRegisterPage onBack={() => setCurrentPage('welcome')} />
  }

  return (
    <main className="welcome-container">
      {/* Fundo com gradiente e ondas animadas cobrindo tela inteira */}
      <div className="background-gradient">
        <AnimatedWaves />
      </div>
      
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
            onClick={() => setCurrentPage('login')}
            aria-label="Entrar ou cadastrar-se na plataforma"
          >
            Entrar ou Cadastrar-se
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage('creator-register')}
            aria-label="Cadastrar-se como Criador"
          >
            Cadastrar como Criador
          </button>
        </nav>
      </div>
    </main>
  )
}

export default WelcomePage