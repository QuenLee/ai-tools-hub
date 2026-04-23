'use client';
import { useState } from 'react';
import { ToolWrapper } from '../shared';

export function JSONFormatter({ onBack }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const handleFormat = () => {
    try { const obj = JSON.parse(input); setOutput(JSON.stringify(obj, null, 2)); setError(''); }
    catch (e) { setError('JSON格式错误: ' + e.message); setOutput(''); }
  };
  const handleMinify = () => {
    try { const obj = JSON.parse(input); setOutput(JSON.stringify(obj)); setError(''); }
    catch (e) { setError('JSON格式错误: ' + e.message); setOutput(''); }
  };
  return (
    <ToolWrapper title="JSON格式化" desc="JSON美化/压缩/校验" icon="{ }" onBack={onBack} remaining={Infinity}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='粘贴JSON，例如：{"name":"Quen","age":25}' style={{ width: '100%', minHeight: 180, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button onClick={handleFormat} style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>美化</button>
        <button onClick={handleMinify} style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--border)', color: 'var(--text2)', fontWeight: 600, border: 'none', cursor: 'pointer' }}>压缩</button>
      </div>
      {error && <div style={{ marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: '0.82rem' }}>{error}</div>}
      {output && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(output)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 300, fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{output}</pre></div>}
    </ToolWrapper>
  );
}

export function JSONToYAML({ onBack }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('json2yaml');
  const convert = () => {
    try {
      if (mode === 'json2yaml') {
        const obj = JSON.parse(input);
        const toYaml = (o, indent = 0) => {
          let r = '';
          const pad = '  '.repeat(indent);
          for (const [k, v] of Object.entries(o)) {
            if (v && typeof v === 'object' && !Array.isArray(v)) { r += `${pad}${k}:\n${toYaml(v, indent + 1)}`; }
            else if (Array.isArray(v)) { r += `${pad}${k}:\n${v.map(i => typeof i === 'object' ? `${pad}  -\n${toYaml(i, indent + 2)}` : `${pad}  - ${i}`).join('\n')}\n`; }
            else { r += `${pad}${k}: ${typeof v === 'string' ? v.includes(':') ? `"${v}"` : v : JSON.stringify(v)}\n`; }
          }
          return r;
        };
        setOutput(toYaml(obj));
      } else {
        // Simple YAML→JSON (basic)
        const obj = {};
        input.split('\n').filter(l => l.trim() && !l.trim().startsWith('#')).forEach(l => {
          const m = l.match(/^(\s*)([\w-]+)\s*:\s*(.+)/);
          if (m) obj[m[2].trim()] = isNaN(m[3].trim()) ? m[3].trim().replace(/^["']|["']$/g, '') : Number(m[3].trim());
        });
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch (e) { setOutput('转换失败: ' + e.message); }
  };
  return (
    <ToolWrapper title="JSON↔YAML互转" desc="JSON和YAML格式互相转换" icon="📋" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button onClick={() => setMode('json2yaml')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'json2yaml' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'json2yaml' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'json2yaml' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>JSON → YAML</button>
        <button onClick={() => setMode('yaml2json')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'yaml2json' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'yaml2json' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'yaml2json' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>YAML → JSON</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'json2yaml' ? '粘贴JSON...' : '粘贴YAML...'} style={{ width: '100%', minHeight: 140, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={convert} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔄 转换</button>
      {output && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(output)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 300, fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{output}</pre></div>}
    </ToolWrapper>
  );
}

export function Base64Tool({ onBack }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const convert = () => {
    try {
      if (mode === 'encode') setOutput(btoa(unescape(encodeURIComponent(input))));
      else setOutput(decodeURIComponent(escape(atob(input))));
    } catch (e) { setOutput('错误: ' + e.message); }
  };
  return (
    <ToolWrapper title="Base64编解码" desc="文本Base64编码/解码" icon="🔐" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button onClick={() => setMode('encode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'encode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'encode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'encode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>编码</button>
        <button onClick={() => setMode('decode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'decode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'decode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'decode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>解码</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入Base64字符串...'} style={{ width: '100%', minHeight: 120, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={convert} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔄 {mode === 'encode' ? '编码' : '解码'}</button>
      {output && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(output)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 200, fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{output}</pre></div>}
    </ToolWrapper>
  );
}

export function URLEncode({ onBack }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const convert = () => { setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)); };
  return (
    <ToolWrapper title="URL编解码" desc="URL编码/解码" icon="🔗" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button onClick={() => setMode('encode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'encode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'encode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'encode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>编码</button>
        <button onClick={() => setMode('decode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'decode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'decode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'decode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>解码</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '输入URL或文本...' : '输入编码后的URL...'} style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={convert} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔄 转换</button>
      {output && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(output)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{output}</pre></div>}
    </ToolWrapper>
  );
}
