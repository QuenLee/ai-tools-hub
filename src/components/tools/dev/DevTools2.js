'use client';
import { useState, useCallback } from 'react';
import { ToolWrapper } from '../shared';

export function HashGen({ onBack }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState({});
  const gen = async () => {
    const enc = new TextEncoder().encode(input);
    const r = {};
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const buf = await crypto.subtle.digest(algo, enc);
      r[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // MD5 via simple implementation
    r['MD5'] = md5(input);
    setResults(r);
  };
  return (
    <ToolWrapper title="哈希生成器" desc="MD5/SHA1/SHA256/SHA512" icon="#️⃣" onBack={onBack} remaining={Infinity}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入要哈希的文本..." style={{ width: '100%', minHeight: 80, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={gen} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔐 生成哈希</button>
      {Object.keys(results).length > 0 && <div style={{ marginTop: 10 }}>{Object.entries(results).map(([algo, hash]) => <div key={algo} style={{ marginBottom: 8 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}><span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)' }}>{algo}</span><button onClick={() => navigator.clipboard.writeText(hash)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text3)' }}>📋</button></div><code style={{ display: 'block', padding: 8, borderRadius: 4, background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '0.72rem', fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--text2)' }}>{hash}</code></div>)}</div>}
    </ToolWrapper>
  );
}
// Simple MD5
function md5(string) { function md5cycle(x, k) { var a = x[0], b = x[1], c = x[2], d = x[3]; a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330); a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983); a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162); a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329); a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302); a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848); a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501); a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734); a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556); a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640); a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189); a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651); a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055); a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799); a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649); a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551); x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]); } function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); } function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); } function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); } function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); } function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); } function md51(s) { var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i; for (i = 64; i <= n; i += 64) { md5cycle(state, md5blk(s.substring(i - 64, i))); } s = s.substring(i - 64); var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]; for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3); tail[i >> 2] |= 0x80 << ((i % 4) << 3); if (i > 55) { md5cycle(state, tail); for (i = 0; i < 16; i++) tail[i] = 0; } tail[14] = n * 8; md5cycle(state, tail); return state; } function md5blk(s) { var md5blks = [], i; for (i = 0; i < 64; i += 4) { md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24); } return md5blks; } var hex_chr = '0123456789abcdef'.split(''); function rhex(n) { var s = '', j = 0; for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F]; return s; } function hex(x) { for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]); return x.join(''); } function add32(a, b) { return (a + b) & 0xFFFFFFFF; } return hex(md51(string)); }

