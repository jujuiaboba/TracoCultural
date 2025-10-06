import React, { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import AdminPanel from './components/AdminPanel/AdminPanel'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (email, role) => {
    if (role === 'redirect') {
      setCurrentPage('login')
      return
    }
    
    setUserRole(role)
    if (role === 'admin') {
      setCurrentPage('admin')
    } else {
      setCurrentPage('home')
    }
  }

  const handleLogout = () => {
    setUserRole(null)
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
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onLogin={handleLogin} />
      case 'login':
        return <LoginPage onLogin={handleLogin} />
      case 'home':
        return <HomePage onLogout={handleLogout} onProfileClick={handleProfileClick} onHomeClick={handleHomeClick} />
      case 'profile':
        return <UserProfile onBack={handleHomeClick} onLogout={handleLogout} />
      case 'admin':
        return <AdminPanel onLogout={handleLogout} />
      default:
        return <WelcomePage onLogin={handleLoginPageClick} />
    }
  }

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  )
}

export default App