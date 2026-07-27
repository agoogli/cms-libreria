import React from 'react'

export default function BeforeNavCustomLink() {
  return (
    <div className="nav-group" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="nav-group__label" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9, marginBottom: '0.5rem', padding: '0 10px' }}>
        Registrazioni
      </div>
      <a
        href="/admin/collections/utenti-registrati"
        className="nav-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'inherit',
          textDecoration: 'none',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7 }}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Utente Registrato</span>
      </a>

      <div className="nav-group__label" style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9, marginTop: '1.25rem', marginBottom: '0.5rem', padding: '0 10px' }}>
        Pagine Speciali
      </div>
      <a
        href="/admin/globals/novita-in-risalto"
        className="nav-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'inherit',
          textDecoration: 'none',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <span>Novità in risalto</span>
      </a>
    </div>
  )
}
