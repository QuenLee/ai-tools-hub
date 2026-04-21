'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { t } from '@/lib/i18n';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconFree, IconPaid, IconChevronRight, IconRobot, categoryIcons } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const newsItems = [
  { title: '华为硬核上新：Pura90 系列领衔，AI眼镜与阔折叠手机齐亮相', time: '2小时前' },
  { title: '阿里开源 Qwen3.6-35B：30亿激活参数实现编程能力跨越式升级', time: '5小时前' },
  { title: 'Anthropic 发布全新 Claude Opus 4.7，功能显著提升', time: '8小时前' },
  { title: 'Midjourney V8.1 重磅发布：原生2K高清渲染速度成本双降3倍', time: '12小时前' },
  { title: 'DeepSeek R2 开源：推理能力再破纪录，完全免费', time: '1天前' },
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
      <section className="hero">
        <h1>{t(locale, 'site.name')}</h1>
        <p>{t(locale, 'site.slogan')}</p>
        <p style={{ color: 'var(--text3)', fontSize: '0.86rem', marginTop: 4 }}>{t(locale, 'site.description')}</p>
        <div className="hero-stats">
          <div className="hero-stat-num">{totalTools}+</div>
          <div className="hero-stat-num">{freeTools}</div>
          <div className="hero-stat-num">{categories.length + 1}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 4 }}>
          <div className="hero-stat-label">{t(locale, 'home.allReviews')}</div>
          <div className="hero-stat-label">{t(locale, 'home.freeUsable')}</div>
          <div className="hero-stat-label">{t(locale, 'home.categories')}</div>
        </div>
      </section>

      {/* AI今日要闻 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{t(locale, 'home.todayNews')}</h2>
          <Link href={`/${locale}/news`} className="section-more">{t(locale, 'home.viewMore')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="news-list">
          {newsItems.map((item, i) => (
            <div key={i} className="news-item">
              <span className="news-dot" />
              <span className="news-title">{item.title}</span>
              <span className="news-time">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 月排行榜 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{t(locale, 'home.monthlyRank')}</h2>
          <Link href={`/${locale}/products`} className="section-more">{t(locale, 'home.fullList')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="ranking-grid">
          <RankingColumn title={t(locale, 'home.totalRank')} items={rankingData.overall} locale={locale} />
          <RankingColumn title={t(locale, 'home.imageTools')} items={rankingData.image} locale={locale} />
          <RankingColumn title={t(locale, 'home.videoTools')} items={rankingData.video} locale={locale} />
          <RankingColumn title={t(locale, 'home.devTools')} items={rankingData.dev} locale={locale} />
        </div>
      </section>

      {/* 大家都在用 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{t(locale, 'home.everyoneUsing')}</h2>
        </div>
        <div className="usage-tabs">
          {['热门', '办公', '自媒体', '教育', '设计'].map((tab, i) => (
            <button key={tab} className={`usage-tab ${i === 0 ? 'active' : ''}`}>{tab}</button>
          ))}
        </div>
        <div className="usage-grid">
          {hotTools.map(tool => (
            <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="usage-card">
              <Favicon domain={tool.favicon} name={tool.name} size={36} />
              <div>
                <div className="usage-name">{tool.name}</div>
                <div className="usage-desc">{tool.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 近期热门推荐 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> {t(locale, 'home.recentHot')}</h2>
        </div>
        <div className="tool-grid">
          {tools.slice(0, 8).map(tool => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      {/* 开发者必备 + 免费部署 + 模型训练 */}
      <section className="section">
        <div className="three-col-grid">
          <div className="three-col-card">
            <h3 className="three-col-title">{t(locale, 'home.devEssential')}</h3>
            {tools.filter(tool => tool.category === 'code').slice(0, 4).map(tool => (
              <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="mini-tool-row">
                <Favicon domain={tool.favicon} name={tool.name} size={22} />
                <span>{tool.name}</span>
                <span className="mini-tool-tag">{tool.pricing.free ? t(locale, 'product.free') : t(locale, 'product.paid')}</span>
              </Link>
            ))}
          </div>
          <div className="three-col-card">
            <h3 className="three-col-title">{t(locale, 'home.freeDeploy')}</h3>
            <FreeDeployList />
          </div>
          <div className="three-col-card">
            <h3 className="three-col-title">{t(locale, 'home.modelTraining')}</h3>
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

      {/* AI变现指南 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{t(locale, 'home.moneyGuide')}</h2>
          <Link href={`/${locale}/tutorials`} className="section-more">{t(locale, 'home.viewMore')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="money-grid">
          <a href={`/${locale}/tutorials`} className="money-card">
            <div className="money-badge">内容创作</div>
            <div className="money-title">AI二创IP变现：从流量爆款到实物变现</div>
            <div className="money-views">12.3K 阅读</div>
          </a>
          <a href={`/${locale}/tutorials`} className="money-card">
            <div className="money-badge">开发变现</div>
            <div className="money-title">用AI自动化搭建SaaS，实现日入$200</div>
            <div className="money-views">49.0K 阅读</div>
          </a>
          <a href={`/${locale}/tutorials`} className="money-card">
            <div className="money-badge">自媒体</div>
            <div className="money-title">AI视频起号：零粉到万粉爆款玩法</div>
            <div className="money-views">32.6K 阅读</div>
          </a>
        </div>
      </section>

      {/* 省钱指南 */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFree size={18} /> {t(locale, 'home.dealsSection')}</h2>
          <Link href={`/${locale}/deals`} className="section-more">{t(locale, 'home.viewMore')} <IconChevronRight size={12} /></Link>
        </div>
        <div className="deals-preview">
          {tools.filter(tool => tool.pricing.free).slice(0, 5).map(tool => (
            <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="deal-mini">
              <Favicon domain={tool.favicon} name={tool.name} size={22} />
              <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{tool.name}</span>
              <span style={{ color: 'var(--green)', fontSize: '0.78rem', marginLeft: 'auto' }}>{tool.pricing.price}</span>
            </Link>
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
          <span className={`ranking-num ${i < 3 ? 'top' : ''}`}>#{i + 1}</span>
          <Favicon domain={tool.favicon} name={tool.name} size={18} />
          <span className="ranking-name">{tool.name}</span>
        </Link>
      ))}
      <Link href={`/${locale}/products`} className="ranking-more">{title} →</Link>
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
        <Favicon domain={tool.favicon} name={tool.name} size={34} />
        <span className="tool-name">{tool.name}</span>
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
