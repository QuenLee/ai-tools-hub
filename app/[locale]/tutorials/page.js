'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { tutorials } from '@/lib/tutorials';

// 按分类分组
const catOrder = ['内容创作', '开发变现', '自媒体运营', '工具教程', 'Prompt技巧'];
const catColors = {
  '内容创作': 'var(--pink)',
  '开发变现': 'var(--cyan)',
  '自媒体运营': 'var(--yellow)',
  '工具教程': 'var(--accent2)',
  'Prompt技巧': 'var(--green)',
};

export default function TutorialsPage() {
  const { locale } = useParams();

  // 按分类分组
  const grouped = {};
  for (const t of tutorials) {
    if (!grouped[t.cat]) grouped[t.cat] = [];
    grouped[t.cat].push(t);
  }

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a><span>/</span>AI教程
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI教程</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>AI赚钱案例、工具使用教程、Prompt技巧</p>

      {catOrder.filter(cat => grouped[cat]).map(cat => (
        <div key={cat} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 4, height: 20, borderRadius: 2, background: catColors[cat] || 'var(--accent)', display: 'inline-block' }} />
            {cat}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {grouped[cat].map(t => (
              <Link key={t.slug} href={`/${locale}/tutorial/${t.slug}`} className="tutorial-card" style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '18px 22px',
                boxShadow: 'var(--shadow-card)', textDecoration: 'none', color: 'var(--text)',
                display: 'block', transition: 'all 0.25s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
                      {t.title}
                      <span style={{
                        fontSize: '0.65rem', padding: '2px 8px', borderRadius: 6,
                        background: t.difficulty === '入门级' ? 'rgba(52,211,153,0.08)' : t.difficulty === '进阶级' ? 'rgba(251,191,36,0.08)' : 'rgba(124,92,252,0.08)',
                        color: t.difficulty === '入门级' ? 'var(--green)' : t.difficulty === '进阶级' ? 'var(--yellow)' : 'var(--accent2)',
                        fontWeight: 600, marginLeft: 8,
                      }}>{t.difficulty}</span>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5 }}>{t.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{t.views} 阅读</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>{t.time}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
