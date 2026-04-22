'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

const platforms = [{ id: 'xiaohongshu', label: '小红书' }, { id: 'douyin', label: '抖音' }, { id: 'weixin', label: '公众号' }, { id: 'weibo', label: '微博' }, { id: 'zhihu', label: '知乎' }, { id: 'taobao', label: '淘宝' }];
const tones = [{ id: 'casual', label: '轻松活泼' }, { id: 'professional', label: '专业严谨' }, { id: 'humorous', label: '幽默搞笑' }, { id: 'emotional', label: '走心感动' }];

const templates = {
  xiaohongshu: (p, t) => t === 'casual' ? `姐妹们！今天发现了一个超好用的宝藏✨\n\n${p}，用了之后真的被惊艳到！\n\n1️⃣ 使用超简单 2️⃣ 效果绝绝子 3️⃣ 最重要免费！\n\n#好物推荐 #宝藏神器` : `测评｜${p}深度体验\n\n📊 评分：8.5/10\n核心优势：功能完整·学习成本低·输出稳定\n\n#AI工具测评 #效率工具`,
  douyin: (p) => `【${p}】一个让我效率翻10倍的神器！\n\n1分钟搞定以前1小时的工作！\n\n#效率工具 #AI神器`,
  weixin: (p) => `${p}：2026年最值得关注的效率工具\n\n一、为什么需要它\n二、核心功能解析\n三、适合谁用\n四、总结建议`,
  weibo: (p) => `试了一下${p}，确实有点东西。最大的亮点是免费版就够用，推荐给需要的朋友 👉`,
  zhihu: (p) => `如何客观评价${p}？\n\n作为一个重度AI工具用户，说说我的真实体验。\n\n结论：值得尝试，尤其是免费版。\n1. 功能方面 2. 易用性 3. 性价比`,
  taobao: (p) => `🔥${p}｜限时优惠\n\n✅ 功能强大 ✅ 操作简单 ✅ 免费试用\n\n💡 详情请咨询客服`,
};

export function AICopywriter({ onBack, locale }) {
  const [product, setProduct] = useState('');
  const [platform, setPlatform] = useState('xiaohongshu');
  const [tone, setTone] = useState('casual');
  const [result, setResult] = useState('');
  const [generating, setGenerating] = useState(false);
  const guard = useToolGuard('ai-copywriter');
  const handleGenerate = () => {
    if (!product.trim() || !guard.check()) return;
    setGenerating(true);
    setTimeout(() => { const gen = templates[platform]?.(product, tone) || `${product} - 优质文案`; setResult(gen); guard.useOnce(); setGenerating(false); }, 800);
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="AI文案生成器" desc="输入产品描述，一键生成多平台营销文案" icon="✍️" onBack={onBack} remaining={guard.remaining}>
      <textarea value={product} onChange={e => setProduct(e.target.value)} placeholder="例如：一款AI编程助手，支持自然语言写代码" style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: 80, resize: 'vertical', boxSizing: 'border-box', marginBottom: 12 }} />
      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>目标平台</label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>{platforms.map(p => <button key={p.id} onClick={() => setPlatform(p.id)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-2xs)', fontSize: '0.78rem', border: platform === p.id ? '1px solid var(--accent)' : '1px solid var(--border)', background: platform === p.id ? 'rgba(99,102,241,0.08)' : 'transparent', color: platform === p.id ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>{p.label}</button>)}</div>
      <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>文案风格</label>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>{tones.map(t => <button key={t.id} onClick={() => setTone(t.id)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-2xs)', fontSize: '0.78rem', border: tone === t.id ? '1px solid var(--accent2)' : '1px solid var(--border)', background: tone === t.id ? 'rgba(124,92,252,0.08)' : 'transparent', color: tone === t.id ? 'var(--accent2)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer' }}>{t.label}</button>)}</div>
      <button onClick={handleGenerate} disabled={!product.trim() || generating} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: product.trim() ? 'var(--accent)' : 'var(--border)', color: product.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: product.trim() ? 'pointer' : 'not-allowed' }}>{generating ? '生成中...' : '生成文案'}</button>
      {result && <div style={{ marginTop: 16 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><span style={{ fontSize: '0.82rem', fontWeight: 600 }}>生成结果</span><button onClick={() => navigator.clipboard.writeText(result)} style={{ padding: '4px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text2)', fontSize: '0.72rem', cursor: 'pointer' }}>复制</button></div><div style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--text2)' }}>{result}</div></div>}
    </ToolWrapper>
  );
}
