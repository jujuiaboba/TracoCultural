import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/userService'
import Navbar from './Navbar'
import StarfieldBackground from './StarfieldBackground'
import FavoritesPage from './FavoritesPage'
import SettingsPage from './SettingsPage'
import './UserProfile.css'

// Ícones disponíveis para personalização
const availableIcons = [
  'airplane-engines-fill', 'backpack3-fill', 'balloon-heart-fill', 'balloon-fill', 'camera2',
  'car-front-fill', 'cup-hot-fill', 'emoji-smile-fill', 'emoji-heart-eyes-fill', 'emoji-laughing-fill',
  'heart-fill', 'incognito', 'lightbulb-fill', 'mouse3-fill', 'palette-fill', 'peace-fill', 
  'person-arms-up', 'piggy-bank-fill', 'plugin', 'rocket-takeoff-fill', 'snow2', 'star-fill', 
  'suit-club-fill', 'suit-diamond-fill', 'suit-heart-fill', 'suit-spade-fill', 'suitcase-fill', 
  'sun-fill', 'sunglasses', 'tsunami', 'umbrella-fill', 'yin-yang'
]

// Cores disponíveis para personalização
const availableColors = [
  '#936253', '#f8b6c4ff', '#AF897A', '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#f1c40f', '#8e44ad',
  '#27ae60', '#2980b9'
]

const UserProfile = () => {
  const { user } = useAuth()
  
  // Estados do componente
  const [icon, setIcon] = useState('person-arms-up')
  const [color, setColor] = useState('#936253')
  const [editProfile, setEditProfile] = useState(false)
  const [showIconModal, setShowIconModal] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState('person-arms-up')
  const [selectedColor, setSelectedColor] = useState('#936253')
  const [editData, setEditData] = useState({
    name: user?.nome || 'Usuário',
    username: user?.email || '',
    location: 'Brasil'
  })
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.nome || 'Usuário',
        username: user.email || '',
        location: 'Brasil'
      })
      loadFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      const favoritesData = await userService.getFavorites()
      setFavorites(favoritesData)
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
    }
  }

  // Handlers
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

  const handleEditProfile = () => setEditProfile(true)
  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await userService.updateProfile({
        nome: editData.name,
        location: editData.location
      })
      setEditProfile(false)
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    } finally {
      setLoading(false)
    }
  }
  const handleCancelEdit = () => setEditProfile(false)

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const handleIconSelect = (selectedIcon) => setIcon(selectedIcon)
  const handleColorSelect = (selectedColor) => setColor(selectedColor)
  const handleViewFavorites = () => {}
  const handleSettingsClick = () => {}

  // Renderização condicional para página de favoritos
  if (showFavorites) {
    return (
      <FavoritesPage 
        onBack={() => setShowFavorites(false)} 
        onLogout={onLogout}
        onExploreEvents={onBack}
        onHomeClick={onBack}
        onProfileClick={() => setShowFavorites(false)}
        onSettingsClick={handleSettingsClick}
      />
    )
  }

  // Renderização condicional para página de configurações
  if (showSettings) {
    return (
      <SettingsPage 
        onBack={() => setShowSettings(false)} 
        onLogout={onLogout}
        onEditProfile={() => {
          setShowSettings(false)
          setEditProfile(true)
        }}
        onHomeClick={onBack}
        onProfileClick={() => setShowSettings(false)}
        onFavoritesClick={handleViewFavorites}
      />
    )
  }

  return (
    <div className="user-profile">
      <Navbar currentPage="profile" />
      
      {/* Fundo animado com estrelas */}
      <StarfieldBackground />
      
      {/* ========== CARD PRINCIPAL ========== */}
      <div className="profile-card">
        
        {/* Avatar e botão de edição */}
        <div className="avatar-container">
          <div className="avatar" style={{ backgroundColor: color }} onClick={handleEditClick}>
            <i className={`bi bi-${icon}`}></i>
          </div>
          <button className="edit-avatar-btn" onClick={handleEditClick}>
            <i className="bi bi-pencil"></i>
          </button>
        </div>

        {/* Informações do usuário */}
        <div className="user-info" style={{ textAlign: 'left' }}>
          <h2 className="display-name" style={{ textAlign: 'left' }}>{editData.name}</h2>
          <p className="location" style={{ textAlign: 'left' }}>{editData.location}</p>

          {/* Estatísticas */}
          <div className="user-stats">
            <div className="stat">
              <span className="stat-number">{favorites.length}</span>
              <span className="stat-label">Favoritos</span>
            </div>
          </div>

          {/* Ações do perfil */}
          <div className="profile-actions">
            <button className="btn-secondary" onClick={handleEditProfile}>
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Card de favoritos */}
        <div className="action-card">
          <div className="action-icon">
            <i className="bi bi-heart-fill"></i>
          </div>
          <h4 className="action-title">Meus Favoritos</h4>
          <p className="action-description">Gerenciar lista de favoritos</p>
          <Link to="/favorites" className="action-btn">
            <i className="bi bi-eye"></i>
            Ver
          </Link>
        </div>
      </div>

      {/* ========== MODAL DE EDIÇÃO ========== */}
      {editProfile && (
        <div className="edit-modal-overlay" onClick={handleCancelEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Perfil</h3>
            

            
            {/* Campos de texto */}
            <div className="form-group">
              <label>Seu nome</label>
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
            
            {/* Ações do modal */}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCancelEdit}>Cancelar</button>
              <button className="btn-save" onClick={handleSaveProfile} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL DE SELEÇÃO DE ÍCONE ========== */}
      {showIconModal && (
        <div className="icon-modal-overlay" onClick={() => setShowIconModal(false)}>
          <div className="icon-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Botão fechar */}
            <button className="icon-modal-close" onClick={() => setShowIconModal(false)}>
              ✕
            </button>
            
            <h2>Escolher Ícone do Perfil</h2>
            
            {/* Preview */}
            <div className="icon-preview-section">
              <div className="icon-preview" style={{ background: selectedColor }}>
                <i className={`bi bi-${selectedIcon}`}></i>
              </div>
              <p>Preview do seu ícone</p>
            </div>
            
            {/* Seleção de cor */}
            <div className="icon-selection-section">
              <h3>Escolher Cor</h3>
              <div className="icon-colors-grid">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
            
            {/* Seleção de ícone */}
            <div className="icon-selection-section">
              <h3>Escolher Ícone</h3>
              <div className="icon-icons-grid">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`icon-icon-option ${selectedIcon === icon ? 'selected' : ''}`}
                  >
                    <i className={`bi bi-${icon}`}></i>
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