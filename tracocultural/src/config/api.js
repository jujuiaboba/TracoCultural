export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api/v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      ME: '/auth/me'
    },
    EVENTS: {
      LIST: '/events',
      DETAIL: '/events/:id',
      CREATE: '/events',
      UPDATE: '/events/:id',
      DELETE: '/events/:id',
      SEARCH: '/events/search'
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
      FAVORITES: '/users/favorites',
      ADD_FAVORITE: '/users/favorites/:id',
      REMOVE_FAVORITE: '/users/favorites/:id',
      LIST: '/users'
    },
    FEEDBACK: {
      CREATE: '/feedback',
      LIST: '/feedback'
    },
    COMMENTS: {
      LIST: '/events/:id/comments',
      CREATE: '/events/:id/comments'
    }
  }
};

export default API_CONFIG;