import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './UsersPage.css'

export default function UsersPage() {
  const { allowedEmails, addEmail, removeEmail, user, isAdmin } = useAuth()
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    const val = input.trim().toLowerCase()
    if (!val.includes('@')) { setError('Введите корректный email'); return }
    setSaving(true)
    const ok = await addEmail(val)
    setSaving(false)
    if (!ok) { setError('Этот email уже в списке'); return }
    setInput('')
    setError('')
  }

  async function handleRemove(email) {
    if (email === user?.email) { alert('Нельзя удалить свой аккаунт'); return }
    setSaving(true)
    await removeEmail(email)
    setSaving(false)
  }

  return (
    <div className="page users-page">
      <h1>Управление пользователями</h1>
      <p className="users-desc">
        Список Gmail-аккаунтов с доступом в админ-панель.
        {!isAdmin && <span className="users-readonly"> Только просмотр — редактирование доступно администратору.</span>}
      </p>

      <div className="users-card">
        {isAdmin && (
          <>
            <form className="users-add-form" onSubmit={handleAdd}>
              <input
                type="email"
                className="users-input"
                placeholder="Введите Gmail-адрес"
                value={input}
                onChange={e => { setInput(e.target.value); setError('') }}
                disabled={saving}
              />
              <button type="submit" className="users-btn-add" disabled={saving}>
                {saving ? '...' : 'Добавить'}
              </button>
            </form>
            {error && <div className="users-error">{error}</div>}
          </>
        )}

        <ul className="users-list">
          {allowedEmails.map(email => (
            <li key={email} className="users-item">
              <span className="users-avatar">{email[0].toUpperCase()}</span>
              <span className="users-email">{email}</span>
              {email === user?.email?.toLowerCase() && <span className="users-badge">вы</span>}
              {isAdmin && (
                <button
                  className="users-btn-remove"
                  onClick={() => handleRemove(email)}
                  disabled={saving}
                  title="Удалить доступ"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
