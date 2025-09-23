import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
import './AuthPages.css'

const RegisterPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  
  const [errors, setErrors] = useState({})

  const validatePassword = (password) => {
    const minLength = password.length >= 20
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumber = /\d/.test(password)
    return minLength && hasSpecial && hasNumber
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validação em tempo real
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value) ? '' : 'Senha deve ter 20+ caracteres, números e símbolos'
      }))
    }
    
    if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value === formData.password ? '' : 'Senhas não coincidem'
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword(formData.password) || formData.password !== formData.confirmPassword) {
      return
    }
    console.log('Cadastro usuário:', formData)
  }

  return (
    <main className="auth-container user-form">
      <div className="background-gradient">
        <AnimatedWaves />
      </div>
      
      <div className="auth-content">
        <div className="auth-form">
          <header className="auth-header">
            <h1>Cadastrar-se</h1>
            <p>Crie sua conta</p>
          </header>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Seu nome de usuário"
              />
            </div>
            
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
                placeholder="Mínimo 20 caracteres"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Digite a senha novamente"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Telefone (opcional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
              />
            </div>
            
            <button type="submit" className="auth-btn primary">
              Cadastrar
            </button>
          </form>
          
          <div className="auth-links">
            <button onClick={onBack} className="link-btn">
              ← Voltar ao início
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage