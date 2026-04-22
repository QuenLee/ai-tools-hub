'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AICodeReview({ onBack, locale }) {
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('javascript');
  const [result, setResult] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  const guard = useToolGuard('ai-code-review');
  const review = () => {
    if (!code.trim() || !guard.check()) return;
    setReviewing(true);
    setTimeout(() => {
      guard.useOnce();
      setResult([
        { type: 'warning', title: '潜在空指针', desc: '第3行变量可能为null，建议添加空值检查' },
        { type: 'info', title: '性能优化', desc: '循环内的字符串拼接建议改为数组join' },
        { type: 'info', title: '代码风格', desc: '函数名建议使用camelCase命名规范' },
        { type: 'good', title: '错误处理', desc: 'try-catch使用得当，继续保持' },
      ]);
      setReviewing(false);
    }, 1800);
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  const typeMap = { warning: { color: 'var(--yellow)', icon: '⚠️' }, info: { color: 'var(--accent)', icon: '💡' }, good: { color: 'var(--green)', icon: '✅' } };
  return (
    <ToolWrapper title="AI代码审查" desc="AI分析代码，找出bug和优化建议" icon="💻" onBack={onBack} remaining={guard.remaining}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {['javascript','python','java','go','rust'].map(l => <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: lang === l ? '1px solid var(--accent)' : '1px solid var(--border)', background: lang === l ? 'rgba(99,102,241,0.08)' : 'transparent', color: lang === l ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem' }}>{l}</button>)}
      </div>
      <textarea value={code} onChange={e => setCode(e.target.value)} placeholder={`粘贴你的${lang}代码...`} style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', minHeight: 180, resize: 'vertical', boxSizing: 'border-box', marginBottom: 12 }} />
      <button onClick={review} disabled={!code.trim() || reviewing} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: code.trim() ? 'var(--accent)' : 'var(--border)', color: code.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: code.trim() ? 'pointer' : 'not-allowed' }}>{reviewing ? '审查中...' : 'AI审查代码'}</button>
      {result && <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>{result.map((r, i) => { const t = typeMap[r.type]; return <div key={i} style={{ padding: 12, borderRadius: 'var(--radius-sm)', border: `1px solid ${t.color}33`, background: `${t.color}08` }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><span>{t.icon}</span><span style={{ fontWeight: 700, fontSize: '0.82rem', color: t.color }}>{r.title}</span></div><div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{r.desc}</div></div>; })}</div>}
    </ToolWrapper>
  );
}
