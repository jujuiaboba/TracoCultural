export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays > 1 && diffDays <= 7) return `Daqui ${diffDays} dias`;
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatEventType = (type) => {
  const types = {
    'SHOW': 'Show',
    'EXHIBITION': 'Exposição',
    'THEATER': 'Teatro',
    'CINEMA': 'Cinema',
    'FESTIVAL': 'Festival',
    'WORKSHOP': 'Workshop'
  };
  
  return types[type] || type;
};

export const formatLocation = (location) => {
  if (typeof location === 'string') return location;
  if (location?.city && location?.state) {
    return `${location.city}, ${location.state}`;
  }
  return location?.name || '';
};