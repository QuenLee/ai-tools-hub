'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AITextDetect({ onBack, locale }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const guard = useToolGuard('ai-text-detect');
  const maxChars = guard.paid ? 5000 : 500;

  const analyze = () => {
    if (!text.trim() || !guard.check()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const words = text.trim().split(/\s+/);
      const avgLen = words.reduce((s, w) => s + w.length, 0) / Math.max(1, words.length);
      const uniqueRatio = new Set(words).size / Math.max(1, words.length);
      let score = 50;
      if (avgLen > 4) score += 10;
      if (uniqueRatio < 0.6) score += 15;
      if (text.includes('首先') && text.includes('其次') && text.includes('最后')) score += 15;
      if (text.includes('综上所述') || text.includes('总而言之')) score += 10;
      if (words.length < 20) score = Math.min(score, 40);
      score = Math.min(98, Math.max(5, score));
      guard.useOnce();
      setResult({ score, label: score > 70 ? '很可能AI生成' : score > 40 ? '可能包含AI内容' : '更像是人类撰写', color: score > 70 ? 'var(--red)' : score > 40 ? 'var(--yellow)' : 'var(--green)', details: [`词汇平均长度: ${avgLen.toFixed(1)}字符`, `词汇多样性: ${(uniqueRatio * 100).toFixed(0)}%`, `结构化程度: ${text.includes('首先') || text.includes('第一') ? '高' : '一般'}`] });
      setAnalyzing(false);
    }, 1200);
  };

  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="AI文本检测" desc="检测文本是否由AI生成，适用于学术审核、内容质检" icon="🔍" onBack={onBack} remaining={guard.remaining}>
      <textarea value={text} onChange={e => setText(e.target.value.slice(0, maxChars))} placeholder="粘贴要检测的文本..." style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: 150, resize: 'vertical', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 12px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{text.length}/{maxChars}字符{!guard.paid && ' · 会员可检测5000字'}</span>
        <button onClick={analyze} disabled={!text.trim() || analyzing} style={{ padding: '8px 20px', borderRadius: 'var(--radius-sm)', background: text.trim() ? 'var(--accent)' : 'var(--border)', color: text.trim() ? '#fff' : 'var(--text3)', fontWeight: 600, border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed' }}>{analyzing ? '分析中...' : '开始检测'}</button>
      </div>
      {result && (
        <div style={{ padding: 20, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: result.color }}>{result.score}%</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, color: result.color }}>{result.label}</div>
          </div>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: 14 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: 8 }}>检测细节：</div>
            {result.details.map((d, i) => <div key={i} style={{ fontSize: '0.78rem', color: 'var(--text2)', padding: '3px 0' }}>• {d}</div>)}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 10 }}>⚠️ 本检测为启发式算法，仅供参考</div>
        </div>
      )}
    </ToolWrapper>
  );
}
