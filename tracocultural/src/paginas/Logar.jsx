import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/AuthPages.css';
import api from '../servicos/services/api';

const Logar = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get('/usuarios');
      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!usuarioEncontrado) {
        alert('Email ou senha incorretos.');
        return;
      }

      console.log('Usuário logado:', usuarioEncontrado);
      onLogin(usuarioEncontrado);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao logar:', error);
      alert('Erro ao logar. Veja o console para mais detalhes.');
    }
  };

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
  );
};

export default Logar;
