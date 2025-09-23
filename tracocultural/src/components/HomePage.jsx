import React, { useState } from 'react'
import Navbar from './Navbar'
import SearchSection from './SearchSection'
import EventsSection from './EventsSection'
import AnimatedWaves from './AnimatedWaves'
import './HomePage.css'

const HomePage = ({ onLogout }) => {
  const [selectedState, setSelectedState] = useState('SP')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    date: ''
  })

  return (
    <div className="home-container">
      {/* Fundo animado com ondas */}
      <div className="home-background">
        <AnimatedWaves />
      </div>
      
      {/* Navbar fixa no topo */}
      <Navbar onLogout={onLogout} />
      
      {/* Conteúdo principal */}
      <main className="home-content">
        {/* Seção de pesquisa e filtros */}
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        
        {/* Seção "O que vamos fazer?" */}
        <EventsSection 
          title="O que vamos fazer?"
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          showLocationIcon={true}
          layout="carousel"
        />
        
        {/* Seção "Mais pelo Brasil!" */}
        <EventsSection 
          title="Mais pelo Brasil!"
          layout="grid"
        />
      </main>
    </div>
  )
}

export default HomePage