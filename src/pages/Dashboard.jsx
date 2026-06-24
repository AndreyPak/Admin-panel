import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="page">
      <h1>Дашборд</h1>
      <div className="stats-grid">
        <StatCard label="Пользователи" value="—" icon="👥" />
        <StatCard label="Активные сессии" value="—" icon="🟢" />
        <StatCard label="Событий сегодня" value="—" icon="📈" />
        <StatCard label="Ошибок" value="—" icon="⚠️" />
      </div>
      <div className="placeholder-block">
        <p>Здесь будет основной контент дашборда.<br/>Добавьте нужные виджеты через Claude.</p>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
