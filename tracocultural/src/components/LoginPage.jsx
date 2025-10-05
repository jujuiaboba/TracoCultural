import React, { useState } from 'react'

import './AuthPages.css'

const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    rememberMe: false
  })

  // Lista de emails de administradores
  const adminEmails = [
    'admin@tracocultural.com',
    'administrador@tracocultural.com',
    'admin@admin.com'
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Verificar se é admin
    const isAdmin = adminEmails.includes(formData.email.toLowerCase())
    const role = isAdmin ? 'admin' : 'user'
    
    console.log('Login:', formData, 'Role:', role)
    onLogin(formData.email, role)
  }

  return (
    <main className="auth-container">
      {/* Fundo com gradiente e animações */}
      <div className="background-gradient">

      </div>
      
      {/* Formulário de login */}
      <div className="auth-content">
        <div className="auth-form">
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Entrar
            </button>
            <button 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Cadastrar
            </button>
          </div>
          
          <header className="auth-header">
            <h1>{activeTab === 'login' ? 'Entrar' : 'Cadastrar'}</h1>
            <p>{activeTab === 'login' ? 'Acesse sua conta' : 'Crie sua conta'}</p>
          </header>
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={activeTab === 'register'}
                  placeholder="Seu nome completo"
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Digite sua senha"
              />
            </div>
            
            {activeTab === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={activeTab === 'register'}
                  placeholder="Confirme sua senha"
                />
              </div>
            )}
            
            {activeTab === 'login' && (
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Lembrar-me</span>
                </label>
              </div>
            )}
            
            <button type="submit" className="auth-btn primary">
              {activeTab === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p className="admin-hint">
              💡 Para acessar como administrador, use: admin@admin.com
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage