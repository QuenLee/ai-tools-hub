import { tools, categories } from '@/lib/data';
import Link from 'next/link';
import Favicon from '@/app/components/Favicon';
import { IconFire, IconFree, IconCompare } from '@/app/components/icons/Icons';

export const metadata = {
  title: '横评对比 - AI工具情报站',
  description: '同类AI工具横向对比评测，帮你选出最适合的',
};

function getScoreColor(score) {
  if (score >= 90) return '#34d399';
  if (score >= 80) return '#fbbf24';
  if (score >= 70) return '#f87171';
  return '#888';
}

export default function ComparePage() {
  const comparisons = categories
    .filter(c => tools.filter(t => t.category === c.id).length >= 2)
    .map(cat => ({
      ...cat,
      tools: tools
        .filter(t => t.category === cat.id)
        .sort((a, b) => {
          const avgA = (a.scores.usefulness + a.scores.value + a.scores.ease) / 3;
          const avgB = (b.scores.usefulness + b.scores.value + b.scores.ease) / 3;
          return avgB - avgA;
        }),
    }));

  return (
    <div className="page" style={{ padding: '32px 24px 80px' }}>
      <div className="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        横评对比
      </div>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <IconCompare size={24} /> 横评对比
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>同类工具放一起看，谁更好一目了然</p>

      <div className="topic-grid" style={{ marginBottom: 40 }}>
        <Link href="/compare/china-ai" className="topic-card">
          <div className="topic-badge"><IconFire size={12} /> 热门专题</div>
          <div className="topic-title">DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评</div>
          <div className="topic-desc">8大场景深度对比，看完你就知道选哪个 →</div>
        </Link>
      </div>

      {comparisons.map(comp => (
        <div key={comp.id} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>
            {comp.name}工具横评
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>工具</th>
                  <th>实用性</th>
                  <th>性价比</th>
                  <th>易用性</th>
                  <th>价格</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {comp.tools.map(tool => (
                  <tr key={tool.id}>
                    <td>
                      <Link href={`/tool/${tool.id}`} style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Favicon domain={tool.favicon} name={tool.name} size={18} />
                        {tool.name}
                      </Link>
                    </td>
                    <td style={{ color: getScoreColor(tool.scores.usefulness) }}>{tool.scores.usefulness}</td>
                    <td style={{ color: getScoreColor(tool.scores.value) }}>{tool.scores.value}</td>
                    <td style={{ color: getScoreColor(tool.scores.ease) }}>{tool.scores.ease}</td>
                    <td>
                      <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`}>
                        {tool.pricing.price}
                      </span>
                    </td>
                    <td>
                      <Link href={`/tool/${tool.id}`} style={{ fontSize: '0.82rem' }}>评测 →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
