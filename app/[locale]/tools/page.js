'use client';
import { useState, useMemo } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { useParams } from 'next/navigation';

/* ── 分类配置 ── */
const CATEGORIES = [
  { id: 'all', label: '全部工具', emoji: '🛠', color: '#6366f1' },
  { id: 'social', label: '自媒体', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '热搜工具', emoji: '🎁', color: '#8b5cf6' },
];

/* ── 热门工具 ── */
const HOT_TOOLS = [
  'image-compress', 'pdf-merge', 'id-photo', 'xhs-writer',
  'image-crop', 'image-watermark', 'pdf-convert', 'image-convert',
  'qr-code', 'pdf-split'
];

/* ── 分类图标背景色 ── */
const catGradients = {
  social: 'linear-gradient(135deg, #FF2442, #ff6b81)',
  office: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  pro: 'linear-gradient(135deg, #10b981, #34d399)',
  dev: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  free: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
};

/* ── 工具卡片 ── */
function ToolCard({ tool, href, hot }) {
  const isFree = tool.price === '免费' || !tool.apiTool;
  const gradient = catGradients[tool.cat] || 'linear-gradient(135deg, #6366f1, #818cf8)';

  return (
    <a href={href} className="tool-card">
      {/* Icon + Info */}
      <div className="tc-top">
        <div className="tc-icon" style={{ background: gradient }}>
          <span>{tool.icon}</span>
        </div>
        <div className="tc-info">
          <div className="tc-name">
            {tool.name}
            {hot && <span className="tc-hot">HOT</span>}
          </div>
          <div className="tc-desc">{tool.desc}</div>
        </div>
      </div>
      {/* Footer tags */}
      <div className="tc-bottom">
        <span className={`tc-price ${isFree ? 'free' : 'ai'}`}>
          {isFree ? '✓ 免费无限' : '🤖 AI驱动'}
        </span>
        <span className="tc-cat">
          {CATEGORIES.find(c => c.id === tool.cat)?.label || ''}
        </span>
      </div>
    </a>
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

  const hotToolList = useMemo(
    () => HOT_TOOLS.map(id => ALL_TOOLS.find(t => t.id === id)).filter(Boolean),
    []
  );

  return (
    <div className="tools-page">
      {/* ═══ Hero: 简洁紧凑 ═══ */}
      <section className="tools-hero">
        <div className="hero-inner">
          <h1 className="hero-title">AI工具箱</h1>
          <p className="hero-sub">
            <strong>{ALL_TOOLS.length}</strong> 款工具 · <strong>{aiCount}</strong> 款AI驱动 · 全部免费
          </p>
          {/* 搜索框 */}
          <div className="hero-search-wrap">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索工具名称或功能…"
              className="hero-search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 分类 Tabs ═══ */}
      <div className="tabs-bar">
        <div className="tabs-inner">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all'
              ? ALL_TOOLS.length
              : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`cat-tab ${isActive ? 'active' : ''}`}
                style={isActive ? { '--cat-color': cat.color } : {}}
              >
                <span className="cat-emoji">{cat.emoji}</span>
                {cat.label}
                <span className="cat-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ 主内容区（单栏满宽） ═══ */}
      <main className="tools-main">
        {/* 🔥 热门推荐 */}
        {activeTab === 'all' && !searchQuery.trim() && (
          <section className="tools-section">
            <div className="section-head">
              <h2 className="section-title">🔥 热门工具</h2>
              <span className="section-note">最受欢迎</span>
            </div>
            <div className="tools-grid">
              {hotToolList.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  href={`/${locale}/tools/${tool.id}`}
                  hot
                />
              ))}
            </div>
          </section>
        )}

        {/* 分类工具列表 */}
        <section className="tools-section">
          <div className="section-head">
            <h2 className="section-title">
              {searchQuery.trim()
                ? `🔍 搜索"${searchQuery}"`
                : `${CATEGORIES.find(c => c.id === activeTab)?.emoji} ${CATEGORIES.find(c => c.id === activeTab)?.label}`
              }
            </h2>
            <span className="section-note">{filteredTools.length} 款</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">未找到匹配的工具</div>
              <div className="empty-hint">试试换个关键词？</div>
            </div>
          ) : (
            <div className="tools-grid">
              {filteredTools.map(tool => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  href={`/${locale}/tools/${tool.id}`}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
