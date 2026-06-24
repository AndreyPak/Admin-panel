import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import './SettingsPage.css'

export default function SettingsPage() {
  const { ALLOWED_EMAILS } = useAuth()

  return (
    <div className="page">
      <h1>Настройки</h1>
      <div className="settings-section">
        <h2>Доступ к админке</h2>
        <p>Пользователи с правом входа:</p>
        <ul className="email-list">
          {ALLOWED_EMAILS.map(email => (
            <li key={email}>{email}</li>
          ))}
        </ul>
        <p className="hint">Чтобы добавить или удалить пользователя, скажите Claude: «Добавь email ... в список доступа»</p>
      </div>
    </div>
  )
}
