'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from './shared';

export function ImageWatermark({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [watermarkText, setWatermarkText] = useState('AI工具箱');
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#ffffff');
  const [position, setPosition] = useState('tile'); // tile, center, bottom-right
  const [rotate, setRotate] = useState(-25);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    const r = new FileReader();
    r.onload = e => setPreview(e.target.result);
    r.readAsDataURL(f);
  };

  const handleAddWatermark = () => {
    if (!preview || !watermarkText) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = color;
      ctx.font = `${fontSize * (img.naturalWidth / 800)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const scale = img.naturalWidth / 800;

      if (position === 'center') {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.font = `${48 * scale}px sans-serif`;
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();
      } else if (position === 'bottom-right') {
        const px = canvas.width - 120 * scale;
        const py = canvas.height - 40 * scale;
        ctx.fillText(watermarkText, px, py);
      } else {
        // tile
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        const step = 160 * scale;
        for (let x = -canvas.width; x < canvas.width * 2; x += step) {
          for (let y = -canvas.height; y < canvas.height * 2; y += step) {
            ctx.fillText(watermarkText, x, y);
          }
        }
        ctx.restore();
      }

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file?.name?.replace(/\.[^.]+$/, '') || 'watermarked'}_水印.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };
    img.src = preview;
  };

  const positions = [
    { id: 'tile', label: '平铺' },
    { id: 'center', label: '居中' },
    { id: 'bottom-right', label: '右下角' },
  ];

  return (
    <ToolWrapper title="图片加水印" desc="上传图片→添加文字水印，纯浏览器本地处理" icon="💧" onBack={onBack} remaining={Infinity}>
      <div
        style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', padding: '24px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 14 }}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
        {preview ? (
          <img src={preview} alt="" style={{ maxWidth: 200, maxHeight: 120, borderRadius: 'var(--radius-xs)' }} />
        ) : (
          <><div style={{ fontSize: '1.2rem', marginBottom: 6 }}>💧</div><div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>点击上传图片</div></>
        )}
      </div>

      {file && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>{file.name} ({(file.size / 1024).toFixed(1)}KB)</div>
      )}

      {/* 水印文字 */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>水印文字</label>
        <input
          type="text" value={watermarkText} onChange={e => setWatermarkText(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.88rem', boxSizing: 'border-box' }}
          placeholder="输入水印文字"
        />
      </div>

      {/* 位置选择 */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>水印位置</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {positions.map(p => (
            <button key={p.id} onClick={() => setPosition(p.id)} style={{
              flex: 1, padding: '8px 12px', borderRadius: 8,
              border: position === p.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: position === p.id ? 'rgba(99,102,241,0.08)' : 'transparent',
              color: position === p.id ? 'var(--accent)' : 'var(--text2)',
              cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
            }}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* 透明度 */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>透明度</span><span style={{ color: 'var(--text3)' }}>{opacity}%</span>
        </label>
        <input type="range" min="5" max="100" value={opacity} onChange={e => setOpacity(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent)' }} />
      </div>

      {/* 旋转 */}
      {position !== 'bottom-right' && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span>旋转角度</span><span style={{ color: 'var(--text3)' }}>{rotate}°</span>
          </label>
          <input type="range" min="-90" max="90" value={rotate} onChange={e => setRotate(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }} />
        </div>
      )}

      {/* 颜色 */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>水印颜色</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {['#ffffff', '#000000', '#ff0000', '#ff6b6b', '#4ecdc4', '#6366f1'].map(c => (
            <button key={c} onClick={() => setColor(c)} style={{
              width: 28, height: 28, borderRadius: 8,
              background: c, border: color === c ? '2px solid var(--accent)' : '2px solid var(--border)',
              cursor: 'pointer', padding: 0,
            }} />
          ))}
        </div>
      </div>

      <button onClick={handleAddWatermark} disabled={!preview || !watermarkText} style={{
        width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
        background: preview && watermarkText ? 'var(--accent)' : 'var(--border)',
        color: preview && watermarkText ? '#fff' : 'var(--text3)',
        fontWeight: 700, border: 'none', cursor: preview && watermarkText ? 'pointer' : 'not-allowed',
      }}>添加水印并下载</button>
    </ToolWrapper>
  );
}
