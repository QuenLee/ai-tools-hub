'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { tutorials } from '@/lib/tutorials';
import Favicon from '@/components/Favicon';

const catOrder = ['内容创作', '开发变现', '自媒体运营', '工具教程', 'Prompt技巧'];
const catColors = {
  '内容创作': 'var(--pink)',
  '开发变现': 'var(--cyan)',
  '自媒体运营': 'var(--yellow)',
  '工具教程': 'var(--accent2)',
  'Prompt技巧': 'var(--green)',
};
const catDescs = {
  '内容创作': '用AI做内容、涨粉、变现的完整路线',
  '开发变现': '程序员用AI做产品、接单、赚美元',
  '自媒体运营': 'AI辅助起号、做内容、涨粉丝',
  '工具教程': '热门AI工具从入门到精通',
  'Prompt技巧': '让AI输出质量翻倍的提示词方法',
};

export default function TutorialsPage() {
  const { locale } = useParams();

  const grouped = {};
  for (const t of tutorials) {
    if (!grouped[t.cat]) grouped[t.cat] = [];
    grouped[t.cat].push(t);
  }

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a><span>/</span>AI变现攻略
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI变现攻略</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>从0到1的AI赚钱实战教程，涵盖创作、开发、自媒体、工具使用和Prompt技巧</p>

      {catOrder.filter(cat => grouped[cat]).map(cat => (
        <div key={cat} style={{ marginBottom: 36 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6,
          }}>
            <span style={{ width: 4, height: 22, borderRadius: 2, background: catColors[cat], display: 'inline-block' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{cat}</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: 16, paddingLeft: 14 }}>{catDescs[cat]}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {grouped[cat].map(t => (
              <Link key={t.slug} href={`/${locale}/tutorial/${t.slug}`} style={{
                display: 'block', padding: '18px 20px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)',
                textDecoration: 'none', color: 'var(--text)', transition: 'all 0.25s',
                borderLeft: `3px solid ${catColors[cat]}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{
                    fontSize: '0.62rem', padding: '2px 8px', borderRadius: 6,
                    background: t.difficulty === '入门级' ? 'rgba(52,211,153,0.08)' : t.difficulty === '进阶级' ? 'rgba(251,191,36,0.08)' : 'rgba(124,92,252,0.08)',
                    color: t.difficulty === '入门级' ? 'var(--green)' : t.difficulty === '进阶级' ? 'var(--yellow)' : 'var(--accent2)',
                    fontWeight: 600,
                  }}>{t.difficulty}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{t.time}</span>
                </div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.desc}</p>
                <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text3)' }}>{t.views} 阅读</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
