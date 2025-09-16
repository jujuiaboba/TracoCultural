import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
import './AuthPages.css'

const LoginPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', formData)
  }

  return (
    <main className="auth-container">
      {/* Fundo com gradiente e animações */}
      <div className="background-gradient">
        <AnimatedWaves />
      </div>
      
      {/* Formulário de login */}
      <div className="auth-content">
        <div className="auth-form">
          <header className="auth-header">
            <h1>Entrar</h1>
            <p>Acesse sua conta</p>
          </header>
          
          <form onSubmit={handleSubmit}>
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
            
            <button type="submit" className="auth-btn primary">
              Entrar
            </button>
          </form>
          
          <div className="auth-links">
            <button onClick={onBack} className="link-btn">
              ← Voltar ao início
            </button>
            <div className="register-link">
              <span>Não tem uma conta? </span>
              <button className="link-btn underline">Crie uma aqui!</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage