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
  const [editProfile, setEditProfile] = useState(false)
  const [editData, setEditData] = useState({
    name: 'Flora Silva',
    username: 'florinha',
    location: 'MG, Brasil'
  })

  const handleEditClick = () => {
    // Função para editar avatar
  }

  const handleEditProfile = () => {
    setEditProfile(true)
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
          <p className="username">@{editData.username}</p>
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
      </div>

      {/* ========== CARDS 2 E 3: AÇÕES SECUNDÁRIAS ========== */}
      <div className="actions-row">
        
        {/* ========== CARD 2: FAVORITOS ========== */}
        <div className="action-card">
          {/* Ícone do card */}
          <div className="action-icon">
            <i className="bi bi-heart-fill"></i>
          </div>
          {/* Título e descrição */}
          <h4 className="action-title">Meus Favoritos</h4>
          <p className="action-description">Gerenciar lista de favoritos</p>
          {/* Botão de ação */}
          <button className="action-btn">
            <i className="bi bi-eye"></i>
            Ver
          </button>
        </div>
        {/* ========== FIM CARD 2: FAVORITOS ========== */}
        
        {/* ========== CARD 3: AVALIAÇÕES ========== */}
        <div className="action-card">
          {/* Ícone do card */}
          <div className="action-icon">
            <i className="bi bi-chat-fill"></i>
          </div>
          {/* Título e descrição */}
          <h4 className="action-title">Minhas Avaliações</h4>
          <p className="action-description">Ver e editar reviews</p>
          {/* Botão de ação */}
          <button className="action-btn">
            <i className="bi bi-eye"></i>
            Ver
          </button>
        </div>
        {/* ========== FIM CARD 3: AVALIAÇÕES ========== */}
        
      </div>
      {/* ========== FIM CARDS 2 E 3: AÇÕES SECUNDÁRIAS ========== */}

    </div>
  )
}

export default UserProfile