import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from '../config/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const checkAuth = localStorage.getItem('isAuthenticated')
    
    if (token && checkAuth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
      setIsAuthenticated(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/me')
      setUser(response.data)
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
    } catch (error) {
      console.error('Auth error:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated')
      delete axios.defaults.headers.common['Authorization']
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isAuthenticated', 'true')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAuthenticated')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 