'use client';
import { useState, useRef, useCallback } from 'react';
import { ToolWrapper } from './shared';

export function ImageCrop({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const [ratio, setRatio] = useState('free');
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  const RATIOS = [
    { id: 'free', label: '自由' },
    { id: '1:1', label: '1:1' },
    { id: '4:3', label: '4:3' },
    { id: '16:9', label: '16:9' },
    { id: '3:4', label: '3:4' },
    { id: '9:16', label: '9:16' },
    { id: '2:3', label: '2:3' },
  ];

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      setImgDim({ w: img.naturalWidth, h: img.naturalHeight });
      // default crop = center 80%
      const cw = img.naturalWidth * 0.8;
      const ch = img.naturalHeight * 0.8;
      setCrop({ x: img.naturalWidth * 0.1, y: img.naturalHeight * 0.1, w: cw, h: ch });
    };
    img.src = url;
  };

  const handleCrop = () => {
    if (!preview) return;
    const canvas = document.createElement('canvas');
    canvas.width = crop.w;
    canvas.height = crop.h;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file?.name?.replace(/\.[^.]+$/, '') || 'cropped'}_裁剪.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };
    img.src = preview;
  };

  // Display dimensions (scale to fit container)
  const displayMaxW = 480;
  const scale = imgDim.w > 0 ? Math.min(displayMaxW / imgDim.w, 1) : 1;
  const dispW = imgDim.w * scale;
  const dispH = imgDim.h * scale;

  const handleCanvasMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / scale;
    const py = (e.clientY - rect.top) / scale;
    
    // Check if clicking near crop edges (resize) or inside (move)
    const edge = 15 / scale;
    const nearRight = Math.abs(px - (crop.x + crop.w)) < edge;
    const nearBottom = Math.abs(py - (crop.y + crop.h)) < edge;
    const nearLeft = Math.abs(px - crop.x) < edge;
    const nearTop = Math.abs(py - crop.y) < edge;
    const inside = px > crop.x && px < crop.x + crop.w && py > crop.y && py < crop.y + crop.h;

    if (nearRight && nearBottom) {
      setDragType('se');
      setDragging(true);
      setDragStart({ x: px, y: py, crop: { ...crop } });
    } else if (inside) {
      setDragType('move');
      setDragging(true);
      setDragStart({ x: px, y: py, crop: { ...crop } });
    }
  };

  const handleCanvasMouseMove = useCallback((e) => {
    if (!dragging || !dragStart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / scale;
    const py = (e.clientY - rect.top) / scale;
    const dx = px - dragStart.x;
    const dy = py - dragStart.y;
    const c = dragStart.crop;

    if (dragType === 'se') {
      let newW = Math.max(20, c.w + dx);
      let newH = Math.max(20, c.h + dy);
      // Constrain ratio
      if (ratio !== 'free') {
        const [rw, rh] = ratio.split(':').map(Number);
        newH = newW * (rh / rw);
      }
      // Constrain to image bounds
      newW = Math.min(newW, imgDim.w - c.x);
      newH = Math.min(newH, imgDim.h - c.y);
      setCrop({ ...c, w: newW, h: newH });
    } else if (dragType === 'move') {
      let nx = Math.max(0, Math.min(c.x + dx, imgDim.w - c.w));
      let ny = Math.max(0, Math.min(c.y + dy, imgDim.h - c.h));
      setCrop({ ...c, x: nx, y: ny });
    }
  }, [dragging, dragStart, dragType, scale, ratio, imgDim]);

  const handleCanvasMouseUp = () => {
    setDragging(false);
    setDragType(null);
    setDragStart(null);
  };

  return (
    <ToolWrapper title="图片裁剪" desc="在线裁剪图片尺寸和比例，纯浏览器本地处理" icon="✂️" onBack={onBack} remaining={Infinity}>
      {!preview ? (
        <div
          style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => document.getElementById('crop-input')?.click()}
        >
          <input id="crop-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
          <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>✂️</div>
          <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传图片</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 8 }}>
            {file?.name} · {imgDim.w}×{imgDim.h}px
          </div>

          {/* Ratio selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            {RATIOS.map(r => (
              <button key={r.id} onClick={() => {
                setRatio(r.id);
                if (r.id !== 'free' && imgDim.w > 0) {
                  const [rw, rh] = r.id.split(':').map(Number);
                  let newW = crop.w;
                  let newH = newW * (rh / rw);
                  if (crop.y + newH > imgDim.h) { newH = imgDim.h - crop.y; newW = newH * (rw / rh); }
                  if (crop.x + newW > imgDim.w) { newW = imgDim.w - crop.x; newH = newW * (rh / rw); }
                  setCrop({ ...crop, w: newW, h: newH });
                }
              }} style={{
                padding: '6px 12px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 700,
                border: ratio === r.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: ratio === r.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: ratio === r.id ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer',
              }}>{r.label}</button>
            ))}
          </div>

          {/* Canvas with crop overlay */}
          <div style={{
            position: 'relative', display: 'inline-block', maxWidth: '100%',
            borderRadius: 'var(--radius-xs)', overflow: 'hidden', border: '1px solid var(--border)',
          }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          >
            <img ref={imgRef} src={preview} alt="" style={{ display: 'block', width: dispW, height: dispH, userSelect: 'none', pointerEvents: 'none' }} />
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <svg width={dispW} height={dispH} style={{ position: 'absolute', top: 0, left: 0 }}>
                <defs>
                  <mask id="crop-mask">
                    <rect x="0" y="0" width={dispW} height={dispH} fill="white" />
                    <rect x={crop.x * scale} y={crop.y * scale} width={crop.w * scale} height={crop.h * scale} fill="black" />
                  </mask>
                </defs>
                <rect x="0" y="0" width={dispW} height={dispH} fill="rgba(0,0,0,0.5)" mask="url(#crop-mask)" />
                {/* Crop border */}
                <rect x={crop.x * scale} y={crop.y * scale} width={crop.w * scale} height={crop.h * scale}
                  fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="6 3" />
                {/* Corner handles */}
                <rect x={crop.x * scale - 4} y={crop.y * scale - 4} width="8" height="8" fill="#fff" rx="2" />
                <rect x={(crop.x + crop.w) * scale - 4} y={crop.y * scale - 4} width="8" height="8" fill="#fff" rx="2" />
                <rect x={crop.x * scale - 4} y={(crop.y + crop.h) * scale - 4} width="8" height="8" fill="#fff" rx="2" />
                <rect x={(crop.x + crop.w) * scale - 4} y={(crop.y + crop.h) * scale - 4} width="8" height="8" fill="#fff" rx="2" />
              </svg>
            </div>
          </div>

          {/* Crop info */}
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: 10, marginBottom: 12 }}>
            裁剪区域: {Math.round(crop.w)}×{Math.round(crop.h)}px
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleCrop} style={{
              flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)', color: '#fff', fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}>裁剪并下载</button>
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
