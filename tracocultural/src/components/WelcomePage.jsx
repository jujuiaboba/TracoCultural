import React, { useState } from 'react'
import StarfieldBackground from './StarfieldBackground'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import './WelcomePage.css'

const WelcomePage = ({ onLogin }) => {
  const [currentPage, setCurrentPage] = useState('welcome')
  
  // Renderização condicional das páginas
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onBack={() => setCurrentPage('welcome')} 
        onRegister={() => setCurrentPage('register')}
        onLogin={onLogin}
      />
    )
  }
  
  if (currentPage === 'register') {
    return <RegisterPage onBack={() => setCurrentPage('welcome')} />
  }

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
            onClick={() => setCurrentPage('login')}
            aria-label="Entrar ou cadastrar-se na plataforma"
          >
            Entrar ou Cadastrar-se
          </button>
        </nav>
      </div>
    </main>
  )
}

export default WelcomePage