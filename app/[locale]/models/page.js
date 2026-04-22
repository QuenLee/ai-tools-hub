'use client';

import { useState } from 'react';
import Favicon from '@/components/Favicon';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const modelData = [
  // 闭源商业模型
  { name: 'GPT-4o', provider: 'OpenAI', params: '~1.8T', context: '128K', inputPrice: '$2.5', outputPrice: '$10', domain: 'openai.com', type: '闭源', strength: '综合最强', mmlu: 88.7, humaneval: 90.2, desc: 'OpenAI旗舰模型，能力最全面，支持多模态', color: 'var(--green)', affiliate: null },
  { name: 'GPT-4o mini', provider: 'OpenAI', params: '~8B', context: '128K', inputPrice: '$0.15', outputPrice: '$0.6', domain: 'openai.com', type: '闭源', strength: '高性价比', mmlu: 82.0, humaneval: 84.1, desc: '轻量快速，日常对话最划算', color: 'var(--green)', affiliate: null },
  { name: 'o3', provider: 'OpenAI', params: '未公开', context: '200K', inputPrice: '$10', outputPrice: '$40', domain: 'openai.com', type: '闭源', strength: '推理最强', mmlu: 91.3, humaneval: 96.1, desc: 'OpenAI推理模型，数学/逻辑/编程巅峰', color: 'var(--accent2)', affiliate: null },
  { name: 'Claude Opus 4', provider: 'Anthropic', params: '~2T', context: '200K', inputPrice: '$15', outputPrice: '$75', domain: 'claude.ai', type: '闭源', strength: '长文写作', mmlu: 89.1, humaneval: 92.5, desc: 'Anthropic最强模型，长文和深度分析首选', color: 'var(--pink)', affiliate: null },
  { name: 'Claude Sonnet 4', provider: 'Anthropic', params: '~700B', context: '200K', inputPrice: '$3', outputPrice: '$15', domain: 'claude.ai', type: '闭源', strength: '均衡优秀', mmlu: 87.5, humaneval: 89.8, desc: '速度与质量的完美平衡', color: 'var(--pink)', affiliate: null },
  { name: 'Gemini 2.5 Pro', provider: 'Google', params: '~1.5T', context: '1M', inputPrice: '$1.25', outputPrice: '$10', domain: 'deepmind.google', type: '闭源', strength: '超长上下文', mmlu: 89.8, humaneval: 88.5, desc: '100万tokens上下文，长文档分析神器', color: 'var(--cyan)', affiliate: null },
  { name: 'Gemini 2.5 Flash', provider: 'Google', params: '~400B', context: '1M', inputPrice: '$0.15', outputPrice: '$0.6', domain: 'deepmind.google', type: '闭源', strength: '速度最快', mmlu: 83.2, humaneval: 82.5, desc: 'Google快速模型，高性价比', color: 'var(--cyan)', affiliate: null },
  // 国产模型
  { name: 'DeepSeek R2', provider: 'DeepSeek', params: '685B MoE', context: '128K', inputPrice: '¥1', outputPrice: '¥2', domain: 'chat.deepseek.com', type: '开源', strength: '推理+免费', mmlu: 88.5, humaneval: 91.0, desc: '国产最强推理模型，免费使用+超低API', color: 'var(--blue)', affiliate: null },
  { name: 'Qwen3-235B', provider: '阿里云', params: '235B MoE', context: '128K', inputPrice: '¥2', outputPrice: '¥6', domain: 'tongyi.aliyun.com', type: '开源', strength: '中文编程', mmlu: 86.1, humaneval: 88.3, desc: '通义千问旗舰模型，中文+编程均衡', color: 'var(--blue)', affiliate: 'https://www.aliyun.com/minisite/goods?userCode=j1oznb9i' },
  { name: 'GLM-4-Plus', provider: '智谱AI', params: '未公开', context: '128K', inputPrice: '¥0.05', outputPrice: '¥0.05', domain: 'bigmodel.cn', type: '闭源', strength: 'API超低价', mmlu: 84.5, humaneval: 85.2, desc: '国产最便宜API，¥0.05/百万tokens', color: 'var(--yellow)', affiliate: null },
  { name: '豆包-Pro', provider: '火山引擎', params: '未公开', context: '128K', inputPrice: '¥0.04', outputPrice: '¥0.12', domain: 'www.volcengine.com', type: '闭源', strength: '价格最低', mmlu: 82.3, humaneval: 81.8, desc: '字节模型API，价格屠夫', color: 'var(--yellow)', affiliate: null },
  { name: 'Kimi (Moonshot)', provider: '月之暗面', params: '未公开', context: '200万', inputPrice: '¥12', outputPrice: '¥12', domain: 'kimi.moonshot.cn', type: '闭源', strength: '超长文本', mmlu: 80.1, humaneval: 78.5, desc: '200万字上下文，长文阅读无对手', color: 'var(--accent2)', affiliate: null },
  // 开源模型
  { name: 'Llama 4 Maverick', provider: 'Meta', params: '400B MoE', context: '1M', inputPrice: '免费', outputPrice: '免费', domain: 'llama.meta.com', type: '开源', strength: '开源最强', mmlu: 85.2, humaneval: 86.1, desc: 'Meta开源旗舰，400B MoE多模态', color: 'var(--green)', affiliate: null },
  { name: 'Qwen3-32B', provider: '阿里云', params: '32B', context: '32K', inputPrice: '免费', outputPrice: '免费', domain: 'huggingface.co', type: '开源', strength: '轻量开源', mmlu: 79.8, humaneval: 80.5, desc: '32B小模型可本地运行，性能优秀', color: 'var(--green)', affiliate: null },
  { name: 'DeepSeek R1-671B', provider: 'DeepSeek', params: '671B MoE', context: '128K', inputPrice: '免费', outputPrice: '免费', domain: 'huggingface.co', type: '开源', strength: '推理开源', mmlu: 86.5, humaneval: 89.2, desc: '开源推理王，媲美闭源推理模型', color: 'var(--green)', affiliate: null },
];

