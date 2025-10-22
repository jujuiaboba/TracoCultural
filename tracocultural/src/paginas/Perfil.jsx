import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import '../estilos/ProfilePage.css';

const Perfil = ({ user, onLogout }) => {
  // Se user não existir, usamos valores padrões
  const [profile, setProfile] = useState({
    nome: '',
    email: '',
    estado: 'SP',
    icone: 'person-standing',
    corFundo: '#8E5E56'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...profile });

  useEffect(() => {
    if (user) {
      setProfile({
        nome: user.nome,
        email: user.email,
        estado: 'SP',       // você pode salvar no backend depois
        icone: 'person-standing',
        corFundo: '#8E5E56'
      });
      setEditProfile({
        nome: user.nome,
        email: user.email,
        estado: 'SP',
        icone: 'person-standing',
        corFundo: '#8E5E56'
      });
    }
  }, [user]);

  const icones = [
    'airplane-fill', 'backpack2-fill', 'bag-heart-fill', 'balloon-fill', 'bank2',
    'basket3-fill', 'bicycle', 'binoculars-fill', 'book-half', 'brightness-alt-high-fill',
    'bug-fill', 'brush-fill', 'bus-front', 'cake-fill', 'camera-fill', 'car-front-fill',
    'cassette-fill', 'cloud-rain-fill', 'cup-hot-fill', 'cup-straw', 'earbuds',
    'egg-fried', 'emoji-wink-fill', 'emoji-tear-fill', 'emoji-sunglasses-fill',
    'eyeglasses', 'flower3', 'fork-knife', 'gear-wide-connected', 'hearts',
    'moon-stars-fill', 'person-arms-up', 'person-standing', 'person-standing-dress',
    'person-wheelchair', 'piggy-bank-fill', 'rocket-takeoff-fill'
  ];

  const cores = [
    '#8E5E56', '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#f1c40f', '#d35400',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3',
    '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#ee5a24', '#0abde3',
    '#006ba6', '#8e44ad', '#27ae60', '#f39801', '#c0392b', '#2c3e50',
    '#16a085', '#d63031', '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleSave = () => {
    setProfile({ ...editProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  // Se user não existe ainda, podemos mostrar "carregando" ou nada
  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="profile-page">
      <Navbar onLogout={onLogout} />

      <section className="title-section">
        <h2 className="main-title">Meu Perfil</h2>
      </section>

      <main className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div 
              className="profile-avatar"
              style={{ backgroundColor: profile.corFundo }}
            >
              <i className={`bi bi-${profile.icone}`}></i>
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{profile.nome}</h3>
              <p className="profile-email">{profile.email}</p>
              <p className="profile-location">📍 {profile.estado}</p>
            </div>
            <button 
              className="btn-edit-profile"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <h3>Editar Perfil</h3>
              
              <div className="edit-section">
                <label>Nome:</label>
                <input
                  type="text"
                  value={editProfile.nome}
                  onChange={(e) => setEditProfile({...editProfile, nome: e.target.value})}
                />
              </div>

              <div className="edit-section">
                <label>Email:</label>
                <input
                  type="email"
                  value={editProfile.email}
                  readOnly
                />
              </div>

              <div className="edit-section">
                <label>Estado:</label>
                <select
                  value={editProfile.estado}
                  onChange={(e) => setEditProfile({...editProfile, estado: e.target.value})}
                >
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div className="edit-section">
                <label>Ícone:</label>
                <div className="icon-grid">
                  {icones.map(icone => (
                    <div
                      key={icone}
                      className={`icon-option ${editProfile.icone === icone ? 'selected' : ''}`}
                      onClick={() => setEditProfile({...editProfile, icone})}
                    >
                      <i className={`bi bi-${icone}`}></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="edit-section">
                <label>Cor de Fundo:</label>
                <div className="color-grid">
                  {cores.map(cor => (
                    <div
                      key={cor}
                      className={`color-option ${editProfile.corFundo === cor ? 'selected' : ''}`}
                      style={{ backgroundColor: cor }}
                      onClick={() => setEditProfile({...editProfile, corFundo: cor})}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-save" onClick={handleSave}>Salvar</button>
                <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;
