import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Дашборд', icon: '📊' },
  { path: '/olive', label: 'O-Live', icon: '🫒' },
  { path: '/users', label: 'Пользователи', icon: '👥' },
  { path: '/settings', label: 'Настройки', icon: '⚙️' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#4F46E5"/>
          <path d="M14 24h20M24 14v20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span>Админка</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.picture
              ? <img src={user.picture} alt="avatar" />
              : <span>{user?.email?.[0]?.toUpperCase() ?? '?'}</span>
            }
          </div>
          <div className="user-details">
            <div className="user-name">{user?.name ?? user?.email}</div>
            <div className="user-email">{user?.email}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={logout} title="Выйти">
          ↩
        </button>
      </div>
    </aside>
  )
}
