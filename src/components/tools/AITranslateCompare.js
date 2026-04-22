'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AITranslateCompare({ onBack, locale }) {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [results, setResults] = useState(null);
  const [translating, setTranslating] = useState(false);
  const guard = useToolGuard('ai-translate');
  const translate = () => {
    if (!text.trim() || !guard.check()) return;
    setTranslating(true);
    setTimeout(() => {
      const langMap = { en: 'English', ja: '日本語', ko: '한국어', fr: 'Français' };
      const target = langMap[targetLang] || 'English';
      setResults({ deepseek: `[DeepSeek] Simulated translation to ${target}. 实际部署将调用DeepSeek API获取真实翻译结果。`, tongyi: `[通义千问] 模拟翻译至${target}。实际部署将调用百炼API获取真实翻译。`, chatgpt: `[ChatGPT] Simulated translation to ${target}. Production will call OpenAI API.` });
      guard.useOnce(); setTranslating(false);
    }, 1500);
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="AI翻译对比" desc="同一文字，多模型翻译并排对比" icon="🌐" onBack={onBack} remaining={guard.remaining}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入要翻译的中文文本..." style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {[{id:'en',label:'英语'},{id:'ja',label:'日语'},{id:'ko',label:'韩语'},{id:'fr',label:'法语'}].map(l => <button key={l.id} onClick={() => setTargetLang(l.id)} style={{ padding: '5px 14px', borderRadius: 'var(--radius-2xs)', border: targetLang === l.id ? '1px solid var(--accent)' : '1px solid var(--border)', background: targetLang === l.id ? 'rgba(99,102,241,0.08)' : 'transparent', color: targetLang === l.id ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>{l.label}</button>)}
      </div>
      <button onClick={translate} disabled={!text.trim() || translating} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: text.trim() ? 'var(--accent)' : 'var(--border)', color: text.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed' }}>{translating ? '翻译中...' : '开始翻译'}</button>
      {results && <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>{Object.entries(results).map(([model, translation]) => <div key={model} style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)' }}><div style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: 6, color: 'var(--accent)' }}>{model.toUpperCase()}</div><div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>{translation}</div></div>)}</div>}
    </ToolWrapper>
  );
}
