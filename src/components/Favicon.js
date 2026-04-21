'use client';

import { useState, useEffect } from 'react';

// Cache favicon results in localStorage to avoid repeated API calls
const CACHE_KEY = 'favicon_cache';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function setCacheEntry(domain, url) {
  try {
    const cache = getCache();
    cache[domain] = { url, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* localStorage full, ignore */ }
}

function getCacheEntry(domain) {
  try {
    const cache = getCache();
    const entry = cache[domain];
    if (entry && Date.now() - entry.ts < CACHE_TTL) {
      return entry.url;
    }
    // expired, clean up
    if (entry) {
      delete cache[domain];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch {}
  return null;
}

export default function Favicon({ domain, name, size = 32 }) {
  const cachedUrl = getCacheEntry(domain);

  const [src, setSrc] = useState(
    cachedUrl || `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
  );
  const [fallbackLevel, setFallbackLevel] = useState(cachedUrl ? -1 : 0); // -1 = using cache

  const handleError = () => {
    if (fallbackLevel === 0) {
      // Try direct favicon
      setFallbackLevel(1);
      const directUrl = `https://${domain}/favicon.ico`;
      setSrc(directUrl);
    } else if (fallbackLevel === 1) {
      // Give up, use generated initial
      setFallbackLevel(2);
    } else if (fallbackLevel === -1) {
      // Cached URL failed, try Google API fresh
      setFallbackLevel(0);
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`);
    }
  };

  // On successful load, cache the working URL
  const handleLoad = () => {
    if (fallbackLevel >= 0) { // only cache non-generated results
      setCacheEntry(domain, src);
    }
  };

  if (fallbackLevel >= 2) {
    // Generated initial avatar
    const initial = (name || domain)[0].toUpperCase();
    const colors = ['#7c5cfc', '#e040a0', '#00d2ff', '#34d399', '#fbbf24', '#f87171'];
    const colorIndex = (name || domain).charCodeAt(0) % colors.length;
    return (
      <div style={{
        width: size, height: size, borderRadius: size * 0.24,
        background: colors[colorIndex],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 700, fontSize: size * 0.45, flexShrink: 0,
      }}>
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
      onLoad={handleLoad}
      loading="lazy"
      style={{
        borderRadius: size * 0.24, objectFit: 'contain', flexShrink: 0,
        background: 'var(--surface2)',
      }}
    />
  );
}
