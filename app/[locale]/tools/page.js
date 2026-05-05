'use client';
import { useState, useMemo, useEffect } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { useParams } from 'next/navigation';
import { getFavorites, getRecent } from '@/lib/user-data';

/* ── 分类配置 ── */
const CATEGORIES = [
  { id: 'all', label: '全部', emoji: '✨', color: '#6366f1' },
  { id: 'social', label: '自媒体', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '热搜', emoji: '🎁', color: '#8b5cf6' },
];

/* ── 热门工具 ── */
const HOT_TOOLS = [
  'image-compress', 'pdf-merge', 'id-photo', 'xhs-writer', 'image-crop',
  'image-watermark', 'pdf-convert', 'image-convert', 'qr-code', 'pdf-split',
];

/* ── 分类配色 ── */
const catColors = {
  social: { light: 'rgba(255,36,66,0.08)', text: '#FF2442' },
  office: { light: 'rgba(245,158,11,0.08)', text: '#f59e0b' },
  pro:    { light: 'rgba(16,185,129,0.08)', text: '#10b981' },
  dev:    { light: 'rgba(59,130,246,0.08)', text: '#3b82f6' },
  free:   { light: 'rgba(139,92,246,0.08)', text: '#8b5cf6' },
};

/* ── 工具卡片 ── */
function ToolCard({ tool, href, hot }) {
  const isLocal = !tool.apiTool;
  const cc = catColors[tool.cat] || catColors.free;
  return (
    <a href={href} className="tool-card">
      <div className="tc-icon-wrap" style={{ background: cc.light }}>
        <span className="tc-icon-emoji">{tool.icon}</span>
      </div>
      <div className="tc-body">
        <div className="tc-name-row">
          <span className="tc-name">{tool.name}</span>
          {hot && <span className="tc-badge-hot">🔥</span>}
        </div>
        <p className="tc-desc">{tool.desc}</p>
      </div>
      <div className="tc-tags">
        <span className="tc-tag-type" style={{ color: cc.text, background: cc.light }}>
          {isLocal ? '⚡ 本地' : '🤖 AI'}
        </span>
        <span className="tc-tag-free">
          {isLocal ? '免费无限' : '3次/天'}
        </span>
      </div>
    </a>
  );
}

/* ── 迷你卡片（最近使用/收藏用） ── */
function MiniToolCard({ tool, href }) {
  return (
    <a href={href} className="mini-tool-card">
      <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
      <span className="mini-name">{tool.name}</span>
    </a>
  );
}

/* ── 主页面 ── */
export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [personalTools, setPersonalTools] = useState({ favorites: [], recent: [] });

  // 加载用户个人数据
  useEffect(() => {
    const favIds = getFavorites();
    const recentIds = getRecent();
    setPersonalTools({
      favorites: favIds.map(id => ALL_TOOLS.find(t => t.id === id)).filter(Boolean),
      recent: recentIds.map(id => ALL_TOOLS.find(t => t.id === id)).filter(Boolean),
    });
  }, []);

  const aiCount = ALL_TOOLS.filter(t => t.apiTool).length;

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

  const groupedTools = useMemo(() => {
    if (activeTab !== 'all') return [{ cat: activeTab, tools: filteredTools }];
    const groups = [];
    for (const cat of CATEGORIES) {
      if (cat.id === 'all') continue;
      const catTools = filteredTools.filter(t => t.cat === cat.id);
      if (catTools.length) groups.push({ cat: cat.id, tools: catTools });
    }
    return groups;
  }, [activeTab, filteredTools]);

  const hasPersonal = personalTools.favorites.length > 0 || personalTools.recent.length > 0;

  return (
    <div className="tools-page">
      {/* Hero */}
      <section className="tools-hero">
        <div className="hero-inner">
          <div className="hero-brand">
            <span className="hero-logo">⚔️</span>
            <h1 className="hero-title">AI工具箱</h1>
          </div>
          <div className="hero-stats">
            <span className="hs-item"><b>{ALL_TOOLS.length}</b>款工具</span>
            <span className="hs-dot">·</span>
            <span className="hs-item"><b>{aiCount}</b>款AI驱动</span>
            <span className="hs-dot">·</span>
            <span className="hs-item hs-free">全部免费</span>
          </div>
          <div className="hero-search-wrap">
            <svg className="hs-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索工具名称或功能…"
              className="hero-search-input"
            />
            {searchQuery && <button className="hs-clear" onClick={() => setSearchQuery('')}>✕</button>}
          </div>
        </div>
      </section>

      {/* 分类 Tabs */}
      <div className="tabs-bar">
        <div className="tabs-inner">
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`cat-tab ${isActive ? 'active' : ''}`}
                data-cat={cat.id}
              >
                {cat.emoji} {cat.label}
                <span className="cat-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 主内容 */}
      <main className="tools-main">
        {/* 个人区（仅全部+无搜索词+有数据时） */}
        {activeTab === 'all' && !searchQuery.trim() && hasPersonal && (
          <section className="tools-section personal-section">
            {personalTools.recent.length > 0 && (
              <div className="personal-row">
                <h3 className="personal-label">🕐 最近使用</h3>
                <div className="mini-grid">
                  {personalTools.recent.slice(0, 8).map(tool => (
                    <MiniToolCard key={tool.id} tool={tool} href={`/${locale}/tools/${tool.id}`} />
                  ))}
                </div>
              </div>
            )}
            {personalTools.favorites.length > 0 && (
              <div className="personal-row">
                <h3 className="personal-label">❤️ 我的收藏</h3>
                <div className="mini-grid">
                  {personalTools.favorites.slice(0, 8).map(tool => (
                    <MiniToolCard key={tool.id} tool={tool} href={`/${locale}/tools/${tool.id}`} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 热门推荐 */}
        {activeTab === 'all' && !searchQuery.trim() && (
          <section className="tools-section">
            <div className="sec-head">
              <h2 className="sec-title">🔥 热门工具</h2>
            </div>
            <div className="hot-grid">
              {hotToolList.map(tool => (
                <ToolCard key={tool.id} tool={tool} href={`/${locale}/tools/${tool.id}`} hot />
              ))}
            </div>
          </section>
        )}

        {/* 分类工具列表 */}
        {activeTab === 'all' && !searchQuery.trim() ? groupedTools.map(group => {
          const catInfo = CATEGORIES.find(c => c.id === group.cat);
          return (
            <section key={group.cat} className="tools-section">
              <div className="sec-head">
                <h2 className="sec-title">{catInfo?.emoji} {catInfo?.label}</h2>
                <span className="sec-count">{group.tools.length}</span>
              </div>
              <div className="tools-grid">
                {group.tools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} href={`/${locale}/tools/${tool.id}`} />
                ))}
              </div>
            </section>
          );
        }) : (
          <section className="tools-section">
            <div className="sec-head">
              <h2 className="sec-title">
                {searchQuery.trim()
                  ? `🔍 "${searchQuery}" 的搜索结果`
                  : `${CATEGORIES.find(c => c.id === activeTab)?.emoji} ${CATEGORIES.find(c => c.id === activeTab)?.label}`
                }
              </h2>
              <span className="sec-count">{filteredTools.length}</span>
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
                  <ToolCard key={tool.id} tool={tool} href={`/${locale}/tools/${tool.id}`} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
