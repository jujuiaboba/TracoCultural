import React, { useState } from 'react'
import AnimatedWaves from './AnimatedWaves'
import './AuthPages.css'

const CreatorRegisterPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    password: '',
    cnpj: '',
    contact: '',
    website: ''
  })
  
  const [errors, setErrors] = useState({})

  const validatePassword = (password) => {
    const minLength = password.length >= 20
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumber = /\d/.test(password)
    return minLength && hasSpecial && hasNumber
  }

  const validateCNPJ = (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, '')
    return cleanCNPJ.length === 14
  }

  const formatCNPJ = (value) => {
    const cleanValue = value.replace(/\D/g, '')
    return cleanValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'cnpj') {
      const formattedValue = formatCNPJ(value)
      setFormData(prev => ({ ...prev, [name]: formattedValue }))
      setErrors(prev => ({
        ...prev,
        cnpj: validateCNPJ(formattedValue) ? '' : 'CNPJ deve ter 14 dígitos'
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value) ? '' : 'Senha deve ter 20+ caracteres, números e símbolos'
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validatePassword(formData.password) || !validateCNPJ(formData.cnpj)) {
      return
    }
    console.log('Cadastro criador:', formData)
  }

  return (
    <main className="auth-container creator-form">
      <div className="background-gradient">
        <AnimatedWaves />
      </div>
      
      <div className="auth-content">
        <div className="auth-form">
          <header className="auth-header">
            <h1>Cadastro de Criador</h1>
            <p>Registre sua organização</p>
          </header>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="organizationName">Nome da organização</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                placeholder="Nome da sua empresa/organização"
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
              <label htmlFor="cnpj">CNPJ</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                placeholder="00.000.000/0000-00"
              />
              {errors.cnpj && <span className="error">{errors.cnpj}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="contact">E-mail ou telefone comercial</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="contato@empresa.com ou (11) 99999-9999"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website (opcional)</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://www.suaempresa.com"
              />
            </div>
            
            <button type="submit" className="auth-btn primary">
              Cadastrar Organização
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

export default CreatorRegisterPage