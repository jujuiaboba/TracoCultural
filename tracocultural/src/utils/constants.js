export const EVENT_TYPES = [
  { value: 'SHOW', label: 'Show' },
  { value: 'EXHIBITION', label: 'Exposição' },
  { value: 'THEATER', label: 'Teatro' },
  { value: 'CINEMA', label: 'Cinema' },
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'WORKSHOP', label: 'Workshop' }
];

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];

export const DATE_FILTERS = [
  { value: 'TODAY', label: 'Hoje' },
  { value: 'WEEKEND', label: 'Fim de semana' },
  { value: 'THIS_WEEK', label: 'Esta semana' },
  { value: 'THIS_MONTH', label: 'Este mês' }
];

export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export const API_MESSAGES = {
  LOADING: 'Carregando...',
  ERROR_GENERIC: 'Ocorreu um erro. Tente novamente.',
  ERROR_NETWORK: 'Erro de conexão. Verifique sua internet.',
  SUCCESS_SAVE: 'Salvo com sucesso!',
  SUCCESS_DELETE: 'Removido com sucesso!',
  CONFIRM_DELETE: 'Tem certeza que deseja remover?'
};