export function RegexTester({ onBack }) {
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const test = () => {
    try { const r = new RegExp(regex, flags); const m = [...text.matchAll(r)]; setMatches(m); setError(''); }
    catch (e) { setError(e.message); setMatches([]); }
  };
  return (
    <ToolWrapper title="正则表达式测试" desc="正则实时匹配测试" icon="🎯" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input value={regex} onChange={e => setRegex(e.target.value)} placeholder="输入正则表达式..." style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
        <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi" style={{ width: 60, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入测试文本..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={test} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🧪 测试匹配</button>
      {error && <div style={{ marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: '0.82rem' }}>{error}</div>}
      {matches.length > 0 && <div style={{ marginTop: 10 }}><div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>✅ 匹配到 {matches.length} 个结果</div>{matches.map((m, i) => <div key={i} style={{ padding: 6, borderRadius: 4, background: 'rgba(52,211,153,0.08)', marginBottom: 4, fontSize: '0.78rem', fontFamily: 'monospace' }}><span style={{ color: 'var(--green)', fontWeight: 600 }}>#{i + 1}</span> 位置{m.index}: <code style={{ color: 'var(--accent)' }}>{m[0]}</code>{m.length > 1 && <span style={{ color: 'var(--text3)' }}> 分组: {m.slice(1).join(', ')}</span>}</div>)}</div>}
      {matches.length === 0 && regex && text && !error && <div style={{ marginTop: 10, fontSize: '0.82rem', color: 'var(--text3)' }}>❌ 无匹配</div>}
    </ToolWrapper>
  );
}

export function TimestampTool({ onBack }) {
  const [ts, setTs] = useState('');
  const [date, setDate] = useState('');
  const now = Math.floor(Date.now() / 1000);
  const ts2date = () => { try { const t = parseInt(ts); setDate(new Date(t * 1000).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })); } catch { setDate('无效时间戳'); } };
  const date2ts = () => { try { setTs(Math.floor(new Date(date).getTime() / 1000).toString()); } catch { setTs('无效日期'); } };
  return (
    <ToolWrapper title="时间戳转换" desc="Unix时间戳↕日期互转" icon="⏱️" onBack={onBack} remaining={Infinity}>
      <div style={{ marginBottom: 8, padding: 10, borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,0.06)', fontSize: '0.82rem' }}>当前时间戳: <code style={{ color: 'var(--accent)', fontWeight: 600 }}>{now}</code></div>
      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>时间戳 → 日期</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={ts} onChange={e => setTs(e.target.value)} placeholder="输入Unix时间戳..." style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
        <button onClick={ts2date} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>→</button>
      </div>
      {date && <div style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: 12, fontSize: '0.85rem' }}>📅 {date}</div>}
      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>日期 → 时间戳</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
        <button onClick={date2ts} style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>→</button>
      </div>
    </ToolWrapper>
  );
}

export function UUIDGen({ onBack }) {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(5);
  const gen = () => { const arr = []; for (let i = 0; i < count; i++) arr.push(crypto.randomUUID()); setUuids(arr); };
  return (
    <ToolWrapper title="UUID生成器" desc="批量生成UUID v4" icon="🆔" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>数量:</label>
        <input type="number" value={count} onChange={e => setCount(Math.min(100, Math.max(1, e.target.value)))} min="1" max="100" style={{ width: 80, padding: 8, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
        <button onClick={gen} style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>生成</button>
      </div>
      {uuids.length > 0 && <div>{uuids.map((u, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 6, borderRadius: 4, background: i % 2 === 0 ? 'var(--bg)' : 'transparent', marginBottom: 2 }}><code style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)' }}>{u}</code><button onClick={() => navigator.clipboard.writeText(u)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text3)' }}>📋</button></div>)}
      <button onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} style={{ width: '100%', marginTop: 8, padding: 8, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.78rem', cursor: 'pointer' }}>📋 复制全部</button>
      </div>}
    </ToolWrapper>
  );
}

