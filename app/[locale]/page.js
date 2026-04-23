'use client';
import { ALL_TOOLS } from '@/lib/tools-registry';
import { t } from '@/lib/i18n';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'social', label: '自媒体神器', emoji: '📱', color: '#FF2442', desc: '小红书/抖音/B站/公众号' },
  { id: 'office', label: '职场办公', emoji: '💼', color: '#f59e0b', desc: '周报/邮件/PPT/简历' },
  { id: 'pro', label: '专业工具', emoji: '🔧', color: '#10b981', desc: 'SEO/合同/数据分析' },
  { id: 'dev', label: '开发者工具', emoji: '💻', color: '#3b82f6', desc: 'JSON/正则/UUID/Base64' },
  { id: 'free', label: '免费工具', emoji: '🎁', color: '#8b5cf6', desc: '字数统计/密码/Emoji' },
];

export default function Home() {
  const { locale } = useParams();
  const aiTools = ALL_TOOLS.filter(t => t.apiTool);
  const freeTools = ALL_TOOLS.filter(t => !t.apiTool);

  return (
    <div style={{ padding: '0 0 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '48px 0 36px' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: 12, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Quen's AI
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '1.05rem', marginBottom: 24, lineHeight: 1.6 }}>
            {ALL_TOOLS.length}款免费在线工具 · {aiTools.length}款AI驱动 · 无需注册，即开即用
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32 }}>
            {[
              { num: ALL_TOOLS.length, label: '在线工具', color: 'var(--accent)' },
              { num: aiTools.length, label: 'AI驱动', color: '#10b981' },
              { num: freeTools.length, label: '完全免费', color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color }}>{s.num}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text3)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <Link href={`/${locale}/tools`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 24, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
            🛠 进入工具箱
          </Link>
        </div>

        {/* Category sections */}
        {CATEGORIES.map(cat => {
          const catTools = ALL_TOOLS.filter(t => t.cat === cat.id).slice(0, 6);
          if (catTools.length === 0) return null;
          return (
            <div key={cat.id} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.4rem' }}>{cat.emoji}</span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{cat.label}</h2>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{cat.desc}</span>
                </div>
                <Link href={`/${locale}/tools?tab=${cat.id}`}
                  style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                  查看全部 →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {catTools.map(tool => (
                  <Link key={tool.id} href={`/${locale}/tools?tool=${tool.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + '44'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                    <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{tool.name}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>{tool.apiTool ? 'AI驱动' : '免费'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Basic tools */}
        {(() => {
          const basicTools = ALL_TOOLS.filter(t => t.cat === 'basic').slice(0, 8);
          if (basicTools.length === 0) return null;
          return (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.4rem' }}>📄</span>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>基础工具</h2>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>PDF/图片/水印/Markdown</span>
                </div>
                <Link href={`/${locale}/tools?tab=basic`}
                  style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                  查看全部 →
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {basicTools.map(tool => (
                  <Link key={tool.id} href={`/${locale}/tools?tool=${tool.id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#64748b44'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                    <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{tool.name}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>{tool.apiTool ? 'AI驱动' : '免费'}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Ad placeholder */}
        <div className="ad-slot-home" style={{ marginTop: 24, minHeight: 90, borderRadius: 10, border: '1px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)', fontSize: '0.72rem' }}>
          广告位
        </div>

      </div>
    </div>
  );
}
