'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('pdf');

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        <div className="breadcrumb">
          <a href={`/${locale}`}>首页</a><span>/</span>AI工具
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI工具</h1>
        <p style={{ color: 'var(--text2)', marginBottom: 28 }}>实用在线工具，PDF转换、文案生成、图片转换、Markdown编辑</p>

        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { id: 'pdf', label: 'PDF转Word/Excel' },
            { id: 'copywriter', label: 'AI文案生成器' },
            { id: 'image-convert', label: '图片格式转换' },
            { id: 'markdown', label: 'Markdown编辑器' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px', borderRadius: 'var(--radius-2xs)', fontSize: '0.84rem',
                border: activeTab === tab.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text2)', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'pdf' && <PDFConverter />}
        {activeTab === 'copywriter' && <AICopywriter />}
        {activeTab === 'image-convert' && <ImageConverter />}
        {activeTab === 'markdown' && <MarkdownEditor />}
      </div>
    </div>
  );
}

// ===== PDF转Word/Excel =====
function PDFConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('docx');
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);

  const handleConvert = () => {
    if (!file) return;
    setProcessing(true);
    // 实际部署时对接后端API，这里做前端演示
    setTimeout(() => {
      setProcessing(false);
      alert('演示模式：实际部署需对接后端转换API（如CloudConvert API或LibreOffice）');
    }, 1500);
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 28, maxWidth: 600 }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>PDF转Word / Excel</h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>上传PDF文件，一键转换为可编辑的Word或Excel文档</p>
      <div style={{
        border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '40px 20px',
        textAlign: 'center', marginBottom: 16, cursor: 'pointer',
        transition: 'border-color 0.2s',
      }} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }}
          onChange={e => setFile(e.target.files?.[0] || null)} />
        {file ? (
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{file.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{(file.size / 1024).toFixed(1)} KB</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>📄</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传PDF文件</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.72rem', marginTop: 4 }}>支持.pdf，最大20MB</div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['docx', 'xlsx'].map(f => (
          <button key={f} onClick={() => setFormat(f)}
            style={{
              padding: '6px 16px', borderRadius: 'var(--radius-2xs)', fontSize: '0.82rem',
              border: format === f ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: format === f ? 'rgba(99,102,241,0.08)' : 'transparent',
              color: format === f ? 'var(--accent)' : 'var(--text2)', fontWeight: 600,
              cursor: 'pointer',
            }}>
            转为 {f === 'docx' ? 'Word' : 'Excel'}
          </button>
        ))}
      </div>
      <button onClick={handleConvert} disabled={!file || processing}
        style={{
          width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
          background: file ? 'var(--accent)' : 'var(--border)',
          color: file ? '#fff' : 'var(--text3)', fontWeight: 700, fontSize: '0.92rem',
          border: 'none', cursor: file ? 'pointer' : 'not-allowed',
        }}>
        {processing ? '转换中...' : '开始转换'}
      </button>
    </div>
  );
}

