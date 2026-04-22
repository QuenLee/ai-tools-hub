'use client';
import { useState, useRef } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function PDFConverter({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('docx');
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef(null);
  const guard = useToolGuard('pdf-convert');
  const handleConvert = () => { if (!file || !guard.check()) return; setProcessing(true); setTimeout(() => { setProcessing(false); alert('演示模式：实际部署需对接后端转换API'); guard.useOnce(); }, 1500); };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="PDF转Word/Excel" desc="上传PDF文件，一键转换为可编辑的Word或Excel文档" icon="📄" onBack={onBack} remaining={guard.remaining}>
      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '40px 20px', textAlign: 'center', marginBottom: 14, cursor: 'pointer' }} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0] || null)} />
        {file ? <div><div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{file.name}</div><div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{(file.size / 1024).toFixed(1)} KB</div></div> : <><div style={{ fontSize: '1.2rem', marginBottom: 6 }}>📄</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传PDF文件</div></>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>{['docx', 'xlsx'].map(f => <button key={f} onClick={() => setFormat(f)} style={{ padding: '6px 16px', borderRadius: 'var(--radius-2xs)', fontSize: '0.82rem', border: format === f ? '1px solid var(--accent)' : '1px solid var(--border)', background: format === f ? 'rgba(99,102,241,0.08)' : 'transparent', color: format === f ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>转为 {f === 'docx' ? 'Word' : 'Excel'}</button>)}</div>
      <button onClick={handleConvert} disabled={!file || processing} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: file ? 'var(--accent)' : 'var(--border)', color: file ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: file ? 'pointer' : 'not-allowed' }}>{processing ? '转换中...' : '开始转换'}</button>
    </ToolWrapper>
  );
}
