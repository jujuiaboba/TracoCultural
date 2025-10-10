import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents deve ser usado dentro de um EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError(null); // Ignora erro se endpoint não existir
      setEvents([]); // Define array vazio
      console.warn('Endpoint de eventos não encontrado, usando dados mock');
    } finally {
      setLoading(false);
    }
  };

  const searchEvents = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.searchEvents(query);
      setEvents(data);
    } catch (err) {
      setError('Erro ao buscar eventos');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError('Erro ao criar evento');
      throw err;
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const updatedEvent = await eventService.updateEvent(id, eventData);
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err) {
      setError('Erro ao atualizar evento');
      throw err;
    }
  };

  const deleteEvent = async (id) => {
    try {
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError('Erro ao deletar evento');
      throw err;
    }
  };

  useEffect(() => {
    // fetchEvents(); // Comentado até backend estar disponível
  }, []);

  const value = {
    events,
    loading,
    error,
    fetchEvents,
    searchEvents,
    createEvent,
    updateEvent,
    deleteEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};