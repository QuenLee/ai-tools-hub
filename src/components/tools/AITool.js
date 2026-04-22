'use client';
import { useState, useRef, useCallback } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

/**
 * 通用AI驱动工具组件 — 支持流式输出(SSE)
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

  const handleGenerate = useCallback(async () => {
    const empty = config.fields.some((f, i) => f.required !== false && !inputs[i].trim());
    if (empty) { setError('请填写必要信息'); return; }
    if (!guard.check()) return;

    setError(''); setLoading(true); setResult('');
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

      // 检查是否为SSE流
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/event-stream')) {
        // 流式读取
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
              if (parsed.content) {
                fullText += parsed.content;
                setResult(fullText);
              }
            } catch {}
          }
        }

        if (fullText) {
          guard.useOnce();
          setResult(fullText);
        } else {
          setError('AI未返回内容，请重试');
        }
      } else {
        // 非流式fallback
        const data = await res.json();
        if (data.error) { setError(data.error); }
        else { guard.useOnce(); setResult(data.content); }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        setError('已取消生成');
      } else {
        setError('网络错误，请检查网络后重试');
      }
    } finally {
      setLoading(false);
    }
  }, [inputs, guard, id, locale, config]);

  if (guard.blocked) return <LimitBlocked onBack={onBack} />;

  return (
    <ToolWrapper title={title} desc={desc} icon={icon} onBack={onBack} remaining={guard.remaining}>
      {/* 输入区 */}
      {config.fields.map((field, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          {field.label && <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>{field.label}</label>}
          {field.type === 'textarea' ? (
            <textarea
              value={inputs[i]}
              onChange={e => { const n = [...inputs]; n[i] = e.target.value; setInputs(n); }}
              placeholder={placeholders?.[i] || field.placeholder || ''}
              style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: field.minHeight || 100, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
            />
          ) : field.type === 'select' ? (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {field.options.map(opt => (
                <button key={opt} onClick={() => { const n = [...inputs]; n[i] = opt; setInputs(n); }}
                  style={{ padding: '5px 14px', borderRadius: 'var(--radius-2xs)', fontSize: '0.82rem', border: inputs[i] === opt ? '1px solid var(--accent)' : '1px solid var(--border)', background: inputs[i] === opt ? 'rgba(99,102,241,0.08)' : 'transparent', color: inputs[i] === opt ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>{opt}</button>
              ))}
            </div>
          ) : (
            <input
              value={inputs[i]}
              onChange={e => { const n = [...inputs]; n[i] = e.target.value; setInputs(n); }}
              placeholder={placeholders?.[i] || field.placeholder || ''}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }}
            />
          )}
        </div>
      ))}

      {/* 示例快捷填入 */}
      {examples && examples.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text3)', marginRight: 8 }}>试试：</span>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setInputs(ex.values)}
              style={{ padding: '3px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer', marginRight: 4, marginBottom: 4 }}>{ex.label}</button>
          ))}
        </div>
      )}

      {/* 生成按钮 */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleGenerate} disabled={loading}
          style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', background: loading ? 'var(--border)' : 'var(--accent)', color: loading ? 'var(--text3)' : '#fff', fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {loading ? (
            <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid var(--text3)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> AI生成中...</>
          ) : '🚀 AI生成'}
        </button>
        {loading && (
          <button onClick={() => abortRef.current?.abort()}
            style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontWeight: 600, fontSize: '0.82rem', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            ✕ 取消
          </button>
        )}
      </div>

      {/* 结果区 — 支持流式实时显示 */}
      {(result || loading) && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
              {loading ? '✨ AI正在生成...' : '✨ 生成结果'}
            </span>
            {result && !loading && (
              <button onClick={() => navigator.clipboard.writeText(result)}
                style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>📋 复制全部</button>
            )}
          </div>
          <div style={{
            padding: 20, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            background: 'var(--bg)', whiteSpace: 'pre-wrap', fontSize: '0.88rem', lineHeight: 1.8,
            color: 'var(--text2)', maxHeight: 500, overflow: 'auto',
            ...(loading && result ? { minHeight: 100 } : {}),
          }}>
            {result || (loading ? '等待AI响应...' : '')}
            {loading && <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--accent)', marginLeft: 2, animation: 'blink 1s step-end infinite', verticalAlign: 'text-bottom' }} />}
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {error && <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: '0.82rem' }}>{error}</div>}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes blink { 50% { opacity: 0; } }`}</style>
    </ToolWrapper>
  );
}
