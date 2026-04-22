import Favicon from '@/components/Favicon';
import { IconFree, IconGift, IconChevronRight } from '@/components/icons/Icons';
import Link from 'next/link';

export const metadata = {
  title: '免费白嫖指南 - AI工具优惠合集 | Quen\'s AI',
  description: '最新AI工具免费额度、优惠和限时deal汇总，每月更新',
};

const deals = [
  { name: 'DeepSeek', desc: '推理能力最强，完全免费，API超低价', current: '完全免费', domain: 'chat.deepseek.com', tag: '永久免费', tagColor: 'var(--green)', id: 'deepseek' },
  { name: '豆包', desc: '字节出品AI助手，免费无限对话+画图+音乐', current: '完全免费', domain: 'www.doubao.com', tag: '永久免费', tagColor: 'var(--green)', id: 'doubao' },
  { name: 'TRAE', desc: '字节跳动AI编程IDE，完全免费无限制', current: '完全免费', domain: 'www.trae.ai', tag: '永久免费', tagColor: 'var(--green)', id: 'trae' },
  { name: 'Kimi', desc: '200万字超长上下文，免费版够日常用', current: '免费可用', domain: 'kimi.moonshot.cn', tag: '免费版', tagColor: 'var(--blue)', id: 'kimi' },
  { name: 'Cursor', desc: 'AI编程IDE，Vibe Coding首选工具', current: '免费2000次/月', domain: 'cursor.com', tag: '免费额度', tagColor: 'var(--yellow)', id: 'cursor' },
  { name: '通义千问', desc: '阿里AI助手，API送100万tokens', current: 'API送100万tokens', domain: 'tongyi.aliyun.com', tag: '开发者福利', tagColor: 'var(--accent2)', id: 'tongyi' },
  { name: 'Suno', desc: 'AI音乐生成，输入描述即可创作歌曲', current: '免费10首/天', domain: 'suno.com', tag: '免费额度', tagColor: 'var(--yellow)', id: 'suno' },
  { name: '秘塔AI搜索', desc: '无广告AI搜索，直达结果', current: '免费版够用', domain: 'metaso.cn', tag: '免费版', tagColor: 'var(--blue)', id: 'metaso' },
  { name: 'ChatGPT', desc: '全球最流行的AI对话助手', current: '免费版可用', domain: 'chatgpt.com', tag: '免费版', tagColor: 'var(--blue)', id: 'chatgpt' },
  { name: 'Claude', desc: 'Anthropic出品，长文本处理最强', current: '免费版可用', domain: 'claude.ai', tag: '免费版', tagColor: 'var(--blue)', id: 'claude' },
  { name: 'Hugging Face', desc: '开源模型社区，免费部署AI应用', current: '完全免费', domain: 'huggingface.co', tag: '永久免费', tagColor: 'var(--green)', id: null },
  { name: 'Google Colab', desc: '免费GPU云端Python笔记本', current: '免费GPU', domain: 'colab.research.google.com', tag: '开发者福利', tagColor: 'var(--accent2)', id: null },
];

const tagGroups = {
  '永久免费': { label: '🟢 永久免费', desc: '完全免费使用，无限制', color: 'var(--green)' },
  '免费额度': { label: '🟡 免费额度', desc: '每月免费次数/数量', color: 'var(--yellow)' },
  '免费版': { label: '🔵 免费版', desc: '有免费版，高级功能付费', color: 'var(--blue)' },
  '开发者福利': { label: '🟣 开发者福利', desc: 'API免费额度等开发者优惠', color: 'var(--accent2)' },
};

export default async function DealsPage({ params }) {
  const { locale } = await params;

  const groupedDeals = {};
  for (const d of deals) {
    if (!groupedDeals[d.tag]) groupedDeals[d.tag] = [];
    groupedDeals[d.tag].push(d);
  }

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a> <span>/</span> 免费白嫖指南
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <IconGift size={24} style={{ color: 'var(--green)' }} /> 免费白嫖指南
      </h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>最新免费额度、优惠和限时deal汇总，每月1号更新</p>

      {/* 按标签分组展示 */}
      {Object.entries(tagGroups).map(([tag, info]) => {
        const group = groupedDeals[tag];
        if (!group || group.length === 0) return null;
        return (
          <div key={tag} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ width: 4, height: 20, borderRadius: 2, background: info.color, display: 'inline-block' }} />
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{info.label}</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>{info.desc}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {group.map(deal => (
                <Link key={deal.name} href={deal.id ? `/${locale}/tool/${deal.id}` : `https://${deal.domain}`}
                  {...(deal.id ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)',
                    textDecoration: 'none', color: 'var(--text)', transition: 'all 0.25s',
                  }}>
                  <Favicon domain={deal.domain} name={deal.name} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 3 }}>{deal.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{deal.desc}</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{
                      fontSize: '0.78rem', fontWeight: 700, color: info.color,
                      background: `${info.color}12`, padding: '4px 10px', borderRadius: 6,
                    }}>{deal.current}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* 说明 */}
      <div style={{ marginTop: 28, padding: 24, background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: 12, fontSize: '0.95rem', fontWeight: 700 }}>📋 说明</h3>
        <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: 6 }}>• 免费额度基于官方公开信息，实际可能有变动</p>
          <p style={{ marginBottom: 6 }}>• 本页面每月1号更新，确保信息准确</p>
          <p>• 如果发现优惠已过期，欢迎告知我们更新</p>
        </div>
      </div>
    </div>
  );
}
