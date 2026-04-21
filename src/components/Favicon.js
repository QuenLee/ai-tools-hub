'use client';
import { useState } from 'react';

// Favicon component: tries Google's favicon API first, falls back to direct domain favicon, then to a generated initial
export default function Favicon({ domain, name, size = 32 }) {
  const [src, setSrc] = useState(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleError = () => {
    if (fallbackLevel === 0) {
      // Try direct favicon
      setFallbackLevel(1);
      setSrc(`https://${domain}/favicon.ico`);
    } else if (fallbackLevel === 1) {
      // Give up, use generated initial
      setFallbackLevel(2);
    }
  };

  if (fallbackLevel >= 2) {
    // Generated initial avatar
    const initial = (name || domain)[0].toUpperCase();
    const colors = ['#7c5cfc', '#e040a0', '#00d2ff', '#34d399', '#fbbf24', '#f87171'];
    const colorIndex = (name || domain).charCodeAt(0) % colors.length;
    
    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: size * 0.24,
          background: colors[colorIndex],
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: size * 0.45,
          flexShrink: 0,
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={handleError}
      style={{ 
        borderRadius: size * 0.24, 
        objectFit: 'contain',
        flexShrink: 0,
        background: 'var(--surface2)',
      }}
    />
  );
}
