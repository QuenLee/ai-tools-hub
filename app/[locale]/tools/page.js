'use client';
import { useState } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { useParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'all', label: '全部工具', emoji: '🛠', color: '#6366f1' },
  { id: 'social', label: '自媒体神器', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '职场办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业工具', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发者', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '免费工具', emoji: '🎁', color: '#8b5cf6' },
  { id: 'basic', label: '基础工具', emoji: '📄', color: '#64748b' },
];

function AdSlot({ className }) {
  return (
    <div className={className} style={{
      minHeight: 250, borderRadius: 10, border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text3)', fontSize: '0.68rem', position: 'sticky', top: 70,
    }}>广告位</div>
  );
}

function ToolCard({ tool, catInfo, href }) {
  const isFree = tool.price === '免费' || !tool.apiTool;
  return (
    <a href={href} style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14,
      padding: '18px', textDecoration: 'none', color: 'inherit', display: 'block',
      position: 'relative', overflow: 'hidden', transition: 'all 0.25s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08)`;
      e.currentTarget.style.borderColor = (catInfo?.color || '#6366f1') + '44';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'var(--border)';
    }}>
      {/* Color strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${catInfo?.color || '#6366f1'}, ${(catInfo?.color || '#6366f1')}88)` }} />
      {/* Icon + Text */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: `${catInfo?.color || '#6366f1'}10`, flexShrink: 0 }}>{tool.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: '0.96rem' }}>{tool.name}</span>
            {tool.apiTool && <span style={{ fontSize: '0.58rem', padding: '1px 6px', borderRadius: 4, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700 }}>AI</span>}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{tool.desc}</div>
        </div>
      </div>
      {/* Price row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>{isFree ? '✓ 免费无限' : '每日3次免费'}</span>
        <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: isFree ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)', color: isFree ? 'var(--green)' : 'var(--accent)', fontWeight: 600 }}>{isFree ? '✓ 免费' : 'AI驱动'}</span>
      </div>
    </a>
  );
}

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = (() => {
    let tools = activeTab === 'all' ? ALL_TOOLS : ALL_TOOLS.filter(t => t.cat === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      tools = tools.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
    }
    return tools;
  })();

  const aiCount = ALL_TOOLS.filter(t => t.apiTool).length;
  const freeCount = ALL_TOOLS.filter(t => t.price === '免费' || !t.apiTool).length;

  return (
    <div style={{ padding: '24px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI工具箱</h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginBottom: 20 }}>{ALL_TOOLS.length}款在线工具 · {aiCount}款AI驱动 · 全部免费</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)' }}>{ALL_TOOLS.length}</div><div style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600 }}>在线工具</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>{aiCount}</div><div style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600 }}>AI驱动</div></div>
            <div style={{ textAlign: 'center' }}><div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b' }}>{freeCount}</div><div style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600 }}>完全免费</div></div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)', padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
          <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text3)' }}>🔍</span>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={`搜索${ALL_TOOLS.length}款工具...`}
              style={{ width: '100%', padding: '12px 40px 12px 42px', borderRadius: 24, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.92rem', boxSizing: 'border-box', outline: 'none' }} />
            {searchQuery && <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'var(--border)', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.72rem', width: 20, height: 20, borderRadius: '50%' }}>✕</button>}
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                style={{ padding: '8px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', border: isActive ? 'none' : '1px solid var(--border)', background: isActive ? cat.color : 'transparent', color: isActive ? '#fff' : 'var(--text2)', boxShadow: isActive ? `0 2px 8px ${cat.color}33` : 'none' }}>
                {cat.emoji} {cat.label} <span style={{ fontSize: '0.68rem', opacity: 0.8, marginLeft: 2 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* 3-column layout: ad | content | ad */}
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 160px', gap: 20, alignItems: 'start' }}>
          <div className="ad-sidebar-left"><AdSlot className="ad-slot-left-list" /></div>

          <div>
            {filteredTools.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>未找到匹配的工具</div>
                <div style={{ fontSize: '0.82rem' }}>试试换个关键词？</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} catInfo={CATEGORIES.find(c => c.id === tool.cat)} href={`/${locale}/tools/${tool.id}`} />
                ))}
              </div>
            )}
            <div className="ad-slot-list" style={{ marginTop: 32, minHeight: 90, borderRadius: 10, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: '0.72rem' }}>广告位</div>
          </div>

          <div className="ad-sidebar-right"><AdSlot className="ad-slot-right-list" /></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
          div[style*="grid-template-columns: 160px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
