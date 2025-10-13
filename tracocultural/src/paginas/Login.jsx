import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../estilos/AuthPages.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:8080/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        if (data.user.isAdmin) {
          navigate('/admin')
        } else {
          navigate('/home')
        }
      } else {
        setError(data.message || 'Credenciais inválidas')
      }
    } catch (error) {
      setError('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-content">
        <div className="auth-form">
          <header className="auth-header">
            <h1>Entrar</h1>
            <p>Acesse sua conta</p>
          </header>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
            
            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
          
          <p>
            Não tem conta? <button type="button" className="link-btn" onClick={() => navigate('/cadastro')}>Cadastrar</button>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login