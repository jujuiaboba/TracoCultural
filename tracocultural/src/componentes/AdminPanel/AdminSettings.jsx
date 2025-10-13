import React, { useState } from 'react'

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'TracoCultural',
    siteDescription: 'Plataforma de eventos culturais',
    allowRegistration: true,
    requireApproval: false,
    emailNotifications: true
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="admin-settings">
      <div className="section-header">
        <h1>Configurações do Sistema</h1>
        <p>Gerencie as configurações da plataforma</p>
      </div>

      <div className="settings-content">
        <div className="settings-card">
          <h2>Configurações Gerais</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <h3>Nome do Site</h3>
              <p>Nome exibido na plataforma</p>
            </div>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Descrição do Site</h3>
              <p>Descrição da plataforma</p>
            </div>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Permitir Cadastros</h3>
              <p>Usuários podem se cadastrar</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Aprovar Eventos</h3>
              <p>Eventos precisam de aprovação</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.requireApproval}
                onChange={(e) => handleSettingChange('requireApproval', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Notificações por E-mail</h3>
              <p>Enviar notificações automáticas</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <button className="save-btn">
            <i className="bi bi-check"></i>
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings