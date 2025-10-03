import React, { useState } from 'react'
import Navbar from './Navbar'
import StarfieldBackground from './StarfieldBackground'
import './SettingsPage.css'

const SettingsPage = ({ onBack, onLogout, onEditProfile, onHomeClick, onProfileClick, onFavoritesClick }) => {
  // Estados dos switches
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)

  // Handlers
  const handleEditProfile = () => {
    onEditProfile ? onEditProfile() : console.log('Editar perfil')
  }

  const handleChangePassword = () => {
    console.log('Alterar senha')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      console.log('Excluir conta')
    }
  }



  const handlePrivacyPolicy = () => {
    window.open('https://privacy.example.com', '_blank')
  }

  const handleTermsOfUse = () => {
    window.open('https://terms.example.com', '_blank')
  }

  return (
    <div className="settings-page">
      <Navbar 
        onLogout={onLogout} 
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
        onSettingsClick={() => {}}
        onHomeClick={onHomeClick}
        currentPage="settings"
      />
      
      {/* Fundo animado com estrelas */}
      <StarfieldBackground />
      
      {/* Conteúdo principal */}
      <main className="settings-content">
        
        {/* Cabeçalho da página */}
        <header className="settings-header">
          <div className="header-title">
            <i className="bi bi-gear"></i>
            <h1>Configurações</h1>
          </div>
          <p className="header-subtitle">Gerencie sua conta e preferências</p>
        </header>

        {/* Cards de configurações */}
        <div className="settings-cards">
          <div className="settings-card">
            <h2 className="card-title">
              <i className="bi bi-gear"></i>
              Configurações
            </h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Editar Perfil</h3>
                <p>Altere suas informações pessoais e avatar</p>
              </div>
              <button className="setting-btn" onClick={handleEditProfile}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Alterar Senha</h3>
                <p>Atualize sua senha de acesso</p>
              </div>
              <button className="setting-btn" onClick={handleChangePassword}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Notificações por E-mail</h3>
                <p>Receba newsletters e atualizações</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Política de Privacidade</h3>
                <p>Como protegemos seus dados</p>
              </div>
              <button className="setting-btn" onClick={handlePrivacyPolicy}>
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Termos de Uso</h3>
                <p>Condições de uso da plataforma</p>
              </div>
              <button className="setting-btn" onClick={handleTermsOfUse}>
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Excluir Conta</h3>
                <p>Remover permanentemente sua conta</p>
              </div>
              <button className="setting-btn danger" onClick={handleDeleteAccount}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage