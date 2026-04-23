'use client';
import { useState, useEffect } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { TOOL_CONFIGS } from '@/lib/tool-configs';
import { useParams } from 'next/navigation';

// AI驱动工具通用组件
import { AITool } from '@/components/tools/AITool';

// 基础工具组件
import { AIWatermarkRemover } from '@/components/tools/AIWatermarkRemover';
import { ShortURLGenerator } from '@/components/tools/ShortURLGenerator';
import { PromptTemplates } from '@/components/tools/PromptTemplates';
import { PDFConverter } from '@/components/tools/PDFConverter';
import { ImageConverter } from '@/components/tools/ImageConverter';
import { MarkdownEditor } from '@/components/tools/MarkdownEditor';

// 开发者工具
import { JSONFormatter, JSONToYAML, Base64Tool, URLEncode } from '@/components/tools/dev/DevTools1';
import { HashGen, RegexTester, TimestampTool, UUIDGen, ColorTool, TextDiff, JWTParser, QRCode } from '@/components/tools/dev/DevTools2';

// 免费粘性工具
import { WordCount, TextReplace, LoremIpsum, SlugGen, MarkdownPreview, EmojiPicker, PasswordGen, HtmlEntity } from '@/components/tools/free/FreeTools';

// AI工具动态包装器
function AIToolWrapper({ toolId, onBack, locale }) {
  const config = TOOL_CONFIGS[toolId];
  if (!config) return <div style={{padding:40, textAlign:'center', color:'var(--text3)'}}>工具配置未找到</div>;
  return <AITool config={config} onBack={onBack} locale={locale} toolId={toolId} />;
}

const TOOL_COMPONENTS = {
  // 📱 自媒体
  'xhs-writer': (props) => <AIToolWrapper toolId="xhs-writer" {...props} />,
  'douyin-script': (props) => <AIToolWrapper toolId="douyin-script" {...props} />,
  'live-script': (props) => <AIToolWrapper toolId="live-script" {...props} />,
  'comment-reply': (props) => <AIToolWrapper toolId="comment-reply" {...props} />,
  'wechat-article': (props) => <AIToolWrapper toolId="wechat-article" {...props} />,
  'bili-script': (props) => <AIToolWrapper toolId="bili-script" {...props} />,
  'private-domain': (props) => <AIToolWrapper toolId="private-domain" {...props} />,
  // 💼 职场办公
  'weekly-report': (props) => <AIToolWrapper toolId="weekly-report" {...props} />,
  'meeting-notes': (props) => <AIToolWrapper toolId="meeting-notes" {...props} />,
  'email-writer': (props) => <AIToolWrapper toolId="email-writer" {...props} />,
  'ppt-outline': (props) => <AIToolWrapper toolId="ppt-outline" {...props} />,
  'speech-writer': (props) => <AIToolWrapper toolId="speech-writer" {...props} />,
  'excel-formula': (props) => <AIToolWrapper toolId="excel-formula" {...props} />,
  'competitor-analysis': (props) => <AIToolWrapper toolId="competitor-analysis" {...props} />,
  // 🔧 专业工具
  'seo-article': (props) => <AIToolWrapper toolId="seo-article" {...props} />,
  'product-desc': (props) => <AIToolWrapper toolId="product-desc" {...props} />,
  'ad-copy': (props) => <AIToolWrapper toolId="ad-copy" {...props} />,
  'contract-review': (props) => <AIToolWrapper toolId="contract-review" {...props} />,
  'data-analysis': (props) => <AIToolWrapper toolId="data-analysis" {...props} />,
  'interview-prep': (props) => <AIToolWrapper toolId="interview-prep" {...props} />,
  'blog-writer': (props) => <AIToolWrapper toolId="blog-writer" {...props} />,
  'summary-gen': (props) => <AIToolWrapper toolId="summary-gen" {...props} />,
  'story-gen': (props) => <AIToolWrapper toolId="story-gen" {...props} />,
  'study-plan': (props) => <AIToolWrapper toolId="study-plan" {...props} />,
  'brainstorm': (props) => <AIToolWrapper toolId="brainstorm" {...props} />,
  'translate-polish': (props) => <AIToolWrapper toolId="translate-polish" {...props} />,
  'name-gen': (props) => <AIToolWrapper toolId="name-gen" {...props} />,
  'api-doc': (props) => <AIToolWrapper toolId="api-doc" {...props} />,
  // 💻 开发者工具
  'json-formatter': JSONFormatter,
  'json-to-yaml': JSONToYAML,
  'base64-tool': Base64Tool,
  'url-encode': URLEncode,
  'hash-gen': HashGen,
  'regex-tester': RegexTester,
  'timestamp-tool': TimestampTool,
  'uuid-gen': UUIDGen,
  'color-tool': ColorTool,
  'text-diff': TextDiff,
  'jwt-parser': JWTParser,
  'qr-code': QRCode,
  // 🎁 免费粘性工具
  'word-count': WordCount,
  'text-replace': TextReplace,
  'lorem-ipsum': LoremIpsum,
  'slug-gen': SlugGen,
  'markdown-preview': MarkdownPreview,
  'emoji-picker': EmojiPicker,
  'password-gen': PasswordGen,
  'html-entity': HtmlEntity,
  // 📄 基础工具
  'ai-text-detect': (props) => <AIToolWrapper toolId="ai-text-detect" {...props} />,
  'ai-watermark': AIWatermarkRemover,
  'short-url': ShortURLGenerator,
  'ai-translate': (props) => <AIToolWrapper toolId="ai-translate" {...props} />,
  'ai-resume': (props) => <AIToolWrapper toolId="ai-resume" {...props} />,
  'prompt-templates': PromptTemplates,
  'ai-code-review': (props) => <AIToolWrapper toolId="ai-code-review" {...props} />,
  'seo-title-gen': (props) => <AIToolWrapper toolId="seo-title-gen" {...props} />,
  'pdf-convert': PDFConverter,
  'ai-copywriter': (props) => <AIToolWrapper toolId="ai-copywriter" {...props} />,
  'image-convert': ImageConverter,
  'markdown-editor': MarkdownEditor,
};

