import React from 'react'

const AdminSidebar = ({ activeSection, onSectionChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'users', label: 'Usuários', icon: 'bi-people-fill' },
    { id: 'events', label: 'Eventos', icon: 'bi-calendar-event' },
    { id: 'feedbacks', label: 'Feedbacks', icon: 'bi-chat-dots-fill' },
    { id: 'settings', label: 'Configurações', icon: 'bi-gear-fill' }
  ]

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <img src="/src/assets/TRAÇO.png" alt="TracoCultural" className="sidebar-logo" />
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar