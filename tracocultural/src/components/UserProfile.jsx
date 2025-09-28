import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
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

const UserProfile = ({ onBack }) => {
  const [icon, setIcon] = useState('person-arms-up')
  const [color, setColor] = useState('#3498db')
  const [editing, setEditing] = useState(false)
  const [tempIcon, setTempIcon] = useState(icon)
  const [tempColor, setTempColor] = useState(color)

  const handleEditClick = () => {
    setTempIcon(icon)
    setTempColor(color)
    setEditing(true)
  }

  const handleSave = () => {
    setIcon(tempIcon)
    setColor(tempColor)
    setEditing(false)
  }

  const handleCancel = () => {
    setTempIcon(icon)
    setTempColor(color)
    setEditing(false)
  }

  return (
    <div className="user-profile">
      {/* Fundo animado com ondas */}
      <div className="profile-background">
        <AnimatedWaves />
      </div>
      
      <div className="profile-container">
        {/* Botão voltar */}
        <button className="back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </button>
        {/* Card do perfil */}
      <div className="profile-card">
        {/* Avatar */}
        <div 
          className="avatar"
          style={{ backgroundColor: color }}
        >
          <i className={`bi bi-${icon}`}></i>
        </div>

        {/* Informações do usuário */}
        <div className="user-info">
          <h2 className="display-name">Flora Silva</h2>
          <p className="username">@florinha</p>
          <p className="location">MG, Brasil</p>

          {/* Botões */}
          <div className="profile-actions">
            <button className="btn-primary">
              Ver Perfil
            </button>
            <button 
              className="btn-secondary"
              onClick={handleEditClick}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

        {/* Navegação */}
        <div className="navigation-section">
          <button className="nav-btn">
            <i className="bi bi-heart-fill"></i>
            Eventos Favoritados
          </button>
          <button className="nav-btn">
            <i className="bi bi-chat-fill"></i>
            Meus Feedbacks
          </button>
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
    </div>
  )
}

export default UserProfile