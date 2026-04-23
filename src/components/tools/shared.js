'use client';
import { useState, useEffect } from 'react';
import { canUseTool, recordUsage, getFreeLimitDisplay } from '@/lib/usage';

export function useToolGuard(toolId) {
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(-1);

  const check = () => {
    const { allowed, remaining: r } = canUseTool(toolId);
    setRemaining(r);
    if (!allowed) { setBlocked(true); return false; }
    return true;
  };

  const useOnce = () => { recordUsage(toolId); check(); };

  useEffect(() => { check(); }, [toolId]);

  return { blocked, remaining, check, useOnce };
}

export function ToolWrapper({ title, desc, icon, onBack, remaining, children }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Back button */}
      <button onClick={onBack}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: 16, transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
      >
        ← 返回工具箱
      </button>

      {/* Tool header — cleaner, no centering */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{icon}</div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{title}</h1>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{desc}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {remaining >= 0 && remaining !== Infinity && (
            <span style={{ fontSize: '0.72rem', padding: '2px 10px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', color: 'var(--green)', fontWeight: 600 }}>
              今日剩余 {remaining} 次
            </span>
          )}
          {remaining === Infinity && (
            <span style={{ fontSize: '0.72rem', padding: '2px 10px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', color: 'var(--green)', fontWeight: 600 }}>
              ✓ 免费无限
            </span>
          )}
        </div>
      </div>

      {/* Content area — no extra wrapper, children handle their own layout */}
      <div style={{ marginTop: 16 }}>
        {children}
      </div>
    </div>
  );
}

export function LimitBlocked({ onBack }) {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>⏰</div>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>今日免费次数已用完</div>
      <div style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: 20, lineHeight: 1.6 }}>明天0点自动重置，每天可免费使用<br/>试试其他免费工具吧</div>
      <button onClick={onBack} style={{ padding: '10px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>返回工具箱</button>
    </div>
  );
}