export default function ModelsPage() {
  const { locale } = useParams();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('mmlu');

  const filtered = filter === 'all' ? modelData
    : filter === 'open' ? modelData.filter(m => m.type === '开源')
    : modelData.filter(m => m.type === '闭源');

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'mmlu') return b.mmlu - a.mmlu;
    if (sortBy === 'humaneval') return b.humaneval - a.humaneval;
    if (sortBy === 'price') {
      const parse = (s) => parseFloat(s.replace(/[^0-9.]/g, '')) || 999;
      return parse(a.inputPrice) - parse(b.inputPrice);
    }
    return 0;
  });

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href={`/${locale}`}>首页</a><span>/</span>AI模型
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI模型</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>主流AI大模型深度对比，帮你选最合适的模型</p>

      {/* 筛选 + 排序 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'all', label: '全部模型' },
            { id: 'closed', label: '闭源商业' },
            { id: 'open', label: '开源免费' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              style={{
                padding: '7px 16px', borderRadius: 'var(--radius-2xs)', fontSize: '0.82rem',
                border: filter === f.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: filter === f.id ? 'var(--accent)' : 'transparent',
                color: filter === f.id ? '#fff' : 'var(--text2)', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'mmlu', label: '综合排名' },
            { id: 'humaneval', label: '代码能力' },
            { id: 'price', label: '价格排序' },
          ].map(s => (
            <button key={s.id} onClick={() => setSortBy(s.id)}
              style={{
                padding: '5px 12px', borderRadius: 'var(--radius-2xs)', fontSize: '0.75rem',
                border: sortBy === s.id ? '1px solid var(--accent2)' : '1px solid var(--border)',
                background: sortBy === s.id ? 'rgba(124,92,252,0.08)' : 'transparent',
                color: sortBy === s.id ? 'var(--accent2)' : 'var(--text3)', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: 18 }}>共 {sorted.length} 个模型</div>

      {/* 模型卡片网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {sorted.map((m, i) => (
          <div key={m.name} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '20px 22px',
            boxShadow: 'var(--shadow-card)', transition: 'all 0.3s',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* 排名标记 */}
            {i < 3 && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                width: 26, height: 26, borderRadius: '50%',
                background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : i === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : 'linear-gradient(135deg, #d97706, #b45309)',
                color: '#fff', fontSize: '0.72rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>#{i + 1}</div>
            )}

            {/* 顶部：模型名+提供方 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Favicon domain={m.domain} name={m.name} size={28} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{m.provider}</div>
              </div>
              <span style={{
                marginLeft: 'auto', fontSize: '0.62rem', padding: '2px 8px', borderRadius: 6,
                background: m.type === '开源' ? 'rgba(52,211,153,0.08)' : 'rgba(96,165,250,0.08)',
                color: m.type === '开源' ? 'var(--green)' : 'var(--blue)', fontWeight: 600,
              }}>{m.type}</span>
            </div>

            {/* 描述 */}
            <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5, marginBottom: 14 }}>{m.desc}</p>

            {/* 擅长标签 */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, background: `${m.color}15`, color: m.color, fontWeight: 600 }}>{m.strength}</span>
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, background: 'rgba(124,92,252,0.08)', color: 'var(--accent2)', fontWeight: 500 }}>{m.params}</span>
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 4, background: 'rgba(251,191,36,0.08)', color: 'var(--yellow)', fontWeight: 500 }}>↑{m.context}</span>
            </div>

            {/* 分数条 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 3 }}>
                  <span style={{ color: 'var(--text3)' }}>MMLU</span>
                  <span style={{ fontWeight: 700, color: m.mmlu >= 88 ? 'var(--green)' : m.mmlu >= 83 ? 'var(--accent2)' : 'var(--text2)' }}>{m.mmlu}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ width: `${m.mmlu}%`, height: '100%', borderRadius: 2, background: m.mmlu >= 88 ? 'var(--green)' : m.mmlu >= 83 ? 'var(--accent2)' : 'var(--text3)' }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 3 }}>
                  <span style={{ color: 'var(--text3)' }}>代码</span>
                  <span style={{ fontWeight: 700, color: m.humaneval >= 89 ? 'var(--green)' : m.humaneval >= 83 ? 'var(--accent2)' : 'var(--text2)' }}>{m.humaneval}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ width: `${m.humaneval}%`, height: '100%', borderRadius: 2, background: m.humaneval >= 89 ? 'var(--green)' : m.humaneval >= 83 ? 'var(--accent2)' : 'var(--text3)' }} />
                </div>
              </div>
            </div>

            {/* 价格 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--green)' }}>{m.inputPrice}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}> / </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--green)' }}>{m.outputPrice}</span>
                <div style={{ fontSize: '0.68rem', color: 'var(--text3)', marginTop: 2 }}>输入 / 输出(每百万tokens)</div>
              </div>
              {m.affiliate ? (
                <a href={m.affiliate} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '6px 14px', borderRadius: 'var(--radius-2xs)', background: 'var(--accent)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
                  🎉 优惠接入
                </a>
              ) : (
                <a href={`https://${m.domain}`} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '6px 14px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none' }}>
                  官网
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 指标说明 */}
      <div style={{ marginTop: 28, padding: 24, background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: 12, fontSize: '0.95rem', fontWeight: 700 }}>📊 指标说明</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>
            <strong>MMLU</strong>：大规模多任务语言理解基准，测试知识广度和推理能力
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>
            <strong>HumanEval</strong>：Python代码生成基准，测试编程水平
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>
            <strong>价格</strong>：每百万tokens的API费用，¥人民币 / $美元
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.7 }}>
            数据基于官方公布和公开基准测试，实际表现因场景而异
          </div>
        </div>
      </div>
    </div>
  );
}
