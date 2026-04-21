'use client';

import { useState } from 'react';
import { categories, tools, getToolsByCategory, getScoreColor } from '@/lib/data';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filteredTools = tools.filter(t => {
    const matchSearch = !search || 
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tagline.includes(search) ||
      t.description.includes(search);
    const matchCat = activeCat === 'all' || t.category === activeCat;
    return matchSearch && matchCat;
  });

  const featuredTools = tools.filter(t => t.scores.usefulness >= 90).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <h1>🤖 AI工具情报站</h1>
        <p>深度评测，发现值得用的AI工具</p>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            placeholder="搜索AI工具..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        {/* Featured */}
        {!search && activeCat === 'all' && (
          <div className="section">
            <h2 className="section-title">
              ⭐ 精选推荐 <span className="badge">编辑推荐</span>
            </h2>
            <div className="tool-grid">
              {featuredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="section">
          <h2 className="section-title">📂 工具分类</h2>
          <div className="cat-grid">
            <div 
              className={`cat-card ${activeCat === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCat('all')}
              style={activeCat === 'all' ? { borderColor: 'var(--accent)', background: 'var(--surface2)' } : {}}
            >
              <div className="cat-icon">🌐</div>
              <div className="cat-name">全部</div>
              <div className="cat-count">{tools.length}个</div>
            </div>
            {categories.map(cat => (
              <a 
                key={cat.id} 
                href={`/category/${cat.id}`}
                className="cat-card"
                onClick={e => { e.preventDefault(); setActiveCat(cat.id); }}
                style={activeCat === cat.id ? { borderColor: 'var(--accent)', background: 'var(--surface2)' } : {}}
              >
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{getToolsByCategory(cat.id).length}个</div>
              </a>
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div className="section">
          <h2 className="section-title">
            📋 {activeCat === 'all' ? '全部工具' : categories.find(c => c.id === activeCat)?.name}
            <span style={{ fontSize: '0.85rem', color: 'var(--text2)', fontWeight: 400 }}>
              （{filteredTools.length}个）
            </span>
          </h2>
          {filteredTools.length > 0 ? (
            <div className="tool-grid">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="empty">没有找到匹配的工具</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool }) {
  const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  
  return (
    <a href={`/tool/${tool.id}`} className="tool-card">
      <div className="tool-header">
        <span className="tool-icon">{tool.icon}</span>
        <span className="tool-name">{tool.name}</span>
      </div>
      <div className="tool-tagline">{tool.tagline}</div>
      <div className="feature-tags">
        {tool.features.slice(0, 3).map(f => (
          <span key={f} className="feature-tag">{f}</span>
        ))}
      </div>
      <div className="tool-meta">
        <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`}>
          {tool.pricing.free ? '🆓 ' : '💰 '}{tool.pricing.price}
        </span>
        <span className="tool-score" style={{ color: getScoreColor(avgScore) }}>
          {avgScore}分
        </span>
      </div>
    </a>
  );
}
