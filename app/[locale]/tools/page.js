'use client';

import { useState } from 'react';
import { tools, categories, getToolsByCategory, getScoreColor } from '@/lib/data';
import Favicon from '@/components/Favicon';
import { IconFree, IconPaid, IconCompare, IconFire, categoryIcons } from '@/components/icons/Icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ToolsPage() {
  const { locale } = useParams();
  const [activeTab, setActiveTab] = useState('selector');

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a><span>/</span>AI工具
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI工具</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>实用AI工具，帮你选模型、算成本、看对比</p>

      {/* Tab切换 */}
      <div className="usage-tabs" style={{ marginBottom: 24 }}>
        {[
          { id: 'selector', label: '模型选型器' },
          { id: 'calculator', label: 'API费用计算器' },
          { id: 'compare', label: '工具对比' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`usage-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 模型选型器 */}
      {activeTab === 'selector' && <ModelSelector locale={locale} />}

      {/* API费用计算器 */}
      {activeTab === 'calculator' && <APICalculator locale={locale} />}

      {/* 工具对比 */}
      {activeTab === 'compare' && <ToolCompare locale={locale} />}
    </div>
  );
}

function ModelSelector({ locale }) {
  const [scene, setScene] = useState('writing');
  const scenes = [
    { id: 'writing', label: '写作', icon: '✍️' },
    { id: 'coding', label: '编程', icon: '💻' },
    { id: 'image', label: '绘画', icon: '🎨' },
    { id: 'video', label: '视频', icon: '🎬' },
    { id: 'chat', label: '对话', icon: '💬' },
    { id: 'search', label: '搜索', icon: '🔍' },
    { id: 'data', label: '数据分析', icon: '📊' },
    { id: 'translation', label: '翻译', icon: '🌐' },
  ];

  const recommendations = {
    writing: [
      { name: 'Claude', reason: '长文写作质量最高，逻辑连贯，风格自然', score: 95 },
      { name: 'Kimi', reason: '中文长文创作优秀，免费版即可用', score: 92 },
      { name: 'DeepSeek', reason: '推理+写作兼顾，完全免费', score: 88 },
    ],
    coding: [
      { name: 'Cursor', reason: 'AI编程IDE，Vibe Coding效率最高', score: 96 },
      { name: 'GitHub Copilot', reason: '代码补全最智能，IDE无缝集成', score: 93 },
      { name: 'DeepSeek', reason: '代码生成质量接近GPT-4，完全免费', score: 90 },
    ],
    image: [
      { name: 'Midjourney', reason: '画质最高，艺术感最强', score: 96 },
      { name: 'Stable Diffusion', reason: '开源免费，本地部署，无限生成', score: 90 },
      { name: 'LiblibAI', reason: '国内最好用的AI绘画平台', score: 88 },
    ],
    video: [
      { name: 'Sora', reason: 'OpenAI出品，视频质量最高', score: 95 },
      { name: '可灵AI', reason: '国内最佳AI视频生成工具', score: 90 },
      { name: 'Runway', reason: '功能最全，Gen-3模型效果好', score: 87 },
    ],
    chat: [
      { name: 'ChatGPT', reason: '全球最流行，综合能力最强', score: 95 },
      { name: '豆包', reason: '国内免费全能助手，中文体验好', score: 92 },
      { name: 'DeepSeek', reason: '推理能力顶级，完全免费', score: 91 },
    ],
    search: [
      { name: '秘塔AI搜索', reason: '无广告直达结果，中文搜索最佳', score: 94 },
      { name: 'Perplexity', reason: '英文AI搜索最强，引用来源准确', score: 92 },
      { name: 'Kimi', reason: '网页阅读+搜索，长文总结优秀', score: 88 },
    ],
    data: [
      { name: 'ChatGPT', reason: '数据分析+代码执行，Advanced Data Analysis', score: 93 },
      { name: 'Claude', reason: '处理CSV/Excel等数据文件能力强', score: 90 },
      { name: '通义千问', reason: '免费API+代码助手，数据分析性价比高', score: 87 },
    ],
    translation: [
      { name: 'DeepSeek', reason: '翻译质量高且完全免费', score: 93 },
      { name: 'ChatGPT', reason: '多语言翻译准确，支持润色', score: 91 },
      { name: 'Claude', reason: '翻译+上下文理解，意译最自然', score: 89 },
    ],
  };

  const toolMap = {};
  tools.forEach(t => { toolMap[t.name] = t; });

  const currentRecs = recommendations[scene] || [];

  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text2)' }}>
        你的使用场景是？
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {scenes.map(s => (
          <button
            key={s.id}
            className={`usage-tab ${scene === s.id ? 'active' : ''}`}
            onClick={() => setScene(s.id)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {currentRecs.map((rec, i) => {
          const tool = toolMap[rec.name];
          return (
            <Link
              key={rec.name}
              href={tool ? `/${locale}/tool/${tool.id}` : '#'}
              className="deal-card"
              style={{ textDecoration: 'none', alignItems: 'flex-start' }}
            >
              <div className="deal-info" style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: i === 0 ? 'var(--gradient1)' : i === 1 ? 'var(--gradient2)' : 'var(--gradient4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    {tool && <Favicon domain={tool.favicon} name={tool.name} size={20} />}
                    {rec.name}
                    <span style={{
                      fontSize: '0.72rem', padding: '2px 8px', borderRadius: 6,
                      background: 'rgba(124,92,252,0.08)', color: 'var(--accent2)', fontWeight: 600,
                    }}>
                      {rec.score}分
                    </span>
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.5 }}>{rec.reason}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function APICalculator({ locale }) {
  const [requests, setRequests] = useState(1000);
  const [inputTokens, setInputTokens] = useState(500);
  const [outputTokens, setOutputTokens] = useState(500);

  const models = [
    { name: 'GPT-4o', provider: 'OpenAI', inputPrice: 2.5, outputPrice: 10, unit: '$' },
    { name: 'GPT-4o mini', provider: 'OpenAI', inputPrice: 0.15, outputPrice: 0.6, unit: '$' },
    { name: 'Claude Sonnet 4', provider: 'Anthropic', inputPrice: 3, outputPrice: 15, unit: '$' },
    { name: 'Claude Haiku 3.5', provider: 'Anthropic', inputPrice: 0.8, outputPrice: 4, unit: '$' },
    { name: 'Gemini 2.5 Pro', provider: 'Google', inputPrice: 1.25, outputPrice: 10, unit: '$' },
    { name: 'Gemini 2.5 Flash', provider: 'Google', inputPrice: 0.15, outputPrice: 0.6, unit: '$' },
    { name: 'DeepSeek R2', provider: 'DeepSeek', inputPrice: 0.14, outputPrice: 0.28, unit: '¥' },
    { name: 'Qwen3-235B', provider: '阿里云', inputPrice: 0.3, outputPrice: 0.6, unit: '¥' },
    { name: 'GLM-4-Plus', provider: '智谱AI', inputPrice: 0.05, outputPrice: 0.05, unit: '¥' },
    { name: '豆包-Pro', provider: '火山引擎', inputPrice: 0.04, outputPrice: 0.12, unit: '¥' },
  ];

  const calcCost = (model) => {
    const inputCost = (inputTokens * requests * model.inputPrice) / 1000000;
    const outputCost = (outputTokens * requests * model.outputPrice) / 1000000;
    return inputCost + outputCost;
  };

  return (
    <div>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: 24, marginBottom: 24,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
      }}>
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginBottom: 6 }}>
            每日请求数
          </label>
          <input
            type="number" value={requests}
            onChange={e => setRequests(Number(e.target.value))}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--surface2)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-2xs)',
              color: 'var(--text)', fontSize: '0.92rem',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginBottom: 6 }}>
            平均输入tokens
          </label>
          <input
            type="number" value={inputTokens}
            onChange={e => setInputTokens(Number(e.target.value))}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--surface2)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-2xs)',
              color: 'var(--text)', fontSize: '0.92rem',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text3)', display: 'block', marginBottom: 6 }}>
            平均输出tokens
          </label>
          <input
            type="number" value={outputTokens}
            onChange={e => setOutputTokens(Number(e.target.value))}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--surface2)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-2xs)',
              color: 'var(--text)', fontSize: '0.92rem',
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 12 }}>
        每日 {requests} 次 × {inputTokens}+{outputTokens} tokens · 月成本估算（按30天计）
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>模型</th>
              <th>提供方</th>
              <th>输入价格</th>
              <th>输出价格</th>
              <th>日成本</th>
              <th>月成本</th>
            </tr>
          </thead>
          <tbody>
            {[...models].sort((a, b) => calcCost(a) - calcCost(b)).map(m => {
              const daily = calcCost(m);
              const monthly = daily * 30;
              return (
                <tr key={m.name}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td style={{ color: 'var(--text2)' }}>{m.provider}</td>
                  <td style={{ fontSize: '0.82rem' }}>{m.unit}{m.inputPrice}/1M</td>
                  <td style={{ fontSize: '0.82rem' }}>{m.unit}{m.outputPrice}/1M</td>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{m.unit}{daily.toFixed(2)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--green)' }}>{m.unit}{monthly.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ToolCompare({ locale }) {
  const [selected, setSelected] = useState([]);
  const toolList = tools.slice(0, 20);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const selectedTools = selected.map(id => tools.find(t => t.id === id)).filter(Boolean);

  return (
    <div>
      <p style={{ color: 'var(--text2)', fontSize: '0.88rem', marginBottom: 16 }}>
        选择2-4个工具进行对比（已选 {selected.length}/4）
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {toolList.map(tool => (
          <button
            key={tool.id}
            onClick={() => toggle(tool.id)}
            style={{
              padding: '6px 14px', borderRadius: 'var(--radius-2xs)',
              border: selected.includes(tool.id) ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: selected.includes(tool.id) ? 'rgba(124,92,252,0.08)' : 'transparent',
              color: selected.includes(tool.id) ? 'var(--accent2)' : 'var(--text2)',
              fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
            }}
          >
            <Favicon domain={tool.favicon} name={tool.name} size={16} />
            {tool.name}
          </button>
        ))}
      </div>

      {selectedTools.length >= 2 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>对比项</th>
                {selectedTools.map(t => <th key={t.id}>{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>一句话</td>
                {selectedTools.map(t => <td key={t.id} style={{ fontSize: '0.82rem' }}>{t.tagline}</td>)}
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>价格</td>
                {selectedTools.map(t => <td key={t.id}><span className={`tool-price ${t.pricing.free ? 'free' : 'paid'}`}>{t.pricing.price}</span></td>)}
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>实用性</td>
                {selectedTools.map(t => <td key={t.id} style={{ color: getScoreColor(t.scores.usefulness), fontWeight: 700 }}>{t.scores.usefulness}</td>)}
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>性价比</td>
                {selectedTools.map(t => <td key={t.id} style={{ color: getScoreColor(t.scores.value), fontWeight: 700 }}>{t.scores.value}</td>)}
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>易用性</td>
                {selectedTools.map(t => <td key={t.id} style={{ color: getScoreColor(t.scores.ease), fontWeight: 700 }}>{t.scores.ease}</td>)}
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>特色功能</td>
                {selectedTools.map(t => <td key={t.id} style={{ fontSize: '0.78rem' }}>{t.features.slice(0, 3).join('、')}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedTools.length < 2 && (
        <div style={{
          padding: 40, textAlign: 'center', color: 'var(--text3)',
          background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
        }}>
          请至少选择2个工具开始对比
        </div>
      )}
    </div>
  );
}