const CATEGORIES = [
  { id: 'all', label: '全部工具', emoji: '🛠', color: '#6366f1' },
  { id: 'social', label: '自媒体神器', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '职场办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业工具', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发者', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '免费工具', emoji: '🎁', color: '#8b5cf6' },
  { id: 'basic', label: '基础工具', emoji: '📄', color: '#64748b' },
];

function getFreeLimitText(tool) {
  if (tool.price === '免费' || !tool.apiTool) return '✓ 免费无限';
  return '每日3次免费';
}

// Ad sidebar component
function AdSidebar({ position }) {
  return (
    <div className={`ad-slot-${position}`} style={{
      width: '100%',
      minHeight: 250,
      borderRadius: 10,
      border: '1px dashed var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text3)',
      fontSize: '0.68rem',
      position: 'sticky',
      top: 70,
    }}>
      广告位
    </div>
  );
}

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [activeTool, setActiveTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tp = params.get('tool');
      if (tp && TOOL_COMPONENTS[tp]) setActiveTool(tp);
    }
  }, []);

  // Update URL when tool changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location);
      if (activeTool) {
        url.searchParams.set('tool', activeTool);
      } else {
        url.searchParams.delete('tool');
      }
      window.history.replaceState({}, '', url);
    }
  }, [activeTool]);

  const filteredTools = (() => {
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
  })();

  // ========== Tool detail page ==========
  if (activeTool) {
    const ToolComponent = TOOL_COMPONENTS[activeTool];
    const toolInfo = ALL_TOOLS.find(t => t.id === activeTool);
    const catInfo = CATEGORIES.find(c => c.id === toolInfo?.cat);

    if (ToolComponent) return (
      <div style={{ padding: '24px 0 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* 3-column layout: left ad | tool | right ad */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 160px', gap: 20, alignItems: 'start' }}>

            {/* Left ad sidebar — desktop only */}
            <div style={{ position: 'sticky', top: 70 }} className="ad-sidebar-left">
              <AdSidebar position="left" />
            </div>

            {/* Main tool content */}
            <div>
              {/* Back button + Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: '0.82rem', color: 'var(--text3)' }}>
                <button onClick={() => { setActiveTool(null); window.scrollTo(0, 0); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ← 返回工具箱
                </button>
                <span style={{ color: 'var(--text3)' }}>›</span>
                {catInfo && <span style={{ color: catInfo.color }}>{catInfo.label}</span>}
                <span style={{ color: 'var(--text3)' }}>›</span>
                <span style={{ color: 'var(--text)' }}>{toolInfo?.name}</span>
              </div>

              {/* Tool header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '16px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '2rem' }}>{toolInfo?.icon}</span>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{toolInfo?.name}</h1>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text2)', margin: '2px 0 0' }}>{toolInfo?.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {toolInfo?.apiTool && <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700 }}>🤖 AI驱动</span>}
                  <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.1)', color: 'var(--green)', fontWeight: 700 }}>
                    {toolInfo?.price === '免费' || !toolInfo?.apiTool ? '✓ 免费' : '每日免费'}
                  </span>
                </div>
              </div>

              <ToolComponent onBack={() => { setActiveTool(null); window.scrollTo(0, 0); }} locale={locale} />

              {/* Ad below result */}
              <div className="ad-slot-result" style={{ marginTop: 24, minHeight: 90, borderRadius: 10, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: '0.72rem' }}>
                广告位
              </div>

              {/* Related tools */}
              {toolInfo && (
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>📌 相关工具</div>
                  <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
                    {ALL_TOOLS.filter(t => t.cat === toolInfo.cat && t.id !== toolInfo.id).slice(0, 4).map(t => (
                      <div key={t.id}
                        onClick={() => { setActiveTool(t.id); window.scrollTo(0, 0); }}
                        style={{ flex: '0 0 auto', width: 160, padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{t.icon}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text3)', lineHeight: 1.3 }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right ad sidebar — desktop only */}
            <div style={{ position: 'sticky', top: 70 }} className="ad-sidebar-right">
              <AdSidebar position="right" />
            </div>
          </div>
        </div>

        {/* Responsive: hide sidebars on mobile */}
        <style>{`
          @media (max-width: 900px) {
            .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
            div[style*="grid-template-columns: 160px"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    );
  }

  // ========== Tools listing page ==========
  const aiCount = ALL_TOOLS.filter(t => t.apiTool).length;
  const freeCount = ALL_TOOLS.filter(t => t.price === '免费' || !t.apiTool).length;

  return (
    <div style={{ padding: '24px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI工具箱
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginBottom: 20 }}>
            {ALL_TOOLS.length}款在线工具 · {aiCount}款AI驱动 · 全部免费
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            {[
              { num: ALL_TOOLS.length, label: '在线工具', color: 'var(--accent)' },
              { num: aiCount, label: 'AI驱动', color: '#10b981' },
              { num: freeCount, label: '完全免费', color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky search */}
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)', padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
          <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: 'var(--text3)' }}>🔍</span>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder={`搜索${ALL_TOOLS.length}款工具...`}
              style={{ width: '100%', padding: '12px 40px 12px 42px', borderRadius: 24, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: '0.92rem', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 2px 12px rgba(99,102,241,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'var(--border)', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: '0.72rem', width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
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

        {/* Tool Cards Grid + side ads */}
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 160px', gap: 20, alignItems: 'start' }}>
          {/* Left ad */}
          <div className="ad-sidebar-left" style={{ position: 'sticky', top: 70 }}>
            <AdSidebar position="left-list" />
          </div>

          <div>
            {filteredTools.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>未找到匹配的工具</div>
                <div style={{ fontSize: '0.82rem' }}>试试换个关键词？</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                {filteredTools.map(tool => {
                  const catInfo = CATEGORIES.find(c => c.id === tool.cat);
                  return (
                    <div key={tool.id} onClick={() => { setActiveTool(tool.id); window.scrollTo(0, 0); }}
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px', cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)', position: 'relative', overflow: 'hidden' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px ${catInfo?.color}22`; e.currentTarget.style.borderColor = `${catInfo?.color}44`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>

                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${catInfo?.color || '#6366f1'}, ${catInfo?.color || '#6366f1'}88)` }} />

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: `${catInfo?.color || '#6366f1'}10`, flexShrink: 0 }}>{tool.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                            <span style={{ fontWeight: 700, fontSize: '0.96rem' }}>{tool.name}</span>
                            {tool.apiTool && <span style={{ fontSize: '0.58rem', padding: '1px 6px', borderRadius: 4, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{tool.desc}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>{getFreeLimitText(tool)}</span>
                        <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: tool.price === '免费' || !tool.apiTool ? 'rgba(16,185,129,0.08)' : 'rgba(99,102,241,0.08)', color: tool.price === '免费' || !tool.apiTool ? 'var(--green)' : 'var(--accent)', fontWeight: 600 }}>
                          {tool.price === '免费' || !tool.apiTool ? '✓ 免费' : 'AI驱动'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Ad below tool list */}
            <div className="ad-slot-list" style={{ marginTop: 32, minHeight: 90, borderRadius: 10, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: '0.72rem' }}>
              广告位
            </div>
          </div>

          {/* Right ad */}
          <div className="ad-sidebar-right" style={{ position: 'sticky', top: 70 }}>
            <AdSidebar position="right-list" />
          </div>
        </div>
      </div>

      {/* Responsive: hide sidebars on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
          div[style*="grid-template-columns: 160px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
