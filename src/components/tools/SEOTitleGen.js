'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function SEOTitleGen({ onBack, locale }) {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState(null);
  const [generating, setGenerating] = useState(false);
  const guard = useToolGuard('seo-title-gen');
  const generate = () => {
    if (!topic.trim() || !guard.check()) return;
    setGenerating(true);
    setTimeout(() => {
      guard.useOnce();
      const kw = keywords ? ` ${keywords}` : '';
      setResults([
        `2026最新${topic}${kw}完全指南 - 从入门到精通`,
        `${topic}${kw}哪个好？5款产品深度横评`,
        `${topic}${kw}免费吗？2026年最全免费方案汇总`,
        `为什么${topic}${kw}成为2026年最大趋势？3个关键原因`,
        `${topic}${kw}入门教程：10分钟快速上手`,
        `别再花冤枉钱！${topic}${kw}省钱攻略大公开`,
        `${topic}${kw} vs 竞品对比，选前必看`,
        `资深用户分享：${topic}${kw}使用技巧和避坑指南`,
      ]);
      setGenerating(false);
    }, 1000);
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="SEO标题生成" desc="输入主题，批量生成SEO友好的标题" icon="📈" onBack={onBack} remaining={guard.remaining}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>文章主题</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="例如：AI写作工具" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>关键词（可选）</label>
        <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="例如：免费、2026、对比" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
      </div>
      <button onClick={generate} disabled={!topic.trim() || generating} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: topic.trim() ? 'var(--accent)' : 'var(--border)', color: topic.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: topic.trim() ? 'pointer' : 'not-allowed' }}>{generating ? '生成中...' : '生成SEO标题'}</button>
      {results && <div style={{ marginTop: 14 }}><div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 8 }}>生成结果（点击复制）</div>{results.map((r, i) => <div key={i} onClick={() => navigator.clipboard.writeText(r)} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 6, fontSize: '0.85rem', color: 'var(--text2)', cursor: 'pointer', transition: 'background 0.2s' }}>{r}</div>)}</div>}
    </ToolWrapper>
  );
}
