'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, tools } from '@/lib/data';

export default function Sidebar() {
  const pathname = usePathname();

  const hotTools = [
    { id: 'deepseek', name: 'DeepSeek', icon: '🔮', tag: '🔥 爆火' },
    { id: 'doubao', name: '豆包', icon: '🟣', tag: '🔥 免费' },
    { id: 'chatgpt', name: 'ChatGPT', icon: '🤖', tag: '' },
    { id: 'kimi', name: 'Kimi', icon: '🌙', tag: '' },
    { id: 'cursor', name: 'Cursor', icon: '🖱️', tag: '🔥 热门' },
  ];

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-logo">
        <span className="emoji">🤖</span>
        AI情报站
      </Link>

      <div className="sidebar-section">
        <div className="sidebar-section-title">🔥 热门工具</div>
        {hotTools.map(tool => (
          <Link 
            key={tool.id} 
            href={`/tool/${tool.id}`} 
            className={`sidebar-item ${pathname === `/tool/${tool.id}` ? 'active' : ''}`}
          >
            <span className="icon">{tool.icon}</span>
            {tool.name}
            {tool.tag && <span style={{ 
              fontSize: '0.65rem', 
              color: '#fc5c7d', 
              marginLeft: 'auto',
              marginRight: tool.id === 'deepseek' || tool.id === 'cursor' ? 4 : 0 
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
          >
            <span className="icon">{cat.icon}</span>
            {cat.name}
            <span className="count">{getCount(cat.id)}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-nav">
        <Link href="/compare/china-ai" className={`sidebar-item ${pathname === '/compare/china-ai' ? 'active' : ''}`}>
          <span className="icon">🔥</span>
          国产AI横评
        </Link>
        <Link href="/compare" className={`sidebar-item ${pathname === '/compare' ? 'active' : ''}`}>
          <span className="icon">⚔️</span>
          横评对比
        </Link>
        <Link href="/deals" className={`sidebar-item ${pathname === '/deals' ? 'active' : ''}`}>
          <span className="icon">🎁</span>
          优惠专区
        </Link>
      </div>
    </aside>
  );
}

function getCount(catId) {
  return tools.filter(t => t.category === catId).length;
}
