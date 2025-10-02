import React, { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('welcome')
  }

  const handleProfileClick = () => {
    setCurrentPage('profile')
  }

  const handleHomeClick = () => {
    setCurrentPage('home')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onLogin={handleLogin} />
      case 'home':
        return <HomePage onLogout={handleLogout} onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} />
      case 'profile':
        return <UserProfile onBack={handleHomeClick} onLogout={handleLogout} />
      default:
        return <WelcomePage onLogin={handleLogin} />
    }
  }

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  )
}

export default App