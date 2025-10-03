import React, { useState } from 'react'

const Navbar = ({ onLogout, onProfileClick, onFavoritesClick, onSettingsClick, onHomeClick, currentPage = 'home' }) => {
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
      
      <div className="navbar-right">
        {currentPage !== 'home' && (
          <button 
            className="nav-icon-btn" 
            onClick={onHomeClick}
            aria-label="Início"
            title="Início"
          >
            <i className="bi bi-house"></i>
            <span>Início</span>
          </button>
        )}
        {currentPage !== 'favorites' && (
          <button 
            className="nav-icon-btn" 
            onClick={onFavoritesClick}
            aria-label="Eventos Favoritos"
            title="Eventos Favoritos"
          >
            <i className="bi bi-heart"></i>
            <span>Eventos Favoritos</span>
          </button>
        )}
        {currentPage !== 'profile' && (
          <button 
            className="nav-icon-btn" 
            onClick={onProfileClick}
            aria-label="Meu Perfil"
            title="Meu Perfil"
          >
            <i className="bi bi-person"></i>
            <span>Meu Perfil</span>
          </button>
        )}
        {currentPage !== 'settings' && (
          <button 
            className="nav-icon-btn" 
            onClick={onSettingsClick}
            aria-label="Configurações"
            title="Configurações"
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
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