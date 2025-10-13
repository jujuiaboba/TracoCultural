import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarfieldBackground from './StarfieldBackground'
import '../estilos/WelcomePage.css'

const WelcomePage = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <main className="welcome-container">
      <StarfieldBackground />
      
      <div className="content">
        <header>
          <img src="/src/assets/TRAÇO.png" alt="TracoCultural" className="welcome-logo" />
          <h1 className="main-title">Para onde vamos hoje?</h1>
        </header>
        
        <nav className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={handleLoginClick}
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