import Favicon from '@/components/Favicon';
import { IconFree, IconGift } from '@/components/icons/Icons';

export const metadata = {
  title: 'AI工具优惠 - AI工具情报站',
  description: '收集各AI工具的最新优惠、促销和免费额度',
};

const deals = [
  { name: 'TRAE', desc: '字节跳动AI编程IDE，完全免费无限制', current: '完全免费', domain: 'www.trae.ai', tag: '永久免费' },
  { name: 'DeepSeek', desc: '推理能力最强，完全免费，API超低价', current: '完全免费', domain: 'chat.deepseek.com', tag: '永久免费' },
  { name: '豆包', desc: '字节出品AI助手，免费无限对话', current: '完全免费', domain: 'www.doubao.com', tag: '永久免费' },
  { name: 'Kimi', desc: '200万字超长上下文，免费版够日常用', current: '免费可用', domain: 'kimi.moonshot.cn', tag: '免费版' },
  { name: 'Cursor', desc: 'AI编程IDE，Vibe Coding首选', original: '$20/月', current: '免费2000次/月', domain: 'cursor.com', tag: '免费版' },
  { name: '通义千问', desc: '阿里AI助手，API送100万tokens', current: 'API免费100万tokens', domain: 'tongyi.aliyun.com', tag: '开发者福利' },
  { name: 'Suno', desc: 'AI音乐生成，输入描述即可创作歌曲', original: '$10/月', current: '免费10首/天', domain: 'suno.com', tag: '免费版' },
  { name: '秘塔AI搜索', desc: '无广告AI搜索，直达结果', original: '¥12/月', current: '免费版够用', domain: 'metaso.cn', tag: '免费版' },
];

export default function DealsPage() {
  return (
    <div className="page" style={{ padding: '32px 24px 80px' }}>
      <div className="breadcrumb">
        <a href="/">首页</a>
        <span>/</span>
        优惠专区
      </div>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <IconGift size={24} /> 优惠专区
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>最新免费额度、优惠和限时deal</p>

      {deals.map(deal => (
        <a key={deal.name} href={`https://${deal.domain}`} target="_blank" rel="noopener noreferrer" className="deal-card">
          <div className="deal-info" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Favicon domain={deal.domain} name={deal.name} size={28} />
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {deal.name}
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(52,211,153,0.1)', color: 'var(--green)', fontWeight: 600 }}>
                  <IconFree size={10} /> {deal.tag}
                </span>
              </h3>
              <p>{deal.desc}</p>
            </div>
          </div>
          <div className="deal-price">
            {deal.original && <div className="deal-original">{deal.original}</div>}
            <div className="deal-current">{deal.current}</div>
          </div>
        </a>
      ))}

      <div style={{ 
        marginTop: 28, padding: 20, 
        background: 'var(--surface)', 
        borderRadius: 'var(--radius-sm)', 
        border: '1px solid var(--border)' 
      }}>
        <h3 style={{ marginBottom: 10, fontSize: '0.92rem' }}>说明</h3>
        <ul style={{ color: 'var(--text2)', fontSize: '0.85rem', paddingLeft: 20 }}>
          <li style={{ marginBottom: 6 }}>免费额度基于官方公开信息，实际可能有变动</li>
          <li>如果发现优惠已过期，欢迎告知我们更新</li>
        </ul>
      </div>
    </div>
  );
}
