import React, { useState } from 'react'
import Navbar from '../componentes/Navbar'
import '../estilos/SettingsPage.css'

const Configuracoes = ({ user, onLogout }) => {
  const [settings, setSettings] = useState({
    emailMarketing: false,
    localizacao: true
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleDeleteAccount = () => {
    alert('Funcionalidade de exclusão de conta seria implementada aqui')
    setShowDeleteModal(false)
  }

  return (
    <div className="settings-page">
      <Navbar onLogout={onLogout} />

      <section className="title-section">
        <h2 className="main-title">Configurações</h2>
      </section>

      <main className="settings-content">
        <div className="settings-card">
          <div className="settings-section">
            <h3 className="section-title">
              <i className="bi bi-bell"></i> Notificações
            </h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-name">Email marketing</span>
                <span className="setting-desc">Receber promoções por email</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailMarketing}
                  onChange={() => handleToggle('emailMarketing')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="section-title">
              <i className="bi bi-shield-check"></i> Privacidade
            </h3>
            
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-name">Compartilhar localização</span>
                <span className="setting-desc">Permitir sugestões baseadas na localização</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.localizacao}
                  onChange={() => handleToggle('localizacao')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>



          <div className="settings-section">
            <h3 className="section-title">
              <i className="bi bi-info-circle"></i> Sobre
            </h3>
            

            <div className="about-item">
              <span className="about-label">Termos de uso</span>
              <button className="link-button">Ver termos</button>
            </div>
            
            <div className="about-item">
              <span className="about-label">Política de privacidade</span>
              <button className="link-button">Ver política</button>
            </div>
          </div>

          <div className="settings-section danger-section">
            <h3 className="section-title">
              <i className="bi bi-exclamation-triangle"></i> Zona de perigo
            </h3>
            
            <div className="danger-buttons">
              <button 
                className="btn-danger"
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right"></i> Sair temporariamente
              </button>
              
              <button 
                className="btn-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <i className="bi bi-trash"></i> Excluir conta
              </button>
            </div>
          </div>
        </div>

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal">
              <h3>Excluir conta</h3>
              <p>Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
              <div className="modal-actions">
                <button className="btn-confirm-delete" onClick={handleDeleteAccount}>
                  Sim, excluir
                </button>
                <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Configuracoes