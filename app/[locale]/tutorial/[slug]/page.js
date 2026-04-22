import { tutorials } from '@/lib/tutorials';
import Favicon from '@/components/Favicon';
import { IconArrowLeft, IconFree, IconPaid } from '@/components/icons/Icons';
import Link from 'next/link';

export async function generateStaticParams() {
  return tutorials.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tut = tutorials.find(t => t.slug === slug);
  if (!tut) return { title: '教程未找到' };
  return {
    title: `${tut.title} | Quen's AI`,
    description: tut.desc,
    keywords: tut.keywords,
    openGraph: { title: tut.title, description: tut.desc, type: 'article' },
  };
}

export default async function TutorialDetailPage({ params }) {
  const { locale, slug } = await params;
  const tut = tutorials.find(t => t.slug === slug);
  if (!tut) return <div style={{ padding: 40 }}>教程未找到</div>;

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.82rem', color: 'var(--text3)' }}>
          <Link href={`/${locale}/tutorials`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>AI教程</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{tut.cat}</span>
        </div>

        <div style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-block', fontSize: '0.68rem', padding: '3px 10px', borderRadius: 6,
            background: tut.difficulty === '入门级' ? 'rgba(52,211,153,0.1)' : tut.difficulty === '进阶级' ? 'rgba(251,191,36,0.1)' : 'rgba(124,92,252,0.1)',
            color: tut.difficulty === '入门级' ? 'var(--green)' : tut.difficulty === '进阶级' ? 'var(--yellow)' : 'var(--accent2)',
            fontWeight: 600, marginBottom: 12,
          }}>{tut.difficulty}</span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.4, marginBottom: 8 }}>{tut.title}</h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 8 }}>{tut.desc}</p>
          <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{tut.views} 阅读 · 预计 {tut.time} · 更新于 {tut.date}</div>
        </div>

        <article style={{ maxWidth: 720 }}>
          {tut.sections.map((section, i) => (
            <section key={i} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--border)' }}>
                {i + 1}. {section.title}
              </h2>
              <div style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text2)', whiteSpace: 'pre-wrap' }}>{section.content}</div>
            </section>
          ))}
        </article>

        {tut.relatedTools && tut.relatedTools.length > 0 && (
          <div style={{ marginTop: 40, padding: '24px', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>本教程涉及工具</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {tut.relatedTools.map(id => (
                <Link key={id} href={`/${locale}/tool/${id}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                  background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                  textDecoration: 'none', color: 'var(--text)', fontSize: '0.84rem', fontWeight: 500,
                }}>{id}</Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <Link href={`/${locale}/tutorials`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent2)',
            fontSize: '0.88rem', textDecoration: 'none',
          }}><IconArrowLeft size={14} /> 返回教程列表</Link>
        </div>
      </div>
    </div>
  );
}
