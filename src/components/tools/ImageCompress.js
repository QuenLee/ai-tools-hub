'use client';
import { useState, useRef } from 'react';
import { ToolWrapper } from '@/components/tools/shared';

export default function ImageCompress({ onBack, locale }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const compress = () => {
    if (!file || !preview) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setResult({
            url,
            size: blob.size,
            origSize: file.size,
            ratio: ((1 - blob.size / file.size) * 100).toFixed(1),
          });
          setProcessing(false);
        },
        'image/jpeg',
        quality
      );
    };
    img.src = preview;
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `compressed_${file?.name || 'image'}.jpg`;
    a.click();
  };

  const fmtSize = (b) => {
    if (b < 1024) return b + 'B';
    if (b < 1048576) return (b / 1024).toFixed(1) + 'KB';
    return (b / 1048576).toFixed(1) + 'MB';
  };

  return (
    <ToolWrapper title="图片压缩" icon="🖼️" onBack={onBack}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', padding: '40px 20px', border: '2px dashed var(--border)', borderRadius: 12, textAlign: 'center', cursor: 'pointer', background: 'var(--surface)', transition: 'all 0.2s' }}>
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>📁</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>
              {file ? file.name : '点击选择图片或拖拽到此处'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>支持 JPG/PNG/WebP</div>
          </label>

          {preview && (
            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                  压缩质量：{Math.round(quality * 100)}%
                </label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality}
                  onChange={e => setQuality(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text3)' }}>
                  <span>最小体积</span><span>最高质量</span>
                </div>
              </div>
              <button onClick={compress} disabled={processing}
                style={{ width: '100%', padding: '12px 24px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, border: 'none', cursor: processing ? 'wait' : 'pointer', fontSize: '0.92rem' }}>
                {processing ? '压缩中...' : '🚀 开始压缩'}
              </button>
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 300px' }}>
          {preview && !result && (
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={preview} alt="预览" style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '8px 12px', fontSize: '0.78rem', color: 'var(--text3)', background: 'var(--surface)' }}>
                原图大小：{fmtSize(file?.size || 0)}
              </div>
            </div>
          )}
          {result && (
            <div>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 12 }}>
                <img src={result.url} alt="压缩后" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>原图</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{fmtSize(result.origSize)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>压缩后</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--green)' }}>{fmtSize(result.size)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>压缩率</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent)' }}>-{result.ratio}%</span>
                </div>
                <button onClick={download}
                  style={{ width: '100%', padding: '10px 20px', borderRadius: 10, background: 'var(--green)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>
                  📥 下载压缩图片
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
}
