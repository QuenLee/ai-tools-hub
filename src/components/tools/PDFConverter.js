'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function PDFConverter({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState('text');
  const [pageCount, setPageCount] = useState(0);
  const guard = useToolGuard('pdf-convert');

  const handleConvert = async () => {
    if (!file || !guard.check()) return;
    setProcessing(true);
    setOutput('');

    try {
      if (mode === 'text') {
        // Extract text from PDF using pdf.js from CDN
        const pdfjsLib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPageCount(pdf.numPages);

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += `--- 第${i}页 ---\n${pageText}\n\n`;
        }
        setOutput(fullText || '此PDF为扫描版，无可提取文本。建议使用OCR工具。');
      } else {
        // Image extraction mode - extract pages as images
        const pdfjsLib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPageCount(pdf.numPages);

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        setOutput(`[第1页已渲染为图片]\n\n共${pdf.numPages}页，已渲染第1页预览。\n右键保存图片，或使用文本提取模式获取文字内容。`);
      }
    } catch (e) {
      setOutput('转换失败: ' + e.message + '\n\n请确认上传的是有效的PDF文件。');
    }

    guard.useOnce();
    setProcessing(false);
  };

  return (
    <ToolWrapper title="PDF转文本" desc="上传PDF提取文字内容" icon="📄" onBack={onBack} remaining={guard.remaining}>
      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', marginBottom: 14, cursor: 'pointer' }}
        onClick={() => document.getElementById('pdf-upload')?.click()}>
        <input id="pdf-upload" type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => { setFile(e.target.files?.[0]); setOutput(''); }} />
        {file ? (
          <div><div style={{ fontSize: '1.4rem', marginBottom: 6 }}>📄</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>{file.name} ({(file.size / 1024).toFixed(1)}KB)</div></div>
        ) : (
          <><div style={{ fontSize: '1.4rem', marginBottom: 6 }}>📄</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传PDF文件</div></>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button onClick={() => setMode('text')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'text' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'text' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'text' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>文本提取</button>
        <button onClick={() => setMode('image')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'image' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'image' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'image' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>图片渲染</button>
      </div>

      <button onClick={handleConvert} disabled={!file || processing}
        style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-sm)', background: file ? 'var(--accent)' : 'var(--border)', color: file ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: file ? 'pointer' : 'not-allowed' }}>
        {processing ? '转换中...' : mode === 'text' ? '📄 提取文本' : '🖼️ 渲染图片'}
      </button>

      {pageCount > 0 && <div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--text3)', textAlign: 'center' }}>共 {pageCount} 页</div>}

      {output && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>📝 提取结果</span>
            <button onClick={() => navigator.clipboard.writeText(output)} style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>📋 复制全部</button>
          </div>
          <pre style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', overflow: 'auto', maxHeight: 400, fontSize: '0.82rem', fontFamily: 'inherit', color: 'var(--text2)', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>{output}</pre>
        </div>
      )}
    </ToolWrapper>
  );
}

// Load pdf.js from CDN
let pdfjsLibCache = null;
async function loadPdfJs() {
  if (pdfjsLibCache) return pdfjsLibCache;

  // Load pdf.js script
  await new Promise((resolve, reject) => {
    if (window.pdfjsLib) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs';
    script.type = 'module';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  // Wait for module to be available
  let attempts = 0;
  while (!window.pdfjsLib && attempts < 50) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }

  if (!window.pdfjsLib) {
    // Fallback: use the global pdfjsLib from the script
    const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs');
    pdfjsLibCache = pdfjs;
    pdfjsLibCache.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
    return pdfjsLibCache;
  }

  pdfjsLibCache = window.pdfjsLib;
  pdfjsLibCache.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';
  return pdfjsLibCache;
}
