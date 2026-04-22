'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Favicon from '@/components/Favicon';
import { IconFree, IconPaid, IconFire, IconGift, categoryIcons } from '@/components/icons/Icons';

// 优惠推荐产品数据
const promoTools = [
  { id: 'tongyi', name: '通义千问', domain: 'tongyi.aliyun.com', promo: 'API送100万tokens', affiliate: 'https://www.aliyun.com/minisite/goods?userCode=j1oznb9i', desc: '阿里百炼新用户送100万tokens免费额度，6个月有效，开发者首选' },
  { id: 'huiwa', name: '绘蛙', domain: 'huiwa.com', promo: '阿里云专属优惠', affiliate: 'https://www.aliyun.com/minisite/goods?userCode=j1oznb9i', desc: 'AI模特图+商品图，推广链接注册享专属折扣' },
  { id: 'notion-ai', name: 'Notion AI', domain: 'notion.so', promo: '首月优惠', affiliate: 'https://ntn.so/aitools', desc: 'Notion AI写作助手，评测链接注册享首月优惠' },
];

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

        {/* 优惠推荐横幅 */}
        <div style={{
          marginBottom: 24, padding: '18px 22px', borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(135deg, rgba(52,211,153,0.08), rgba(34,211,238,0.08))',
          border: '1px solid rgba(52,211,153,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <IconGift size={18} style={{ color: 'var(--green)' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>优惠推荐</h2>
            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(52,211,153,0.15)', color: 'var(--green)', fontWeight: 600 }}>限时</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {promoTools.map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}>
                <Favicon domain={item.domain} name={item.name} size={28} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.name}
                    <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: 4, background: 'rgba(52,211,153,0.1)', color: 'var(--green)', fontWeight: 600 }} title={item.desc}>{item.promo}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</div>
                </div>
                <a href={item.affiliate} target="_blank" rel="noopener noreferrer" style={{
                  padding: '4px 10px', borderRadius: 'var(--radius-2xs)', background: 'var(--green)',
                  color: '#fff', fontSize: '0.68rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap',
                }}>优惠访问</a>
              </div>
            ))}
          </div>
        </div>

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

        <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: 16 }}>共 {sortedTools.length} 个产品</div>

        {/* 产品标记有推广的也显示标识 */}
        <div className="tool-grid">
          {sortedTools.map(tool => {
            const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
            return (
              <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="tool-card" style={{ position: 'relative' }}>
                {tool.affiliate && (
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    fontSize: '0.6rem', padding: '1px 6px', borderRadius: 4,
                    background: 'rgba(52,211,153,0.1)', color: 'var(--green)', fontWeight: 600,
                  }}>优惠</div>
                )}
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
