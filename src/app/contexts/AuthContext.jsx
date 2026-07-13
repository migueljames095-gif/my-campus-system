import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get } from 'firebase/database'

const AuthContext = createContext()

const firebaseConfig = {
  apiKey: 'AIzaSyDp8pSXX5NuzEtiwFyxOlIm7SlwVxcuya4',
  databaseURL: 'https://campusnetsupport-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const userRef = ref(db, `users/${username}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        if (userData.password === password) {
          const currentUser = { username, ...userData }
          setUser(currentUser)
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
          return { success: true }
        }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, db }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
