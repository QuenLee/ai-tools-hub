'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';

export default function Home() {
  const [activeCat, setActiveCat] = useState('all');

  const filteredTools = activeCat === 'all' 
    ? tools 
    : getToolsByCategory(activeCat);

  // Featured picks (top scored)
  const featured = tools
    .filter(t => t.scores.usefulness >= 90)
    .slice(0, 4);

  // Hot tools
  const hotIds = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'cursor', 'suno'];
  const hotTools = hotIds.map(id => tools.find(t => t.id === id)).filter(Boolean);

  const totalTools = tools.length;
  const freeTools = tools.filter(t => t.pricing.free).length;

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <h1>发现最好的AI工具</h1>
        <p>深度评测 · 真实体验 · 帮你选对不花冤枉钱</p>
        <div className="hero-stats">
          <div className="hero-stat-num">{totalTools}+</div>
          <div className="hero-stat-num">{freeTools}</div>
          <div className="hero-stat-num">{categories.length}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 4 }}>
          <div className="hero-stat-label">工具评测</div>
          <div className="hero-stat-label">免费可用</div>
          <div className="hero-stat-label">工具分类</div>
        </div>
      </section>

      {/* Featured Picks */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">⭐ 编辑精选</h2>
          <span className="section-badge">值得装</span>
        </div>
        <div className="featured-grid">
          {featured.map(tool => (
            <FeaturedCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Editorial / Topics */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">📝 深度专题</h2>
        </div>
        <div className="topic-grid">
          <a href="/compare/china-ai" className="topic-card">
            <div className="topic-badge">🔥 热门</div>
            <div className="topic-title">DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评</div>
            <div className="topic-desc">8大场景深度对比，看完你就知道选哪个</div>
          </a>
          <a href="/deals" className="topic-card">
            <div className="topic-badge">🎁 省钱</div>
            <div className="topic-title">2026最值得白嫖的AI工具免费额度</div>
            <div className="topic-desc">免费版就能干大事，这些AI工具不用花一分钱</div>
          </a>
        </div>
      </section>

      {/* Hot Tools Row */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">🔥 热门工具</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {hotTools.map(tool => {
            const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
            return (
              <a 
                key={tool.id} 
                href={`/tool/${tool.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 18px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{tool.icon}</span>
                {tool.name}
                <span style={{ fontSize: '0.78rem', color: getScoreColor(avg), fontWeight: 700 }}>{avg}分</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* All Tools with category tabs */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            {activeCat === 'all' ? '📋 全部评测' : categories.find(c => c.id === activeCat)?.icon + ' ' + categories.find(c => c.id === activeCat)?.name}
            <span style={{ fontSize: '0.82rem', color: 'var(--text3)', fontWeight: 400 }}>
              {filteredTools.length}个
            </span>
          </h2>
        </div>

        <div className="cat-tabs">
          <button 
            className={`cat-tab ${activeCat === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCat('all')}
          >
            全部
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="tool-grid">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({ tool }) {
  const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  return (
    <a href={`/tool/${tool.id}`} className="featured-card">
      <div className="featured-icon">{tool.icon}</div>
      <div className="featured-body">
        <div className="featured-name">
          {tool.name}
          {['deepseek', 'doubao', 'chatgpt', 'kimi'].includes(tool.id) && (
            <span className="hot-tag">🔥 HOT</span>
          )}
        </div>
        <div className="featured-tagline">{tool.tagline}</div>
        <div className="featured-meta">
          <span className={`featured-price-tag ${tool.pricing.free ? 'free' : 'paid'}`}>
            {tool.pricing.free ? '🆓 ' : '💰 '}{tool.pricing.price}
          </span>
          <span className="featured-score" style={{ color: getScoreColor(avg) }}>{avg}分</span>
        </div>
      </div>
    </a>
  );
}

function ToolCard({ tool }) {
  const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  return (
    <a href={`/tool/${tool.id}`} className="tool-card">
      <div className="tool-header">
        <span className="tool-icon">{tool.icon}</span>
        <span className="tool-name">
          {tool.name}
          {['deepseek', 'doubao', 'cursor', 'chatgpt', 'kimi'].includes(tool.id) && (
            <span className="hot-tag">🔥</span>
          )}
        </span>
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
        <span className="tool-score" style={{ color: getScoreColor(avg) }}>{avg}分</span>
      </div>
    </a>
  );
}
