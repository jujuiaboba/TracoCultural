import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../servicos/api'
import '../estilos/AuthPages.css'
 
 
 
 

const Cadastro = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmeSenha, setConfirmeSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (senha !== confirmeSenha) {
      setError('Senhas não coincidem')
      setLoading(false)
      return
    }
    
    try {
      const data = await register({
        name: nome,
        email: email,
        password: senha
      })
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/home')
    } catch (error) {
      setError(error.message || 'Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-content">
        <div className="auth-form">
          <header className="auth-header">
            <h1>Cadastrar</h1>
            <p>Crie sua conta</p>
          </header>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmeSenha">Confirmar senha</label>
              <input
                type="password"
                id="confirmeSenha"
                name="confirmeSenha"
                value={confirmeSenha}
                onChange={(e) => setConfirmeSenha(e.target.value)}
                required
                placeholder="Confirme sua senha"
              />
            </div>
            
            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </form>
          
          <p>
            Já tem conta? <button type="button" className="link-btn" onClick={() => navigate('/login')}>Entrar</button>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Cadastro