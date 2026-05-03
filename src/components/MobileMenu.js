'use client';

import { useState } from 'react';

export default function MobileMenu({ locale }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: ThemeToggle is separate + Hamburger */}
      <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
        <button
          className="hamburger-btn"
          onClick={() => setOpen(true)}
          style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 8, padding: '6px 10px', cursor: 'pointer',
            color: 'var(--text)', fontSize: '1.1rem', lineHeight: 1,
          }}
        >☰</button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, top: 52,
            background: 'rgba(0,0,0,0.4)', zIndex: 198,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-down menu */}
      <div
        className="mobile-menu"
        style={{
          display: open ? 'flex' : 'none',
          position: 'fixed', top: 52, left: 0, right: 0, maxHeight: 'calc(100vh - 52px)',
          background: 'var(--bg)', zIndex: 199,
          padding: '16px', flexDirection: 'column', gap: 4,
          overflowY: 'auto', borderBottom: '1px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <a href={`/${locale}/tools`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: '1rem', color: 'var(--text)', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>🛠 全部工具</a>
        <a href={`/${locale}/faq`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: '1rem', color: 'var(--text)', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>❓ 常见问题</a>
        <a href={`/${locale}/privacy`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: '1rem', color: 'var(--text)', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>🔒 隐私政策</a>
        <a href={`/${locale}/terms`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 16px', fontSize: '1rem', color: 'var(--text)', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>📜 服务条款</a>
        <button onClick={() => setOpen(false)} style={{ padding: '14px 16px', fontSize: '1rem', color: 'var(--text3)', borderRadius: 10, border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 500, marginTop: 8 }}>✕ 关闭</button>
      </div>
    </>
  );
}
