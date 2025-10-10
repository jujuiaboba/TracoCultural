import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { EventProvider } from './context/EventContext'
import WelcomePage from './components/WelcomePage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import UserProfile from './components/UserProfile'
import FavoritesPage from './components/FavoritesPage'
import SettingsPage from './components/SettingsPage'
import AdminPanel from './components/AdminPanel/AdminPanel'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <div>Carregando...</div>
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

const AppContent = () => {
  const { isAuthenticated } = useAuth()
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <WelcomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <EventProvider>
          <AppContent />
        </EventProvider>
      </AuthProvider>
    </Router>
  )
}

export default App