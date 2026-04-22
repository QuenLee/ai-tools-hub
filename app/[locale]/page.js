'use client';

import { useState, useRef } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import { topics } from '@/lib/topics';
import { tutorials } from '@/lib/tutorials';
import { t } from '@/lib/i18n';
import Favicon from '@/components/Favicon';
import { IconStar, IconFire, IconFree, IconPaid, IconChevronRight, IconGift, IconChevronLeft, IconCode, IconRocket, IconBrain, IconImage, IconVideo, IconChat, IconSearch, IconWrite } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Inline IconMusic (not in Icons.js yet)
function IconMusic({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
}

// "大家都在用"标签页配置 — 增加更多分类
const toolTabs = [
  { id: 'hot', label: '热门工具', icon: IconFire, color: 'var(--red)' },
  { id: 'code', label: '开发必备', icon: IconCode, color: 'var(--cyan)' },
  { id: 'chat', label: '对话助手', icon: IconChat, color: 'var(--accent2)' },
  { id: 'writing', label: '写作工具', icon: IconWrite, color: 'var(--pink)' },
  { id: 'image', label: '图像工具', icon: IconImage, color: 'var(--pink)' },
  { id: 'video', label: '视频工具', icon: IconVideo, color: 'var(--yellow)' },
  { id: 'music', label: '音乐工具', icon: IconMusic, color: 'var(--green)' },
  { id: 'search', label: 'AI搜索', icon: IconSearch, color: 'var(--blue)' },
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

const searchTools = [
  { name: '秘塔AI搜索', domain: 'metaso.cn', desc: '无广告深度搜索' },
  { name: 'Perplexity', domain: 'perplexity.ai', desc: 'AI问答式搜索' },
  { name: 'Genspark', domain: 'genspark.ai', desc: 'AI引擎搜索' },
];

const writingTools = [
  { name: 'ChatGPT', domain: 'chatgpt.com', desc: '通用AI写作' },
  { name: 'Claude', domain: 'claude.ai', desc: '长文本写作最强' },
  { name: 'Kimi', domain: 'kimi.moonshot.cn', desc: '中文写作好手' },
  { name: '通义千问', domain: 'tongyi.aliyun.com', desc: '阿里AI助手' },
];

const musicTools = [
  { name: 'Suno', domain: 'suno.com', desc: 'AI音乐生成' },
  { name: 'Udio', domain: 'udio.com', desc: 'AI歌曲创作' },
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
  const moneyScrollRef = useRef(null);

  const hotIds = ['deepseek', 'doubao', 'chatgpt', 'kimi', 'cursor', 'suno'];
  const hotTools = hotIds.map(id => tools.find(tool => tool.id === id)).filter(Boolean);

  const scrollRef = (ref, dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  // 获取当前标签的工具列表
  const getCurrentTools = () => {
    if (activeTab === 'hot') return hotTools;
    if (['deploy', 'train', 'search', 'writing', 'music'].includes(activeTab)) return null;
    return getToolsByCategory(activeTab);
  };
  const currentTools = getCurrentTools();
  const isSpecialTab = ['deploy', 'train', 'search', 'writing', 'music'].includes(activeTab);
  const getSpecialData = () => {
    if (activeTab === 'deploy') return deployPlatforms;
    if (activeTab === 'train') return trainTools;
    if (activeTab === 'search') return searchTools;
    if (activeTab === 'writing') return writingTools;
    if (activeTab === 'music') return musicTools;
    return [];
  };

  // 变现攻略数据：取前8篇教程
  const moneyTutorials = tutorials.slice(0, 8);

  return (
    <div className="page">
      {/* ==================== 热门专题 — 横向轮播（一屏4个，卡片更矮更长）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconStar size={18} style={{ color: '#fbbf24' }} /> 热门专题</h2>
          <Link href={`/${locale}/compare`} className="section-more">更多专题 <IconChevronRight size={12} /></Link>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scrollRef(topicScrollRef, -1)} className="scroll-arrow" style={{ left: -8 }}>
            <IconChevronLeft size={14} />
          </button>
          <button onClick={() => scrollRef(topicScrollRef, 1)} className="scroll-arrow" style={{ right: -8 }}>
            <IconChevronRight size={14} />
          </button>
          <div ref={topicScrollRef} style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            padding: '4px 36px', scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {topics.map(topic => (
              <Link key={topic.id} href={`/${locale}/topic/${topic.slug}`} style={{ flex: '0 0 calc(25% - 11px)', scrollSnapAlign: 'start', textDecoration: 'none', minWidth: 260 }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '16px 18px',
                  boxShadow: 'var(--shadow-card)', transition: 'all 0.3s',
                  height: '100%', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{
                      fontSize: '0.62rem', padding: '2px 8px', borderRadius: 6,
                      background: topic.badgeBg, color: topic.badgeColor, fontWeight: 600,
                    }}>{topic.badge}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text3)' }}>{topic.date}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.4, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{topic.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text2)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{topic.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 大家都在用 — 标签切换（更多分类+更多产品入口）==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> 大家都在用</h2>
          <Link href={`/${locale}/products`} className="section-more">更多产品 <IconChevronRight size={12} /></Link>
        </div>
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
        {isSpecialTab ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {getSpecialData().map(item => (
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

      {/* ==================== AI变现攻略 — 横向轮播 ==================== */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><IconFire size={18} style={{ color: 'var(--red)' }} /> AI变现攻略</h2>
          <Link href={`/${locale}/tutorials`} className="section-more">更多攻略 <IconChevronRight size={12} /></Link>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scrollRef(moneyScrollRef, -1)} className="scroll-arrow" style={{ left: -8 }}>
            <IconChevronLeft size={14} />
          </button>
          <button onClick={() => scrollRef(moneyScrollRef, 1)} className="scroll-arrow" style={{ right: -8 }}>
            <IconChevronRight size={14} />
          </button>
          <div ref={moneyScrollRef} style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            padding: '4px 36px', scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {moneyTutorials.map(tut => (
              <Link key={tut.slug} href={`/${locale}/tutorial/${tut.slug}`} style={{ flex: '0 0 calc(25% - 11px)', scrollSnapAlign: 'start', textDecoration: 'none', minWidth: 240 }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '16px 18px',
                  boxShadow: 'var(--shadow-card)', transition: 'all 0.3s',
                  borderLeft: `3px solid ${tut.catColor}`,
                  height: '100%',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{
                      fontSize: '0.62rem', padding: '2px 8px', borderRadius: 6,
                      background: tut.catColor === 'var(--pink)' ? 'rgba(244,114,182,0.1)' : tut.catColor === 'var(--cyan)' ? 'rgba(34,211,238,0.1)' : tut.catColor === 'var(--yellow)' ? 'rgba(251,191,36,0.1)' : tut.catColor === 'var(--accent2)' ? 'rgba(124,92,252,0.1)' : 'rgba(52,211,153,0.1)',
                      color: tut.catColor, fontWeight: 600,
                    }}>{tut.cat}</span>
                    <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: 4, fontWeight: 600,
                      background: tut.difficulty === '入门级' ? 'rgba(52,211,153,0.08)' : tut.difficulty === '进阶级' ? 'rgba(251,191,36,0.08)' : 'rgba(124,92,252,0.08)',
                      color: tut.difficulty === '入门级' ? 'var(--green)' : tut.difficulty === '进阶级' ? 'var(--yellow)' : 'var(--accent2)',
                    }}>{tut.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.4, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{tut.title}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text3)' }}>{tut.views} 阅读 · {tut.time}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 免费白嫖指南 ==================== */}
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
                  <span style={{ fontSize: '0.62rem', padding: '1px 6px', borderRadius: 4, fontWeight: 600,
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
