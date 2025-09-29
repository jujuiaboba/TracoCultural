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
  '#936253', '#b5638fff', '#AF897A', '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#f1c40f', '#8e44ad',
  '#27ae60', '#2980b9'
]

const UserProfile = ({ onBack, onLogout }) => {
  const [icon, setIcon] = useState('person-arms-up')
  const [color, setColor] = useState('#936253')
  const [editing, setEditing] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [tempIcon, setTempIcon] = useState(icon)
  const [tempColor, setTempColor] = useState(color)
  const [editData, setEditData] = useState({
    name: 'Flora Silva',
    username: 'florinha',
    location: 'MG, Brasil'
  })

  const handleEditClick = () => {
    setTempIcon(icon)
    setTempColor(color)
    setEditing(true)
  }

  const handleEditProfile = () => {
    setEditProfile(true)
  }

  const handleSave = () => {
    setIcon(tempIcon)
    setColor(tempColor)
    setEditing(false)
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    setEditProfile(false)
  }

  const handleCancel = () => {
    setTempIcon(icon)
    setTempColor(color)
    setEditing(false)
  }

  return (
    <div className="user-profile">
      <Navbar onLogout={onLogout} onProfileClick={onBack} />
      {/* Fundo animado com ondas */}
      <div className="profile-background">
        <AnimatedWaves />
      </div>
      
      <div className="profile-container">
        {/* Layout principal empilhado */}
        <div className="main-layout">
          {/* Linha 1 - Card de Perfil (destaque) */}
          <div className="profile-card">
            {/* Avatar com botão de edição */}
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

            {/* Informações do usuário */}
            <div className="user-info">
              <h2 className="display-name">{editData.name}</h2>
              <p className="username">@{editData.username}</p>
              <p className="location">{editData.location}</p>

              {/* Estatísticas */}
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

              {/* Botões */}
              <div className="profile-actions">
                <button 
                  className="btn-secondary"
                  onClick={handleEditProfile}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>

          {/* Linha 2 - Cards de Ações lado a lado */}
          <div className="actions-row">
            {/* Card Favoritos */}
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
            
            {/* Card Avaliações */}
            <div className="action-card">
              <div className="action-icon">
                <i className="bi bi-chat-fill"></i>
              </div>
              <h4 className="action-title">Minhas Avaliações</h4>
              <p className="action-description">Ver e editar reviews</p>
              <button className="action-btn">
                <i className="bi bi-eye"></i>
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {editing && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Editar Avatar</h3>

            {/* Preview */}
            <div 
              className="avatar-preview"
              style={{ backgroundColor: tempColor }}
            >
              <i className={`bi bi-${tempIcon}`}></i>
            </div>

            {/* Seleção de ícones */}
            <div className="section">
              <h4>Escolha um ícone:</h4>
              <div className="icons-grid">
                {availableIcons.map((iconName) => (
                  <button
                    key={iconName}
                    onClick={() => setTempIcon(iconName)}
                    className={`icon-option ${tempIcon === iconName ? 'selected' : ''}`}
                  >
                    <i className={`bi bi-${iconName}`}></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de cores */}
            <div className="section">
              <h4>Escolha uma cor:</h4>
              <div className="colors-grid">
                {availableColors.map((colorOption) => (
                  <button
                    key={colorOption}
                    onClick={() => setTempColor(colorOption)}
                    className={`color-option ${tempColor === colorOption ? 'selected' : ''}`}
                    style={{ backgroundColor: colorOption }}
                  />
                ))}
              </div>
            </div>

            {/* Ações do modal */}
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button 
                className="btn-save"
                onClick={handleSave}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição de perfil */}
      {editProfile && (
        <div className="modal-overlay" onClick={() => setEditProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Editar Perfil</h3>

            <form onSubmit={handleEditSave}>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Nome de usuário</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({...editData, username: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Localização</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditProfile(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="btn-save"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile