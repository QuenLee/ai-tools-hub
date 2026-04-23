'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from '@/components/tools/shared';

export default function PDFMerge({ onBack, locale }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
    setResult(null);
  };

  const removeFile = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    setResult(null);
  };

  const moveFile = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= files.length) return;
    setFiles(prev => {
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const fmtSize = (b) => {
    if (b < 1024) return b + 'B';
    if (b < 1048576) return (b / 1024).toFixed(1) + 'KB';
    return (b / 1048576).toFixed(1) + 'MB';
  };

  const merge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      // Use pdf-lib for merging (dynamic import)
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      setResult(URL.createObjectURL(blob));
    } catch (e) {
      alert('合并失败：' + e.message);
    }
    setProcessing(false);
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = 'merged.pdf';
    a.click();
  };

  return (
    <ToolWrapper title="PDF合并" icon="📄" onBack={onBack}>
      <div style={{ maxWidth: 700 }}>
        <label style={{ display: 'block', padding: '30px 20px', border: '2px dashed var(--border)', borderRadius: 12, textAlign: 'center', cursor: 'pointer', background: 'var(--surface)', marginBottom: 16 }}>
          <input type="file" accept=".pdf" multiple onChange={handleFiles} style={{ display: 'none' }} />
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>📄</div>
          <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>点击添加PDF文件（可多选）</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>至少选择2个PDF文件</div>
        </label>

        {files.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 8 }}>文件列表（拖动调整顺序）：</div>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 4 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, width: 24 }}>{i + 1}.</span>
                <span style={{ flex: 1, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{fmtSize(f.size)}</span>
                <button onClick={() => moveFile(i, -1)} disabled={i === 0} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', cursor: i === 0 ? 'default' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', cursor: i === files.length - 1 ? 'default' : 'pointer', opacity: i === files.length - 1 ? 0.3 : 1 }}>↓</button>
                <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: 'var(--red, #ef4444)', cursor: 'pointer', fontSize: '0.92rem' }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {files.length >= 2 && !result && (
          <button onClick={merge} disabled={processing}
            style={{ width: '100%', padding: '12px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, border: 'none', cursor: processing ? 'wait' : 'pointer', fontSize: '0.92rem' }}>
            {processing ? '合并中...' : `📄 合并 ${files.length} 个PDF`}
          </button>
        )}

        {result && (
          <div style={{ padding: 20, background: 'rgba(16,185,129,0.08)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: 8 }}>合并成功！</div>
            <button onClick={download}
              style={{ padding: '10px 24px', borderRadius: 10, background: 'var(--green)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>
              📥 下载合并PDF
            </button>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
}
