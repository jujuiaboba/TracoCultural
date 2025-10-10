import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getFavorites();
      setFavorites(data);
    } catch (err) {
      setError('Erro ao carregar favoritos');
      console.error('Erro ao carregar favoritos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (eventId) => {
    try {
      await userService.addToFavorites(eventId);
      await loadFavorites(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao adicionar favorito');
      throw err;
    }
  };

  const removeFromFavorites = async (eventId) => {
    try {
      await userService.removeFromFavorites(eventId);
      setFavorites(prev => prev.filter(fav => fav.id !== eventId));
    } catch (err) {
      setError('Erro ao remover favorito');
      throw err;
    }
  };

  const isFavorite = (eventId) => {
    return favorites.some(fav => fav.id === eventId);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loadFavorites
  };
};