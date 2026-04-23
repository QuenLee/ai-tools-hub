'use client';
import { useState, useEffect } from 'react';
import { canUseTool, recordUsage, isPaidUser, getFreeLimitDisplay } from '@/lib/usage';

export function useToolGuard(toolId) {
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(-1); // -1表示尚未初始化
  const paid = typeof window !== 'undefined' && isPaidUser();

  const check = () => {
    if (paid) { setRemaining(Infinity); setBlocked(false); return true; }
    const { allowed, remaining: r } = canUseTool(toolId);
    setRemaining(r);
    if (!allowed) { setBlocked(true); return false; }
    return true;
  };

  const useOnce = () => { recordUsage(toolId); check(); };

  // 首次挂载时初始化次数
  useEffect(() => { check(); }, [toolId]);

  return { blocked, remaining, paid, check, useOnce };
}

export function ToolWrapper({ title, desc, icon, onBack, remaining, children }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: 20 }}>← 返回工具箱</button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 6 }}>
        <span style={{ fontSize: '1.6rem' }}>{icon}</span>
        <h1 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{title}</h1>
      </div>
      <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: 4 }}>{desc}</p>
      {remaining >= 0 && remaining !== Infinity && <p style={{ color: 'var(--green)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 16 }}>今日剩余免费次数：{remaining}</p>}
      {remaining === Infinity && <p style={{ color: 'var(--accent2)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 16 }}>👑 会员无限使用</p>}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24, textAlign: 'left' }}>
        {children}
      </div>
    </div>
  );
}

export function LimitBlocked({ onBack }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer', marginBottom: 20 }}>← 返回工具箱</button>
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔒</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>今日免费次数已用完</div>
        <div style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: 20 }}>开通会员即可无限使用全部工具</div>
        <button onClick={onBack} style={{ padding: '10px 24px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>返回工具箱</button>
      </div>
    </div>
  );
}
