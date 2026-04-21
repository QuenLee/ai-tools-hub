import { tools, categories, getToolBySlug, getScoreColor, getScoreLabel } from '@/lib/data';
import Link from 'next/link';
import Favicon from '@/app/components/Favicon';
import { IconFree, IconPaid, IconExternal } from '@/app/components/icons/Icons';

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到 | AI工具情报站' };
  return {
    title: `${tool.name} - 深度评测 | AI工具情报站`,
    description: tool.tagline,
  };
}

export default async function ToolDetail({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return <div className="empty">工具未找到</div>;

  const cat = categories.find(c => c.id === tool.category);
  const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);

  return (
    <div className="detail-page">
      <div className="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        <a href={`/category/${tool.category}`}>{cat?.name}</a>
        <span>/</span>
        {tool.name}
      </div>

      <div className="detail-hero">
        <Favicon domain={tool.favicon} name={tool.name} size={64} />
        <div>
          <h1 className="detail-title">{tool.name}</h1>
          <p className="detail-tagline">{tool.tagline}</p>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-main">
          <h2>详细评测</h2>
          <p>{tool.description}</p>

          <h2>核心功能</h2>
          <div className="feature-tags" style={{ marginBottom: 16 }}>
            {tool.features.map(f => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>

          <div className="pros-cons">
            <div>
              <h3 style={{ color: 'var(--green)' }}>优点</h3>
              <ul>{tool.pros.map((p, i) => <li key={i} className="pro-item">{p}</li>)}</ul>
            </div>
            <div>
              <h3 style={{ color: 'var(--yellow)' }}>不足</h3>
              <ul>{tool.cons.map((c, i) => <li key={i} className="con-item">{c}</li>)}</ul>
            </div>
          </div>

          <h2>价格方案</h2>
          <p><strong>免费版：</strong>{tool.pricing.free ? `✅ ${tool.pricing.price}` : '❌ 无免费版'}</p>
          {tool.pricing.paid && <p><strong>付费版：</strong>{tool.pricing.paid}</p>}
        </div>

        <div className="detail-sidebar">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: getScoreColor(avgScore) }}>{avgScore}</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.88rem' }}>综合评分 · {getScoreLabel(avgScore)}</div>
          </div>

          <ScoreBar label="实用性" score={tool.scores.usefulness} />
          <ScoreBar label="性价比" score={tool.scores.value} />
          <ScoreBar label="易用性" score={tool.scores.ease} />

          <a 
            href={tool.affiliate || tool.url} 
            className="visit-btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {tool.affiliate ? '🎉 通过评测链接访问' : '访问官网'} <IconExternal size={14} />
          </a>

          <div style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--text3)', textAlign: 'center' }}>
            评测更新于 {tool.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="score-bar">
      <div className="score-label">
        <span>{label}</span>
        <span style={{ color: getScoreColor(score), fontWeight: 700 }}>{score}</span>
      </div>
      <div className="score-track">
        <div className="score-fill" style={{ width: `${score}%`, background: getScoreColor(score) }} />
      </div>
    </div>
  );
}
