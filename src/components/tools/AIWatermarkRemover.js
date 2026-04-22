'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AIWatermarkRemover({ onBack, locale }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const guard = useToolGuard('ai-watermark');
  const handleFile = (f) => { setImage(f); if (f) { const r = new FileReader(); r.onload = e => setPreview(e.target.result); r.readAsDataURL(f); } };
  const handleRemove = () => { if (!image || !guard.check()) return; setProcessing(true); setTimeout(() => { setProcessing(false); alert('演示模式：实际部署需对接AI去水印API'); guard.useOnce(); }, 2000); };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="AI去水印" desc="上传图片，AI智能识别并去除水印区域" icon="🖼️" onBack={onBack} remaining={guard.remaining}>
      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '40px 20px', textAlign: 'center', marginBottom: 14, cursor: 'pointer' }} onClick={() => document.getElementById('wm-upload')?.click()}>
        <input id="wm-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        {preview ? <img src={preview} alt="" style={{ maxWidth: 300, maxHeight: 200, borderRadius: 'var(--radius-sm)' }} /> : <><div style={{ fontSize: '1.2rem', marginBottom: 6 }}>🖼️</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传带水印的图片</div></>}
      </div>
      <button onClick={handleRemove} disabled={!image || processing} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: image ? 'var(--accent)' : 'var(--border)', color: image ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: image ? 'pointer' : 'not-allowed' }}>{processing ? '处理中...' : '去除水印'}</button>
    </ToolWrapper>
  );
}
