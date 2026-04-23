'use client';
import { useState, useEffect } from 'react';
import { doCheckin, getCheckinInfo, canCheckinToday } from '@/lib/checkin';
import { getBonusUses } from '@/lib/checkin';

export default function CheckinWidget() {
  const [info, setInfo] = useState(null);
  const [canCheckin, setCanCheckin] = useState(false);
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setInfo(getCheckinInfo());
    setCanCheckin(canCheckinToday());
    // Show widget if not checked in today
    const dismissed = sessionStorage.getItem('checkin_dismissed');
    if (!dismissed && canCheckinToday()) setShow(true);
  }, []);

  const handleCheckin = () => {
    const res = doCheckin();
    setResult(res);
    setCanCheckin(false);
    setInfo(getCheckinInfo());
  };

  if (!info || !show) {
    // Mini indicator in corner
    if (info && !show && canCheckin) {
      return (
        <button onClick={() => setShow(true)}
          style={{
            position: 'fixed', bottom: 20, right: 20, zIndex: 999,
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            border: 'none', cursor: 'pointer', fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
            animation: 'pulse 2s infinite',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          📅
        </button>
      );
    }
    // Show small streak badge if already checked in
    if (info && info.streak > 0 && !canCheckin) {
      return (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 999,
          padding: '6px 12px', borderRadius: 20,
          background: 'var(--surface)', border: '1px solid var(--border)',
          fontSize: '0.72rem', color: 'var(--text2)', fontWeight: 600,
        }}>
          🔥 连签{info.streak}天
        </div>
      );
    }
    return null;
  }

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 999,
      width: 280, padding: 20, borderRadius: 16,
      background: 'var(--surface)', border: '1px solid var(--border)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    }}>
      {/* Close button */}
      <button onClick={() => { setShow(false); sessionStorage.setItem('checkin_dismissed', '1'); }}
        style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.9rem' }}>✕</button>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: '2rem', marginBottom: 4 }}>📅</div>
        <div style={{ fontSize: '0.96rem', fontWeight: 700 }}>每日签到</div>
      </div>

      {result ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>✅</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--green)', marginBottom: 8 }}>{result.message}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>
            🔥 连续签到 <b style={{ color: 'var(--accent)' }}>{result.streak}</b> 天
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>
            本月已签 {info.monthlyCount} 天
          </div>
        </div>
      ) : (
        <div>
          {/* Streak info */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 12, fontSize: '0.78rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)' }}>{info.streak}</div>
              <div style={{ color: 'var(--text3)' }}>连签天数</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>{info.monthlyCount}</div>
              <div style={{ color: 'var(--text3)' }}>本月签到</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green)' }}>{getBonusUses()}</div>
              <div style={{ color: 'var(--text3)' }}>奖励次数</div>
            </div>
          </div>

          {/* Checkin button */}
          <button onClick={handleCheckin}
            style={{
              width: '100%', padding: '10px 20px', borderRadius: 10,
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer',
              fontSize: '0.92rem', transition: 'transform 0.2s',
            }}>
            🎯 签到 +2次AI
          </button>

          {/* Rewards */}
          <div style={{ marginTop: 10, fontSize: '0.68rem', color: 'var(--text3)', lineHeight: 1.5 }}>
            📌 每日签到+2次 · 连签7天+5次 · 连签30天+10次
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
