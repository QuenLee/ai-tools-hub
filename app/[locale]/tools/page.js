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
import { AITextDetect } from '@/components/tools/AITextDetect';
import { AIWatermarkRemover } from '@/components/tools/AIWatermarkRemover';
import { ShortURLGenerator } from '@/components/tools/ShortURLGenerator';
import { AITranslateCompare } from '@/components/tools/AITranslateCompare';
import { AIResumeOptimizer } from '@/components/tools/AIResumeOptimizer';
import { PromptTemplates } from '@/components/tools/PromptTemplates';
import { AICodeReview } from '@/components/tools/AICodeReview';
import { SEOTitleGen } from '@/components/tools/SEOTitleGen';
import { PDFConverter } from '@/components/tools/PDFConverter';
import { AICopywriter } from '@/components/tools/AICopywriter';
import { ImageConverter } from '@/components/tools/ImageConverter';
import { MarkdownEditor } from '@/components/tools/MarkdownEditor';

// AI工具动态包装器
function AIToolWrapper({ toolId, onBack, locale }) {
  const config = TOOL_CONFIGS[toolId];
  if (!config) return <div>工具配置未找到</div>;
  return <AITool config={config} onBack={onBack} locale={locale} toolId={toolId} />;
}

const TOOL_COMPONENTS = {
  // 📱 自媒体（全部AI驱动）
  'xhs-writer': (props) => <AIToolWrapper toolId="xhs-writer" {...props} />,
  'douyin-script': (props) => <AIToolWrapper toolId="douyin-script" {...props} />,
  'live-script': (props) => <AIToolWrapper toolId="live-script" {...props} />,
  'comment-reply': (props) => <AIToolWrapper toolId="comment-reply" {...props} />,
  'wechat-article': (props) => <AIToolWrapper toolId="wechat-article" {...props} />,
  'bili-script': (props) => <AIToolWrapper toolId="bili-script" {...props} />,
  'private-domain': (props) => <AIToolWrapper toolId="private-domain" {...props} />,
  // 💼 职场办公（全部AI驱动）
  'weekly-report': (props) => <AIToolWrapper toolId="weekly-report" {...props} />,
  'meeting-notes': (props) => <AIToolWrapper toolId="meeting-notes" {...props} />,
  'email-writer': (props) => <AIToolWrapper toolId="email-writer" {...props} />,
  'ppt-outline': (props) => <AIToolWrapper toolId="ppt-outline" {...props} />,
  'speech-writer': (props) => <AIToolWrapper toolId="speech-writer" {...props} />,
  'excel-formula': (props) => <AIToolWrapper toolId="excel-formula" {...props} />,
  'competitor-analysis': (props) => <AIToolWrapper toolId="competitor-analysis" {...props} />,
  // 🔧 专业工具（全部AI驱动）
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
  // 📄 基础工具（前端本地）
  'ai-text-detect': AITextDetect,
  'ai-watermark': AIWatermarkRemover,
  'short-url': ShortURLGenerator,
  'ai-translate': AITranslateCompare,
  'ai-resume': AIResumeOptimizer,
  'prompt-templates': PromptTemplates,
  'ai-code-review': AICodeReview,
  'seo-title-gen': SEOTitleGen,
  'pdf-convert': PDFConverter,
  'ai-copywriter': AICopywriter,
  'image-convert': ImageConverter,
  'markdown-editor': MarkdownEditor,
};

