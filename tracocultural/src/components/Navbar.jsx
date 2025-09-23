import React, { useState } from 'react'

const Navbar = ({ onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Implementar lógica de tema futuramente
  }

  return (
    <nav className="navbar">
      {/* Logo e navegação principal */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/TRAÇO.png" alt="TracoCultural" className="logo-image" />
        </div>
        
        {/* Botões de navegação */}
        <div className="navbar-nav">
          <button className="nav-btn active" aria-label="Página inicial">
            Início
          </button>
          <button className="nav-btn" aria-label="Eventos favoritados">
            Eventos Favoritados
          </button>
          <button className="nav-btn" aria-label="Meu perfil">
            Meu Perfil
          </button>
        </div>
      </div>
      
      {/* Ícones de ação */}
      <div className="navbar-right">
        <button 
          className="nav-icon-btn" 
          aria-label="Configurações"
          title="Configurações"
        >
          <i className="bi bi-gear"></i>
        </button>
        <button 
          className="nav-icon-btn" 
          onClick={toggleTheme}
          aria-label="Alterar tema"
          title="Alterar tema"
        >
          <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
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