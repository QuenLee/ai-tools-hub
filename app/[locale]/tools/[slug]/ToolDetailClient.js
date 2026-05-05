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
import { addRecent, isFavorited, toggleFavorite } from '@/lib/user-data';

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
  if (!config) return <div className="empty-state">工具配置未找到</div>;
  return <AITool config={config} onBack={onBack} locale={locale} toolId={toolId} />;
}

const CATEGORIES = [
  { id: 'social', label: '自媒体', emoji: '📱', color: '#FF2442' },
  { id: 'office', label: '办公', emoji: '💼', color: '#f59e0b' },
  { id: 'pro', label: '专业', emoji: '🔧', color: '#10b981' },
  { id: 'dev', label: '开发', emoji: '💻', color: '#3b82f6' },
  { id: 'free', label: '热搜工具', emoji: '🎁', color: '#8b5cf6' },
];

export default function ToolDetailClient({ tool, locale }) {
  const ToolComponent = TOOL_COMPONENTS[tool.id];
  const catInfo = CATEGORIES.find(c => c.id === tool.cat);
  const isFree = tool.price === '免费' || !tool.apiTool;
  const relatedTools = ALL_TOOLS.filter(t => t.cat === tool.cat && t.id !== tool.id).slice(0, 6);

  // 记录最近使用
  if (typeof window !== 'undefined') {
    addRecent(tool.id);
  }

  const [fav, setFav] = useState(() => {
    if (typeof window === 'undefined') return false;
    return isFavorited(tool.id);
  });

  const handleFav = () => {
    const newVal = toggleFavorite(tool.id);
    setFav(newVal);
  };

  return (
    <div className="detail-page">
      {/* 面包屑 */}
      <div className="breadcrumb">
        <a href={`/${locale}/tools`}>← 返回工具箱</a>
        <span>›</span>
        {catInfo && <span>{catInfo.emoji} {catInfo.label}</span>}
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>{tool.name}</span>
      </div>

      {/* 工具标题区 */}
      <div className="detail-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '2rem', flexShrink: 0 }}>{tool.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="detail-title">{tool.name}</div>
            <div className="detail-tagline">{tool.desc}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span className="detail-badge" style={{
            background: isFree ? 'rgba(52,211,153,0.1)' : 'rgba(124,92,252,0.1)',
            color: isFree ? 'var(--green)' : 'var(--accent2)',
          }}>
            {isFree ? '✓ 免费无限' : '🤖 AI驱动'}
          </span>
          <button
            onClick={handleFav}
            className="fav-btn"
            style={{
              background: fav ? 'rgba(248,113,113,0.1)' : 'var(--surface2)',
              border: fav ? '1px solid rgba(248,113,113,0.2)' : '1px solid var(--border)',
              color: fav ? 'var(--red)' : 'var(--text3)',
            }}
          >
            {fav ? '❤️ 已收藏' : '🤍 收藏'}
          </button>
        </div>
      </div>

      {/* 工具主内容 */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        marginBottom: 24,
      }}>
        {ToolComponent ? (
          <ToolComponent
            onBack={() => {
              if (typeof window !== 'undefined') window.location.href = `/${locale}/tools`;
            }}
            locale={locale}
          />
        ) : (
          <div className="empty-state">工具加载中...</div>
        )}
      </div>

      {/* 相关工具 */}
      {relatedTools.length > 0 && (
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            📌 相关工具
          </h2>
          <div className="related-grid">
            {relatedTools.map(t => {
              const tFree = t.price === '免费' || !t.apiTool;
              return (
                <a key={t.id} href={`/${locale}/tools/${t.id}`} className="related-card">
                  <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>{t.name}</div>
                  <span className="detail-badge" style={{
                    background: tFree ? 'rgba(52,211,153,0.1)' : 'rgba(124,92,252,0.1)',
                    color: tFree ? 'var(--green)' : 'var(--accent2)',
                    fontSize: '0.6rem',
                  }}>
                    {tFree ? '✓ 免费' : '🤖 AI'}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 响应式 */}
      <style>{`
        .detail-badge {
          font-size: 0.68rem;
          padding: 3px 10px;
          border-radius: 6px;
          font-weight: 700;
          white-space: nowrap;
        }
        .fav-btn {
          padding: 5px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .fav-btn:hover { opacity: 0.8; }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
        }
        .related-card {
          padding: 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--surface);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }
        .related-card:hover {
          border-color: var(--border2);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          text-decoration: none;
          color: inherit;
        }
        @media (max-width: 768px) {
          .detail-hero { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
        }
        @media (max-width: 480px) {
          .related-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
