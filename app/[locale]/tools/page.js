'use client';
import { useState, useEffect } from 'react';
import { canUseTool, recordUsage, isPaidUser, getUser, saveUser, logout, PAID_PRICES, getFreeLimitDisplay } from '@/lib/usage';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { TOOL_CONFIGS } from '@/lib/tool-configs';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

// AI + 免费 badge
const CAT_BADGE = { social: 'AI', office: 'AI', pro: 'AI', dev: '免费', free: '免费', basic: '' };

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [activeTool, setActiveTool] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tp = params.get('tool');
      if (tp && TOOL_COMPONENTS[tp]) setActiveTool(tp);
    }
  }, []);

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

  // Tool detail page
  if (activeTool) {
    const ToolComponent = TOOL_COMPONENTS[activeTool];
    const toolInfo = ALL_TOOLS.find(t => t.id === activeTool);
    const catInfo = CATEGORIES.find(c => c.id === toolInfo?.cat);

    if (ToolComponent) return (
      <div style={{ padding: '24px 0 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          {/* 面包屑 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: '0.82rem', color: 'var(--text3)' }}>
            <Link href={`/${locale}`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>首页</Link>
            <span>›</span>
            <Link href={`/${locale}/tools`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>AI工具</Link>
            <span>›</span>
            {catInfo && <span style={{ color: catInfo.color }}>{catInfo.label}</span>}
            <span>›</span>
            <span style={{ color: 'var(--text)' }}>{toolInfo?.name}</span>
          </div>

          {/* 工具标题栏 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '16px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '2rem' }}>{toolInfo?.icon}</span>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{toolInfo?.name}</h1>
              <p style={{ fontSize: '0.82rem', color: 'var(--text2)', margin: '2px 0 0' }}>{toolInfo?.desc}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {toolInfo?.apiTool && <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700 }}>🤖 AI驱动</span>}
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: toolInfo?.price === '免费' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: toolInfo?.price === '免费' ? 'var(--green)' : 'var(--yellow)', fontWeight: 700 }}>{toolInfo?.price === '免费' ? '✓ 免费' : toolInfo?.price}</span>
            </div>
          </div>

          <ToolComponent onBack={() => setActiveTool(null)} locale={locale} />

          {/* 相关工具推荐 */}
          {toolInfo && (
            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>📌 相关工具</div>
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
                {ALL_TOOLS.filter(t => t.cat === toolInfo.cat && t.id !== toolInfo.id).slice(0, 4).map(t => (
                  <div key={t.id} onClick={() => { setActiveTool(t.id); window.scrollTo(0, 0); }}
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
      </div>
    );
  }

  // ========== Tools listing page ==========
  const aiCount = ALL_TOOLS.filter(t => t.apiTool).length;
  const freeCount = ALL_TOOLS.filter(t => t.price === '免费').length;

  return (
    <div style={{ padding: '24px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* ===== Hero Section ===== */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI工具箱
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginBottom: 20 }}>
            {ALL_TOOLS.length}款在线工具 · {aiCount}款AI驱动 · {freeCount}款完全免费
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 24 }}>
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

        {/* ===== Search bar (sticky) ===== */}
        <div style={{ position: 'sticky', top: 56, zIndex: 100, background: 'var(--bg)', padding: '12px 0', borderBottom: '1px solid var(--border)', marginBottom: 20, borderRadius: '0 0 12px 12px' }}>
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

        {/* ===== Member CTA Banner ===== */}
        {!getUser() && (
          <div style={{ margin: '0 0 24px', padding: '16px 24px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(124,92,252,0.06))', border: '1px solid rgba(99,102,241,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>🔓 解锁全部AI工具无限使用</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text2)', marginLeft: 8 }}>基础版 ¥{PAID_PRICES.monthly}/月 · 专业版 ¥{PAID_PRICES.pro_monthly}/月</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowLogin(true)} style={{ padding: '7px 16px', borderRadius: 20, background: 'transparent', color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 600, border: '1px solid var(--accent)', cursor: 'pointer' }}>登录</button>
              <button onClick={() => setShowPay(true)} style={{ padding: '7px 16px', borderRadius: 20, background: 'var(--accent)', color: '#fff', fontSize: '0.82rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>开通会员</button>
            </div>
          </div>
        )}
        {getUser() && (
          <div style={{ margin: '0 0 24px', padding: '10px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>👤 {getUser().email} {isPaidUser() && <span style={{ color: 'var(--accent)', fontWeight: 600, marginLeft: 6 }}>⭐ 会员</span>}</span>
            <button onClick={logout} style={{ padding: '4px 12px', borderRadius: 12, background: 'var(--border)', color: 'var(--text2)', fontSize: '0.72rem', border: 'none', cursor: 'pointer' }}>退出</button>
          </div>
        )}

        {/* ===== Category Tabs ===== */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === cat.id).length;
            const isActive = activeTab === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                style={{
                  padding: '8px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  border: isActive ? 'none' : '1px solid var(--border)',
                  background: isActive ? cat.color : 'transparent',
                  color: isActive ? '#fff' : 'var(--text2)',
                  boxShadow: isActive ? `0 2px 8px ${cat.color}33` : 'none',
                }}>
                {cat.emoji} {cat.label} <span style={{ fontSize: '0.68rem', opacity: 0.8, marginLeft: 2 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ===== Tool Cards Grid ===== */}
        {filteredTools.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
            <div style={{ fontSize: '2.4rem', marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>未找到匹配的工具</div>
            <div style={{ fontSize: '0.82rem' }}>试试换个关键词？</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {filteredTools.map(tool => {
              const catInfo = CATEGORIES.find(c => c.id === tool.cat);
              return (
                <div key={tool.id} onClick={() => setActiveTool(tool.id)}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px ${catInfo?.color}22`; e.currentTarget.style.borderColor = `${catInfo?.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {/* Category color strip */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${catInfo?.color || '#6366f1'}, ${catInfo?.color || '#6366f1'}88)` }} />

                  {/* Icon + Title row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                      background: `${catInfo?.color || '#6366f1'}10`,
                      flexShrink: 0,
                    }}>
                      {tool.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.96rem' }}>{tool.name}</span>
                        {tool.apiTool && <span style={{ fontSize: '0.58rem', padding: '1px 6px', borderRadius: 4, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.02em' }}>AI</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{tool.desc}</div>
                    </div>
                  </div>

                  {/* Bottom: price + free limit */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>{getFreeLimitDisplay(tool.id)}</span>
                    {tool.price !== '免费' ? (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.08)', color: 'var(--yellow)', fontWeight: 600 }}>{tool.price}</span>
                    ) : (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.08)', color: 'var(--green)', fontWeight: 600 }}>✓ 免费</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />}
      {showPay && <PayModal onClose={() => setShowPay(false)} />}
    </div>
  );
}

/* ===== 登录弹窗 ===== */
function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('请填写邮箱和密码'); return; }
    if (password.length < 6) { setError('密码至少6位'); return; }
    const existingUsers = JSON.parse(localStorage.getItem('quen_users') || '{}');
    if (isRegister) {
      if (existingUsers[email]) { setError('该邮箱已注册'); return; }
      existingUsers[email] = { email, password, createdAt: new Date().toISOString(), paidUntil: null };
      localStorage.setItem('quen_users', JSON.stringify(existingUsers));
      saveUser({ email, paidUntil: null });
      onSuccess();
    } else {
      if (!existingUsers[email] || existingUsers[email].password !== password) { setError('邮箱或密码错误'); return; }
      saveUser({ email, paidUntil: existingUsers[email].paidUntil || null });
      onSuccess();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 32, width: 400, maxWidth: '90vw', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>{isRegister ? '注册账号' : '登录'}</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>开通会员，解锁全部AI工具</p>
        {error && <div style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', color: 'var(--red)', fontSize: '0.82rem', marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>邮箱</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', marginBottom: 12, boxSizing: 'border-box' }} />
          <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>密码</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="至少6位" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', marginBottom: 16, boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: 'pointer', marginBottom: 12 }}>{isRegister ? '注册' : '登录'}</button>
        </form>
        <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text2)' }}>
          {isRegister ? '已有账号？' : '没有账号？'}
          <button onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>{isRegister ? '登录' : '注册'}</button>
        </div>
      </div>
    </div>
  );
}

/* ===== 付费弹窗 ===== */
function PayModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 32, width: 460, maxWidth: '90vw', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>开通会员</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>解锁全部AI工具无限使用</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 20, borderRadius: 12, border: '2px solid var(--accent)', background: 'rgba(99,102,241,0.04)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>基础版</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>¥9.9<span style={{ fontSize: '0.72rem', fontWeight: 400 }}>/月</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 6 }}>自媒体+职场AI工具<br/>免费工具无限</div>
          </div>
          <div style={{ padding: 20, borderRadius: 12, border: '2px solid var(--accent2)', background: 'rgba(124,92,252,0.04)', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -8, right: -8, background: 'var(--accent2)', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>推荐</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent2)', fontWeight: 600, marginBottom: 4 }}>专业版</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>¥19.9<span style={{ fontSize: '0.72rem', fontWeight: 400 }}>/月</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 6 }}>全部AI工具无限<br/>含专业+合同/面试等</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 8 }}>扫码支付</div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/pay/wechat.png" alt="微信收款码" style={{ width: 140, height: 140, borderRadius: 10, border: '1px solid var(--border)', objectFit: 'contain' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>微信支付</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="/pay/alipay.png" alt="支付宝收款码" style={{ width: 140, height: 140, borderRadius: 10, border: '1px solid var(--border)', objectFit: 'contain' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>支付宝</div>
            </div>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 8 }}>付款后发送截图至 quen@ai.tools<br/>1小时内手动开通会员</div>
        </div>
      </div>
    </div>
  );
}