export function ColorTool({ onBack }) {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState('99, 102, 241');
  const [hsl, setHsl] = useState('239°, 84%, 67%');
  const update = (type, val) => {
    try {
      if (type === 'hex') {
        setHex(val);
        const r = parseInt(val.slice(1, 3), 16), g = parseInt(val.slice(3, 5), 16), b = parseInt(val.slice(5, 7), 16);
        setRgb(`${r}, ${g}, ${b}`);
        const [h, s, l] = rgbToHsl(r, g, b);
        setHsl(`${h}°, ${s}%, ${l}%`);
      }
    } catch {}
  };
  function rgbToHsl(r, g, b) { r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h, s, l = (max + min) / 2; if (max === min) { h = s = 0; } else { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; } } return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]; }
  return (
    <ToolWrapper title="颜色转换器" desc="HEX↔RGB↔HSL互转" icon="🎨" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <input type="color" value={hex} onChange={e => update('hex', e.target.value)} style={{ width: 50, height: 50, border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '100%', height: 50, borderRadius: 'var(--radius-sm)', background: hex, border: '1px solid var(--border)' }} />
        </div>
      </div>
      <div style={{ marginBottom: 8 }}><label style={{ fontSize: '0.78rem', fontWeight: 600 }}>HEX</label><input value={hex} onChange={e => update('hex', e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box', marginTop: 2 }} /></div>
      <div style={{ marginBottom: 8 }}><label style={{ fontSize: '0.78rem', fontWeight: 600 }}>RGB</label><input value={rgb} readOnly style={{ width: '100%', padding: 8, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box', marginTop: 2 }} /></div>
      <div><label style={{ fontSize: '0.78rem', fontWeight: 600 }}>HSL</label><input value={hsl} readOnly style={{ width: '100%', padding: 8, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box', marginTop: 2 }} /></div>
    </ToolWrapper>
  );
}

export function TextDiff({ onBack }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);
  const compare = () => {
    const l1 = text1.split('\n'), l2 = text2.split('\n');
    const result = [];
    const max = Math.max(l1.length, l2.length);
    for (let i = 0; i < max; i++) {
      const a = l1[i] || '', b = l2[i] || '';
      if (a === b) result.push({ type: 'same', line: i + 1, text: a });
      else result.push({ type: 'diff', line: i + 1, old: a, new: b });
    }
    setDiff(result);
  };
  return (
    <ToolWrapper title="文本对比" desc="两段文本差异高亮对比" icon="📝" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
        <textarea value={text1} onChange={e => setText1(e.target.value)} placeholder="原始文本..." style={{ minHeight: 120, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
        <textarea value={text2} onChange={e => setText2(e.target.value)} placeholder="修改后文本..." style={{ minHeight: 120, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      </div>
      <button onClick={compare} style={{ width: '100%', padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔍 对比</button>
      {diff.length > 0 && <div style={{ marginTop: 10, maxHeight: 300, overflow: 'auto' }}>{diff.map((d, i) => <div key={i} style={{ padding: 4, fontSize: '0.78rem', fontFamily: 'monospace', borderRadius: 2, marginBottom: 2, background: d.type === 'diff' ? 'rgba(251,191,36,0.1)' : 'transparent' }}><span style={{ color: 'var(--text3)', marginRight: 8 }}>{d.line}</span>{d.type === 'same' ? <span style={{ color: 'var(--text2)' }}>{d.text}</span> : <><span style={{ color: 'var(--red)', textDecoration: 'line-through' }}>{d.old || '(空)'}</span><span style={{ margin: '0 4px' }}>→</span><span style={{ color: 'var(--green)' }}>{d.new || '(空)'}</span></>}</div>)}</div>}
    </ToolWrapper>
  );
}

export function JWTParser({ onBack }) {
  const [token, setToken] = useState('');
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState('');
  const parse = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setParsed({ header, payload });
      setError('');
    } catch (e) { setError(e.message); setParsed(null); }
  };
  return (
    <ToolWrapper title="JWT解析器" desc="解码JWT Token查看内容" icon="🔑" onBack={onBack} remaining={Infinity}>
      <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="粘贴JWT Token..." style={{ width: '100%', minHeight: 80, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={parse} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔍 解析</button>
      {error && <div style={{ marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: '0.82rem' }}>{error}</div>}
      {parsed && <div style={{ marginTop: 10 }}><div style={{ marginBottom: 8 }}><div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>Header</div><pre style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{JSON.stringify(parsed.header, null, 2)}</pre></div><div><div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>Payload</div><pre style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{JSON.stringify(parsed.payload, null, 2)}</pre></div></div>}
    </ToolWrapper>
  );
}

export function QRCode({ onBack }) {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const gen = () => { if (text.trim()) setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`); };
  return (
    <ToolWrapper title="二维码生成器" desc="文本/链接→二维码" icon="📱" onBack={onBack} remaining={Infinity}>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="输入文本或链接..." style={{ width: '100%', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
      <button onClick={gen} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>📱 生成二维码</button>
      {qrUrl && <div style={{ textAlign: 'center', marginTop: 16 }}><img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} /><div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--text3)' }}>右键图片保存</div></div>}
    </ToolWrapper>
  );
}