// ===== AI文案生成器 =====
function AICopywriter() {
  const [product, setProduct] = useState('');
  const [platform, setPlatform] = useState('xiaohongshu');
  const [tone, setTone] = useState('casual');
  const [result, setResult] = useState('');
  const [generating, setGenerating] = useState(false);

  const platforms = [
    { id: 'xiaohongshu', label: '小红书' },
    { id: 'douyin', label: '抖音' },
    { id: 'weixin', label: '公众号' },
    { id: 'weibo', label: '微博' },
    { id: 'zhihu', label: '知乎' },
    { id: 'taobao', label: '淘宝' },
  ];

  const tones = [
    { id: 'casual', label: '轻松活泼' },
    { id: 'professional', label: '专业严谨' },
    { id: 'humorous', label: '幽默搞笑' },
    { id: 'emotional', label: '走心感动' },
  ];

  const templates = {
    xiaohongshu: (p, t) => {
      if (t === 'casual') return `姐妹们！今天发现了一个超好用的宝藏✨\n\n${p}，用了之后真的被惊艳到！\n\n优点简直太多了：\n1️⃣ 使用超级简单，小白也能秒上手\n2️⃣ 效果绝绝子，超出预期\n3️⃣ 最重要的是——免费！\n\n真的不是广告，纯自用推荐💕\n\n#好物推荐 #宝藏神器 #效率翻倍`;
      if (t === 'professional') return `测评｜${p}深度体验报告\n\n作为一个每天要用各种AI工具的人，今天认真测了一下这款产品。\n\n📊 测试环境：日常工作场景\n⏱ 使用时长：2周\n🎯 评分：8.5/10\n\n核心优势：\n- 功能完整度高\n- 学习成本低\n- 输出质量稳定\n\n需要改进：\n- 部分高级功能需付费\n- 移动端体验可优化\n\n整体推荐指数：⭐⭐⭐⭐\n\n#AI工具测评 #效率工具 #数码测评`;
      return `救命！${p}也太牛了吧😂\n\n本来以为又是一个割韭菜的工具，结果试了一下直接真香！\n\n之前用过不下10个同类产品，就这个让我心服口服👏\n\n不信你试试，不好用回来骂我！\n\n#真香警告 #好物分享`;
    },
    douyin: (p, t) => `【${p}】一个让我效率翻10倍的神器！\n\n你还在用笨办法？试试这个！\n\n1分钟搞定以前1小时的工作，老板都惊了！\n\n#效率工具 #AI神器 #打工人的救星`,
    weixin: (p, t) => `${p}：2026年最值得关注的效率工具\n\n在AI工具井喷的2026年，${p}凭借其独特的优势脱颖而出。本文将从使用体验、核心功能、适用场景三个维度，为你详细解读这款产品。\n\n一、为什么需要${p}\n...\n\n二、核心功能解析\n...\n\n三、适合谁用\n...\n\n四、总结建议\n...`,
    weibo: (p, t) => `试了一下${p}，确实有点东西。之前一直用[竞品]，现在可能要换了。最大的亮点是免费版就够用，不需要为了基础功能付费。推荐给需要的朋友 👉`,
    zhihu: (p, t) => `如何客观评价${p}？\n\n作为一个重度AI工具用户，说说我的真实体验。\n\n先说结论：值得尝试，尤其是免费版。\n\n详细分析：\n1. 功能方面——覆盖了核心场景...\n2. 易用性——上手门槛低...\n3. 性价比——免费版够日常使用...\n\n建议：先免费试用，确认满足需求再考虑付费。`,
    taobao: (p, t) => `🔥${p}｜限时优惠中\n\n✅ 功能强大，效果出众\n✅ 操作简单，一键搞定\n✅ 免费试用，不满意随时退\n\n💡 更多详情请咨询客服\n\n限时优惠价，手慢无！`,
  };

  const handleGenerate = () => {
    if (!product.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const gen = templates[platform]?.(product, tone) || `${product} - 优质文案内容生成示例`;
      setResult(gen);
      setGenerating(false);
    }, 800);
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 28, maxWidth: 700 }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>AI文案生成器</h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>输入产品描述，一键生成多平台营销文案</p>

      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>产品/项目描述</label>
      <textarea value={product} onChange={e => setProduct(e.target.value)}
        placeholder="例如：一款AI编程助手，支持自然语言写代码，免费2000次/月"
        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: 80, resize: 'vertical', marginBottom: 16 }} />

      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>目标平台</label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {platforms.map(p => (
          <button key={p.id} onClick={() => setPlatform(p.id)}
            style={{ padding: '5px 12px', borderRadius: 'var(--radius-2xs)', fontSize: '0.78rem',
              border: platform === p.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: platform === p.id ? 'rgba(99,102,241,0.08)' : 'transparent',
              color: platform === p.id ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>
            {p.label}
          </button>
        ))}
      </div>

      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>文案风格</label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {tones.map(t => (
          <button key={t.id} onClick={() => setTone(t.id)}
            style={{ padding: '5px 12px', borderRadius: 'var(--radius-2xs)', fontSize: '0.78rem',
              border: tone === t.id ? '1px solid var(--accent2)' : '1px solid var(--border)',
              background: tone === t.id ? 'rgba(124,92,252,0.08)' : 'transparent',
              color: tone === t.id ? 'var(--accent2)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>
            {t.label}
          </button>
        ))}
      </div>

      <button onClick={handleGenerate} disabled={!product.trim() || generating}
        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
          background: product.trim() ? 'var(--accent)' : 'var(--border)',
          color: product.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, fontSize: '0.92rem',
          border: 'none', cursor: product.trim() ? 'pointer' : 'not-allowed' }}>
        {generating ? '生成中...' : '生成文案'}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>生成结果</span>
            <button onClick={() => navigator.clipboard.writeText(result)}
              style={{ padding: '4px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>
              复制
            </button>
          </div>
          <div style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', fontSize: '0.88rem', lineHeight: 1.7,
            whiteSpace: 'pre-wrap', color: 'var(--text2)' }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 图片格式转换 =====
function ImageConverter() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('png');
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (format === 'jpg' || format === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const mimeType = format === 'png' ? 'image/png' : format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/webp';
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file.name.replace(/\.[^.]+$/, '')}.${format}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, mimeType, 0.92);
    };
    img.src = preview;
  };

  const formats = [
    { id: 'png', label: 'PNG', desc: '无损，文件较大' },
    { id: 'jpg', label: 'JPG', desc: '有损，文件小' },
    { id: 'webp', label: 'WebP', desc: '体积最小，兼容一般' },
  ];

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 28, maxWidth: 600 }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>图片格式转换</h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>WebP / PNG / JPG 互转，纯浏览器本地转换，无需上传</p>

      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px',
        textAlign: 'center', marginBottom: 16, cursor: 'pointer' }}
        onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files?.[0] || null)} />
        {preview ? (
          <img src={preview} alt="preview" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 'var(--radius-sm)' }} />
        ) : (
          <div>
            <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🖼️</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传图片</div>
            <div style={{ color: 'var(--text3)', fontSize: '0.72rem', marginTop: 4 }}>支持 PNG / JPG / WebP / GIF</div>
          </div>
        )}
      </div>

      {file && <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>{file.name} ({(file.size/1024).toFixed(1)}KB)</div>}

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {formats.map(f => (
          <button key={f.id} onClick={() => setFormat(f.id)}
            style={{ flex: 1, padding: '10px 12px', borderRadius: 'var(--radius-sm)', textAlign: 'center',
              border: format === f.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: format === f.id ? 'rgba(99,102,241,0.08)' : 'transparent',
              color: format === f.id ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer' }}>
            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{f.label}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 2 }}>{f.desc}</div>
          </button>
        ))}
      </div>

      <button onClick={handleConvert} disabled={!file}
        style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
          background: file ? 'var(--accent)' : 'var(--border)',
          color: file ? '#fff' : 'var(--text3)', fontWeight: 700, fontSize: '0.92rem',
          border: 'none', cursor: file ? 'pointer' : 'not-allowed' }}>
        转换并下载
      </button>
    </div>
  );
}

