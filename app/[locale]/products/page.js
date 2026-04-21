'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Favicon from '@/components/Favicon';
import { IconFree, IconPaid, IconFire, categoryIcons } from '@/components/icons/Icons';

export default function ProductsPage() {
  const { locale } = useParams();
  const [activeCat, setActiveCat] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const filteredTools = activeCat === 'all' ? tools : getToolsByCategory(activeCat);

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'score') {
      const avgA = (a.scores.usefulness + a.scores.value + a.scores.ease) / 3;
      const avgB = (b.scores.usefulness + b.scores.value + b.scores.ease) / 3;
      return avgB - avgA;
    }
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'free') return (b.pricing.free ? 1 : 0) - (a.pricing.free ? 1 : 0);
    return 0;
  });

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        <div className="breadcrumb">
          <a href={`/${locale}`}>首页</a><span>/</span>AI产品
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI产品</h1>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>国内外最佳人工智能产品和服务</p>

        {/* Category + Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div className="cat-tabs" style={{ marginBottom: 0 }}>
            <button className={`cat-tab ${activeCat === 'all' ? 'active' : ''}`} onClick={() => setActiveCat('all')}>全部</button>
            {categories.map(cat => {
              const CatIcon = categoryIcons[cat.id];
              return (
                <button key={cat.id} className={`cat-tab ${activeCat === cat.id ? 'active' : ''}`} onClick={() => setActiveCat(cat.id)}>
                  {CatIcon && <CatIcon size={14} />} {cat.name}
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['score', 'name', 'free'].map(s => (
              <button key={s} className={`cat-tab ${sortBy === s ? 'active' : ''}`} onClick={() => setSortBy(s)} style={{ fontSize: '0.76rem' }}>
                {s === 'score' ? '评分' : s === 'name' ? '名称' : '免费优先'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: 16 }}>
          共 {sortedTools.length} 个产品
        </div>

        <div className="tool-grid">
          {sortedTools.map(tool => {
            const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
            return (
              <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="tool-card">
                <div className="tool-header">
                  <Favicon domain={tool.favicon} name={tool.name} size={34} />
                  <span className="tool-name">
                    {tool.name}
                    {['deepseek', 'doubao', 'cursor', 'chatgpt', 'kimi'].includes(tool.id) && (
                      <span className="hot-tag"><IconFire size={9} /></span>
                    )}
                  </span>
                </div>
                <div className="tool-tagline">{tool.tagline}</div>
                <div className="feature-tags">
                  {tool.features.slice(0, 3).map(f => <span key={f} className="feature-tag">{f}</span>)}
                </div>
                <div className="tool-meta">
                  <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`}>
                    {tool.pricing.free ? <><IconFree /> {tool.pricing.price}</> : <><IconPaid /> {tool.pricing.price}</>}
                  </span>
                  <span className="tool-score" style={{ color: getScoreColor(avg) }}>{avg}分</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
