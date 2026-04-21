import { tools, categories } from '@/lib/data';
import Link from 'next/link';

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
    <div style={{ padding: '40px 32px 80px' }}>
      <div className="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        横评对比
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>⚔️ 横评对比</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>同类工具放在一起看，谁更好一目了然</p>

      {/* Featured Comparison */}
      <Link href="/compare/china-ai" style={{ textDecoration: 'none', color: 'var(--text)' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(124,92,252,0.1) 0%, rgba(224,64,160,0.08) 100%)',
          border: '1px solid rgba(124,92,252,0.2)',
          borderRadius: 20,
          padding: 28,
          marginBottom: 40,
          cursor: 'pointer',
          transition: 'all 0.3s',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ 
            fontSize: '0.7rem', 
            background: 'var(--gradient1)', 
            color: 'white', 
            display: 'inline-block', 
            padding: '3px 10px', 
            borderRadius: 8, 
            marginBottom: 12, 
            fontWeight: 600 
          }}>
            🔥 热门专题
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
            DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
            三款最火的国产AI助手8大场景深度对比，看完你就知道选哪个 →
          </p>
        </div>
      </Link>

      {/* Category Comparisons */}
      {comparisons.map(comp => (
        <div key={comp.id} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1.15rem', marginBottom: 16 }}>
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
