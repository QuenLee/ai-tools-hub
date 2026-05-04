'use client';

import { useState, useMemo } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { useParams } from 'next/navigation';

/* ── 分类配置 ── */
const CATEGORIES = [
  { id: 'all', label: '全部', emoji: '🛠', color: '#6366f1', bg: '#6366f108' },
  { id: 'social', label: '自媒体', emoji: '📱', color: '#FF2442', bg: '#FF244208' },
  { id: 'office', label: '办公', emoji: '💼', color: '#f59e0b', bg: '#f59e0b08' },
  { id: 'pro', label: '专业', emoji: '🔧', color: '#10b981', bg: '#10b98108' },
  { id: 'dev', label: '开发', emoji: '💻', color: '#3b82f6', bg: '#3b82f608' },
  { id: 'free', label: '热搜工具', emoji: '🎁', color: '#8b5cf6', bg: '#8b5cf608' },
];

/* ── 热门工具（首页推荐） ── */
const HOT_TOOLS = ['image-compress', 'pdf-merge', 'id-photo', 'xhs-writer', 'image-crop', 'image-watermark', 'pdf-convert', 'image-convert', 'qr-code', 'pdf-split'];

/* ── 工具卡片 ── */
function ToolCard({ tool, catInfo, href, hot }) {
  const isFree = tool.price === '免费' || !tool.apiTool;
  return (
    <a href={href} className="tool-card" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 0,
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
      e.currentTarget.style.borderColor = catInfo?.color || '#6366f1';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'var(--border)';
    }}>
      {/* 顶部色条 */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${catInfo?.color || '#6366f1'}, ${(catInfo?.color || '#6366f1')}66)` }} />

      <div style={{ padding: '16px 16px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 图标 + 名称行 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem',
            background: catInfo?.bg || '#6366f108',
            flexShrink: 0,
          }}>{tool.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span className="tool-name" style={{ fontWeight: 800, fontSize: '0.95rem' }}>{tool.name}</span>
              {hot && <span style={{ fontSize: '0.55rem', padding: '1px 5px', borderRadius: 4, background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', color: '#fff', fontWeight: 700 }}>🔥 HOT</span>}
            </div>
          </div>
        </div>

        {/* 描述 */}
        <p style={{
          fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5,
          margin: 0, flex: 1,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{tool.desc}</p>
      </div>

      {/* 底部标签行 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 16px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isFree ? 'var(--green)' : 'var(--accent)' }}>
          {isFree ? '✓ 免费无限' : '每日3次免费'}
        </span>
        <span style={{
          fontSize: '0.58rem', padding: '2px 7px', borderRadius: 6,
          background: isFree ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)',
          color: isFree ? 'var(--green)' : 'var(--accent)',
          fontWeight: 700,
        }}>
          {tool.apiTool ? '🤖 AI驱动' : '⚡ 本地'}
        </span>
      </div>
    </a>
  );
}

/* ── 广告位 ── */
function AdSlot({ className, style }) {
  return (
    <div className={className} style={{
      minHeight: 250, borderRadius: 12,
      border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text3)', fontSize: '0.68rem',
      position: 'sticky', top: 80,
      ...style,
    }}>广告位</div>
  );
}

/* ── 主页面 ── */
export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const aiCount = ALL_TOOLS.filter(t => t.apiTool).length;
  const freeCount = ALL_TOOLS.filter(t => t.price === '免费' || !t.apiTool).length;

  const filteredTools = useMemo(() => {
    let tools = activeTab === 'all' ? ALL_TOOLS : ALL_TOOLS.filter(t => t.cat === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    }
    return tools;
  }, [activeTab, searchQuery]);

  const hotToolList = useMemo(() =>
    HOT_TOOLS.map(id => ALL_TOOLS.find(t => t.id === id)).filter(Boolean),
  []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ═══ Hero Section ═══ */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
        padding: '36px 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 装饰圆 */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <h1 className="hero-title" style={{
            fontSize: '2.4rem', fontWeight: 900, color: '#fff',
            marginBottom: 8, letterSpacing: '-0.02em',
          }}>AI工具箱</h1>
          <p className="hero-subtitle" style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem',
            marginBottom: 24, lineHeight: 1.6,
          }}>
            {ALL_TOOLS.length}款在线工具 · {aiCount}款AI驱动 · 全部免费使用
          </p>

          {/* 搜索框 */}
          <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索工具..."
              className="hero-search"
              style={{
                width: '100%', padding: '14px 44px 14px 44px',
                borderRadius: 14, border: 'none',
                background: 'rgba(255,255,255,0.95)',
                color: '#1a1a2e', fontSize: '0.95rem',
                boxSizing: 'border-box', outline: 'none',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: '#e2e8f0', border: 'none', color: '#64748b',
                cursor: 'pointer', fontSize: '0.72rem',
                width: 24, height: 24, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            )}
          </div>

          {/* 统计数字 */}
          <div className="hero-stats" style={{
            display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24,
          }}>
            <StatItem value={ALL_TOOLS.length} label="在线工具" color="#fff" />
            <StatItem value={aiCount} label="AI驱动" color="#fbbf24" />
            <StatItem value={freeCount} label="完全免费" color="#34d399" />
          </div>
        </div>
      </section>

      {/* ═══ 分类 Tabs ═══ */}
      <div className="tabs-bar" style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div className="tabs-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '10px 16px',
          display: 'flex', gap: 6, overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
                padding: '8px 14px', borderRadius: 20,
                fontSize: '0.82rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                border: isActive ? 'none' : '1px solid var(--border)',
                background: isActive ? cat.color : 'transparent',
                color: isActive ? '#fff' : 'var(--text2)',
                boxShadow: isActive ? `0 4px 12px ${cat.color}33` : 'none',
                flexShrink: 0,
              }}>
                {cat.emoji} {cat.label}
                <span style={{
                  fontSize: '0.65rem', opacity: 0.8, marginLeft: 3,
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                  padding: '1px 5px', borderRadius: 8,
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ 主内容区 ═══ */}
      <div className="content-grid" style={{
        maxWidth: 1200, margin: '0 auto', padding: '24px 16px 80px',
        display: 'grid',
        gridTemplateColumns: '160px 1fr 160px',
        gap: 24, alignItems: 'start',
      }}>
        {/* 左广告 */}
        <div className="ad-sidebar-left"><AdSlot className="ad-slot-left-list" /></div>

        {/* 内容 */}
        <div>
          {/* 🔥 热门推荐 */}
          {activeTab === 'all' && !searchQuery.trim() && (
            <div style={{ marginBottom: 32 }}>
              <h2 className="section-title" style={{
                fontSize: '1.05rem', fontWeight: 800, marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                🔥 热门工具
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 500 }}>— 最受欢迎</span>
              </h2>
              <div className="tools-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 14,
              }}>
                {hotToolList.map(tool => (
                  <ToolCard key={tool.id} tool={tool} catInfo={CATEGORIES.find(c => c.id === tool.cat)} href={`/${locale}/tools/${tool.id}`} hot />
                ))}
              </div>
            </div>
          )}

          {/* 分类工具列表 */}
          <div style={{ marginBottom: 8 }}>
            <h2 className="section-title" style={{
              fontSize: '1.05rem', fontWeight: 800, marginBottom: 14,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {searchQuery.trim() ? `🔍 搜索"${searchQuery}"` : CATEGORIES.find(c => c.id === activeTab)?.emoji + ' ' + CATEGORIES.find(c => c.id === activeTab)?.label}
              <span style={{ fontSize: '0.82rem', color: 'var(--text3)', fontWeight: 500 }}> · {filteredTools.length}款</span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
              <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>未找到匹配的工具</div>
              <div style={{ fontSize: '0.85rem' }}>试试换个关键词？</div>
            </div>
          ) : (
            <div className="tools-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 14,
            }}>
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} catInfo={CATEGORIES.find(c => c.id === tool.cat)} href={`/${locale}/tools/${tool.id}`} />
              ))}
            </div>
          )}

          {/* 列表底部广告 */}
          <div className="ad-slot-list" style={{
            marginTop: 28, minHeight: 90, borderRadius: 12,
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text3)', fontSize: '0.72rem',
          }}>广告位</div>
        </div>

        {/* 右广告 */}
        <div className="ad-sidebar-right"><AdSlot className="ad-slot-right-list" /></div>
      </div>

      {/* ═══ 响应式 CSS ═══ */}
      <style>{`
        /* 隐藏tab横向滚动条 */
        .tabs-inner::-webkit-scrollbar { display: none; }
        .tabs-inner { -ms-overflow-style: none; scrollbar-width: none; }

        /* 平板 ≤900px */
        @media (max-width: 900px) {
          .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
          .content-grid { grid-template-columns: 1fr !important; }
        }

        /* 手机 ≤640px */
        @media (max-width: 640px) {
          .hero-section { padding: 28px 16px 32px !important; }
          .hero-title { font-size: 1.6rem !important; margin-bottom: 6px !important; }
          .hero-subtitle { font-size: 0.85rem !important; margin-bottom: 18px !important; }
          .hero-search { padding: 12px 36px 12px 38px !important; font-size: 0.88rem !important; border-radius: 12px !important; }
          .hero-stats { gap: 24 !important; margin-top: 18px !important; }
          .hero-stats > div > div:first-child { font-size: 1.5rem !important; }
          .hero-stats > div > div:last-child { font-size: 0.68rem !important; }
          .tabs-inner { padding: 8px 12px !important; gap: 4px !important; }
          .tabs-inner button { padding: 7px 12px !important; font-size: 0.76rem !important; }
          .content-grid { padding: 16px 12px 60px !important; }
          .tools-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .section-title { font-size: 0.95rem !important; margin-bottom: 10px !important; }
          .tool-card .tool-name { font-size: 0.88rem !important; }
        }

        /* 极小屏 ≤380px */
        @media (max-width: 380px) {
          .hero-title { font-size: 1.3rem !important; }
          .hero-stats { gap: 16px !important; }
          .tools-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 统计数字组件 ── */
function StatItem({ value, label, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', fontWeight: 900, color, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
}
