import { tools } from '@/lib/data';

export const metadata = {
  title: 'AI工具优惠 - AI工具情报站',
  description: '收集各AI工具的最新优惠、促销和终身deal',
};

const deals = [
  {
    name: 'Notion AI',
    desc: '笔记+AI写作，最佳办公写作组合',
    original: '$20/月',
    current: '免费体验',
    url: 'https://ntn.so/aitools',
    tag: '🔥 推荐',
  },
  {
    name: 'Cursor Pro',
    desc: 'AI编程IDE，Vibe Coding首选',
    original: '$20/月',
    current: '免费2000次/月',
    url: 'https://cursor.com',
    tag: '🆓 免费版',
  },
  {
    name: 'TRAE',
    desc: '字节跳动AI编程IDE，完全免费',
    original: '—',
    current: '完全免费',
    url: 'https://www.trae.ai',
    tag: '🆓 永久免费',
  },
  {
    name: 'Kimi',
    desc: '200万字超长上下文AI助手',
    original: '—',
    current: '完全免费',
    url: 'https://kimi.moonshot.cn',
    tag: '🆓 永久免费',
  },
  {
    name: '通义千问',
    desc: '阿里AI助手，API送100万tokens',
    original: '—',
    current: 'API免费100万tokens',
    url: 'https://tongyi.aliyun.com',
    tag: '🆓 开发者福利',
  },
  {
    name: '秘塔AI搜索',
    desc: '无广告AI搜索，直达结果',
    original: '¥12/月',
    current: '免费版够用',
    url: 'https://metaso.cn',
    tag: '🆓 免费版',
  },
];

export default function DealsPage() {
  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>🎁 AI工具优惠</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 30 }}>最新优惠、免费额度和限时deal</p>

      {deals.map(deal => (
        <a key={deal.name} href={deal.url} target="_blank" rel="noopener noreferrer" className="deal-card" style={{ textDecoration: 'none', color: 'var(--text)', display: 'flex' }}>
          <div className="deal-info">
            <h3>{deal.tag} {deal.name}</h3>
            <p>{deal.desc}</p>
          </div>
          <div className="deal-price">
            {deal.original !== '—' && <div className="deal-original">{deal.original}</div>}
            <div className="deal-current">{deal.current}</div>
          </div>
        </a>
      ))}

      <div style={{ marginTop: 40, padding: 24, background: 'var(--surface)', borderRadius: 14, border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: 12 }}>💡 优惠说明</h3>
        <ul style={{ color: 'var(--text2)', fontSize: '0.9rem', paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>带 🔥 标记的是我们推荐的优惠，通过链接注册我们可能获得少量佣金（不影响您的价格）</li>
          <li style={{ marginBottom: 8 }}>免费额度信息基于官方公开信息，实际可能有变动</li>
          <li style={{ marginBottom: 8 }}>如果您发现优惠已过期，欢迎告知我们更新</li>
        </ul>
      </div>
    </div>
  );
}
