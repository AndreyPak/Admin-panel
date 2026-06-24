import './OLivePage.css'

// ─── Данные разделов ────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'business-process',
    title: 'Бизнес-процесс формирования заявочного листа',
    description: 'Описание процесса формирования заявочного листа для O-Live.',
    note: '',
    url: 'https://olivekz.app.n8n.cloud/workflow/whNtnoneFp5ZtGna',
    type: 'text',
  },
  {
    id: 'tool-2',
    title: 'Инструмент 2',
    description: '',
    note: '',
    type: 'placeholder',
  },
  {
    id: 'tool-3',
    title: 'Инструмент 3',
    description: '',
    note: '',
    type: 'placeholder',
  },
]

// ─── Компонент карточки ──────────────────────────────────────────────────────

function ToolCard({ item }) {
  if (item.type === 'placeholder') {
    return (
      <div className="olive-card olive-card--placeholder">
        <div className="olive-card__icon">🔧</div>
        <div className="olive-card__title">{item.title}</div>
        <div className="olive-card__empty">Будет добавлено позже</div>
      </div>
    )
  }

  return (
    <div className="olive-card">
      <div className="olive-card__icon">📋</div>
      <div className="olive-card__title">{item.title}</div>
      {item.description && (
        <div className="olive-card__desc">{item.description}</div>
      )}
      {item.note && <div className="olive-card__note">{item.note}</div>}
      {item.url && (
        <a
          className="olive-card__btn"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Открыть
        </a>
      )}
    </div>
  )
}

// ─── Главная страница ────────────────────────────────────────────────────────

export default function OLivePage() {
  return (
    <div className="page olive-page">
      <div className="olive-header">
        <div className="olive-header__logo">
          <span className="olive-header__badge">O</span>
          <div>
            <h1>Инструменты O-Live</h1>
            <p>Инструменты для управления платформой</p>
          </div>
        </div>
      </div>

      <section className="olive-section">
        <div className="olive-section__head">
          <span className="olive-section__icon">🔧</span>
          <h2>Инструменты</h2>
        </div>
        <div className="olive-grid">
          {TOOLS.map(item => (
            <ToolCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
