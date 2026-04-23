'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

/**
 * 通用AI驱动工具组件 — 专业双栏布局 + 流式输出(SSE)
 * 桌面: 左输入 | 右结果
 * 移动: 上下堆叠
 */
export function AITool({ config, onBack, locale, toolId }) {
  const id = toolId || config.id;
  const { icon, title, desc, placeholders, examples, buildPrompt } = config;
  const [inputs, setInputs] = useState(config.fields.map(f => ''));
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const guard = useToolGuard(id);
  const abortRef = useRef(null);
  const resultRef = useRef(null);
  const [checkedAllowed, setCheckedAllowed] = useState(true);

  // Auto-scroll result to bottom during streaming
  useEffect(() => {
    if (loading && resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result, loading]);

  const handleGenerate = useCallback(async () => {
    const empty = config.fields.some((f, i) => f.required !== false && !inputs[i].trim());
    if (empty) { setError('请填写必要信息'); return; }
    if (!guard.check()) { setCheckedAllowed(false); return; }
    setCheckedAllowed(true);
    setError('');
    setLoading(true);
    setResult('');

    const userPrompt = buildPrompt(inputs);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: id, input: userPrompt, locale, stream: true }),
        signal: ctrl.signal,
      });

      if (!res.ok) {
        let msg = `请求失败(${res.status})`;
        try { const d = await res.json(); if (d.error) msg = d.error; } catch {}
        if (res.status === 504) msg = 'AI生成超时，请简化输入后重试';
        if (res.status === 429) msg = '请求过于频繁，请稍等再试';
        setError(msg);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream')) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) { fullText += parsed.content; setResult(fullText); }
            } catch {}
          }
        }
        if (fullText) { guard.useOnce(); setResult(fullText); }
        else { setError('AI未返回内容，请重试'); }
      } else {
        const data = await res.json();
        if (data.error) { setError(data.error); }
        else { guard.useOnce(); setResult(data.content); }
      }
    } catch (e) {
      if (e.name === 'AbortError') { setError('已取消生成'); }
      else { setError('网络错误，请检查网络后重试'); }
    } finally { setLoading(false); }
  }, [inputs, guard, id, locale, config]);

  if (guard.blocked && !loading && !result && !checkedAllowed) {
    return <LimitBlocked onBack={onBack} />;
  }

  const hasResult = result || loading;

  return (
    <ToolWrapper title={title} desc={desc} icon={icon} onBack={onBack} remaining={guard.remaining}>
      {/* Desktop: side-by-side, Mobile: stacked */}
      <div style={{ display: 'grid', gridTemplateColumns: hasResult ? '1fr 1fr' : '1fr', gap: 20, alignItems: 'start' }}
        className="ai-tool-layout">

        {/* ===== 左栏: 输入区 ===== */}
        <div style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            输入信息
          </div>

          {config.fields.map((field, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              {field.label && <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text2)' }}>{field.label}{field.required !== false && <span style={{ color: 'var(--red)' }}> *</span>}</label>}
              {field.type === 'textarea' ? (
                <textarea value={inputs[i]} onChange={e => { const n = [...inputs]; n[i] = e.target.value; setInputs(n); }}
                  placeholder={placeholders?.[i] || field.placeholder || ''}
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', minHeight: field.minHeight || 100, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6, transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              ) : field.type === 'select' ? (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {field.options.map(opt => (
                    <button key={opt} onClick={() => { const n = [...inputs]; n[i] = opt; setInputs(n); }}
                      style={{ padding: '5px 12px', borderRadius: 16, fontSize: '0.78rem', border: inputs[i] === opt ? '1px solid var(--accent)' : '1px solid var(--border)', background: inputs[i] === opt ? 'rgba(99,102,241,0.08)' : 'transparent', color: inputs[i] === opt ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>{opt}</button>
                  ))}
                </div>
              ) : (
                <input value={inputs[i]} onChange={e => { const n = [...inputs]; n[i] = e.target.value; setInputs(n); }}
                  placeholder={placeholders?.[i] || field.placeholder || ''}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              )}
            </div>
          ))}

          {/* 示例快捷填入 */}
          {examples && examples.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text3)', marginRight: 6 }}>快速试用：</span>
              {examples.map((ex, i) => (
                <button key={i} onClick={() => setInputs(ex.values)}
                  style={{ padding: '3px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer', marginRight: 4, marginBottom: 4, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text2)'; }}
                >{ex.label}</button>
              ))}
            </div>
          )}

          {/* 生成按钮 */}
          {guard.blocked && !loading ? (
            <div style={{ textAlign: 'center', padding: 14, borderRadius: 10, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>🔒 今日免费次数已用完</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text2)', marginBottom: 8 }}>明天0点自动重置</div>
              <button onClick={onBack} style={{ padding: '6px 16px', borderRadius: 8, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '0.78rem', border: 'none', cursor: 'pointer' }}>← 更多免费工具</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleGenerate} disabled={loading}
                style={{ flex: 1, padding: 12, borderRadius: 10, background: loading ? 'var(--border)' : 'var(--accent)', color: loading ? 'var(--text3)' : '#fff', fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                {loading ? (
                  <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--text3)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> AI生成中...</>
                ) : '🚀 AI生成'}
              </button>
              {loading && (
                <button onClick={() => abortRef.current?.abort()}
                  style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', color: 'var(--red)', fontWeight: 600, fontSize: '0.82rem', border: '1px solid rgba(239,68,68,0.15)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  ✕ 取消
                </button>
              )}
            </div>
          )}
        </div>

        {/* ===== 右栏: 结果区 ===== */}
        {hasResult && (
          <div style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 20, position: 'sticky', top: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                {loading ? '✨ AI生成中...' : '✨ 生成结果'}
              </span>
              {result && !loading && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => navigator.clipboard.writeText(result)}
                    style={{ padding: '4px 10px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text2)'; }}
                  >📋 复制</button>
                </div>
              )}
            </div>
            <div ref={resultRef}
              style={{ padding: 16, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--text2)', maxHeight: 500, overflow: 'auto' }}>
              {result || (loading ? '等待AI响应...' : '')}
              {loading && <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--accent)', marginLeft: 2, animation: 'blink 1s step-end infinite', verticalAlign: 'text-bottom' }} />}
            </div>
            {/* Word count */}
            {result && !loading && (
              <div style={{ marginTop: 8, fontSize: '0.68rem', color: 'var(--text3)', textAlign: 'right' }}>
                {result.length} 字
              </div>
            )}
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', color: 'var(--red)', fontSize: '0.82rem', border: '1px solid rgba(239,68,68,0.1)' }}>⚠️ {error}</div>}

      {/* Mobile responsive override */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 768px) {
          .ai-tool-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </ToolWrapper>
  );
}
