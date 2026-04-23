'use client';
import { useState, useRef } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AIWatermarkRemover({ onBack, locale }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState('crop');
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, w: 100, h: 50 });
  const [imgSize, setImgSize] = useState({ w: 800, h: 600 });
  const canvasRef = useRef(null);
  const guard = useToolGuard('ai-watermark');

  const handleFile = (f) => {
    setImage(f);
    setResult(null);
    if (f) {
      const r = new FileReader();
      r.onload = e => {
        setPreview(e.target.result);
        const img = new Image();
        img.onload = () => setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
        img.src = e.target.result;
      };
      r.readAsDataURL(f);
    }
  };

  const handleRemove = () => {
    if (!image || !preview) return;
    if (!guard.check()) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      if (mode === 'crop') {
        // 裁切法：用周围像素填充水印区域（简单inpainting）
        const { x, y, w, h } = cropBox;
        const scaleX = img.naturalWidth / 800;
        const scaleY = img.naturalHeight / (img.naturalHeight * 800 / img.naturalWidth);
        const rx = Math.round(x * scaleX);
        const ry = Math.round(y * scaleX);
        const rw = Math.round(w * scaleX);
        const rh = Math.round(h * scaleX);

        // 采样周围像素做简单修复
        const above = ry > 2 ? ctx.getImageData(rx, Math.max(0, ry - 10), rw, 2) : null;
        const below = ry + rh < img.naturalHeight - 2 ? ctx.getImageData(rx, ry + rh, rw, 2) : null;
        const left = rx > 2 ? ctx.getImageData(Math.max(0, rx - 10), ry, 2, rh) : null;
        const right = rx + rw < img.naturalWidth - 2 ? ctx.getImageData(rx + rw, ry, 2, rh) : null;

        // 渐变填充
        const region = ctx.getImageData(rx, ry, rw, rh);
        for (let py = 0; py < rh; py++) {
          for (let px = 0; px < rw; px++) {
            const idx = (py * rw + px) * 4;
            const t = py / rh; // 0→1 top to bottom
            const s = px / rw; // 0→1 left to right

            // Blend from edges
            let r = 0, g = 0, b = 0, count = 0;
            if (above) {
              const ai = (1 * rw + Math.min(px, above.width - 1)) * 4;
              const w = 1 - t;
              r += above.data[ai] * w; g += above.data[ai + 1] * w; b += above.data[ai + 2] * w; count += w;
            }
            if (below) {
              const bi = (1 * rw + Math.min(px, below.width - 1)) * 4;
              const w = t;
              r += below.data[bi] * w; g += below.data[bi + 1] * w; b += below.data[bi + 2] * w; count += w;
            }
            if (left) {
              const li = (Math.min(py, left.height - 1) * 2 + 1) * 4;
              const w = 1 - s;
              r += left.data[li] * w; g += left.data[li + 1] * w; b += left.data[li + 2] * w; count += w;
            }
            if (right) {
              const ri = (Math.min(py, right.height - 1) * 2) * 4;
              const w = s;
              r += right.data[ri] * w; g += right.data[ri + 1] * w; b += right.data[ri + 2] * w; count += w;
            }

            if (count > 0) {
              region.data[idx] = r / count;
              region.data[idx + 1] = g / count;
              region.data[idx + 2] = b / count;
            }
          }
        }
        ctx.putImageData(region, rx, ry);
      } else {
        // 模糊法：对整个图片做轻微模糊（适合半透明水印）
        ctx.filter = 'blur(1px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
      }

      setResult(canvas.toDataURL('image/png'));
      guard.useOnce();
      setProcessing(false);
    };
    img.src = preview;
  };

  if (guard.blocked) return <LimitBlocked onBack={onBack} />;

  return (
    <ToolWrapper title="AI去水印" desc="框选水印区域，智能修复去除" icon="🖼️" onBack={onBack} remaining={guard.remaining}>
      {/* 上传区 */}
      <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '30px 20px', textAlign: 'center', marginBottom: 14, cursor: 'pointer', position: 'relative' }}
        onClick={() => document.getElementById('wm-upload')?.click()}>
        <input id="wm-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        {preview ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={preview} alt="" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 'var(--radius-sm)' }} />
            {mode === 'crop' && (
              <div style={{
                position: 'absolute',
                left: `${(cropBox.x / imgSize.w) * 100}%`,
                top: `${(cropBox.y / imgSize.h) * 100}%`,
                width: `${(cropBox.w / imgSize.w) * 100}%`,
                height: `${(cropBox.h / imgSize.h) * 100}%`,
                border: '2px dashed var(--red)',
                background: 'rgba(239,68,68,0.1)',
                borderRadius: 4,
              }} />
            )}
          </div>
        ) : (
          <><div style={{ fontSize: '1.4rem', marginBottom: 8 }}>🖼️</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传带水印的图片</div></>
        )}
      </div>

      {preview && (
        <>
          {/* 模式选择 */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            <button onClick={() => setMode('crop')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'crop' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'crop' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'crop' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>框选修复</button>
            <button onClick={() => setMode('blur')} style={{ flex: 1, padding: 8, borderRadius: 'var(--radius-sm)', border: mode === 'blur' ? '1px solid var(--accent)' : '1px solid var(--border)', background: mode === 'blur' ? 'rgba(99,102,241,0.08)' : 'transparent', color: mode === 'blur' ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>模糊淡化</button>
          </div>

          {mode === 'crop' && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 8 }}>调整红色框选区域，覆盖水印位置：</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>X位置<input type="range" min={0} max={imgSize.w - 50} value={cropBox.x} onChange={e => setCropBox({...cropBox, x: +e.target.value})} style={{ width: '100%' }} /></label>
                <label style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>Y位置<input type="range" min={0} max={imgSize.h - 20} value={cropBox.y} onChange={e => setCropBox({...cropBox, y: +e.target.value})} style={{ width: '100%' }} /></label>
                <label style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>宽度<input type="range" min={20} max={imgSize.w} value={cropBox.w} onChange={e => setCropBox({...cropBox, w: +e.target.value})} style={{ width: '100%' }} /></label>
                <label style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>高度<input type="range" min={10} max={imgSize.h} value={cropBox.h} onChange={e => setCropBox({...cropBox, h: +e.target.value})} style={{ width: '100%' }} /></label>
              </div>
            </div>
          )}

          <button onClick={handleRemove} disabled={processing}
            style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.92rem' }}>
            {processing ? '处理中...' : '🧹 去除水印'}
          </button>

          <div style={{ marginTop: 8, fontSize: '0.72rem', color: 'var(--text3)', textAlign: 'center' }}>
            💡 框选修复适合角落水印；模糊淡化适合半透明全图水印
          </div>
        </>
      )}

      {/* 结果 */}
      {result && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>✨ 处理结果</span>
            <a href={result} download="no-watermark.png" style={{ padding: '4px 12px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', textDecoration: 'none', cursor: 'pointer' }}>💾 下载图片</a>
          </div>
          <img src={result} alt="去水印结果" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </ToolWrapper>
  );
}
