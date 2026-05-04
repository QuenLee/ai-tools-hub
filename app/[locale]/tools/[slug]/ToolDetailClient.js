'use client';

import { useState } from 'react';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { TOOL_CONFIGS } from '@/lib/tool-configs';
import { AITool } from '@/components/tools/AITool';
import { PDFConverter } from '@/components/tools/PDFConverter';
import { ImageConverter } from '@/components/tools/ImageConverter';
import { MarkdownEditor } from '@/components/tools/MarkdownEditor';
import { JSONFormatter, JSONToYAML, Base64Tool, URLEncode } from '@/components/tools/dev/DevTools1';
import { HashGen, RegexTester, TimestampTool, UUIDGen, ColorTool, TextDiff, JWTParser, QRCode } from '@/components/tools/dev/DevTools2';
import { WordCount, TextReplace, PasswordGen } from '@/components/tools/free/FreeTools';
import ImageCompress from '@/components/tools/ImageCompress';
import IDPhoto from '@/components/tools/IDPhoto';
import PDFMerge from '@/components/tools/PDFMerge';
import { ImageCrop } from '@/components/tools/ImageCrop';
import { ImageWatermark } from '@/components/tools/ImageWatermark';
import { ImageResize } from '@/components/tools/ImageResize';
import { PDFSplit } from '@/components/tools/PDFSplit';

const TOOL_COMPONENTS = {
  // 📱 自媒体
  'xhs-writer': (props) => <AIToolWrapper toolId="xhs-writer" {...props} />,
  'douyin-script': (props) => <AIToolWrapper toolId="douyin-script" {...props} />,
  'live-script': (props) => <AIToolWrapper toolId="live-script" {...props} />,
  'comment-reply': (props) => <AIToolWrapper toolId="comment-reply" {...props} />,
  'wechat-article': (props) => <AIToolWrapper toolId="wechat-article" {...props} />,
  'bili-script': (props) => <AIToolWrapper toolId="bili-script" {...props} />,
  'private-domain': (props) => <AIToolWrapper toolId="private-domain" {...props} />,
  // 💼 办公
  'weekly-report': (props) => <AIToolWrapper toolId="weekly-report" {...props} />,
  'meeting-notes': (props) => <AIToolWrapper toolId="meeting-notes" {...props} />,
  'email-writer': (props) => <AIToolWrapper toolId="email-writer" {...props} />,
  'ppt-outline': (props) => <AIToolWrapper toolId="ppt-outline" {...props} />,
  'excel-formula': (props) => <AIToolWrapper toolId="excel-formula" {...props} />,
  'summary-gen': (props) => <AIToolWrapper toolId="summary-gen" {...props} />,
  'translate-polish': (props) => <AIToolWrapper toolId="translate-polish" {...props} />,
  'seo-article': (props) => <AIToolWrapper toolId="seo-article" {...props} />,
  // 🔧 专业
  'product-desc': (props) => <AIToolWrapper toolId="product-desc" {...props} />,
  'ad-copy': (props) => <AIToolWrapper toolId="ad-copy" {...props} />,
  'data-analysis': (props) => <AIToolWrapper toolId="data-analysis" {...props} />,
  'interview-prep': (props) => <AIToolWrapper toolId="interview-prep" {...props} />,
  'brainstorm': (props) => <AIToolWrapper toolId="brainstorm" {...props} />,
  'seo-title-gen': (props) => <AIToolWrapper toolId="seo-title-gen" {...props} />,
  'contract-review': (props) => <AIToolWrapper toolId="contract-review" {...props} />,
  // 💻 开发
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
  // 🎁 热搜易用
  'image-compress': ImageCompress,
  'id-photo': IDPhoto,
  'pdf-merge': PDFMerge,
  'image-convert': ImageConverter,
  'pdf-convert': PDFConverter,
  'image-crop': ImageCrop,
  'image-watermark': ImageWatermark,
  'image-resize': ImageResize,
  'pdf-split': PDFSplit,
  'word-count': WordCount,
  'text-replace': TextReplace,
  'password-gen': PasswordGen,
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
  { id: 'free', label: '热搜工具', emoji: '🎁', color: '#8b5cf6' },
];

function AdSlot({ position }) {
  return (
    <div className={`ad-slot-${position}`} style={{
      width: '100%', minHeight: 250, borderRadius: 12,
      border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--text3)', fontSize: '0.68rem',
      position: 'sticky', top: 80,
    }}>广告位</div>
  );
}

