import React from 'react'
import { Link } from 'react-router-dom'
import '../estilos/WelcomePage.css'

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        
        <h1 className="welcome-title">Para onde nós vamos hoje?</h1>
        <p className="welcome-subtitle">— Traço Cultural —</p>
        
        <div className="welcome-buttons">
          <Link to="/logar" className="btn-primary">
            Entrar
          </Link>
          <Link to="/cadastrar" className="btn-secondary">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage