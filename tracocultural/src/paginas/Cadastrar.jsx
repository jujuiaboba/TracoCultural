import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../estilos/AuthPages.css'
import api from '../servicos/services/api'
import axios from 'axios'



const handleSubmit = async (e) => {
  e.preventDefault()

  if (senha !== confirmarSenha) {
    alert('Senhas não coincidem')
    return;

  }


    Post()

    // const resposta = await api.post('http://localhost:8080/api/v1/usuario/auth/register', novoUsuario);
    // console.log('Usuario cadastrado:', resposta.data);
0
    onLogin(resposta.data);
    navigate('/home');

}


const novoUsuario = {
  nome: nome,
  email: email,
  senha: senha
}

const Cadastrar = ({ onLogin }) => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (senha !== confirmarSenha) {
      alert('Senhas não coincidem')
      return
    }
    
    const userData = {
      nome: nome,
      email: email
    }
    
    onLogin(userData)
    navigate('/home')
  }



    function Post() {
    axios.post("http://localhost:8080/api/v1/usuario/auth/register", {
      title: "Novo Usuario",
      body: novoUsuario
    })
    .then(response => console.log(response.data))
    .catch(error => console.error("Erro:", error));
    }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Cadastrar</h2>
            <p>Crie sua conta.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>

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

            <div className="form-group">
              <label>Confirmar senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <button onClick={Post} type="submit" className="btn-submit">
              Cadastrar
            </button>
          </form>

          <div className="auth-links">
            <p>
              Já tem uma conta?{' '}
              <Link to="/logar" className="auth-link">
                Entre aqui
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

export default Cadastrar