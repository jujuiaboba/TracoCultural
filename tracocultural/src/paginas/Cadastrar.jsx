import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/AuthPages.css';
import api from '../servicos/services/api';

const Cadastrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      if (!nome || !email || !senha) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const response = await api.post('/auth/register', {
        nome,
        email,
        senha
      });

      console.log('Usuário cadastrado:', response.data);
      navigate('/logar');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setErro(
        error.response?.data?.message || 
        error.message || 
        'Erro ao cadastrar usuário. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Cadastrar</h2>
            <p>Crie sua conta TracoCultural</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {erro && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{erro}</div>}

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

            <button 
              type="submit" 
              className="btn-submit" 
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Já tem uma conta?{' '}
              <Link to="/logar" className="auth-link">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;
