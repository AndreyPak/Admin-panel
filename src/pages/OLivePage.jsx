import { useState } from 'react'
import './OLivePage.css'

// ─── Данные разделов ────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'business-process',
    title: 'Бизнес-процесс формирования заявочного листа',
    description: 'Описание процесса формирования заявочного листа для O-Live.',
    note: '(в будущем будет ссылка)',
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

const REPORTS = [
  {
    id: 'daily-report',
    title: 'Ежедневный отчёт',
    description: 'Ежедневная аналитика по O-Live.',
    type: 'iframe',
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
    </div>
  )
}

function ReportCard({ item, onOpen }) {
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
      <button className="olive-card__btn" onClick={() => onOpen(item)}>
        Открыть отчёт
      </button>
    </div>
  )
}

// ─── Модальное окно с iframe ─────────────────────────────────────────────────

function ReportModal({ report, onClose }) {
  if (!report) return null

  return (
    <div className="olive-modal-backdrop" onClick={onClose}>
      <div className="olive-modal" onClick={e => e.stopPropagation()}>
        <div className="olive-modal__header">
          <span className="olive-modal__title">{report.title}</span>
          <button className="olive-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="olive-modal__body">
          <iframe
            src={report.url}
            title={report.title}
            className="olive-modal__iframe"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

// ─── Главная страница ────────────────────────────────────────────────────────

export default function OLivePage() {
  const [openReport, setOpenReport] = useState(null)

  return (
    <div className="page olive-page">
      <div className="olive-header">
        <div className="olive-header__logo">
          <span className="olive-header__badge">O</span>
          <div>
            <h1>Администрирование O-Live</h1>
            <p>Инструменты и отчёты для управления платформой</p>
          </div>
        </div>
      </div>

      {/* ── Раздел: Инструменты ── */}
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

      {/* ── Раздел: Отчёты ── */}
      <section className="olive-section">
        <div className="olive-section__head">
          <span className="olive-section__icon">📊</span>
          <h2>Отчёты</h2>
        </div>
        <div className="olive-grid">
          {REPORTS.map(item => (
            <ReportCard key={item.id} item={item} onOpen={setOpenReport} />
          ))}
        </div>
      </section>

      <ReportModal report={openReport} onClose={() => setOpenReport(null)} />
    </div>
  )
}
