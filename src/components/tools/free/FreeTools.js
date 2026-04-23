'use client';
import { useState } from 'react';
import { ToolWrapper } from '../shared';

export function WordCount({ onBack }) {
  const [text, setText] = useState('');
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const lines = text ? text.split('\n').length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
  return (
    <ToolWrapper title="字数统计" desc="字数/词数/行数/字符统计" icon="📊" onBack={onBack} remaining={Infinity}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入或粘贴文本..." style={{ width: '100%', minHeight: 160, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', resize: 'vertical', boxSizing: 'border-box' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8, marginTop: 12 }}>
        {[
          { label: '字符数', value: chars }, { label: '不含空格', value: charsNoSpace },
          { label: '单词数', value: words }, { label: '中文字数', value: chineseChars },
          { label: '行数', value: lines }, { label: '段落数', value: paragraphs },
        ].map(s => <div key={s.label} style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg)', border: '1px solid var(--border)', textAlign: 'center' }}><div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div><div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{s.label}</div></div>)}
      </div>
    </ToolWrapper>
  );
}

export function TextReplace({ onBack }) {
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [result, setResult] = useState('');
  const doReplace = () => {
    try {
      if (useRegex) { const r = new RegExp(find, 'g'); setResult(text.replace(r, replace)); }
      else setResult(text.split(find).join(replace));
    } catch (e) { setResult('正则错误: ' + e.message); }
  };
  return (
    <ToolWrapper title="批量文本替换" desc="查找替换+正则替换" icon="🔄" onBack={onBack} remaining={Infinity}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入原始文本..." style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', resize: 'vertical', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <input value={find} onChange={e => setFind(e.target.value)} placeholder="查找..." style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
        <input value={replace} onChange={e => setReplace(e.target.value)} placeholder="替换为..." style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: 'var(--text2)', cursor: 'pointer' }}><input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} /> 正则模式</label>
        <div style={{ flex: 1 }} />
        <button onClick={doReplace} style={{ padding: '8px 20px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}>🔄 替换</button>
      </div>
      {result && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(result)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 200, fontSize: '0.82rem', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{result}</pre></div>}
    </ToolWrapper>
  );
}

