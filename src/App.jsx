import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import OLivePage from './pages/OLivePage'
import UsersPage from './pages/UsersPage'
import SettingsPage from './pages/SettingsPage'
import FinancePage from './pages/FinancePage'
import ReportsPage from './pages/ReportsPage'
import ProcessesPage from './pages/ProcessesPage'
import './App.css'

function ProtectedLayout() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/olive" element={<OLivePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/processes" element={<ProcessesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/Admin-panel">
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
