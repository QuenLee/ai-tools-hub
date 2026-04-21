'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';

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
  const hotTools = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'claude', 'cursor', 'suno', 'midjourney'];
  const hotToolData = hotTools.map(id => tools.find(t => t.id === id)).filter(Boolean);

  const totalTools = tools.length;
  const totalCategories = categories.length;
  const freeTools = tools.filter(t => t.pricing.free).length;

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <h1>发现最好的AI工具</h1>
        <p>深度评测 · 真实体验 · 帮你选对工具</p>
        <div className="stats">
          <div className="stat">
            <div className="stat-num">{totalTools}+</div>
            <div className="stat-label">工具评测</div>
          </div>
          <div className="stat">
            <div className="stat-num">{totalCategories}</div>
            <div className="stat-label">工具分类</div>
          </div>
          <div className="stat">
            <div className="stat-num">{freeTools}</div>
            <div className="stat-label">免费工具</div>
          </div>
        </div>
      </div>

      {/* Hot Tools Banner */}
      <div className="hot-banner">
        <h3>🔥 热门推荐 · 当前最受欢迎的AI工具</h3>
        <div className="hot-tools-row">
          {hotToolData.map(tool => {
            const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
            return (
              <a key={tool.id} href={`/tool/${tool.id}`} className="hot-tool-chip">
                <span className="chip-icon">{tool.icon}</span>
                {tool.name}
                {tool.pricing.free && <span className="chip-tag">免费</span>}
              </a>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="section">
        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCat('all')}
            style={{
              padding: '6px 16px',
              borderRadius: 8,
              border: `1px solid ${activeCat === 'all' ? 'var(--accent)' : 'var(--border)'}`,
              background: activeCat === 'all' ? 'rgba(124,92,252,0.12)' : 'var(--surface)',
              color: activeCat === 'all' ? 'var(--accent2)' : 'var(--text2)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                border: `1px solid ${activeCat === cat.id ? 'var(--accent)' : 'var(--border)'}`,
                background: activeCat === cat.id ? 'rgba(124,92,252,0.12)' : 'var(--surface)',
                color: activeCat === cat.id ? 'var(--accent2)' : 'var(--text2)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <h2 className="section-title">
          {activeCat === 'all' ? '📋 全部评测' : categories.find(c => c.id === activeCat)?.icon + ' ' + categories.find(c => c.id === activeCat)?.name}
          <span style={{ fontSize: '0.82rem', color: 'var(--text3)', fontWeight: 400 }}>
            {filteredTools.length}个工具
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
  );
}

function ToolCard({ tool }) {
  const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  const isHot = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'cursor'].includes(tool.id);
  
  return (
    <a href={`/tool/${tool.id}`} className="tool-card">
      {isHot && (
        <div style={{ 
          position: 'absolute', 
          top: 12, 
          right: 12, 
          fontSize: '0.65rem', 
          padding: '2px 8px', 
          borderRadius: 6, 
          background: 'rgba(252,92,125,0.15)', 
          color: '#fc5c7d',
          border: '1px solid rgba(252,92,125,0.2)',
          fontWeight: 600
        }}>
          🔥 热门
        </div>
      )}
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
