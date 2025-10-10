import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ currentPage = 'home' }) => {
  const { logout } = useAuth()
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
          <Link 
            to="/home"
            className="nav-icon-btn" 
            aria-label="Início"
            title="Início"
          >
            <i className="bi bi-house"></i>
            <span>Início</span>
          </Link>
        )}
        {currentPage !== 'favorites' && (
          <Link 
            to="/favorites"
            className="nav-icon-btn" 
            aria-label="Eventos Favoritos"
            title="Eventos Favoritos"
          >
            <i className="bi bi-heart"></i>
            <span>Eventos Favoritos</span>
          </Link>
        )}
        {currentPage !== 'profile' && (
          <Link 
            to="/profile"
            className="nav-icon-btn" 
            aria-label="Meu Perfil"
            title="Meu Perfil"
          >
            <i className="bi bi-person"></i>
            <span>Meu Perfil</span>
          </Link>
        )}
        {currentPage !== 'settings' && (
          <Link 
            to="/settings"
            className="nav-icon-btn" 
            aria-label="Configurações"
            title="Configurações"
          >
            <i className="bi bi-gear"></i>
          </Link>
        )}
        <button 
          className="nav-icon-btn" 
          onClick={logout}
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