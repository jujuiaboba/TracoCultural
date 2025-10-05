import React from 'react'

const AdminDashboard = () => {
  const stats = [
    { title: 'Usuários Ativos', value: '1,234', icon: 'bi-people-fill', color: '#8E5E56' },
    { title: 'Eventos Cadastrados', value: '89', icon: 'bi-calendar-event', color: '#A67C6A' },
    { title: 'Favoritos Totais', value: '2,456', icon: 'bi-heart-fill', color: '#6B453E' },
    { title: 'Feedbacks Recebidos', value: '156', icon: 'bi-chat-dots-fill', color: '#3C2321' }
  ]

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-card">
          <h2>Atividade Recente</h2>
          <div className="activity-list">
            <div className="activity-item">
              <i className="bi bi-person-plus"></i>
              <span>Novo usuário cadastrado: João Silva</span>
              <small>2 horas atrás</small>
            </div>
            <div className="activity-item">
              <i className="bi bi-calendar-plus"></i>
              <span>Evento criado: Festival de Jazz</span>
              <small>5 horas atrás</small>
            </div>
            <div className="activity-item">
              <i className="bi bi-heart"></i>
              <span>Evento favoritado 15 vezes</span>
              <small>1 dia atrás</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard