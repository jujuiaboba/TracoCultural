import api from './api';

export const feedbackService = {
  createFeedback: async (feedbackData) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  },

  getFeedbacks: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },

  getEventComments: async (eventId) => {
    const response = await api.get(`/events/${eventId}/comments`);
    return response.data;
  },

  addComment: async (eventId, comment) => {
    const response = await api.post(`/events/${eventId}/comments`, { comment });
    return response.data;
  }
};