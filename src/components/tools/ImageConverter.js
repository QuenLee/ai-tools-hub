'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from './shared';

export function ImageConverter({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('png');
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const handleFile = (f) => { setFile(f); if (f) { const r = new FileReader(); r.onload = e => setPreview(e.target.result); r.readAsDataURL(f); } };
  const handleConvert = () => {
    if (!file) return;
    const canvas = document.createElement('canvas'); const img = new Image();
    img.onload = () => { canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); if (format === 'jpg' || format === 'jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); } ctx.drawImage(img, 0, 0); const mimeType = format === 'png' ? 'image/png' : format === 'jpg' ? 'image/jpeg' : 'image/webp'; canvas.toBlob(blob => { if (blob) { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${file.name.replace(/\.[^.]+$/, '')}.${format}`; a.click(); URL.revokeObjectURL(url); } }, mimeType, 0.92); };
    img.src = preview;
  };
  const formats = [{ id: 'png', label: 'PNG', desc: '无损，文件较大' }, { id: 'jpg', label: 'JPG', desc: '有损，文件小' }, { id: 'webp', label: 'WebP', desc: '体积最小' }];
  return (
    <ToolWrapper title="图片格式转换" desc="WebP/PNG/JPG互转，纯浏览器本地转换" icon="🔄" onBack={onBack} remaining={Infinity}>
      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', marginBottom: 14, cursor: 'pointer' }} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        {preview ? <img src={preview} alt="" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 'var(--radius-sm)' }} /> : <><div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🖼️</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传图片</div></>}
      </div>
      {file && <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>{file.name} ({(file.size/1024).toFixed(1)}KB)</div>}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>{formats.map(f => <button key={f.id} onClick={() => setFormat(f.id)} style={{ flex: 1, padding: '10px 12px', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: format === f.id ? '1px solid var(--accent)' : '1px solid var(--border)', background: format === f.id ? 'rgba(99,102,241,0.08)' : 'transparent', color: format === f.id ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer' }}><div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{f.label}</div><div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 2 }}>{f.desc}</div></button>)}</div>
      <button onClick={handleConvert} disabled={!file} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: file ? 'var(--accent)' : 'var(--border)', color: file ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: file ? 'pointer' : 'not-allowed' }}>转换并下载</button>
    </ToolWrapper>
  );
}
