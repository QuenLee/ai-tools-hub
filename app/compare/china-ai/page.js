import Link from 'next/link';

export const metadata = {
  title: 'DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评 | AI工具情报站',
  description: '三款最火的国产AI助手深度对比：DeepSeek推理最强，豆包生态最全，Kimi长文最强。看完这篇你就知道选哪个。',
};

const contenders = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🔮',
    tagline: '推理之王 · 完全免费',
    scores: { usefulness: 92, value: 100, ease: 88 },
    best: ['推理/数学/逻辑', '性价比（完全免费）', 'API价格业界最低', '开源生态'],
    weak: ['创意写作不如Claude', '偶尔服务器拥挤', '界面功能简单'],
    verdict: '如果你需要强推理、写代码、做数学题，DeepSeek是目前国内最强选择，而且完全免费。',
  },
  {
    id: 'doubao',
    name: '豆包',
    icon: '🟣',
    tagline: '字节出品 · 全能免费',
    scores: { usefulness: 86, value: 95, ease: 92 },
    best: ['完全免费无限用', '字节生态整合（抖音/飞书）', '语音对话体验好', '多模态能力'],
    weak: ['推理深度不如DeepSeek', '长文本不如Kimi', '部分功能还在迭代'],
    verdict: '日常对话、语音交互、办公场景，豆包体验最流畅。免费无限制是最大卖点。',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    icon: '🌙',
    tagline: '长文之王 · 免费够用',
    scores: { usefulness: 87, value: 92, ease: 90 },
    best: ['200万字超长上下文', '网页/PDF深度阅读', '联网搜索能力强', '免费版够日常用'],
    weak: ['推理弱于DeepSeek', '创意写作一般', 'Pro版¥30/月性价比一般'],
    verdict: '需要阅读长文档、论文、报告？Kimi是目前最强的。200万字上下文碾压所有竞品。',
  },
];

const scenarios = [
  { name: '📝 写文章/文案', winner: 'doubao', reason: '豆包中文表达流畅，创意辅助好，免费无限用' },
  { name: '🧮 数学/推理/逻辑', winner: 'deepseek', reason: 'DeepSeek R1推理模型碾压级优势，数学竞赛级水平' },
  { name: '💻 写代码', winner: 'deepseek', reason: 'DeepSeek代码能力接近GPT-4，免费无限用' },
  { name: '📚 读长文档/论文', winner: 'kimi', reason: '200万字上下文，扔一本PDF进去直接问' },
  { name: '🎤 语音对话', winner: 'doubao', reason: '豆包语音体验最自然，实时对话延迟低' },
  { name: '🔍 联网搜索', winner: 'kimi', reason: 'Kimi搜索整合做得最好，引用来源清晰' },
  { name: '💼 办公/飞书', winner: 'doubao', reason: '字节生态直连飞书，办公场景无缝' },
  { name: '🔧 API开发', winner: 'deepseek', reason: 'API价格最低（1元=100万tokens），性价比碾压' },
];

export default function ChinaAICompare() {
  return (
    <div style={{ padding: '40px 32px 80px' }}>
      <div className="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        横评专题
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>
        🔥 DeepSeek vs 豆包 vs Kimi
      </h1>
      <p style={{ color: 'var(--text2)', fontSize: '1rem', marginBottom: 32, maxWidth: 600 }}>
        2026年三款最火国产AI助手深度横评，看完你就知道选哪个
      </p>

      {/* Contenders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
        {contenders.map(c => {
          const avg = Math.round((c.scores.usefulness + c.scores.value + c.scores.ease) / 3);
          return (
            <Link href={`/tool/${c.id}`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 24,
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: '2.5rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{c.tagline}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: avg >= 90 ? '#34d399' : '#fbbf24' }}>{avg}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>综合评分</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.82rem', color: 'var(--text2)' }}>
                  <div>实用性 {c.scores.usefulness}</div>
                  <div>性价比 {c.scores.value}</div>
                  <div>易用性 {c.scores.ease}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Scenario Winners */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: 20, color: 'var(--accent3)' }}>
        🎯 场景选谁？一张表看懂
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>使用场景</th>
              <th>推荐</th>
              <th>理由</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map(s => {
              const winner = contenders.find(c => c.id === s.winner);
              return (
                <tr key={s.name}>
                  <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{s.name}</td>
                  <td>
                    <Link href={`/tool/${winner.id}`} style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: 'rgba(124,92,252,0.1)', padding: '4px 12px',
                      borderRadius: 8, fontWeight: 600, fontSize: '0.88rem',
                    }}>
                      {winner.icon} {winner.name}
                    </Link>
                  </td>
                  <td style={{ color: 'var(--text2)', fontSize: '0.85rem' }}>{s.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Deep Analysis */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: 20, color: 'var(--accent3)' }}>
        📊 深度分析
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 40 }}>
        {contenders.map(c => (
          <div key={c.id} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 24,
          }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 16 }}>
              {c.icon} {c.name}
            </h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600, marginBottom: 8 }}>✅ 最强项</div>
              {c.best.map(b => (
                <div key={b} style={{ fontSize: '0.85rem', color: 'var(--text2)', padding: '4px 0 4px 20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0 }}>•</span>{b}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--yellow)', fontWeight: 600, marginBottom: 8 }}>⚠️ 弱项</div>
              {c.weak.map(w => (
                <div key={w} style={{ fontSize: '0.85rem', color: 'var(--text2)', padding: '4px 0 4px 20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0 }}>•</span>{w}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,92,252,0.08) 0%, rgba(224,64,160,0.06) 100%)',
        border: '1px solid rgba(124,92,252,0.15)',
        borderRadius: 16,
        padding: 28,
      }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 16 }}>💡 结论</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {contenders.map(c => (
            <div key={c.id}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.icon} {c.name} — {c.tagline.split('·')[0].trim()}</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.7 }}>{c.verdict}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--surface)', borderRadius: 12, fontSize: '0.88rem', color: 'var(--text2)' }}>
          💰 <strong>省钱建议：</strong>三款都有免费版，建议都注册。日常用豆包，推理/代码用DeepSeek，读长文档用Kimi — 互相补充，一分钱不花。
        </div>
      </div>
    </div>
  );
}
