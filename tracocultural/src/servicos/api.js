 
const API_BASE_URL = 'http://localhost:8080/api'

// Função auxiliar para fazer requisições
const makeRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token')
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  }

  const response = await fetch(`${API_BASE_URL}${url}`, config)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro na requisição')
  }
  
  return response.json()
}

// Funções de autenticação
export const login = async (email, password) => {
  return makeRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export const register = async (userData) => {
  return makeRequest('/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// Funções de eventos
export const listarEventos = async () => {
  return makeRequest('/events')
}

export const obterEvento = async (id) => {
  return makeRequest(`/events/${id}`)
}

// Funções de favoritos
export const listarFavoritos = async () => {
  return makeRequest('/favorites')
}

export const adicionarFavorito = async (eventId) => {
  return makeRequest(`/favorites/${eventId}`, {
    method: 'POST'
  })
}

export const removerFavorito = async (eventId) => {
  return makeRequest(`/favorites/${eventId}`, {
    method: 'DELETE'
  })
}