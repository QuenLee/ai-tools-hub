'use client';
import { useState } from 'react';
import { ToolWrapper } from './shared';

const defaultContent = `# Hello World\n\n这是一个**Markdown编辑器**，支持实时预览。\n\n## 功能特性\n\n- 实时预览\n- 语法高亮\n- 导出HTML\n\n## 代码示例\n\n\`\`\`python\nprint("Hello, AI!")\n\`\`\`\n\n> 引用文本示例\n\n| 列1 | 列2 |\n|------|------|\n| A | B |\n| C | D |\n`;

function simpleMarkdown(md) {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="padding:2px 6px;background:var(--border);border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid var(--accent);padding-left:12px;color:var(--text2);margin:8px 0">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:18px">$1</li>')
    .replace(/```[\s\S]*?```/g, '<pre style="background:var(--bg);padding:14px;border-radius:8px;overflow-x:auto;font-size:0.82rem;border:1px solid var(--border)"><code>$&</code></pre>')
    .replace(/\n/g, '<br/>');
  return html;
}

export function MarkdownEditor({ onBack, locale }) {
  const [content, setContent] = useState(defaultContent);
  const handleExport = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title><style>body{font-family:system-ui;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#333}h1{font-size:1.8rem}h2{font-size:1.4rem}h3{font-size:1.1rem}code{background:#f1f5f9;padding:2px 6px;border-radius:4px}pre{background:#f8fafc;padding:16px;border-radius:8px;overflow-x:auto}blockquote{border-left:3px solid #6366f1;padding-left:12px;color:#64748b}table{border-collapse:collapse;width:100%}td,th{border:1px solid #e2e8f0;padding:8px 12px}</style></head><body>${simpleMarkdown(content)}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'document.html'; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <ToolWrapper title="Markdown编辑器" desc="实时预览+导出HTML，程序员刚需" icon="📝" onBack={onBack} remaining={Infinity}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Markdown编辑器</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigator.clipboard.writeText(content)} style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>复制MD</button>
            <button onClick={handleExport} style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>导出HTML</button>
          </div>
        </div>
        <div style={{ display: 'flex', minHeight: 400 }}>
          <div style={{ flex: 1, borderRight: '1px solid var(--border)' }}>
            <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text3)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>编辑</div>
            <textarea value={content} onChange={e => setContent(e.target.value)} style={{ width: '100%', height: 360, padding: 14, border: 'none', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.7, fontFamily: 'monospace', resize: 'none', outline: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '8px 14px', fontSize: '0.72rem', color: 'var(--text3)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>预览</div>
            <div style={{ padding: 14, height: 360, overflow: 'auto', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text2)' }} dangerouslySetInnerHTML={{ __html: simpleMarkdown(content) }} />
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
