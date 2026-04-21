'use client';

import { useState, useRef } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { t } from '@/lib/i18n';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconFree, IconPaid, IconChevronRight, IconGift, IconChevronLeft, categoryIcons } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  const scrollRef = useRef(null);
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

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="page">
      {/* ==================== 精简Hero：一行统计 + 标语 ==================== */}
      <section style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{t(locale, 'site.name')}</h1>
            <p style={{ color: 'var(--text2)', fontSize: '0.88rem', margin: '4px 0 0' }}>{t(locale, 'site.slogan')}</p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent2)' }}>{totalTools}+</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>工具评测</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)' }}>{freeTools}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>免费可用</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--yellow)' }}>{categories.length + 1}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>分类</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 热门专题 ==================== */}
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

      {/* ==================== 大家都在用 ==================== */}
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

      {/* ==================== 快捷入口三列卡（优化布局）==================== */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <Link href={`/${locale}/products?cat=code`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '18px 20px',
              boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--cyan)' }} />
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>💻 开发者必备</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {tools.filter(t => t.category === 'code').slice(0, 4).map(tool => (
                  <span key={tool.id} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'var(--surface2)', padding: '4px 10px',
                    borderRadius: 'var(--radius-2xs)', fontSize: '0.76rem',
                  }}>
                    <Favicon domain={tool.favicon} name={tool.name} size={14} />
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
          <a href={`/${locale}/deals`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '18px 20px',
              boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--green)' }} />
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>🚀 免费部署平台</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  { name: 'Vercel', domain: 'vercel.com' },
                  { name: 'Hugging Face', domain: 'huggingface.co' },
                  { name: 'Cloudflare', domain: 'pages.cloudflare.com' },
                  { name: 'GitHub Pages', domain: 'pages.github.com' },
                ].map(p => (
                  <span key={p.domain} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'var(--surface2)', padding: '4px 10px',
                    borderRadius: 'var(--radius-2xs)', fontSize: '0.76rem',
                  }}>
                    <Favicon domain={p.domain} name={p.name} size={14} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </a>
          <a href={`/${locale}/models`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '18px 20px',
              boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent2)' }} />
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: 12 }}>🧠 模型训练</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  { name: 'Ollama', domain: 'ollama.com' },
                  { name: 'Google Colab', domain: 'colab.research.google.com' },
                  { name: '百度飞桨', domain: 'aistudio.baidu.com' },
                  { name: 'Hugging Face', domain: 'huggingface.co' },
                ].map(p => (
                  <span key={p.name} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    background: 'var(--surface2)', padding: '4px 10px',
                    borderRadius: 'var(--radius-2xs)', fontSize: '0.76rem',
                  }}>
                    <Favicon domain={p.domain} name={p.name} size={14} />
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </a>
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

      {/* ==================== 热门推荐 — 横向轮播 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> {t(locale, 'home.recentHot')}</h2>
          <Link href={`/${locale}/products`} className="section-more">{t(locale, 'home.fullList')} <IconChevronRight size={12} /></Link>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scroll(-1)} style={{
            position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2, boxShadow: 'var(--shadow-card)',
          }}>
            <IconChevronLeft size={16} />
          </button>
          <button onClick={() => scroll(1)} style={{
            position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2, boxShadow: 'var(--shadow-card)',
          }}>
            <IconChevronRight size={16} />
          </button>
          <div ref={scrollRef} style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            padding: '4px 40px', scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {tools.slice(0, 20).map(tool => (
              <ScrollToolCard key={tool.id} tool={tool} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* 横向轮播用的紧凑卡片 */
function ScrollToolCard({ tool, locale }) {
  const avg = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);
  return (
    <Link href={`/${locale}/tool/${tool.id}`} style={{
      flex: '0 0 200px', scrollSnapAlign: 'start', textDecoration: 'none', color: 'var(--text)',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '16px 14px',
        boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Favicon domain={tool.favicon} name={tool.name} size={28} />
          <div style={{ fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.3 }}>{tool.name}</div>
        </div>
        <div style={{ fontSize: '0.76rem', color: 'var(--text2)', marginBottom: 10, flex: 1, lineHeight: 1.4 }}>
          {tool.tagline}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className={`tool-price ${tool.pricing.free ? 'free' : 'paid'}`} style={{ fontSize: '0.72rem' }}>
            {tool.pricing.free ? <><IconFree size={10} /> 免费</> : <><IconPaid size={10} /> {tool.pricing.price}</>}
          </span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: getScoreColor(avg) }}>{avg}分</span>
        </div>
      </div>
    </Link>
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