const TABS = [
  { id: 'all', label: '全部工具', emoji: '🛠' },
  { id: 'social', label: '自媒体神器', emoji: '📱' },
  { id: 'office', label: '职场办公', emoji: '💼' },
  { id: 'pro', label: '专业工具', emoji: '🔧' },
  { id: 'basic', label: '基础工具', emoji: '📄' },
];

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('social');
  const [activeTool, setActiveTool] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tp = params.get('tool');
      if (tp && TOOL_COMPONENTS[tp]) setActiveTool(tp);
    }
  }, []);

  const filteredTools = activeTab === 'all' ? ALL_TOOLS : ALL_TOOLS.filter(t => t.cat === activeTab);

  if (activeTool) {
    const ToolComponent = TOOL_COMPONENTS[activeTool];
    const toolInfo = ALL_TOOLS.find(t => t.id === activeTool);
    if (ToolComponent) return (
      <div className="page" style={{ padding: '32px 0 80px' }}>
        <div style={{ padding: '0 24px' }}>
          <div className="breadcrumb"><a href={`/${locale}/tools`}>AI工具</a><span>/</span>{toolInfo?.name}</div>
          <ToolComponent onBack={() => setActiveTool(null)} locale={locale} />
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        <div className="breadcrumb"><a href={`/${locale}`}>首页</a><span>/</span>AI工具</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI工具箱</h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>40款在线工具 · 28款AI驱动 · 自媒体+职场+专业全覆盖</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {getUser() && <span style={{ fontSize: '0.78rem', color: 'var(--accent2)', fontWeight: 600 }}>👤 {getUser().email}</span>}
            <button onClick={() => getUser() ? logout() : setShowLogin(true)} style={{ padding: '6px 16px', borderRadius: 'var(--radius-2xs)', background: getUser() ? 'var(--border)' : 'var(--accent)', color: getUser() ? 'var(--text2)' : '#fff', fontSize: '0.82rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>{getUser() ? '退出' : '登录'}</button>
          </div>
        </div>

        {/* 会员横幅 */}
        <div style={{ margin: '16px 0 20px', padding: '14px 18px', borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,92,252,0.08))', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div><span style={{ fontWeight: 700, fontSize: '0.92rem' }}>🔓 解锁全部工具无限使用</span><span style={{ fontSize: '0.82rem', color: 'var(--text2)', marginLeft: 8 }}>基础版 ¥{PAID_PRICES.monthly}/月 · 专业版 ¥{PAID_PRICES.pro_monthly}/月</span></div>
          <button onClick={() => setShowPay(true)} style={{ padding: '7px 18px', borderRadius: 'var(--radius-2xs)', background: 'var(--accent)', color: '#fff', fontSize: '0.82rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>开通会员</button>
        </div>

        {/* Tab */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '7px 14px', borderRadius: 'var(--radius-2xs)', fontSize: '0.82rem', border: activeTab === tab.id ? '1px solid var(--accent)' : '1px solid var(--border)', background: activeTab === tab.id ? 'rgba(99,102,241,0.08)' : 'transparent', color: activeTab === tab.id ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>{tab.emoji} {tab.label} ({tab.id === 'all' ? ALL_TOOLS.length : ALL_TOOLS.filter(t => t.cat === tab.id).length})</button>
          ))}
        </div>

        {/* 工具卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {filteredTools.map(tool => (
            <div key={tool.id} onClick={() => setActiveTool(tool.id)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px', cursor: 'pointer', transition: 'all 0.3s', position: 'relative', boxShadow: 'var(--shadow-card)' }}>
              {tool.cat === 'social' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF2442, var(--accent))' }} />}
              {tool.cat === 'office' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--yellow), var(--accent))' }} />}
              {tool.cat === 'pro' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--green), var(--accent))' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '1.6rem' }}>{tool.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>{tool.name}</div>
                  {tool.apiTool && <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: 4, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 600, marginLeft: 4 }}>AI驱动</span>}
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text2)', marginBottom: 10 }}>{tool.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--green)', fontWeight: 600 }}>{getFreeLimitDisplay(tool.id)}</span>
                {tool.price !== '免费' && <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>{tool.price}</span>}
              </div>
            </div>
          ))}
        </div>
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
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: 32, width: 380, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 20 }}>{isRegister ? '注册账号' : '登录'}</h2>
        {error && <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'rgba(239,68,68,0.1)', color: 'var(--red)', fontSize: '0.82rem', marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>邮箱</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', marginBottom: 12, boxSizing: 'border-box' }} />
          <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>密码</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="至少6位" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', marginBottom: 16, boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.92rem', border: 'none', cursor: 'pointer', marginBottom: 12 }}>{isRegister ? '注册' : '登录'}</button>
        </form>
        <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text2)' }}>{isRegister ? '已有账号？' : '没有账号？'}<button onClick={() => { setIsRegister(!isRegister); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>{isRegister ? '登录' : '注册'}</button></div>
      </div>
    </div>
  );
}

/* ===== 付费弹窗 ===== */
function PayModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }} onClick={onClose}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: 32, width: 420, maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 6 }}>开通会员</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 20 }}>解锁全部40款工具无限使用</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 20, borderRadius: 'var(--radius-sm)', border: '2px solid var(--accent)', background: 'rgba(99,102,241,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>基础版</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>¥9.9<span style={{ fontSize: '0.72rem', fontWeight: 400 }}>/月</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 6 }}>自媒体7工具+职场7工具<br/>评论回复/邮件/Excel免费</div>
          </div>
          <div style={{ padding: 20, borderRadius: 'var(--radius-sm)', border: '2px solid var(--accent2)', background: 'rgba(124,92,252,0.05)', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -10, right: -10, background: 'var(--accent2)', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>推荐</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--accent2)', fontWeight: 600, marginBottom: 4 }}>专业版</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>¥19.9<span style={{ fontSize: '0.72rem', fontWeight: 400 }}>/月</span></div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 6 }}>全部基础版<br/>+专业6工具+直播/演讲/合同/面试</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: 8 }}>扫码支付</div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ textAlign: 'center' }}>
              <img src="/pay/wechat.png" alt="微信收款码" style={{ width: 150, height: 150, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', objectFit: 'contain' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>微信支付</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="/pay/alipay.png" alt="支付宝收款码" style={{ width: 150, height: 150, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', objectFit: 'contain' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>支付宝</div>
            </div>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 8 }}>付款后发送截图至 quen@ai.tools<br/>1小时内手动开通会员</div>
        </div>
      </div>
    </div>
  );
}
