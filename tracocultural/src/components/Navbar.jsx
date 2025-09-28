import React, { useState } from 'react'

const Navbar = ({ onLogout, onProfileClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Implementar lógica de tema futuramente
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/TRAÇO.png" alt="TracoCultural" className="logo-image" />
      </div>
      
      <div className="navbar-right">        <button 
          className="nav-icon-btn" 
          aria-label="Eventos Favoritos"
          title="Eventos Favoritos"
        >
          <i className="bi bi-heart"></i>
          <span>Eventos Favoritos</span>
        </button>
        <button 
          className="nav-icon-btn" 
          onClick={onProfileClick}
          aria-label="Meu Perfil"
          title="Meu Perfil"
        >
          <i className="bi bi-person"></i>
          <span>Meu Perfil</span>
        </button>
        <button 
          className="nav-icon-btn" 
          aria-label="Configurações"
          title="Configurações"
        >
          <i className="bi bi-gear"></i>
        </button>
        <button 
          className="nav-icon-btn" 
          onClick={onLogout}
          aria-label="Logout"
          title="Sair"
        >
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </nav>
  )
}

export default Navbar