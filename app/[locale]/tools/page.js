'use client';

import { useState, useMemo } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { useParams } from 'next/navigation';

/* ── 分类配置 ── */
const CATEGORIES = [
  { id: 'all',     label: '全部工具',  emoji: '🛠',  color: '#6366f1', bg: '#6366f108' },
  { id: 'social',  label: '自媒体神器', emoji: '📱',  color: '#FF2442', bg: '#FF244208' },
  { id: 'office',  label: '职场办公',  emoji: '💼',  color: '#f59e0b', bg: '#f59e0b08' },
  { id: 'pro',     label: '专业工具',  emoji: '🔧',  color: '#10b981', bg: '#10b98108' },
  { id: 'dev',     label: '开发者',   emoji: '💻',  color: '#3b82f6', bg: '#3b82f608' },
  { id: 'free',    label: '免费工具',  emoji: '🎁',  color: '#8b5cf6', bg: '#8b5cf608' },
  { id: 'basic',   label: '基础工具',  emoji: '📄',  color: '#64748b', bg: '#64748b08' },
];

/* ── 热门工具（首页推荐） ── */
const HOT_TOOLS = ['image-compress', 'pdf-merge', 'id-photo', 'xhs-writer', 'seo-title-gen', 'qr-code', 'pdf-convert', 'image-convert', 'weekly-report', 'json-formatter'];

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
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${catInfo?.color || '#6366f1'}, ${(catInfo?.color || '#6366f1')}66)`,
      }} />

      <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 图标 + 名称行 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            background: catInfo?.bg || '#6366f108',
            flexShrink: 0,
          }}>{tool.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>{tool.name}</span>
              {hot && <span style={{
                fontSize: '0.6rem', padding: '1px 6px', borderRadius: 4,
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#fff', fontWeight: 700,
              }}>🔥 HOT</span>}
            </div>
          </div>
        </div>

        {/* 描述 */}
        <p style={{
          fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5,
          margin: 0, flex: 1,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{tool.desc}</p>
      </div>

      {/* 底部标签行 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}>
        <span style={{
          fontSize: '0.72rem', fontWeight: 700,
          color: isFree ? 'var(--green)' : 'var(--accent)',
        }}>
          {isFree ? '✓ 免费无限' : '每日3次免费'}
        </span>
        <span style={{
          fontSize: '0.62rem', padding: '3px 8px', borderRadius: 6,
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
      <section style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
        padding: '48px 24px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 装饰圆 */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 900, color: '#fff',
            marginBottom: 10, letterSpacing: '-0.02em',
          }}>
            AI工具箱
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem',
            marginBottom: 28, lineHeight: 1.6,
          }}>
            {ALL_TOOLS.length}款在线工具 · {aiCount}款AI驱动 · 全部免费使用
          </p>

          {/* 搜索框 - 居中大 */}
          <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
            <span style={{
              position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
              fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)',
            }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索工具，如：图片压缩、PDF合并、小红书..."
              style={{
                width: '100%', padding: '16px 48px 16px 50px',
                borderRadius: 16, border: 'none',
                background: 'rgba(255,255,255,0.95)',
                color: '#1a1a2e', fontSize: '1rem',
                boxSizing: 'border-box', outline: 'none',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{
                position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                background: '#e2e8f0', border: 'none', color: '#64748b',
                cursor: 'pointer', fontSize: '0.72rem',
                width: 24, height: 24, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            )}
          </div>

          {/* 统计数字 */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 40,
            marginTop: 28,
          }}>
            <StatItem value={ALL_TOOLS.length} label="在线工具" color="#fff" />
            <StatItem value={aiCount} label="AI驱动" color="#fbbf24" />
            <StatItem value={freeCount} label="完全免费" color="#34d399" />
          </div>
        </div>
      </section>

      {/* ═══ 分类 Tabs ═══ */}
      <div style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', gap: 6, overflowX: 'auto',
          paddingY: 12,
        }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
                padding: '10px 18px', borderRadius: 24,
                fontSize: '0.85rem', fontWeight: 700,
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
                  fontSize: '0.68rem', opacity: 0.8, marginLeft: 4,
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--border)',
                  padding: '1px 6px', borderRadius: 8,
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ 主内容区 ═══ */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '28px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '160px 1fr 160px',
        gap: 24, alignItems: 'start',
      }}>
        {/* 左广告 */}
        <div className="ad-sidebar-left">
          <AdSlot className="ad-slot-left-list" />
        </div>

        {/* 内容 */}
        <div>
          {/* 🔥 热门推荐（仅在"全部"且无搜索时显示） */}
          {activeTab === 'all' && !searchQuery.trim() && (
            <div style={{ marginBottom: 36 }}>
              <h2 style={{
                fontSize: '1.1rem', fontWeight: 800, marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                🔥 热门工具
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 500 }}>— 最受欢迎</span>
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 16,
              }}>
                {hotToolList.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    catInfo={CATEGORIES.find(c => c.id === tool.cat)}
                    href={`/${locale}/tools/${tool.id}`}
                    hot
                  />
                ))}
              </div>
            </div>
          )}

          {/* 分类工具列表 */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{
              fontSize: '1.1rem', fontWeight: 800, marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              {searchQuery.trim() ? `🔍 搜索"${searchQuery}"` : CATEGORIES.find(c => c.id === activeTab)?.emoji + ' ' + CATEGORIES.find(c => c.id === activeTab)?.label}
              <span style={{ fontSize: '0.82rem', color: 'var(--text3)', fontWeight: 500 }}>
                · {filteredTools.length}款
              </span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 20px', color: 'var(--text3)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>未找到匹配的工具</div>
              <div style={{ fontSize: '0.88rem' }}>试试换个关键词？</div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}>
              {filteredTools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  catInfo={CATEGORIES.find(c => c.id === tool.cat)}
                  href={`/${locale}/tools/${tool.id}`}
                />
              ))}
            </div>
          )}

          {/* 列表底部广告 */}
          <div className="ad-slot-list" style={{
            marginTop: 32, minHeight: 90, borderRadius: 12,
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text3)', fontSize: '0.72rem',
          }}>广告位</div>
        </div>

        {/* 右广告 */}
        <div className="ad-sidebar-right">
          <AdSlot className="ad-slot-right-list" />
        </div>
      </div>

      {/* ═══ 响应式 ═══ */}
      <style>{`
        @media (max-width: 900px) {
          .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── 统计数字组件 ── */
function StatItem({ value, label, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '2rem', fontWeight: 900, color,
        lineHeight: 1.2,
      }}>{value}</div>
      <div style={{
        fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)',
        fontWeight: 600, marginTop: 2,
      }}>{label}</div>
    </div>
  );
}
