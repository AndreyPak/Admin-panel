import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Список разрешённых email — добавляйте сюда
const ALLOWED_EMAILS = [
  'avpak85@gmail.com',
  // 'other@gmail.com',
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Будет вызываться после Google OAuth
  function login(googleUser) {
    const email = googleUser?.email
    if (ALLOWED_EMAILS.includes(email)) {
      setUser(googleUser)
      return { success: true }
    }
    return { success: false, reason: 'not_allowed' }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ALLOWED_EMAILS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
