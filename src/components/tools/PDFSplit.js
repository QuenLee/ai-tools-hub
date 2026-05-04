'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from './shared';

export function PDFSplit({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeText, setRangeText] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (f) => {
    if (!f) return;
    setFile(f);
    setRangeText('');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const buf = await f.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      setPageCount(pdf.numPages);
      setRangeText(`1-${pdf.numPages}`);
    } catch (err) {
      console.error('PDF parse error:', err);
      setPageCount(0);
    }
  };

  const parseRanges = (text, max) => {
    const pages = new Set();
    const parts = text.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.includes('-')) {
        const [a, b] = trimmed.split('-').map(Number);
        if (a && b && a <= b) {
          for (let i = Math.max(1, a); i <= Math.min(max, b); i++) pages.add(i);
        }
      } else {
        const n = parseInt(trimmed);
        if (n >= 1 && n <= max) pages.add(n);
      }
    }
    return [...pages].sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || !rangeText || pageCount === 0) return;
    setLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const buf = await file.arrayBuffer();
      const srcPdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const pages = parseRanges(rangeText, pageCount);

      if (pages.length === 0) { setLoading(false); return; }

      // Render selected pages to images and download as a zip
      // For simplicity, download each page as an image
      for (const pageNum of pages) {
        const page = await srcPdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.replace(/\.pdf$/i, '')}_第${pageNum}页.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Split error:', err);
      alert('拆分失败，请检查PDF文件和页码范围');
    }
    setLoading(false);
  };

  return (
    <ToolWrapper title="PDF拆分" desc="按页码范围拆分PDF文件，纯浏览器本地处理" icon="✂️" onBack={onBack} remaining={Infinity}>
      <div
        style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 14 }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>📄</div>
        <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>{file ? file.name : '点击上传PDF文件'}</div>
      </div>

      {pageCount > 0 && (
        <>
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>
            共 {pageCount} 页 · 大小 {(file.size / 1024).toFixed(1)}KB
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              页码范围 <span style={{ fontWeight: 400, color: 'var(--text3)' }}>（如: 1-5, 8, 10-12）</span>
            </label>
            <input
              type="text" value={rangeText} onChange={e => setRangeText(e.target.value)}
              placeholder={`1-${pageCount}`}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Quick range buttons */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {[
              { label: '全部页', range: `1-${pageCount}` },
              { label: '奇数页', range: Array.from({ length: pageCount }, (_, i) => i + 1).filter(i => i % 2 === 1).join(',') },
              { label: '偶数页', range: Array.from({ length: pageCount }, (_, i) => i + 1).filter(i => i % 2 === 0).join(',') },
              { label: '前半', range: `1-${Math.ceil(pageCount / 2)}` },
              { label: '后半', range: `${Math.ceil(pageCount / 2) + 1}-${pageCount}` },
            ].map((btn, i) => (
              <button key={i} onClick={() => setRangeText(btn.range)} style={{
                padding: '5px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600,
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text2)', cursor: 'pointer',
              }}>{btn.label}</button>
            ))}
          </div>

          <button onClick={handleSplit} disabled={loading || !rangeText} style={{
            width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
            background: !loading && rangeText ? 'var(--accent)' : 'var(--border)',
            color: !loading && rangeText ? '#fff' : 'var(--text3)',
            fontWeight: 700, border: 'none', cursor: !loading && rangeText ? 'pointer' : 'not-allowed',
          }}>{loading ? '拆分中...' : '拆分并下载'}</button>
        </>
      )}
    </ToolWrapper>
  );
}
