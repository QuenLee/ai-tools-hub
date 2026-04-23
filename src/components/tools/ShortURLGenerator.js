'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function ShortURLGenerator({ onBack, locale }) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const guard = useToolGuard('short-url');

  const generate = async () => {
    if (!url.trim() || !guard.check()) return;
    setLoading(true);
    setError('');

    try {
      // Use is.gd free API for real short URLs
      const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url.trim())}&logstats=1`);
      const data = await res.json();

      if (data.errormessage) {
        setError(data.errormessage);
      } else {
        const newLink = {
          original: url.trim(),
          short: data.shorturl,
          created: new Date().toLocaleString(),
        };
        setLinks(prev => [newLink, ...prev]);
        setResult(newLink);
        setUrl('');
        guard.useOnce();
      }
    } catch (e) {
      // Fallback: generate a local short-code display
      setError('is.gd服务暂不可用，请稍后重试');
    }

    setLoading(false);
  };

  if (guard.blocked) return <LimitBlocked onBack={onBack} />;

  return (
    <ToolWrapper title="短链接生成+统计" desc="生成真实可用的短链接（is.gd）" icon="🔗" onBack={onBack} remaining={guard.remaining}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input value={url} onChange={e => { setUrl(e.target.value); setError(''); }} placeholder="https://your-long-url.com/page"
          onKeyDown={e => e.key === 'Enter' && generate()}
          style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
        <button onClick={generate} disabled={!url.trim() || loading}
          style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', background: url.trim() ? 'var(--accent)' : 'var(--border)', color: url.trim() ? '#fff' : 'var(--text3)', fontWeight: 600, border: 'none', cursor: url.trim() ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap' }}>
          {loading ? '...' : '生成'}
        </button>
      </div>

      {error && <div style={{ marginBottom: 10, padding: 8, borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.08)', color: 'var(--red)', fontSize: '0.78rem' }}>❌ {error}</div>}

      {result && (
        <div style={{ padding: 16, borderRadius: 'var(--radius-sm)', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 14 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>✅ 生成成功</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href={result.short} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>{result.short}</a>
            <button onClick={() => navigator.clipboard.writeText(result.short)} style={{ padding: '3px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 4 }}>原始链接: {result.original}</div>
        </div>
      )}

      {links.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>历史链接 ({links.length})</span>
            <button onClick={() => setLinks([])} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text3)' }}>清除</button>
          </div>
          {links.map((l, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={l.short} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}>{l.short}</a>
                <button onClick={() => navigator.clipboard.writeText(l.short)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text3)' }}>📋</button>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.original}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text3)', textAlign: 'center' }}>
        由 is.gd 提供短链接服务 · 链接永久有效
      </div>
    </ToolWrapper>
  );
}
