import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

const LoginPage = ({ onLoginSuccess }) => {
  const { login, register } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (activeTab === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setError('Senhas não coincidem')
          return
        }
        
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      } else {
        await login(formData.email, formData.password)
      }
      
      onLoginSuccess()
    } catch (error) {
      setError(error.message || 'Erro ao fazer login/cadastro')
    } finally {
      setLoading(false)
    }
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
              type="button"
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Entrar
            </button>
            <button 
              type="button"
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
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={activeTab === 'register'}
                  placeholder="Seu nome"
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
            
            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? 'Carregando...' : (activeTab === 'login' ? 'Entrar' : 'Cadastrar')}
            </button>
          </form>
          

        </div>
      </div>
    </main>
  )
}

export default LoginPage