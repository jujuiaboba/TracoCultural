import api from './api';

export const userService = {
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addToFavorites: async (eventId) => {
    const response = await api.post(`/users/favorites/${eventId}`);
    return response.data;
  },

  removeFromFavorites: async (eventId) => {
    await api.delete(`/users/favorites/${eventId}`);
  },

  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  }
};