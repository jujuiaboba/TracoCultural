import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './paginas/Login'
import Cadastro from './paginas/Cadastro'
import Home from './paginas/Home'
import Favoritos from './paginas/Favoritos'
import WelcomePage from './componentes/WelcomePage'
import './App.css'

// Componente para proteger rotas que precisam de autenticação
const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route 
            path="/home" 
            element={
              <RotaProtegida>
                <Home />
              </RotaProtegida>
            } 
          />
          <Route 
            path="/favoritos" 
            element={
              <RotaProtegida>
                <Favoritos />
              </RotaProtegida>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App