import { tools, categories } from '@/lib/data';
import Link from 'next/link';

export const metadata = {
  title: '横评对比 - AI工具情报站',
  description: '同类AI工具横向对比评测，帮你选出最适合的',
};

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
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>⚔️ 横评对比</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 30 }}>同类工具放在一起看，谁更好一目了然</p>

      {comparisons.map(comp => (
        <div key={comp.id} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 16 }}>
            {comp.icon} {comp.name}工具横评
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
                {comp.tools.map(tool => {
                  const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
                  return (
                    <tr key={tool.id}>
                      <td>
                        <Link href={`/tool/${tool.id}`} style={{ fontWeight: 600 }}>
                          {tool.icon} {tool.name}
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
                        <Link href={`/tool/${tool.id}`} style={{ fontSize: '0.85rem' }}>查看评测 →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function getScoreColor(score) {
  if (score >= 90) return '#00b894';
  if (score >= 80) return '#fdcb6e';
  if (score >= 70) return '#e17055';
  return '#888';
}
