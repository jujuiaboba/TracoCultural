import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
import Navbar from './Navbar'
import './UserProfile.css'

const availableIcons = [
  'airplane-engines-fill', 'backpack3-fill', 'balloon-heart-fill', 'balloon-fill',
  'camera2', 'car-front-fill', 'cup-hot-fill', 'emoji-smile-fill', 'emoji-heart-eyes-fill',
  'emoji-laughing-fill', 'heart-fill', 'incognito', 'lightbulb-fill', 'mouse3-fill',
  'palette-fill', 'peace-fill', 'person-arms-up', 'piggy-bank-fill', 'plugin',
  'rocket-takeoff-fill', 'snow2', 'star-fill', 'suit-club-fill', 'suit-diamond-fill',
  'suit-heart-fill', 'suit-spade-fill', 'suitcase-fill', 'sun-fill', 'sunglasses',
  'tsunami', 'umbrella-fill', 'yin-yang'
]

const availableColors = [
  '#936253', '#f8b6c4ff', '#AF897A', '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#f1c40f', '#8e44ad',
  '#27ae60', '#2980b9'
]

const UserProfile = ({ onBack, onLogout }) => {
  const [icon, setIcon] = useState('person-arms-up')
  const [color, setColor] = useState('#936253')
  const [editProfile, setEditProfile] = useState(false)
  const [showIconModal, setShowIconModal] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('person-arms-up')
  const [selectedColor, setSelectedColor] = useState('#936253')
  const [editData, setEditData] = useState({
    name: 'Flora Silva',
    username: 'florinha',
    location: 'MG, Brasil'
  })

  const handleEditClick = () => {
    setSelectedIcon(icon)
    setSelectedColor(color)
    setShowIconModal(true)
  }

  const handleIconSave = () => {
    setIcon(selectedIcon)
    setColor(selectedColor)
    setShowIconModal(false)
  }

  const handleEditProfile = () => {
    setEditProfile(true)
  }

  const handleSaveProfile = () => {
    // Aqui você salvaria os dados
    setEditProfile(false)
  }

  const handleCancelEdit = () => {
    setEditProfile(false)
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const handleIconSelect = (selectedIcon) => {
    setIcon(selectedIcon)
  }

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor)
  }

  return (
    <div className="user-profile">
      <Navbar onLogout={onLogout} onProfileClick={onBack} />
      {/* Fundo animado com ondas */}
      <div className="profile-background">
        <AnimatedWaves />
      </div>
      
      {/* ========== CARD 1: PERFIL PRINCIPAL ========== */}
      {/* Card principal com informações do usuário, avatar e estatísticas */}
      <div className="profile-card">
        
        {/* --- SEÇÃO: AVATAR E EDIÇÃO --- */}
        <div className="avatar-container">
          <div 
            className="avatar"
            style={{ backgroundColor: color }}
            onClick={handleEditClick}
          >
            <i className={`bi bi-${icon}`}></i>
          </div>
          <button 
            className="edit-avatar-btn"
            onClick={handleEditClick}
          >
            <i className="bi bi-pencil"></i>
          </button>
        </div>

        {/* --- SEÇÃO: INFORMAÇÕES DO USUÁRIO --- */}
        <div className="user-info">
          {/* Nome, username e localização */}
          <h2 className="display-name">{editData.name}</h2>

          <p className="location">{editData.location}</p>

          {/* --- SUBSEÇÃO: ESTATÍSTICAS --- */}
          <div className="user-stats">
            <div className="stat">
              <span className="stat-number">24</span>
              <span className="stat-label">Favoritos</span>
            </div>
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">Feedbacks</span>
            </div>
          </div>

          {/* --- SUBSEÇÃO: AÇÕES DO PERFIL --- */}
          <div className="profile-actions">
            <button 
              className="btn-secondary"
              onClick={handleEditProfile}
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {/* ========== CARD FAVORITOS ========== */}
        <div className="action-card">
          <div className="action-icon">
            <i className="bi bi-heart-fill"></i>
          </div>
          <h4 className="action-title">Meus Favoritos</h4>
          <p className="action-description">Gerenciar lista de favoritos</p>
          <button className="action-btn">
            <i className="bi bi-eye"></i>
            Ver
          </button>
        </div>
      </div>

      {/* ========== MODAL DE EDIÇÃO ========== */}
      {editProfile && (
        <div className="edit-modal-overlay" onClick={handleCancelEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Perfil</h3>
            
            {/* === SEÇÃO AVATAR === */}
            <div className="avatar-section">
              <label>Avatar</label>
              <div 
                className="avatar-preview"
                style={{ backgroundColor: color }}
              >
                <i className={`bi bi-${icon}`}></i>
              </div>
              
              <label>Escolha um ícone:</label>
              <div className="icons-grid">
                {availableIcons.map(iconName => (
                  <button
                    key={iconName}
                    className={`icon-option ${icon === iconName ? 'selected' : ''}`}
                    onClick={() => handleIconSelect(iconName)}
                  >
                    <i className={`bi bi-${iconName}`}></i>
                  </button>
                ))}
              </div>
              
              <label>Escolha uma cor:</label>
              <div className="colors-grid">
                {availableColors.map(colorOption => (
                  <button
                    key={colorOption}
                    className={`color-option ${color === colorOption ? 'selected' : ''}`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => handleColorSelect(colorOption)}
                  />
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div className="form-group">
              <label>Localização</label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Digite sua localização"
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveProfile}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL DE ÍCONE ========== */}
      {showIconModal && (
        <div className="icon-modal-overlay" onClick={() => setShowIconModal(false)}>
          <div className="icon-modal" onClick={(e) => e.stopPropagation()}>
            <button className="icon-modal-close" onClick={() => setShowIconModal(false)}>
              ✕
            </button>
            
            <h2>Escolher Ícone do Perfil</h2>
            
            <div className="icon-preview-section">
              <div className="icon-preview" style={{ backgroundColor: selectedColor }}>
                <i className={`bi bi-${selectedIcon}`}></i>
              </div>
              <p className="icon-preview-text">Preview do seu ícone</p>
            </div>
            
            <div className="icon-selection-section">
              <h3 className="icon-selection-title">Escolher Cor</h3>
              <div className="icon-colors-grid">
                {availableColors.map((colorOption) => (
                  <button
                    key={colorOption}
                    className={`color-option ${selectedColor === colorOption ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(colorOption)}
                    style={{ backgroundColor: colorOption }}
                  />
                ))}
              </div>
            </div>
            
            <div className="icon-selection-section">
              <h3 className="icon-selection-title">Escolher Ícone</h3>
              <div className="icon-icons-grid">
                {availableIcons.map((iconName) => (
                  <button
                    key={iconName}
                    className={`icon-icon-option ${selectedIcon === iconName ? 'selected' : ''}`}
                    onClick={() => setSelectedIcon(iconName)}
                  >
                    <i className={`bi bi-${iconName}`}></i>
                  </button>
                ))}
              </div>
            </div>
            
            <button className="icon-save-btn" onClick={handleIconSave}>
              Salvar Ícone
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default UserProfile