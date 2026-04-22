import { tools, categories, getToolBySlug, getScoreColor, getScoreLabel } from '@/lib/data';
import { getToolDetail } from '@/lib/tool-details';
import Link from 'next/link';
import Favicon from '@/components/Favicon';
import { IconFree, IconPaid, IconExternal, IconStar, IconChevronRight } from '@/components/icons/Icons';

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到 | Quen\'s AI' };
  return {
    title: `${tool.name} - 深度评测与使用指南 | Quen's AI`,
    description: `${tool.tagline} - 详细评测、评分、优缺点、使用教程、常见问题`,
    keywords: `${tool.name},${tool.name}评测,${tool.name}怎么样,${tool.name}使用教程,${tool.name}免费,${tool.name}价格`,
  };
}

export default async function ToolDetail({ params }) {
  const { slug, locale } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return <div className="empty">工具未找到</div>;

  const cat = categories.find(c => c.id === tool.category);
  const avgScore = Math.round((tool.scores.usefulness + tool.scores.value + tool.scores.ease) / 3);

  // 同类工具
  const sameCategory = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 6);
  // 免费替代
  const freeAlternatives = tools.filter(t => t.id !== tool.id && t.pricing.free).slice(0, 6);

  const detail = getToolDetail(slug);
  const targetUsers = detail?.targetUsers || ['科技爱好者', '办公人士', '学生', '创作者'];
  const useCases = detail?.useCases || [
    { title: '日常使用', desc: `使用${tool.name}提升日常工作效率` },
    { title: '内容创作', desc: `借助${tool.name}进行内容生成和优化` },
  ];
  const howToUse = detail?.howToUse || [
    `访问${tool.name}官网并注册账号`,
    `根据引导完成初始设置`,
    `开始使用核心功能`,
  ];
  const faq = detail?.faq || [
    { q: `${tool.name}免费吗？`, a: tool.pricing.free ? `提供免费版本，${tool.pricing.price}。` : '需付费使用。' },
  ];

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px' }}>
        {/* 面包屑 */}
        <div className="breadcrumb">
          <a href={`/${locale}`}>首页</a> <span>/</span>
          <a href={`/${locale}/products`}>AI产品</a> <span>/</span>
          {cat && <><a href={`/${locale}/category/${tool.category}`}>{cat.name}</a> <span>/</span></>}
          {tool.name}
        </div>

        {/* Hero 区域 */}
        <div style={{
          display: 'flex', gap: 20, alignItems: 'flex-start',
          padding: '24px 0 28px', borderBottom: '1px solid var(--border)', marginBottom: 24,
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1, minWidth: 280 }}>
            <Favicon domain={tool.favicon} name={tool.name} size={56} />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>{tool.name}</h1>
              <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 10 }}>{tool.tagline}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 6, background: 'rgba(96,165,250,0.1)', color: 'var(--blue)', fontWeight: 600 }}>{cat?.name}</span>
                <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 6, background: tool.pricing.free ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)', color: tool.pricing.free ? 'var(--green)' : 'var(--yellow)', fontWeight: 600 }}>
                  {tool.pricing.free ? '免费可用' : '付费'}
                </span>
                {tool.features.slice(0, 3).map(f => (
                  <span key={f} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, background: 'rgba(124,92,252,0.08)', color: 'var(--accent2)', fontWeight: 500 }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
          {/* 评分卡 */}
          <div style={{
            minWidth: 180, padding: '16px 20px', background: 'var(--surface)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: getScoreColor(avgScore), lineHeight: 1 }}>{avgScore}</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: 16 }}>综合评分 · {getScoreLabel(avgScore)}</div>
            <ScoreBar label="实用性" score={tool.scores.usefulness} />
            <ScoreBar label="性价比" score={tool.scores.value} />
            <ScoreBar label="易用性" score={tool.scores.ease} />
            <a href={tool.affiliate || tool.url} className="visit-btn" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', marginTop: 18, padding: '10px 20px', textAlign: 'center', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none', color: '#fff', background: 'var(--accent)' }}>
              {tool.affiliate ? '🎉 通过评测链接访问' : '访问官网'} <IconExternal size={14} />
            </a>
            <div style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text3)' }}>更新于 {tool.updatedAt}</div>
          </div>
        </div>

        {/* 是什么 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">{tool.name}是什么</h2>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text2)' }}>{tool.description}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {tool.features.map(f => (
              <span key={f} style={{
                fontSize: '0.78rem', padding: '5px 14px', borderRadius: 'var(--radius-2xs)',
                background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)',
                fontWeight: 500,
              }}>{f}</span>
            ))}
          </div>
        </section>

        {/* 需求人群 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">需求人群</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
            {targetUsers.map((u, i) => (
              <div key={i} style={{
                padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', fontSize: '0.86rem', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                {u}
              </div>
            ))}
          </div>
        </section>

        {/* 使用场景 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">使用场景</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {useCases.map((uc, i) => (
              <div key={i} style={{
                padding: '18px 20px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 6 }}>{uc.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6 }}>{uc.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 优缺点 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">优缺点分析</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ padding: '20px', background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ color: 'var(--green)', fontSize: '0.88rem', fontWeight: 700, marginBottom: 14 }}>✅ 优点</h3>
              <ul style={{ paddingLeft: 18, lineHeight: 2, fontSize: '0.88rem' }}>
                {tool.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div style={{ padding: '20px', background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ color: 'var(--yellow)', fontSize: '0.88rem', fontWeight: 700, marginBottom: 14 }}>⚠️ 不足</h3>
              <ul style={{ paddingLeft: 18, lineHeight: 2, fontSize: '0.88rem' }}>
                {tool.cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* 价格方案 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">价格方案</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            <div style={{
              padding: '20px', background: tool.pricing.free ? 'rgba(52,211,153,0.04)' : 'var(--surface)',
              border: `1px solid ${tool.pricing.free ? 'rgba(52,211,153,0.2)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <IconFree size={14} /> 免费版
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green)', marginBottom: 6 }}>
                {tool.pricing.free ? '免费' : '无'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{tool.pricing.price}</div>
            </div>
            {tool.pricing.paid && (
              <div style={{
                padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', position: 'relative',
              }}>
                <span style={{ position: 'absolute', top: 10, right: 10, fontSize: '0.62rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(251,191,36,0.1)', color: 'var(--yellow)', fontWeight: 600 }}>推荐</span>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <IconPaid size={14} /> 付费版
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>{tool.pricing.paid}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>解锁全部功能</div>
              </div>
            )}
          </div>
        </section>

        {/* 使用教程 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">使用教程</h2>
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            {howToUse.map((step, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: 18, paddingLeft: 20 }}>
                <div style={{
                  position: 'absolute', left: -24, top: 2, width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{i + 1}</div>
                <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text2)' }}>{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 常见问题 */}
        <section style={{ marginBottom: 36 }}>
          <h2 className="article-h2">常见问题</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.map((item, i) => (
              <div key={i} style={{
                padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 8, color: 'var(--text)' }}>Q：{item.q}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text2)', lineHeight: 1.7 }}>A：{item.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 同类工具 */}
        {sameCategory.length > 0 && (
          <section style={{ marginBottom: 36 }}>
            <h2 className="article-h2">同类工具</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {sameCategory.map(t => (
                <Link key={t.id} href={`/${locale}/tool/${t.id}`} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'var(--text)',
                  transition: 'all 0.2s',
                }}>
                  <Favicon domain={t.favicon} name={t.name} size={28} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{t.tagline.slice(0, 18)}…</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 访问按钮（底部再放一次） */}
        <div style={{ textAlign: 'center', padding: '28px 0', borderTop: '1px solid var(--border)' }}>
          <a href={tool.affiliate || tool.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '14px 40px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
            }}>
            {tool.affiliate ? '🎉 通过评测链接访问' : '访问官网'} <IconExternal size={14} />
          </a>
          <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text3)' }}>
            {tool.affiliate ? '通过评测链接访问可支持我们持续提供深度评测' : `前往${tool.name}官网开始使用`}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }) {
  return (
    <div className="score-bar" style={{ marginBottom: 8 }}>
      <div className="score-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 3 }}>
        <span>{label}</span>
        <span style={{ color: getScoreColor(score), fontWeight: 700 }}>{score}</span>
      </div>
      <div className="score-track" style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
        <div className="score-fill" style={{ width: `${score}%`, background: getScoreColor(score), height: '100%', borderRadius: 2, transition: 'width 0.6s' }} />
      </div>
    </div>
  );
}
