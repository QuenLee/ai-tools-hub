'use client';

import { useState, useRef } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { t } from '@/lib/i18n';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconFree, IconPaid, IconChevronRight, IconGift, IconChevronLeft, IconCode, IconRocket, IconBrain, IconImage, IconVideo, IconChat, IconSearch } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// "大家都在用"标签页配置
const toolTabs = [
  { id: 'hot', label: '热门工具', icon: IconFire, color: 'var(--red)' },
  { id: 'code', label: '开发必备', icon: IconCode, color: 'var(--cyan)' },
  { id: 'image', label: '图像工具', icon: IconImage, color: 'var(--pink)' },
  { id: 'video', label: '视频工具', icon: IconVideo, color: 'var(--yellow)' },
  { id: 'deploy', label: '免费部署', icon: IconRocket, color: 'var(--green)' },
  { id: 'train', label: '模型训练', icon: IconBrain, color: 'var(--accent2)' },
];

const deployPlatforms = [
  { name: 'Vercel', domain: 'vercel.com', desc: '前端部署首选' },
  { name: 'Hugging Face', domain: 'huggingface.co', desc: 'AI模型托管' },
  { name: 'Cloudflare Pages', domain: 'pages.cloudflare.com', desc: '边缘计算部署' },
  { name: 'GitHub Pages', domain: 'pages.github.com', desc: '静态站托管' },
  { name: 'Railway', domain: 'railway.app', desc: '全栈部署' },
  { name: 'Render', domain: 'render.com', desc: 'Web服务部署' },
];

const trainTools = [
  { name: 'Ollama', domain: 'ollama.com', desc: '本地运行大模型' },
  { name: 'Google Colab', domain: 'colab.research.google.com', desc: '免费GPU笔记本' },
  { name: '百度飞桨', domain: 'aistudio.baidu.com', desc: '国产深度学习' },
  { name: 'Hugging Face', domain: 'huggingface.co', desc: '模型训练微调' },
];

// 免费白嫖数据
const freeDeals = [
  { name: 'DeepSeek', domain: 'chat.deepseek.com', price: '完全免费', tag: '永久免费', id: 'deepseek' },
  { name: '豆包', domain: 'www.doubao.com', price: '完全免费', tag: '永久免费', id: 'doubao' },
  { name: 'TRAE', domain: 'www.trae.ai', price: '完全免费', tag: '永久免费', id: null },
  { name: 'Cursor', domain: 'cursor.com', price: '免费2000次/月', tag: '免费额度', id: 'cursor' },
  { name: '通义千问', domain: 'tongyi.aliyun.com', price: 'API送100万tokens', tag: '开发者福利', id: 'qwen' },
  { name: 'Suno', domain: 'suno.com', price: '免费10首/天', tag: '免费额度', id: 'suno' },
  { name: 'Kimi', domain: 'kimi.moonshot.cn', price: '免费可用', tag: '免费版', id: 'kimi' },
  { name: '秘塔AI搜索', domain: 'metaso.cn', price: '免费版够用', tag: '免费版', id: null },
  { name: 'ChatGPT', domain: 'chatgpt.com', price: '免费版可用', tag: '免费版', id: 'chatgpt' },
  { name: 'Claude', domain: 'claude.ai', price: '免费版可用', tag: '免费版', id: 'claude' },
];

