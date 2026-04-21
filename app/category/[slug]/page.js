import { categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import Link from 'next/link';

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = categories.find(c => c.id === slug);
  return {
    title: `${cat?.name || '分类'} - AI工具情报站`,
    description: `${cat?.name}类AI工具评测合集`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = categories.find(c => c.id === slug);
  const catTools = getToolsByCategory(slug);

  if (!cat) return <div className="empty">分类未找到</div>;

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/" style={{ fontSize: '0.9rem', color: 'var(--text2)' }}>← 返回首页</Link>
      </div>

      <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{cat.icon} {cat.name}</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 30 }}>共 {catTools.length} 个工具</p>

      <div className="tool-grid">
        {catTools.map(tool => {
          const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
          return (
            <a key={tool.id} href={`/tool/${tool.id}`} className="tool-card">
              <div className="tool-header">
                <span className="tool-icon">{tool.icon}</span>
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
                  {tool.pricing.free ? '🆓 ' : '💰 '}{tool.pricing.price}
                </span>
                <span className="tool-score" style={{ color: getScoreColor(avgScore) }}>
                  {avgScore}分
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
