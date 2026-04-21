'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { t } from '@/lib/i18n';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconFree, IconPaid, IconChevronRight, IconGift, categoryIcons } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// SEO热点新闻
const newsItems = [
  { title: 'DeepSeek R2 开源发布：推理能力再破纪录，完全免费使用', time: '2小时前', tag: 'hot' },
  { title: 'ChatGPT o3 模型上线：推理能力超越人类专家水平', time: '3小时前', tag: 'new' },
  { title: '豆包大模型升级：视频生成+实时语音全免费开放', time: '5小时前', tag: 'hot' },
  { title: 'Cursor 1.0 正式发布：Vibe Coding 效率提升10倍', time: '8小时前', tag: 'new' },
  { title: 'Kimi 长文本突破200万字：论文分析PDF阅读最强工具', time: '12小时前', tag: 'hot' },
  { title: 'Sora 正式开放：AI视频生成进入全民时代', time: '1天前', tag: 'new' },
  { title: 'Midjourney V8 发布：AI绘画质量再次大幅飞跃', time: '1天前' },
  { title: '通义千问 Qwen3 开源：编程能力超越GPT-4o', time: '2天前', tag: 'new' },
];

export default function Home() {
  const { locale } = useParams();
  const [activeCat, setActiveCat] = useState('all');
  const filteredTools = activeCat === 'all' ? tools : getToolsByCategory(activeCat);
  const totalTools = tools.length;
  const freeTools = tools.filter(tool => tool.pricing.free).length;

  const rankingData = {
    overall: [...tools].sort((a, b) => {
      const avgA = (a.scores.usefulness + a.scores.value + a.scores.ease) / 3;
      const avgB = (b.scores.usefulness + b.scores.value + b.scores.ease) / 3;
      return avgB - avgA;
    }).slice(0, 5),
    image: getToolsByCategory('image').slice(0, 5),
    video: getToolsByCategory('video').slice(0, 5),
    dev: getToolsByCategory('code').slice(0, 5),
  };

  const hotIds = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'cursor', 'suno'];
  const hotTools = hotIds.map(id => tools.find(tool => tool.id === id)).filter(Boolean);

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <h1>{t(locale, 'site.name')}</h1>
        <p>{t(locale, 'site.slogan')}</p>
        <p className="hero-sub">{t(locale, 'site.description')}</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{totalTools}+</div>
            <div className="hero-stat-label">{t(locale, 'home.allReviews')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{freeTools}</div>
            <div className="hero-stat-label">{t(locale, 'home.freeUsable')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{categories.length + 1}</div>
            <div className="hero-stat-label">{t(locale, 'home.categories')}</div>
          </div>
        </div>
      </section>

      {/* ==================== 热门专题（SEO+引流）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> 热门专题</h2>
          <Link href={`/${locale}/compare`} className="section-more">更多专题 <IconChevronRight size={12} /></Link>
        </div>
        <div className="topic-grid">
          <Link href={`/${locale}/compare/china-ai`} className="topic-card">
            <div className="topic-badge"><IconFire size={12} /> 热门专题</div>
            <div className="topic-title">DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评</div>
            <div className="topic-desc">8大场景深度对比，看完你就知道选哪个 →</div>
          </Link>
          <Link href={`/${locale}/tools`} className="topic-card">
            <div className="topic-badge" style={{ background: 'rgba(124,92,252,0.1)', color: 'var(--accent2)' }}>实用工具</div>
            <div className="topic-title">AI模型选型器 + API费用计算器</div>
            <div className="topic-desc">选场景→推荐模型，算成本→比价格，一键搞定 →</div>
          </Link>
          <Link href={`/${locale}/models`} className="topic-card">
            <div className="topic-badge" style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--blue)' }}>模型对比</div>
            <div className="topic-title">2026年AI大模型排行榜：15个模型横评</div>
            <div className="topic-desc">MMLU/代码能力/价格全维度对比 →</div>
          </Link>
          <Link href={`/${locale}/tutorials`} className="topic-card">
            <div className="topic-badge" style={{ background: 'rgba(52,211,153,0.1)', color: 'var(--green)' }}>免费合集</div>
            <div className="topic-title">免费AI工具大全：不花钱也能用上顶级AI</div>
            <div className="topic-desc">30+完全免费的AI工具，写作/绘画/编程/视频全覆盖 →</div>
          </Link>
        </div>
      </section>

      {/* ==================== 大家都在用（热门工具快速入口）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> 大家都在用</h2>
        </div>
        <div className="usage-grid">
          {hotTools.map(tool => (
            <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="usage-card">
              <Favicon domain={tool.favicon} name={tool.name} size={40} />
              <div>
                <div className="usage-name">{tool.name}</div>
                <div className="usage-desc">{tool.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== 三列卡（开发者+免费部署+模型训练）==================== */}
      <section className="section">
        <div className="three-col-grid">
          <div className="three-col-card">
            <h3 className="three-col-title">开发者必备</h3>
            {tools.filter(tool => tool.category === 'code').slice(0, 5).map(tool => (
              <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="mini-tool-row">
                <Favicon domain={tool.favicon} name={tool.name} size={22} />
                <span>{tool.name}</span>
                <span className="mini-tool-tag">{tool.pricing.free ? '免费' : '付费'}</span>
              </Link>
            ))}
          </div>
          <div className="three-col-card">
            <h3 className="three-col-title">免费部署平台</h3>
            <FreeDeployList />
          </div>
          <div className="three-col-card">
            <h3 className="three-col-title">模型训练</h3>
            {[
              { name: 'Ollama', domain: 'ollama.com' },
              { name: 'Google Colab', domain: 'colab.research.google.com' },
              { name: '百度飞桨', domain: 'aistudio.baidu.com' },
              { name: 'Hugging Face', domain: 'huggingface.co' },
            ].map(p => (
              <a key={p.domain} href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer" className="mini-tool-row">
                <Favicon domain={p.domain} name={p.name} size={22} />
                <span>{p.name}</span>
                <span className="mini-tool-tag free">免费</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI变现攻略 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> AI变现攻略</h2>
          <Link href={`/${locale}/tutorials`} className="section-more">更多教程 <IconChevronRight size={12} /></Link>
        </div>
        <div className="money-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <Link href={`/${locale}/tutorials`} className="money-card" style={{ borderLeft: '3px solid var(--pink)' }}>
            <div className="money-badge" style={{ background: 'rgba(244,114,182,0.1)', color: 'var(--pink)' }}>内容创作</div>
            <div className="money-title">AI二创IP变现：从流量爆款到实物变现</div>
            <div className="money-views">12.3K 阅读 · 入门级</div>
          </Link>
          <Link href={`/${locale}/tutorials`} className="money-card" style={{ borderLeft: '3px solid var(--cyan)' }}>
            <div className="money-badge" style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)' }}>开发变现</div>
            <div className="money-title">利用AI自动化搭建SaaS，实现日入$200</div>
            <div className="money-views">49.0K 阅读 · 专业级</div>
          </Link>
          <Link href={`/${locale}/tutorials`} className="money-card" style={{ borderLeft: '3px solid var(--yellow)' }}>
            <div className="money-badge" style={{ background: 'rgba(251,191,36,0.1)', color: 'var(--yellow)' }}>自媒体</div>
            <div className="money-title">AI视频起号：零粉到万粉爆款玩法</div>
            <div className="money-views">32.6K 阅读 · 入门级</div>
          </Link>
          <Link href={`/${locale}/tutorials`} className="money-card" style={{ borderLeft: '3px solid var(--accent2)' }}>
            <div className="money-badge" style={{ background: 'rgba(124,92,252,0.1)', color: 'var(--accent2)' }}>自由职业</div>
            <div className="money-title">用Cursor做自由职业：接单实战攻略</div>
            <div className="money-views">22.8K 阅读 · 进阶级</div>
          </Link>
        </div>
      </section>

      {/* ==================== 免费白嫖指南 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconGift size={18} style={{ color: 'var(--green)' }} /> 免费白嫖指南</h2>
          <Link href={`/${locale}/deals`} className="section-more">全部优惠 <IconChevronRight size={12} /></Link>
        </div>
        <div className="deals-preview">
          {[
            { name: 'DeepSeek', domain: 'chat.deepseek.com', price: '完全免费', id: 'deepseek' },
            { name: '豆包', domain: 'www.doubao.com', price: '完全免费', id: 'doubao' },
            { name: 'TRAE', domain: 'www.trae.ai', price: '完全免费', id: null },
            { name: 'Cursor', domain: 'cursor.com', price: '免费2000次/月', id: 'cursor' },
            { name: '通义千问', domain: 'tongyi.aliyun.com', price: 'API送100万tokens', id: 'qwen' },
            { name: 'Suno', domain: 'suno.com', price: '免费10首/天', id: 'suno' },
          ].map(deal => (
            <Link key={deal.name} href={deal.id ? `/${locale}/tool/${deal.id}` : `/${locale}/deals`} className="deal-mini">
              <Favicon domain={deal.domain} name={deal.name} size={22} />
              <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{deal.name}</span>
              <span style={{ color: 'var(--green)', fontSize: '0.78rem', marginLeft: 'auto' }}>{deal.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== AI今日要闻（精简3条）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> AI今日要闻</h2>
          <Link href={`/${locale}/news`} className="section-more">{t(locale, 'home.viewMore')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="news-list">
          {newsItems.slice(0, 3).map((item, i) => (
            <div key={i} className="news-item">
              <span className="news-dot" />
              <span className="news-title">{item.title}</span>
              {item.tag && <span className={`news-tag ${item.tag}`}>{item.tag === 'hot' ? '热' : '新'}</span>}
              <span className="news-time">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 月排行榜 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> 月排行榜</h2>
          <Link href={`/${locale}/products`} className="section-more">{t(locale, 'home.fullList')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="ranking-grid">
          <RankingColumn title="总排行" items={rankingData.overall} locale={locale} />
          <RankingColumn title="图像工具" items={rankingData.image} locale={locale} />
          <RankingColumn title="视频工具" items={rankingData.video} locale={locale} />
          <RankingColumn title="开发工具" items={rankingData.dev} locale={locale} />
        </div>
      </section>

      {/* ==================== 近期热门推荐（工具评测卡）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> {t(locale, 'home.recentHot')}</h2>
          <Link href={`/${locale}/products`} className="section-more">{t(locale, 'home.fullList')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="tool-grid">
          {filteredTools.slice(0, 12).map(tool => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

    </div>
  );
}

function RankingColumn({ title, items, locale }) {
  return (
    <div className="ranking-col">
      <div className="ranking-col-title">{title}</div>
      {items.map((tool, i) => (
        <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="ranking-item">
          <span className={`ranking-num ${i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : ''}`}>#{i + 1}</span>
          <Favicon domain={tool.favicon} name={tool.name} size={18} />
          <span className="ranking-name">{tool.name}</span>
        </Link>
      ))}
      <Link href={`/${locale}/products`} className="ranking-more">查看完整榜单 →</Link>
    </div>
  );
}

function FreeDeployList() {
  const platforms = [
    { name: 'Vercel', domain: 'vercel.com' },
    { name: 'Hugging Face', domain: 'huggingface.co' },
    { name: 'Railway', domain: 'railway.app' },
    { name: 'Render', domain: 'render.com' },
    { name: 'Cloudflare Pages', domain: 'pages.cloudflare.com' },
    { name: 'GitHub Pages', domain: 'pages.github.com' },
  ];
  return platforms.map(p => (
    <a key={p.domain} href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer" className="mini-tool-row">
      <Favicon domain={p.domain} name={p.name} size={22} />
      <span>{p.name}</span>
      <span className="mini-tool-tag free">免费</span>
    </a>
  ));
}

function ToolCard({ tool, locale }) {
  const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  return (
    <Link href={`/${locale}/tool/${tool.id}`} className="tool-card">
      <div className="tool-header">
        <Favicon domain={tool.favicon} name={tool.name} size={36} />
        <span className="tool-name">
          {tool.name}
          {['deepseek', 'doubao', 'cursor', 'chatgpt', 'kimi'].includes(tool.id) && (
            <span className="hot-tag"><IconFire size={9} /></span>
          )}
        </span>
      </div>
      <div className="tool-tagline">{tool.tagline}</div>
      <div className="feature-tags">
        {tool.features.slice(0, 3).map(f => <span key={f} className="feature-tag">{f}</span>)}
      </div>
      <div className="tool-meta">
        <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`}>
          {tool.pricing.free ? <><IconFree /> {tool.pricing.price}</> : <><IconPaid /> {tool.pricing.price}</>}
        </span>
        <span className="tool-score" style={{ color: getScoreColor(avg) }}>{avg}分</span>
      </div>
    </Link>
  );
}