export default function Home() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('hot');
  const topicScrollRef = useRef(null);

  const hotIds = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'cursor', 'suno'];
  const hotTools = hotIds.map(id => tools.find(tool => tool.id === id)).filter(Boolean);

  const topicScroll = (dir) => {
    if (topicScrollRef.current) {
      topicScrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  // 获取当前标签的工具列表
  const getCurrentTools = () => {
    if (activeTab === 'hot') return hotTools;
    if (activeTab === 'deploy') return null; // 特殊处理
    if (activeTab === 'train') return null; // 特殊处理
    return getToolsByCategory(activeTab);
  };

  const currentTools = getCurrentTools();
  const isSpecialTab = activeTab === 'deploy' || activeTab === 'train';

  return (
    <div className="page">
      {/* ==================== Hero：只保留统计数字 ==================== */}
      <section style={{ marginBottom: 24, display: 'flex', gap: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '10px 24px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', minWidth: 100 }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent2)' }}>{tools.length}+</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>工具评测</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px 24px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', minWidth: 100 }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--green)' }}>{tools.filter(t => t.pricing.free).length}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>免费可用</div>
        </div>
        <div style={{ textAlign: 'center', padding: '10px 24px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', minWidth: 100 }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--yellow)' }}>{categories.length + 1}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>分类</div>
        </div>
      </section>

      {/* ==================== 热门专题 — 横向轮播 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> 热门专题</h2>
          <Link href={`/${locale}/compare`} className="section-more">更多专题 <IconChevronRight size={12} /></Link>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => topicScroll(-1)} style={{
            position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2, boxShadow: 'var(--shadow-card)',
          }}>
            <IconChevronLeft size={14} />
          </button>
          <button onClick={() => topicScroll(1)} style={{
            position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2, boxShadow: 'var(--shadow-card)',
          }}>
            <IconChevronRight size={14} />
          </button>
          <div ref={topicScrollRef} style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            padding: '4px 36px', scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            <Link href={`/${locale}/compare/china-ai`} style={{ flex: '0 0 280px', scrollSnapAlign: 'start', textDecoration: 'none' }}>
              <div className="topic-card" style={{ height: '100%', margin: 0 }}>
                <div className="topic-badge"><IconFire size={12} /> 热门专题</div>
                <div className="topic-title">DeepSeek vs 豆包 vs Kimi — 2026国产AI助手横评</div>
                <div className="topic-desc">8大场景深度对比，看完你就知道选哪个 →</div>
              </div>
            </Link>
            <Link href={`/${locale}/tools`} style={{ flex: '0 0 280px', scrollSnapAlign: 'start', textDecoration: 'none' }}>
              <div className="topic-card" style={{ height: '100%', margin: 0, }}>
                <div className="topic-badge" style={{ background: 'rgba(124,92,252,0.1)', color: 'var(--accent2)' }}>实用工具</div>
                <div className="topic-title">AI模型选型器 + API费用计算器</div>
                <div className="topic-desc">选场景→推荐模型，算成本→比价格 →</div>
              </div>
            </Link>
            <Link href={`/${locale}/models`} style={{ flex: '0 0 280px', scrollSnapAlign: 'start', textDecoration: 'none' }}>
              <div className="topic-card" style={{ height: '100%', margin: 0 }}>
                <div className="topic-badge" style={{ background: 'rgba(96,165,250,0.1)', color: 'var(--blue)' }}>模型对比</div>
                <div className="topic-title">2026年AI大模型排行榜：15个模型横评</div>
                <div className="topic-desc">MMLU/代码能力/价格全维度对比 →</div>
              </div>
            </Link>
            <Link href={`/${locale}/tutorials`} style={{ flex: '0 0 280px', scrollSnapAlign: 'start', textDecoration: 'none' }}>
              <div className="topic-card" style={{ height: '100%', margin: 0 }}>
                <div className="topic-badge" style={{ background: 'rgba(52,211,153,0.1)', color: 'var(--green)' }}>免费合集</div>
                <div className="topic-title">免费AI工具大全：不花钱也能用上顶级AI</div>
                <div className="topic-desc">30+免费工具，写作/绘画/编程/视频全覆盖 →</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 大家都在用 — 标签切换 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> 大家都在用</h2>
        </div>
        {/* 标签栏 */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
          {toolTabs.map(tab => {
            const TabIcon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 'var(--radius-2xs)',
                border: activeTab === tab.id ? `1px solid ${tab.color}` : '1px solid var(--border)',
                background: activeTab === tab.id ? `${tab.color}12` : 'transparent',
                color: activeTab === tab.id ? tab.color : 'var(--text2)',
                fontSize: '0.8rem', fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}>
                <TabIcon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* 标签内容 */}
        {isSpecialTab ? (
          // 部署/训练：用卡片列表
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {(activeTab === 'deploy' ? deployPlatforms : trainTools).map(item => (
              <a key={item.domain} href={`https://${item.domain}`} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--text)',
                boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
              }}>
                <Favicon domain={item.domain} name={item.name} size={24} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{item.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--green)', background: 'rgba(52,211,153,0.08)', padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>免费</span>
              </a>
            ))}
          </div>
        ) : (
          // 工具类：用法卡片网格
          <div className="usage-grid">
            {currentTools.map(tool => (
              <Link key={tool.id} href={`/${locale}/tool/${tool.id}`} className="usage-card">
                <Favicon domain={tool.favicon} name={tool.name} size={40} />
                <div>
                  <div className="usage-name">{tool.name}</div>
                  <div className="usage-desc">{tool.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
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

      {/* ==================== 免费白嫖指南 — 重新布局 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconGift size={18} style={{ color: 'var(--green)' }} /> 免费白嫖指南</h2>
          <Link href={`/${locale}/deals`} className="section-more">全部优惠 <IconChevronRight size={12} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {freeDeals.map(deal => (
            <Link key={deal.name} href={deal.id ? `/${locale}/tool/${deal.id}` : `/${locale}/deals`} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--text)',
              boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
            }}>
              <Favicon domain={deal.domain} name={deal.name} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {deal.name}
                  <span style={{
                    fontSize: '0.62rem', padding: '1px 6px', borderRadius: 4, fontWeight: 600,
                    background: deal.tag === '永久免费' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)',
                    color: deal.tag === '永久免费' ? 'var(--green)' : 'var(--yellow)',
                  }}>{deal.tag}</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text3)' }}>{deal.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
