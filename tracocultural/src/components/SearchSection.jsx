import React, { useState } from 'react'

const SearchSection = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  const [showFilters, setShowFilters] = useState(false)

  const eventTypes = ['Show', 'Exposição', 'Teatro', 'Cinema', 'Festival', 'Workshop']
  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ]
  const dateOptions = ['Hoje', 'Fim de semana', 'Esta semana', 'Este mês']

  const handleApplyFilters = () => {
    setShowFilters(false)
    // Implementar lógica de filtros
    console.log('Filtros aplicados:', filters)
  }

  return (
    <section className="search-section">
      {/* Barra de pesquisa principal */}
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" aria-label="Buscar">
            <i className="bi bi-search"></i>
          </button>
        </div>
        
        {/* Botão de filtros */}
        <button 
          className="filter-btn"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Abrir filtros"
        >
          <i className="bi bi-sliders"></i>
          Filtros
        </button>
      </div>
      
      {/* Modal de filtros */}
      {showFilters && (
        <div className="filters-dropdown" onClick={() => setShowFilters(false)}>
          <div className="filters-content" onClick={(e) => e.stopPropagation()}>
            <div className="filter-group">
              <label>Tipo de evento</label>
              <select 
                value={filters.type} 
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Todos os tipos</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Estado</label>
              <select 
                value={filters.location} 
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">Todos os estados</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Data</label>
              <select 
                value={filters.date} 
                onChange={(e) => setFilters({...filters, date: e.target.value})}
              >
                <option value="">Qualquer data</option>
                {dateOptions.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <button className="apply-filters-btn" onClick={handleApplyFilters}>
              Aplicar filtros
            </button>
            
            <button 
              className="close-modal-btn"
              onClick={() => setShowFilters(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default SearchSection