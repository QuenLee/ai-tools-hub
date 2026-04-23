'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from '@/components/tools/shared';

export default function IDPhoto({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const colors = [
    { id: 'white', color: '#ffffff', label: '白底' },
    { id: 'blue', color: '#438edb', label: '蓝底' },
    { id: 'red', color: '#d32f2f', label: '红底' },
    { id: 'gradient', color: 'gradient', label: '渐变蓝' },
  ];

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const processImage = async () => {
    if (!file || !preview) return;
    setProcessing(true);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve) => { img.onload = resolve; img.src = preview; });

      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple background removal: detect edges and flood fill from corners
      // Get background color from top-left corner
      const bgR = data[0], bgG = data[1], bgB = data[2];
      const threshold = 50;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
        if (diff < threshold) {
          data[i + 3] = 0; // Make transparent
        }
      }

      // Also remove similar colors from edges
      const w = canvas.width, h = canvas.height;
      // Sample more border pixels
      const borderSamples = [];
      for (let x = 0; x < w; x += Math.max(1, Math.floor(w / 50))) {
        borderSamples.push([x, 0], [x, h - 1]);
      }
      for (let y = 0; y < h; y += Math.max(1, Math.floor(h / 50))) {
        borderSamples.push([0, y], [w - 1, y]);
      }

      const bgColors = borderSamples.map(([x, y]) => {
        const idx = (y * w + x) * 4;
        return [data[idx], data[idx + 1], data[idx + 2]];
      });
      // Average background color
      const avgBg = bgColors.reduce(([r1, g1, b1], [r2, g2, b2]) => [r1 + r2, g1 + g2, b1 + b2], [0, 0, 0]).map(v => Math.round(v / bgColors.length));

      // Re-process with averaged background
      const imageData2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data2 = imageData2.data;
      for (let i = 0; i < data2.length; i += 4) {
        const r = data2[i], g = data2[i + 1], b = data2[i + 2];
        const diff = Math.sqrt((r - avgBg[0]) ** 2 + (g - avgBg[1]) ** 2 + (b - avgBg[2]) ** 2);
        if (diff < 60) {
          data2[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData2, 0, 0);

      // Now draw new background behind
      const resultCanvas = document.createElement('canvas');
      resultCanvas.width = canvas.width;
      resultCanvas.height = canvas.height;
      const rctx = resultCanvas.getContext('2d');

      // Draw new background
      if (bgColor === 'gradient') {
        const grad = rctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#438edb');
        grad.addColorStop(1, '#2563eb');
        rctx.fillStyle = grad;
      } else {
        rctx.fillStyle = bgColor;
      }
      rctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw person on top
      rctx.drawImage(canvas, 0, 0);

      resultCanvas.toBlob((blob) => {
        setResult(URL.createObjectURL(blob));
        setProcessing(false);
      }, 'image/png');
    } catch (e) {
      setProcessing(false);
      alert('处理失败：' + e.message);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `id_photo_${bgColor === 'gradient' ? 'blue_grad' : bgColor.replace('#', '')}.png`;
    a.click();
  };

  return (
    <ToolWrapper title="证件照换底色" icon="🪪" onBack={onBack}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', padding: '40px 20px', border: '2px dashed var(--border)', borderRadius: 12, textAlign: 'center', cursor: 'pointer', background: 'var(--surface)' }}>
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🪪</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{file ? file.name : '上传证件照'}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>建议纯色背景的证件照</div>
          </label>

          {preview && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 8 }}>选择背景色：</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {colors.map(c => (
                  <button key={c.id} onClick={() => setBgColor(c.color)}
                    style={{
                      padding: '8px 16px', borderRadius: 8, border: bgColor === c.color ? '2px solid var(--accent)' : '1px solid var(--border)',
                      background: c.color === 'gradient' ? 'linear-gradient(180deg, #438edb, #2563eb)' : c.color,
                      color: c.color === '#ffffff' || !c.color ? '#333' : '#fff',
                      cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem',
                    }}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>自定义颜色：</label>
                <input type="color" value={bgColor === 'gradient' ? '#438edb' : bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  style={{ marginLeft: 8, verticalAlign: 'middle', width: 32, height: 24, border: 'none', cursor: 'pointer' }} />
              </div>
              <button onClick={processImage} disabled={processing}
                style={{ width: '100%', padding: '12px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, border: 'none', cursor: processing ? 'wait' : 'pointer', fontSize: '0.92rem' }}>
                {processing ? '处理中...' : '🎨 换底色'}
              </button>
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 300px' }}>
          {preview && !result && (
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={preview} alt="原图" style={{ width: '100%', display: 'block' }} />
            </div>
          )}
          {result && (
            <div>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 12 }}>
                <img src={result} alt="换底色后" style={{ width: '100%', display: 'block' }} />
              </div>
              <button onClick={download}
                style={{ width: '100%', padding: '10px 20px', borderRadius: 10, background: 'var(--green)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>
                📥 下载证件照
              </button>
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
