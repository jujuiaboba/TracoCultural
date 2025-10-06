import React, { createContext, useContext, useState, useEffect } from 'react'
import apiService from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        // TODO: VERIFICAR SE O BACKEND RETORNA OS DADOS DO USUÁRIO CORRETAMENTE
        const userData = await apiService.getProfile()
        setUser(userData)
      }
    } catch (error) {
      // TODO: TOKEN INVÁLIDO - LIMPAR E REDIRECIONAR
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      // TODO: BACKEND DEVE RETORNAR { token, user: { id, name, email, role } }
      const response = await apiService.login(email, password)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return response
    } catch (error) {
      // TODO: TRATAR ERROS DE LOGIN (credenciais inválidas, etc)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // TODO: BACKEND DEVE RETORNAR { token, user: { id, name, email, role } }
      const response = await apiService.register(userData)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return response
    } catch (error) {
      // TODO: TRATAR ERROS DE CADASTRO (email já existe, etc)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await apiService.updateProfile(userData)
      setUser(updatedUser)
      return updatedUser
    } catch (error) {
      throw error
    }
  }

  const value = {
    user, // TODO: DADOS DO USUÁRIO LOGADO
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' // TODO: VERIFICAR SE O BACKEND DEFINE ROLE CORRETAMENTE
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}