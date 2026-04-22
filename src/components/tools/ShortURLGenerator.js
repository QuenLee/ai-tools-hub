'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function ShortURLGenerator({ onBack, locale }) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [links, setLinks] = useState([]);
  const guard = useToolGuard('short-url');
  const generate = () => {
    if (!url.trim() || !guard.check()) return;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = ''; for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    const newLink = { original: url, short: `q.ai/${code}`, clicks: 0, created: new Date().toLocaleString() };
    setLinks(prev => [newLink, ...prev]); setResult(newLink); guard.useOnce(); setUrl('');
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="短链接生成+统计" desc="生成短链接并追踪点击数据" icon="🔗" onBack={onBack} remaining={guard.remaining}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://your-long-url.com/page" style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem' }} />
        <button onClick={generate} disabled={!url.trim()} style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', background: url.trim() ? 'var(--accent)' : 'var(--border)', color: url.trim() ? '#fff' : 'var(--text3)', fontWeight: 600, border: 'none', cursor: url.trim() ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap' }}>生成</button>
      </div>
      {result && <div style={{ padding: 16, borderRadius: 'var(--radius-sm)', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 14 }}><div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>生成成功</div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)' }}>{result.short}</span><button onClick={() => navigator.clipboard.writeText(result.short)} style={{ padding: '3px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--text2)' }}>复制</button></div></div>}
      {links.length > 0 && <div><div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 8 }}>历史链接</div>{links.map((l, i) => <div key={i} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--accent)' }}>{l.short}</div><div style={{ fontSize: '0.68rem', color: 'var(--text3)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.original}</div></div><span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{l.clicks} 点击</span></div>)}</div>}
    </ToolWrapper>
  );
}
