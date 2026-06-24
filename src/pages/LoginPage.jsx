import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const IS_DEV = window.location.hostname === 'localhost'

export default function LoginPage() {
  const { login } = useAuth()

  const googleLogin = useGoogleLogin({
    scope: 'openid email profile https://www.googleapis.com/auth/spreadsheets',
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const profile = await res.json()
        const result = await login(
          { email: profile.email, name: profile.name, picture: profile.picture },
          tokenResponse.access_token
        )
        if (!result.success) {
          alert('Доступ запрещён. Ваш аккаунт не в списке разрешённых.')
        }
      } catch {
        alert('Ошибка авторизации. Попробуйте ещё раз.')
      }
    },
    onError: () => alert('Ошибка авторизации Google.'),
  })

  function handleDevLogin() {
    login({ email: 'avpak85@gmail.com', name: 'Dev User', picture: null }, null)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="#4F46E5"/>
            <path d="M14 24h20M24 14v20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <h1>Админ-панель</h1>
        <p>Войдите через Google-аккаунт. Доступ только для авторизованных пользователей.</p>
        <button className="google-btn" onClick={() => googleLogin()}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6C12.4 13 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
            <path fill="#FBBC05" d="M10.5 28.7A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.6 2.7 10.7l7.8-6z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-7.8 6C6.7 42.6 14.7 48 24 48z"/>
          </svg>
          Войти через Google
        </button>
        {IS_DEV && (
          <button className="google-btn" onClick={handleDevLogin} style={{ marginTop: '10px', background: '#f1f5f9', color: '#334155' }}>
            🛠 Войти локально (dev)
          </button>
        )}
      </div>
    </div>
  )
}