export default function ToolDetailClient({ tool, locale }) {
  const ToolComponent = TOOL_COMPONENTS[tool.id];
  const catInfo = CATEGORIES.find(c => c.id === tool.cat);
  const isFree = tool.price === '免费' || !tool.apiTool;
  const relatedTools = ALL_TOOLS.filter(t => t.cat === tool.cat && t.id !== tool.id).slice(0, 6);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ═══ 工具详情顶部 ═══ */}
      <div className="detail-header" style={{
        background: `linear-gradient(135deg, ${(catInfo?.color || '#6366f1')}dd, ${(catInfo?.color || '#6366f1')}88)`,
        padding: '28px 20px 36px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* 面包屑 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginBottom: 16, fontSize: '0.78rem',
          }}>
            <a href={`/${locale}/tools`} style={{
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 600,
            }}>← 返回工具箱</a>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            {catInfo && <span style={{ color: 'rgba(255,255,255,0.7)' }}>{catInfo.emoji} {catInfo.label}</span>}
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: '#fff' }}>{tool.name}</span>
          </div>

          {/* 工具标题 */}
          <h1 className="detail-title" style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8,
          }}>
            <span className="detail-icon" style={{
              width: 52, height: 52, borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', background: 'rgba(255,255,255,0.15)', flexShrink: 0,
            }}>{tool.icon}</span>
            <div>
              <span className="detail-name" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{tool.name}</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                {tool.apiTool && (
                  <span style={{
                    fontSize: '0.65rem', padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700,
                  }}>🤖 AI驱动</span>
                )}
                <span style={{
                  fontSize: '0.65rem', padding: '3px 8px', borderRadius: 6,
                  background: isFree ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)',
                  color: '#fff', fontWeight: 700,
                }}>{isFree ? '✓ 免费无限' : '每日3次免费'}</span>
              </div>
            </div>
          </h1>

          <p className="detail-desc" style={{
            fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6, marginTop: 10,
          }}>
            {tool.desc} — 免费在线使用，无需注册，即开即用。
          </p>
        </div>
      </div>

      {/* ═══ 工具主内容 ═══ */}
      <div className="detail-grid" style={{
        maxWidth: 1200, margin: '0 auto', padding: '24px 16px 80px',
        display: 'grid',
        gridTemplateColumns: '160px 1fr 160px',
        gap: 24, alignItems: 'start',
      }}>
        <div className="ad-sidebar-left"><AdSlot position="left" /></div>
        <div>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {ToolComponent ? (
              <ToolComponent
                onBack={() => { if (typeof window !== 'undefined') window.location.href = `/${locale}/tools`; }}
                locale={locale}
              />
            ) : (
              <div style={{ padding: 60, textAlign: 'center', color: 'var(--text3)' }}>工具加载中...</div>
            )}
          </div>

          <div className="ad-slot-result" style={{
            marginTop: 20, minHeight: 90, borderRadius: 12,
            border: '1px dashed var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text3)', fontSize: '0.72rem',
          }}>广告位</div>

          {relatedTools.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h2 style={{
                fontSize: '1rem', fontWeight: 800, marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>📌 相关工具</h2>
              <div className="related-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 10,
              }}>
                {relatedTools.map(t => {
                  const tCat = CATEGORIES.find(c => c.id === t.cat);
                  const tFree = t.price === '免费' || !t.apiTool;
                  return (
                    <a key={t.id} href={`/${locale}/tools/${t.id}`} style={{
                      padding: '14px', borderRadius: 12,
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      textDecoration: 'none', color: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = tCat?.color || '#6366f1';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.transform = 'none';
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{t.icon}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                      <span style={{
                        fontSize: '0.58rem', padding: '2px 6px', borderRadius: 4,
                        background: tFree ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)',
                        color: tFree ? 'var(--green)' : 'var(--accent)',
                        fontWeight: 700, display: 'inline-block',
                      }}>{tFree ? '✓ 免费' : '🤖 AI'}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="ad-sidebar-right"><AdSlot position="right" /></div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ad-sidebar-left, .ad-sidebar-right { display: none !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .detail-header { padding: 20px 14px 28px !important; }
          .detail-title { gap: 10px !important; }
          .detail-icon { width: 42px !important; height: 42px !important; border-radius: 11px !important; font-size: 1.4rem !important; }
          .detail-name { font-size: 1.2rem !important; }
          .detail-desc { font-size: 0.8rem !important; margin-top: 8px !important; }
          .detail-grid { padding: 16px 12px 60px !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }
        }
        @media (max-width: 380px) {
          .detail-name { font-size: 1.05rem !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
