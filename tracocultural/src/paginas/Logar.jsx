import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../estilos/AuthPages.css'
import api from '../servicos/services/api'

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const credenciais = { email, senha }
    const resposta = await api.post('/usuarios/login', credenciais)

    console.log('Login FEITO!!:', resposta.data)
    onLogin(resposta.data)
    navigate('/home')
  } catch (erro) {
    console.error('Erro ao fazer login:', erro)
    alert(':( Erro ao entrar. Verifique as credenciais e tente novamente.')
  }
}

const Logar = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulação de login
    const userData = {
      nome: 'Usuário Teste',
      email: email
    }
    
    onLogin(userData)
    navigate('/home')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Entrar</h2>
            <p>Acesse sua conta TracoCultural</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Entrar
            </button>
          </form>

          <div className="auth-links">
            <p>
              Não tem uma conta?{' '}
              <Link to="/cadastrar" className="auth-link">
                Cadastre-se
              </Link>
            </p>
            <Link to="/" className="back-link">
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logar