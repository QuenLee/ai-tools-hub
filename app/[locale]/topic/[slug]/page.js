import { topics } from '@/lib/topics';
import { tools as allTools } from '@/lib/data';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconChevronRight, IconGift, IconCheck, IconArrowLeft } from '@/components/icons/Icons';
import Link from 'next/link';

export async function generateStaticParams() {
  return topics.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = topics.find(t => t.slug === slug);
  if (!topic) return { title: '专题未找到' };
  return {
    title: `${topic.title} | Quen's AI`,
    description: topic.desc,
    keywords: topic.keywords,
    openGraph: {
      title: topic.title,
      description: topic.desc,
      type: 'article',
    },
  };
}

export default async function TopicPage({ params }) {
  const { locale, slug } = await params;
  const topic = topics.find(t => t.slug === slug);
  if (!topic) return <div style={{ padding: 40 }}>专题未找到</div>;

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        {/* 面包屑 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.82rem', color: 'var(--text3)' }}>
          <Link href={`/${locale}`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>首页</Link>
          <span>/</span>
          <span>热门专题</span>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{topic.title.slice(0, 20)}…</span>
        </div>

        {/* 标题区 */}
        <div style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-block', fontSize: '0.72rem', padding: '3px 10px', borderRadius: 6,
            background: topic.badgeBg, color: topic.badgeColor, fontWeight: 600, marginBottom: 12,
          }}>
            {topic.badge}
          </span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.4, marginBottom: 8 }}>{topic.title}</h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 8 }}>{topic.desc}</p>
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>更新于 {topic.date} · Quen&apos;s AI</div>
        </div>

        {/* 正文区 */}
        <article style={{ maxWidth: 720 }}>
          {topic.sections.map((section, i) => (
            <section key={i} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--border)' }}>
                {i + 1}. {section.title}
              </h2>
              <div style={{
                fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text2)', whiteSpace: 'pre-wrap',
              }}>{section.content}</div>
            </section>
          ))}
        </article>

        {/* 推荐工具 */}
        {topic.relatedTools && topic.relatedTools.length > 0 && (
          <div style={{ marginTop: 40, padding: '24px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>本文涉及工具</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {topic.relatedTools.map(toolId => {
                const tool = allTools.find(t => t.id === toolId);
                return (
                  <Link key={toolId} href={`/${locale}/tool/${toolId}`} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
                    background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                    textDecoration: 'none', color: 'var(--text)', fontSize: '0.86rem', fontWeight: 500,
                    transition: 'all 0.2s',
                  }}>
                    {tool ? <>
                      <Favicon domain={tool.favicon} name={tool.name} size={18} />
                      {tool.name}
                    </> : toolId}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 返回首页 */}
        <div style={{ marginTop: 32 }}>
          <Link href={`/${locale}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent2)',
            fontSize: '0.88rem', textDecoration: 'none',
          }}>
            <IconArrowLeft size={14} /> 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
