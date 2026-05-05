'use client';
import { useState, useEffect } from 'react';
import { doCheckin, getCheckinInfo, canCheckinToday, getBonusUses, getNextMilestone, STREAK_BONUSES } from '@/lib/checkin';

export default function CheckinWidget() {
  const [info, setInfo] = useState(null);
  const [canCheckin, setCanCheckin] = useState(false);
  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkinInfo = getCheckinInfo();
    const can = canCheckinToday();
    setInfo(checkinInfo);
    setCanCheckin(can);

    const dismissed = sessionStorage.getItem('checkin_dismissed');
    if (!dismissed && can) setShow(true);

    // 全局事件：AI次数用完时自动弹签到面板
    const handleLimitReached = () => {
      if (canCheckinToday()) {
        setShow(true);
        sessionStorage.removeItem('checkin_dismissed');
      }
    };
    window.addEventListener('ai-limit-reached', handleLimitReached);
    return () => window.removeEventListener('ai-limit-reached', handleLimitReached);
  }, []);

  const handleCheckin = () => {
    const res = doCheckin();
    setResult(res);
    setCanCheckin(false);
    setInfo(getCheckinInfo());
  };

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('checkin_dismissed', '1');
  };

  if (!info) return null;

  // 已签到 → 连签badge
  if (!show && !canCheckin && info.streak > 0) {
    return (
      <div className="checkin-streak-badge">
        🔥 连签{info.streak}天
      </div>
    );
  }

  // 未签到 & 面板收起 → FAB按钮
  if (!show && canCheckin) {
    return (
      <button
        className="checkin-fab"
        onClick={() => setShow(true)}
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          color: '#fff',
        }}
      >
        📅
      </button>
    );
  }

  if (!show) return null;

  // ── 签到面板 ──
  const nextMs = info.nextMilestone;

  return (
    <div className="checkin-panel">
      <div className="checkin-panel-header">
        <button className="checkin-panel-close" onClick={handleClose}>✕</button>
        <div className="checkin-panel-icon">📅</div>
        <div className="checkin-panel-title">每日签到</div>
      </div>

      <div className="checkin-panel-body">
        {result ? (
          <div className="checkin-result">
            <div className="checkin-result-icon">✅</div>
            <div className="checkin-result-msg">{result.message}</div>
            <div className="checkin-result-detail">
              🔥 连续签到 <strong style={{ color: 'var(--accent2)' }}>{result.streak}</strong> 天
            </div>
            <div className="checkin-result-monthly">
              本月已签 {info.monthlyCount} 天
            </div>
          </div>
        ) : (
          <>
            {/* 统计 */}
            <div className="checkin-stats-row">
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: 'var(--accent2)' }}>{info.streak}</div>
                <div className="checkin-stat-label">连签天数</div>
              </div>
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: '#f59e0b' }}>{info.monthlyCount}</div>
                <div className="checkin-stat-label">本月签到</div>
              </div>
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: 'var(--green)' }}>{getBonusUses()}</div>
                <div className="checkin-stat-label">奖励次数</div>
              </div>
            </div>

            {/* 里程碑进度条 */}
            {nextMs && (
              <div className="checkin-milestone">
                <div className="cm-label">
                  🎯 再签 <strong>{nextMs.remaining}</strong> 天 → {nextMs.label} +{nextMs.bonus}次
                </div>
                <div className="cm-track">
                  <div className="cm-fill" style={{ width: `${(info.streak / nextMs.days) * 100}%` }} />
                </div>
              </div>
            )}

            <button className="checkin-btn" onClick={handleCheckin}>
              🎯 签到 +3次AI
            </button>

            <div className="checkin-rewards">
              📌 每日+3次 · 3天+3 · 7天+5 · 14天+10 · 30天+20
            </div>
          </>
        )}
      </div>
    </div>
  );
}
