import { categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import Link from 'next/link';
import Favicon from '@/components/Favicon';
import { IconFree, IconPaid, categoryIcons } from '@/components/icons/Icons';

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = categories.find(c => c.id === slug);
  return {
    title: `${cat?.name || '分类'} - Quen's AI`,
    description: `${cat?.name}类AI工具评测合集，深度评测帮你选对不花冤枉钱`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug, locale } = await params;
  const cat = categories.find(c => c.id === slug);
  const catTools = getToolsByCategory(slug);
  const CatIcon = categoryIcons[slug];

  if (!cat) return <div className="empty">分类未找到</div>;

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a>
        <span>/</span>
        <a href={`/${locale}/products`}>AI产品</a>
        <span>/</span>
        {cat.name}
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
        {CatIcon && <CatIcon size={24} />}
        {cat.name}
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>共 {catTools.length} 个工具评测</p>
      <div className="tool-grid">
        {catTools.map(tool => {
          const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
          return (
            <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="tool-card">
              <div className="tool-header">
                <Favicon domain={tool.favicon} name={tool.name} size={34} />
                <span className="tool-name">{tool.name}</span>
              </div>
              <div className="tool-tagline">{tool.tagline}</div>
              <div className="feature-tags">
                {tool.features.slice(0, 3).map(f => (
                  <span key={f} className="feature-tag">{f}</span>
                ))}
              </div>
              <div className="tool-meta">
                <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`}>
                  {tool.pricing.free ? <><IconFree /> {tool.pricing.price}</> : <><IconPaid /> {tool.pricing.price}</>}
                </span>
                <span className="tool-score" style={{ color: getScoreColor(avgScore) }}>
                  {avgScore}分
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