// ===== Markdown编辑器 =====
function MarkdownEditor() {
  const [content, setContent] = useState(`# Hello World\n\n这是一个**Markdown编辑器**，支持实时预览。\n\n## 功能特性\n\n- 实时预览\n- 语法高亮\n- 导出HTML\n\n## 代码示例\n\n\`\`\`python\nprint("Hello, AI!")\n\`\`\`\n\n> 引用文本示例\n\n| 列1 | 列2 |\n|------|------|\n| A | B |\n| C | D |\n`);

  const simpleMarkdown = (md) => {
    let html = md
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="padding:2px 6px;background:var(--border);border-radius:4px;font-size:0.85em">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--accent);padding-left:12px;color:var(--text2);margin:8px 0">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li style="margin-left:18px">$1</li>')
      .replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim() && !c.includes('---'));
        if (cells.length) return '<tr>' + cells.map(c => `<td style="border:1px solid var(--border);padding:6px 12px">${c.trim()}</td>`).join('') + '</tr>';
        return '';
      })
      .replace(/```[\s\S]*?```/g, '<pre style="background:var(--bg);padding:14px;border-radius:8px;overflow-x:auto;font-size:0.82rem;border:1px solid var(--border)"><code>$&</code></pre>')
      .replace(/\n/g, '<br/>');
    return html;
  };

  const handleExport = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title><style>body{font-family:system-ui;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#333}h1{font-size:1.8rem}h2{font-size:1.4rem}h3{font-size:1.1rem}code{background:#f1f5f9;padding:2px 6px;border-radius:4px}pre{background:#f8fafc;padding:16px;border-radius:8px;overflow-x:auto}blockquote{border-left:3px solid #6366f1;padding-left:12px;color:#64748b}table{border-collapse:collapse;width:100%}td,th{border:1px solid #e2e8f0;padding:8px 12px}</style></head><body>${simpleMarkdown(content)}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'document.html'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Markdown编辑器</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigator.clipboard.writeText(content)}
            style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>
            复制MD
          </button>
          <button onClick={handleExport}
            style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>
            导出HTML
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', minHeight: 400 }}>
        <div style={{ flex: 1, borderRight: '1px solid var(--border)' }}>
          <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text3)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>编辑</div>
          <textarea value={content} onChange={e => setContent(e.target.value)}
            style={{ width: '100%', height: 360, padding: '14px', border: 'none', background: 'var(--bg)',
              color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.7, fontFamily: 'monospace',
              resize: 'none', outline: 'none' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text3)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>预览</div>
          <div style={{ padding: 14, height: 360, overflow: 'auto', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text2)' }}
            dangerouslySetInnerHTML={{ __html: simpleMarkdown(content) }} />
        </div>
      </div>
    </div>
  );
}
