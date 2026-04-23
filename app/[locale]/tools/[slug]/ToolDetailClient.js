'use client';
import { useState } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { TOOL_CONFIGS } from '@/lib/tool-configs';
import { AITool } from '@/components/tools/AITool';
import { AIWatermarkRemover } from '@/components/tools/AIWatermarkRemover';
import { ShortURLGenerator } from '@/components/tools/ShortURLGenerator';
import { PromptTemplates } from '@/components/tools/PromptTemplates';
import { PDFConverter } from '@/components/tools/PDFConverter';
import { ImageConverter } from '@/components/tools/ImageConverter';
import { MarkdownEditor } from '@/components/tools/MarkdownEditor';
import { JSONFormatter, JSONToYAML, Base64Tool, URLEncode } from '@/components/tools/dev/DevTools1';
import { HashGen, RegexTester, TimestampTool, UUIDGen, ColorTool, TextDiff, JWTParser, QRCode } from '@/components/tools/dev/DevTools2';
import { WordCount, TextReplace, LoremIpsum, SlugGen, MarkdownPreview, EmojiPicker, PasswordGen, HtmlEntity } from '@/components/tools/free/FreeTools';

const TOOL_COMPONENTS = {
  'xhs-writer': (props) => <AIToolWrapper toolId="xhs-writer" {...props} />,
  'douyin-script': (props) => <AIToolWrapper toolId="douyin-script" {...props} />,
  'live-script': (props) => <AIToolWrapper toolId="live-script" {...props} />,
  'comment-reply': (props) => <AIToolWrapper toolId="comment-reply" {...props} />,
  'wechat-article': (props) => <AIToolWrapper toolId="wechat-article" {...props} />,
  'bili-script': (props) => <AIToolWrapper toolId="bili-script" {...props} />,
  'private-domain': (props) => <AIToolWrapper toolId="private-domain" {...props} />,
  'weekly-report': (props) => <AIToolWrapper toolId="weekly-report" {...props} />,
  'meeting-notes': (props) => <AIToolWrapper toolId="meeting-notes" {...props} />,
  'email-writer': (props) => <AIToolWrapper toolId="email-writer" {...props} />,
  'ppt-outline': (props) => <AIToolWrapper toolId="ppt-outline" {...props} />,
  'speech-writer': (props) => <AIToolWrapper toolId="speech-writer" {...props} />,
  'excel-formula': (props) => <AIToolWrapper toolId="excel-formula" {...props} />,
  'competitor-analysis': (props) => <AIToolWrapper toolId="competitor-analysis" {...props} />,
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
  'word-count': WordCount,
  'text-replace': TextReplace,
  'lorem-ipsum': LoremIpsum,
  'slug-gen': SlugGen,
  'markdown-preview': MarkdownPreview,
  'emoji-picker': EmojiPicker,
  'password-gen': PasswordGen,
  'html-entity': HtmlEntity,
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

function AIToolWrapper({ toolId, onBack, locale }) {
  const config = TOOL_CONFIGS[toolId];
  if (!config) return <div style={{padding:40, textAlign:'center', color:'var(--text3)'}}>工具配置未找到</div>;
  return <AITool config={config} onBack={onBack} locale={locale} toolId={toolId} />;
}

const CATEGORIES = [
  { id: 'social', label: '自媒体神器', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '职场办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业工具', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发者', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '免费工具', emoji: '🎁', color: '#8b5cf6' },
  { id: 'basic', label: '基础工具', emoji: '📄', color: '#64748b' },
];

function AdSidebar({ position }) {
  return (
    <div className={`ad-slot-${position}`} style={{
      width: '100%', minHeight: 250, borderRadius: 10, border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text3)', fontSize: '0.68rem', position: 'sticky', top: 20,
    }}>
      广告位
    </div>
  );
}

export default function ToolDetailClient({ tool, locale }) {
  const ToolComponent = TOOL_COMPONENTS[tool.id];
  const catInfo = CATEGORIES.find(c => c.id === tool.cat);

  return (
    <div style={{ padding: '24px 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 160px', gap: 20, alignItems: 'start' }}>
          {/* Left ad */}
          <div className="ad-sidebar-left" style={{ position: 'sticky', top: 20 }}>
            <AdSidebar position="left" />
          </div>

          {/* Main content */}
          <div>
            {/* Back + Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: '0.82rem' }}>
              <a href={`/${locale}/tools`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                ← 返回工具箱
              </a>
              <span style={{ color: 'var(--text3)' }}>›</span>
              {catInfo && <span style={{ color: catInfo.color }}>{catInfo.label}</span>}
              <span style={{ color: 'var(--text3)' }}>›</span>
              <span style={{ color: 'var(--text)' }}>{tool.name}</span>
            </div>

            {/* Tool header — SEO-friendly H1 */}
            <h1 style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
              padding: '16px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)',
              fontSize: '1.3rem', fontWeight: 800,
            }}>
              <span style={{ fontSize: '2rem' }}>{tool.icon}</span>
              <span>{tool.name}</span>
              {tool.apiTool && (
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 700 }}>🤖 AI驱动</span>
              )}
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.1)', color: 'var(--green)', fontWeight: 700 }}>
                {!tool.apiTool ? '✓ 免费无限' : '每日3次免费'}
              </span>
            </h1>

            {/* Tool desc for SEO */}
            <p style={{ fontSize: '0.88rem', color: 'var(--text2)', marginBottom: 20, lineHeight: 1.6 }}>
              {tool.desc} — 免费在线使用，无需注册，即开即用。
            </p>

            {/* Tool component */}
            {ToolComponent ? (
              <ToolComponent onBack={() => { if (typeof window !== 'undefined') window.location.href = `/${locale}/tools`; }} locale={locale} />
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text3)' }}>工具加载中...</div>
            )}

            {/* Ad below result */}
            <div className="ad-slot-result" style={{
              marginTop: 24, minHeight: 90, borderRadius: 10, border: '1px dashed var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: '0.72rem',
            }}>
              广告位
            </div>

            {/* Related tools */}
            <div style={{ marginTop: 24 }}>
              <h2 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>📌 相关工具</h2>
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
                {ALL_TOOLS.filter(t => t.cat === tool.cat && t.id !== tool.id).slice(0, 6).map(t => (
                  <a key={t.id} href={`/${locale}/tools/${t.id}`}
                    style={{ flex: '0 0 auto', width: 150, padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{t.icon}</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text3)', lineHeight: 1.3 }}>{t.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right ad */}
          <div className="ad-sidebar-right" style={{ position: 'sticky', top: 20 }}>
            <AdSidebar position="right" />
          </div>
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
