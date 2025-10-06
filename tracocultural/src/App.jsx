import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import AdminPanel from './components/AdminPanel/AdminPanel'
import './App.css'

const AppContent = () => {
  const { user, loading, isAuthenticated, isAdmin, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState('welcome')

  if (loading) {
    return <div>Carregando...</div>
  }

  const handleLoginSuccess = () => {
    if (isAdmin) {
      setCurrentPage('admin')
    } else {
      setCurrentPage('home')
    }
  }

  const handleLogout = async () => {
    await logout()
    setCurrentPage('welcome')
  }

  const handleProfileClick = () => {
    setCurrentPage('profile')
  }

  const handleHomeClick = () => {
    setCurrentPage('home')
  }

  const handleLoginPageClick = () => {
    setCurrentPage('login')
  }

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onLoginSuccess={handleLoginSuccess} />
        default:
          return <WelcomePage onLogin={handleLoginPageClick} />
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onLogout={handleLogout} onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} />
      case 'profile':
        return <UserProfile onBack={handleHomeClick} onLogout={handleLogout} />
      case 'admin':
        return isAdmin ? <AdminPanel onLogout={handleLogout} /> : <HomePage onLogout={handleLogout} onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} />
      default:
        return isAdmin ? <AdminPanel onLogout={handleLogout} /> : <HomePage onLogout={handleLogout} onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} />
    }
  }

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App