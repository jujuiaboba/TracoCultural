import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/usuario/auth/login', { email, senha: password });
    const data = response.data;
    
    if (data.retorno === 'OK') {
      return {
        user: data.usuario,
        token: data.usuario.id // Usando ID como token temporário
      };
    }
    throw new Error(data.message || 'Erro no login');
  },

  register: async (userData) => {
    const response = await api.post('/usuario/auth/register', {
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha,
      isAdm: userData.isAdm || false
    });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};