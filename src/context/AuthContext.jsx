import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const SHEET_ID = '1WWPdalWD7opa3sEnhOM9-TSWUXkoz6htoPdh-oZqcdY'
const ADMIN_EMAIL = 'avpak85@gmail.com'
const FALLBACK_EMAILS = [ADMIN_EMAIL]

// Читаем список из публичной таблицы (без авторизации)
async function fetchAllowedEmails() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`
    const res = await fetch(url)
    const text = await res.text()
    return text
      .split('\n')
      .map(row => row.replace(/"/g, '').trim().toLowerCase())
      .filter(email => email.includes('@') && email !== 'email')
  } catch {
    return FALLBACK_EMAILS
  }
}

// Пишем весь список обратно в таблицу (только для администратора)
async function saveEmailsToSheet(emails, accessToken) {
  const values = [['email'], ...emails.map(e => [e])]
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:A${values.length}?valueInputOption=RAW`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ range: `A1:A${values.length}`, majorDimension: 'COLUMNS', values: [values.map(r => r[0])] }),
    }
  )
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [sheetsToken, setSheetsToken] = useState(null)
  const [allowedEmails, setAllowedEmails] = useState(FALLBACK_EMAILS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllowedEmails().then(emails => {
      if (emails.length > 0) setAllowedEmails(emails)
      setLoading(false)
    })
  }, [])

  async function login(googleUser, accessToken) {
    const email = googleUser?.email?.toLowerCase()
    const currentList = await fetchAllowedEmails()
    if (currentList.length > 0) setAllowedEmails(currentList)

    if (currentList.includes(email) || FALLBACK_EMAILS.includes(email)) {
      setUser(googleUser)
      if (email === ADMIN_EMAIL && accessToken) {
        setSheetsToken(accessToken)
      }
      return { success: true }
    }
    return { success: false, reason: 'not_allowed' }
  }

  function logout() {
    setUser(null)
    setSheetsToken(null)
  }

  async function addEmail(email) {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || allowedEmails.includes(trimmed)) return false
    const updated = [...allowedEmails, trimmed]
    setAllowedEmails(updated)
    if (sheetsToken) await saveEmailsToSheet(updated, sheetsToken)
    return true
  }

  async function removeEmail(email) {
    const updated = allowedEmails.filter(e => e !== email)
    setAllowedEmails(updated)
    if (sheetsToken) await saveEmailsToSheet(updated, sheetsToken)
  }

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL

  return (
    <AuthContext.Provider value={{ user, login, logout, allowedEmails, addEmail, removeEmail, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
