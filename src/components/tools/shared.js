'use client';
import { useState, useEffect } from 'react';
import { canUseTool, recordUsage, getFreeLimitDisplay } from '@/lib/usage';

export function useToolGuard(toolId) {
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(-1);

  const check = () => {
    const { allowed, remaining: r } = canUseTool(toolId);
    setRemaining(r);
    if (!allowed) {
      setBlocked(true);
      // 触发签到面板
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('ai-limit-reached'));
      }
      return false;
    }
    return true;
  };

  const useOnce = () => {
    recordUsage(toolId);
    check();
  };

  useEffect(() => { check(); }, [toolId]);

  return { blocked, remaining, check, useOnce };
}

export function ToolWrapper({ title, desc, icon, onBack, remaining, children }) {
  return (
    <div className="detail-page" style={{ padding: '0' }}>
      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 20,
        border: '1px solid var(--border)', background: 'transparent',
        color: 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer',
        marginBottom: 12, transition: 'all 0.15s',
      }}>
        ← 返回工具箱
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'rgba(99,102,241,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem',
        }}>{icon}</div>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{title}</h1>
          <div style={{ fontSize: '0.76rem', color: 'var(--text2)' }}>{desc}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {remaining >= 0 && remaining !== Infinity && (
            <span className="detail-badge" style={{
              background: 'rgba(16,185,129,0.08)', color: 'var(--green)',
            }}>
              今日剩余 {remaining} 次
            </span>
          )}
          {remaining === Infinity && (
            <span className="detail-badge" style={{
              background: 'rgba(16,185,129,0.08)', color: 'var(--green)',
            }}>
              ✓ 免费无限
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  );
}

export function LimitBlocked({ onBack }) {
  return (
    <div className="empty-state" style={{ padding: '60px 20px' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>⏰</div>
      <div style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 6, color: 'var(--text2)' }}>
        今日免费次数已用完
      </div>
      <div style={{ color: 'var(--text2)', fontSize: '0.85rem', marginBottom: 20, lineHeight: 1.6 }}>
        明天0点自动重置<br/>
        💡 右下角签到可获得额外AI次数！
      </div>
      <button onClick={onBack} style={{
        padding: '10px 24px', borderRadius: 'var(--radius-sm)',
        background: 'var(--accent)', color: '#fff', fontWeight: 600,
        border: 'none', cursor: 'pointer', fontSize: '0.88rem',
      }}>
        返回工具箱
      </button>
    </div>
  );
}
