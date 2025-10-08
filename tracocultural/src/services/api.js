import axios from 'axios'

// CONFIGURADO PARA SPRING BOOT
const API_BASE_URL = 'http://localhost:8080/api/v1'
  
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/'
        }
        throw error.response?.data || error
      }
    )
  }

  // TODO: ENDPOINTS DE AUTENTICAÇÃO - AJUSTAR CONFORME SEU BACKEND
  async login(email, password) {
    // Endpoint: POST /api/auth/login
    // Deve retornar: { token, user: { id, name, email, role } }
    return this.api.post('/auth/login', { email, password })
  }

  async register(userData) {
    // Endpoint: POST /api/v1/auth/register
    // Deve retornar: { token, user: { id, name, email, role } }
    return this.api.post('/auth/register', userData)
  }

  async logout() {
    // Endpoint: POST /api/auth/logout
    return this.api.post('/auth/logout')
  }

  // TODO: ENDPOINTS DE USUÁRIOS - IMPLEMENTAR NO BACKEND
  async getProfile() {
    // Endpoint: GET /api/users/profile
    // Deve retornar: { id, name, email, role, avatar, etc }
    return this.api.get('/users/profile')
  }

  async updateProfile(userData) {
    // Endpoint: PUT /api/users/profile
    return this.api.put('/users/profile', userData)
  }

  async getAllUsers() {
    // Endpoint: GET /api/users (ADMIN ONLY)
    return this.api.get('/users')
  }

  async deleteUser(userId) {
    // Endpoint: DELETE /api/users/:id (ADMIN ONLY)
    return this.api.delete(`/users/${userId}`)
  }

  // TODO: ENDPOINTS DE EVENTOS - IMPLEMENTAR NO BACKEND
  async getEvents() {
    // Endpoint: GET /api/events
    // Deve retornar: [{ id, title, description, date, location, image, etc }]
    return this.api.get('/events')
  }

  async getEventById(eventId) {
    // Endpoint: GET /api/events/:id
    return this.api.get(`/events/${eventId}`)
  }

  async createEvent(eventData) {
    // Endpoint: POST /api/events (ADMIN ONLY)
    return this.api.post('/events', eventData)
  }

  async updateEvent(eventId, eventData) {
    // Endpoint: PUT /api/events/:id (ADMIN ONLY)
    return this.api.put(`/events/${eventId}`, eventData)
  }

  async deleteEvent(eventId) {
    // Endpoint: DELETE /api/events/:id (ADMIN ONLY)
    return this.api.delete(`/events/${eventId}`)
  }

  // TODO: ENDPOINTS DE FAVORITOS - IMPLEMENTAR NO BACKEND
  async getFavorites() {
    // Endpoint: GET /api/favorites
    // Deve retornar: [{ eventId, event: {...} }]
    return this.api.get('/favorites')
  }

  async addToFavorites(eventId) {
    // Endpoint: POST /api/favorites
    return this.api.post('/favorites', { eventId })
  }

  async removeFromFavorites(eventId) {
    // Endpoint: DELETE /api/favorites/:eventId
    return this.api.delete(`/favorites/${eventId}`)
  }

  // TODO: ENDPOINTS DE COMENTÁRIOS/FEEDBACKS - IMPLEMENTAR NO BACKEND
  async getEventComments(eventId) {
    // Endpoint: GET /api/events/:id/comments
    // Deve retornar: [{ id, userId, user: {name}, comment, rating, date }]
    return this.api.get(`/events/${eventId}/comments`)
  }

  async addComment(eventId, commentData) {
    // Endpoint: POST /api/events/:id/comments
    // commentData: { comment, rating }
    return this.api.post(`/events/${eventId}/comments`, commentData)
  }

  async getAllFeedbacks() {
    // Endpoint: GET /api/feedbacks (ADMIN ONLY)
    return this.api.get('/feedbacks')
  }

  async deleteFeedback(feedbackId) {
    // Endpoint: DELETE /api/feedbacks/:id (ADMIN ONLY)
    return this.api.delete(`/feedbacks/${feedbackId}`)
  }

  // TODO: ENDPOINT DE DASHBOARD - IMPLEMENTAR NO BACKEND
  async getDashboardStats() {
    // Endpoint: GET /api/dashboard/stats (ADMIN ONLY)
    // Deve retornar: { totalUsers, totalEvents, totalFeedbacks, recentActivity }
    return this.api.get('/dashboard/stats')
  }
}

export default new ApiService()