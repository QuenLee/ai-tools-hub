'use client';
import { useState, useEffect } from 'react';
import { doCheckin, getCheckinInfo, canCheckinToday, getBonusUses } from '@/lib/checkin';

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

    // 未签到时显示面板；已签到的只显示连签badge
    const dismissed = sessionStorage.getItem('checkin_dismissed');
    if (!dismissed && can) setShow(true);
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

  // 还没加载
  if (!info) return null;

  // 已签到 & 不显示面板 → 显示连签badge
  if (!show && !canCheckin && info.streak > 0) {
    return (
      <div className="checkin-streak-badge">
        🔥 连签{info.streak}天
      </div>
    );
  }

  // 未签到 & 面板收起 → 显示FAB按钮
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

  // 不需要显示
  if (!show) return null;

  // ── 签到面板 ──
  return (
    <div className="checkin-panel">
      {/* Header */}
      <div className="checkin-panel-header">
        <button className="checkin-panel-close" onClick={handleClose}>✕</button>
        <div className="checkin-panel-icon">📅</div>
        <div className="checkin-panel-title">每日签到</div>
      </div>

      {/* Body */}
      <div className="checkin-panel-body">
        {result ? (
          /* ── 签到成功 ── */
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
          /* ── 签到表单 ── */
          <>
            <div className="checkin-stats-row">
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: 'var(--accent2)' }}>
                  {info.streak}
                </div>
                <div className="checkin-stat-label">连签天数</div>
              </div>
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: '#f59e0b' }}>
                  {info.monthlyCount}
                </div>
                <div className="checkin-stat-label">本月签到</div>
              </div>
              <div className="checkin-stat">
                <div className="checkin-stat-val" style={{ color: 'var(--green)' }}>
                  {getBonusUses()}
                </div>
                <div className="checkin-stat-label">奖励次数</div>
              </div>
            </div>

            <button className="checkin-btn" onClick={handleCheckin}>
              🎯 签到 +2次AI
            </button>

            <div className="checkin-rewards">
              📌 每日签到+2次 · 连签7天+5次 · 连签30天+10次
            </div>
          </>
        )}
      </div>
    </div>
  );
}
