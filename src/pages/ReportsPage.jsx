import './OLivePage.css'

const REPORTS = [
  {
    id: 'daily-report',
    title: 'Ежедневный отчёт',
    description: 'Ежедневная аналитика по O-Live.',
    type: 'link',
    url: 'https://alexeyvladimirovich83-byte.github.io/olive-reports/',
  },
  {
    id: 'report-2',
    title: 'Отчёт 2',
    description: '',
    type: 'placeholder',
  },
  {
    id: 'report-3',
    title: 'Отчёт 3',
    description: '',
    type: 'placeholder',
  },
]

function ReportCard({ item }) {
  if (item.type === 'placeholder') {
    return (
      <div className="olive-card olive-card--placeholder">
        <div className="olive-card__icon">📊</div>
        <div className="olive-card__title">{item.title}</div>
        <div className="olive-card__empty">Будет добавлено позже</div>
      </div>
    )
  }

  return (
    <div className="olive-card olive-card--report">
      <div className="olive-card__icon">📊</div>
      <div className="olive-card__title">{item.title}</div>
      {item.description && (
        <div className="olive-card__desc">{item.description}</div>
      )}
      <a
        className="olive-card__btn"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Открыть отчёт
      </a>
    </div>
  )
}

export default function ReportsPage() {
  return (
    <div className="page olive-page">
      <div className="olive-header">
        <div className="olive-header__logo">
          <span className="olive-header__badge">📋</span>
          <div>
            <h1>Отчёты</h1>
            <p>Аналитика и отчётность по проекту O-Live</p>
          </div>
        </div>
      </div>

      <section className="olive-section">
        <div className="olive-grid">
          {REPORTS.map(item => (
            <ReportCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
