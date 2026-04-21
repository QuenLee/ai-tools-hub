'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, tools } from '@/lib/data';

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(prev => !prev);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const hotTools = [
    { id: 'deepseek', name: 'DeepSeek', icon: '🔮', tag: '🔥 爆火' },
    { id: 'doubao', name: '豆包', icon: '🟣', tag: '🔥 免费' },
    { id: 'chatgpt', name: 'ChatGPT', icon: '🤖', tag: '' },
    { id: 'kimi', name: 'Kimi', icon: '🌙', tag: '' },
    { id: 'cursor', name: 'Cursor', icon: '🖱️', tag: '🔥 热门' },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${open ? 'active' : ''}`} 
        onClick={() => setOpen(false)} 
      />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 4, marginBottom: 4 }}>
          <Link href="/" className="sidebar-logo" onClick={() => setOpen(false)}>
            <span className="emoji">🤖</span>
            AI情报站
          </Link>
          <button 
            onClick={() => setOpen(false)}
            className="mobile-close-btn"
            style={{ 
              background: 'none', border: `1px solid var(--border)`, 
              color: 'var(--text2)', fontSize: '1rem', cursor: 'pointer',
              padding: '4px 8px', borderRadius: 6, display: 'none',
            }}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">🔥 热门工具</div>
          {hotTools.map(tool => (
            <Link 
              key={tool.id} 
              href={`/tool/${tool.id}`} 
              className={`sidebar-item ${pathname === `/tool/${tool.id}` ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="icon">{tool.icon}</span>
              {tool.name}
              {tool.tag && <span style={{ 
                fontSize: '0.65rem', 
                color: '#fc5c7d', 
                marginLeft: 'auto',
              }}>{tool.tag}</span>}
            </Link>
          ))}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">📂 工具分类</div>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className={`sidebar-item ${pathname === `/category/${cat.id}` ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="icon">{cat.icon}</span>
              {cat.name}
              <span className="count">{getCount(cat.id)}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-nav">
          <Link href="/compare/china-ai" className={`sidebar-item ${pathname === '/compare/china-ai' ? 'active' : ''}`} onClick={() => setOpen(false)}>
            <span className="icon">🔥</span>
            国产AI横评
          </Link>
          <Link href="/compare" className={`sidebar-item ${pathname === '/compare' ? 'active' : ''}`} onClick={() => setOpen(false)}>
            <span className="icon">⚔️</span>
            横评对比
          </Link>
          <Link href="/deals" className={`sidebar-item ${pathname === '/deals' ? 'active' : ''}`} onClick={() => setOpen(false)}>
            <span className="icon">🎁</span>
            优惠专区
          </Link>
        </div>
      </aside>
    </>
  );
}

function getCount(catId) {
  return tools.filter(t => t.category === catId).length;
}
