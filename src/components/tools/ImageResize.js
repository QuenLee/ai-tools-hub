'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from './shared';

export function ImageResize({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [origDim, setOrigDim] = useState({ w: 0, h: 0 });
  const [newW, setNewW] = useState(0);
  const [newH, setNewH] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [quality, setQuality] = useState(92);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      setOrigDim({ w: img.naturalWidth, h: img.naturalHeight });
      setNewW(img.naturalWidth);
      setNewH(img.naturalHeight);
    };
    img.src = url;
  };

  const handleWChange = (val) => {
    const w = Math.max(1, parseInt(val) || 0);
    setNewW(w);
    if (lockRatio && origDim.w > 0) {
      setNewH(Math.round(w * (origDim.h / origDim.w)));
    }
  };

  const handleHChange = (val) => {
    const h = Math.max(1, parseInt(val) || 0);
    setNewH(h);
    if (lockRatio && origDim.h > 0) {
      setNewW(Math.round(h * (origDim.w / origDim.h)));
    }
  };

  const PRESETS = [
    { label: '微信头像', w: 640, h: 640 },
    { label: '微信封面', w: 900, h: 383 },
    { label: '小红书图', w: 1242, h: 1660 },
    { label: '抖音封面', w: 1080, h: 1920 },
    { label: '公众号', w: 900, h: 500 },
    { label: '半宽', w: Math.round(origDim.w / 2), h: 0 },
    { label: '1/3宽', w: Math.round(origDim.w / 3), h: 0 },
  ];

  const handleResize = () => {
    if (!preview) return;
    const canvas = document.createElement('canvas');
    canvas.width = newW;
    canvas.height = newH;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, newW, newH);
      const isPng = file?.type?.includes('png');
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file?.name?.replace(/\.[^.]+$/, '') || 'resized'}_${newW}x${newH}.${isPng ? 'png' : 'jpg'}`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, isPng ? 'image/png' : 'image/jpeg', quality / 100);
    };
    img.src = preview;
  };

  const pct = origDim.w > 0 ? Math.round((newW / origDim.w) * 100) : 100;

  return (
    <ToolWrapper title="图片缩放" desc="按比例或指定尺寸缩放图片，纯浏览器本地处理" icon="📐" onBack={onBack} remaining={Infinity}>
      {!preview ? (
        <div
          style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
          <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>📐</div>
          <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传图片</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 8 }}>
            {file?.name} · 原始 {origDim.w}×{origDim.h}px
          </div>

          <img src={preview} alt="" style={{ maxWidth: 200, maxHeight: 100, borderRadius: 'var(--radius-xs)', marginBottom: 12, display: 'block' }} />

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => {
                setNewW(p.w);
                if (p.h > 0) { setNewH(p.h); setLockRatio(false); }
                else { setNewH(Math.round(p.w * (origDim.h / origDim.w))); setLockRatio(true); }
              }} style={{
                padding: '5px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600,
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text2)', cursor: 'pointer',
              }}>{p.label}</button>
            ))}
          </div>

          {/* Width / Height */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>宽度 (px)</label>
              <input type="number" value={newW} onChange={e => handleWChange(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setLockRatio(!lockRatio)} style={{
              marginTop: 20, padding: '8px', borderRadius: 8,
              border: '1px solid var(--border)', background: lockRatio ? 'rgba(99,102,241,0.1)' : 'transparent',
              color: lockRatio ? 'var(--accent)' : 'var(--text3)', cursor: 'pointer', fontSize: '0.78rem',
            }}>{lockRatio ? '🔗' : '🔓'}</button>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>高度 (px)</label>
              <input type="number" value={newH} onChange={e => handleHChange(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Quality */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>输出质量</span><span style={{ color: 'var(--text3)' }}>{quality}% · 缩放比 {pct}%</span>
            </label>
            <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleResize} disabled={!preview} style={{
              flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)', color: '#fff', fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}>缩放并下载</button>
            <button onClick={() => { setPreview(null); setFile(null); }} style={{
              padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              background: 'transparent', color: 'var(--text2)', fontWeight: 600,
              border: '1px solid var(--border)', cursor: 'pointer',
            }}>重新上传</button>
          </div>
        </>
      )}
    </ToolWrapper>
  );
}