export function LoremIpsum({ onBack }) {
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [result, setResult] = useState('');
  const cn = '在当今数字化快速发展的时代，人工智能技术正以前所未有的速度改变着我们的生活和工作方式。从自然语言处理到计算机视觉，从推荐系统到自动驾驶，AI的应用场景不断扩展，深刻影响着各个行业的发展方向。然而，技术的进步也带来了新的挑战，如何在享受便利的同时保护隐私和数据安全，成为社会关注的焦点。未来，人与AI的协作将成为常态，我们需要在技术创新与伦理规范之间找到平衡。';
  const en = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
  const gen = () => {
    const template = type === 'chinese' ? cn : en;
    const paragraphs = Array.from({ length: count }, () => template);
    setResult(paragraphs.join('\n\n'));
  };
  return (
    <ToolWrapper title="占位文本生成" desc="中英文占位文本Lorem" icon="📃" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <select value={type} onChange={e => setType(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem' }}>
          <option value="paragraphs">英文Lorem</option>
          <option value="chinese">中文占位</option>
        </select>
        <input type="number" value={count} onChange={e => setCount(Math.max(1, e.target.value))} min="1" max="20" style={{ width: 80, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', boxSizing: 'border-box' }} />
        <button onClick={gen} style={{ padding: '10px 20px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>生成</button>
      </div>
      {result && <div><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>生成结果</span><button onClick={() => navigator.clipboard.writeText(result)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 250, fontSize: '0.82rem', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{result}</pre></div>}
    </ToolWrapper>
  );
}

export function SlugGen({ onBack }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const gen = () => {
    let s = input.trim().toLowerCase();
    // Simple pinyin-like: just remove non-alphanumeric and replace spaces
    s = s.replace(/[^\w\s\u4e00-\u9fff-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    // For Chinese, just URL-encode each char
    if (/[\u4e00-\u9fff]/.test(s)) {
      s = encodeURIComponent(s).replace(/%/g, '').replace(/[\s_]+/g, '-').toLowerCase();
    }
    setResult(s);
  };
  return (
    <ToolWrapper title="URL Slug生成" desc="中文标题→URL友好slug" icon="🌐" onBack={onBack} remaining={Infinity}>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="输入标题，例如：我的第一篇文章" style={{ width: '100%', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
      <button onClick={gen} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🌐 生成Slug</button>
      {result && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(result)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><code style={{ display: 'block', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '0.85rem', fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--text2)' }}>{result}</code></div>}
    </ToolWrapper>
  );
}

export function MarkdownPreview({ onBack }) {
  const [md, setMd] = useState('# 标题\n\n**加粗** *斜体* ~~删除线~~\n\n- 列表项1\n- 列表项2\n\n```\n代码块\n```\n\n> 引用文本\n\n[链接](https://ai.quen.us.kg)');
  // Very simple markdown→HTML (no dependency)
  const render = (text) => {
    return text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--accent);padding-left:12px;color:var(--text2)">$1</blockquote>')
      .replace(/```[\s\S]*?```/g, m => `<pre style="padding:12px;border-radius:8px;background:var(--bg);border:1px solid var(--border);overflow:auto;font-size:0.82rem">${m.slice(3,-3)}</pre>`)
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:var(--accent)">$1</a>')
      .replace(/\n/g, '<br/>');
  };
  return (
    <ToolWrapper title="Markdown预览" desc="实时Markdown渲染预览" icon="👁️" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <textarea value={md} onChange={e => setMd(e.target.value)} style={{ minHeight: 250, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.82rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
        <div style={{ minHeight: 250, padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', fontSize: '0.82rem', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: render(md) }} />
      </div>
    </ToolWrapper>
  );
}

export function EmojiPicker({ onBack }) {
  const [search, setSearch] = useState('');
  const emojis = [
    { cat: '表情', list: '😀😂🥰😎🤔😱🥳😴🤯🥺😇🤗😏😈👻💀🤖👽🤡💩🐱🐶🦊🐼🐨🐯🦁🐮🐷🐸🐵🐔🦄🐝🐛🦋🐌🦀🐟🐬🐳🐊🐘🦒🦘🦩🦜🕊🐇🦔🐾🌿🌲🌸🌻🍀🍁🌾🍄🌵🌴🎀🎁🎉🎊🎈🎆🎇🧨✨🎉🎖🏆🏅🥇🥈🥉⚽🏀🏈🎾🏐🏉🎱🏓🏸🥊🎯⛳🎮🎲🧩🎭🎨🎬🎤🎧🎼🎹🥁🎷🎺🎸🪕🎻🎯🔮🎮🕹🎲🧸♠️♥️♦️♣️🃏🀄🎴🌍🌎🌏🌐🗺🏔⛰🌋🗻🏕🏖🏜🏝🏞🏟🏛🏗🏘🏙🏚🏠🏡🏢🏣🏤🏥🏦🏨🏩🏪🏫🏬🏭🏯🏰💒🗼🗽⛪🕌🕍⛩🕋⛲⛺🌁🌃🌄🌅🌆🌇🌉♨️🌌🎠🎡🎢💈🎪'.split('') },
    { cat: '符号', list: '❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🕉☸️✡️🔯🕎☯️☦️🛐⛎♈♉♊♋♌♍♎♏♐♑♒♓🆔⚛️🉑☢️☣️📴📳🈶🈚🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕🛑⛔📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿🅿️🈳🈂️🛂🛃🛄🛅🚹🚺🚼🚻🚮🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓🆘🏷🔒🔓🔏🔐🔑🗝🔨⛏⚒🛠🗡⚔️🔫🏹🛡🔧🔩⚙️🗜⚖️🦯🔗⛓🧰🧲⚗️🧪🧫🧬🔬🔭📡💉🩸💊🩹🩺🚪🛏🛋🪑🚽🚿🛁🪒🧴🧷🧹🧺🧻🧼🧽🧯🛒🚬⚰️⚱️🗿'.split('') },
  ];
  const filtered = search ? emojis.flatMap(e => e.list).filter(e => e.includes(search)) : emojis.flatMap(e => e.list);
  return (
    <ToolWrapper title="Emoji选择器" desc="搜索复制Emoji表情" icon="😊" onBack={onBack} remaining={Infinity}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索Emoji..." style={{ width: '100%', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box', marginBottom: 10 }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxHeight: 300, overflow: 'auto' }}>{filtered.map((e, i) => <button key={i} onClick={() => navigator.clipboard.writeText(e)} title="点击复制" style={{ width: 36, height: 36, fontSize: '1.2rem', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4 }}>{e}</button>)}</div>
    </ToolWrapper>
  );
}

export function PasswordGen({ onBack }) {
  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [passwords, setPasswords] = useState([]);
  const gen = () => {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (nums) chars += '0123456789';
    if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
    const arr = [];
    for (let i = 0; i < 5; i++) {
      let pwd = '';
      const values = new Uint32Array(len);
      crypto.getRandomValues(values);
      for (let j = 0; j < len; j++) pwd += chars[values[j] % chars.length];
      arr.push(pwd);
    }
    setPasswords(arr);
  };
  return (
    <ToolWrapper title="密码生成器" desc="安全随机密码生成" icon="🔐" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>长度:</label>
        <input type="range" min="8" max="64" value={len} onChange={e => setLen(+e.target.value)} style={{ flex: 1 }} />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', minWidth: 24 }}>{len}</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        {[
          { label: '大写', val: upper, set: setUpper }, { label: '小写', val: lower, set: setLower },
          { label: '数字', val: nums, set: setNums }, { label: '符号', val: syms, set: setSyms },
        ].map(o => <label key={o.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: 'var(--text2)', cursor: 'pointer' }}><input type="checkbox" checked={o.val} onChange={e => o.set(e.target.checked)} /> {o.label}</label>)}
      </div>
      <button onClick={gen} style={{ width: '100%', padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔐 生成密码</button>
      {passwords.length > 0 && <div style={{ marginTop: 10 }}>{passwords.map((p, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 6, borderRadius: 4, background: i % 2 === 0 ? 'var(--bg)' : 'transparent', marginBottom: 2 }}><code style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', wordBreak: 'break-all' }}>{p}</code><button onClick={() => navigator.clipboard.writeText(p)} style={{ fontSize: '0.68rem', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text3)', marginLeft: 8, whiteSpace: 'nowrap' }}>📋</button></div>)}</div>}
    </ToolWrapper>
  );
}

export function HtmlEntity({ onBack }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const reverse = Object.fromEntries(Object.entries(entities).map(([k, v]) => [v, k]));
  const convert = () => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, c => entities[c]));
    } else {
      setOutput(input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, c => reverse[c]));
    }
  };
  return (
    <ToolWrapper title="HTML实体转换" desc="HTML特殊字符编码解码" icon="&amp;" onBack={onBack} remaining={Infinity}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button onClick={() => setMode('encode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'encode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'encode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'encode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>编码</button>
        <button onClick={() => setMode('decode')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'decode' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'decode' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'decode' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>解码</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? '输入HTML文本，如：<div class="test">' : '输入编码后的文本，如：&lt;div&gt;'} style={{ width: '100%', minHeight: 100, padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
      <button onClick={convert} style={{ width: '100%', marginTop: 10, padding: 10, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>🔄 {mode === 'encode' ? '编码' : '解码'}</button>
      {output && <div style={{ marginTop: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>结果</span><button onClick={() => navigator.clipboard.writeText(output)} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text2)' }}>📋 复制</button></div><pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{output}</pre></div>}
    </ToolWrapper>
  );
}
