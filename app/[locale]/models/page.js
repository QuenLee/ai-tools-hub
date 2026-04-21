'use client';

import { useState } from 'react';
import Favicon from '@/components/Favicon';

const modelData = [
  // 闭源商业模型
  { name: 'GPT-4o', provider: 'OpenAI', params: '~1.8T', context: '128K', inputPrice: '$2.5', outputPrice: '$10', domain: 'openai.com', type: '闭源', strength: '综合最强', mmlu: 88.7, humaneval: 90.2 },
  { name: 'GPT-4o mini', provider: 'OpenAI', params: '~8B', context: '128K', inputPrice: '$0.15', outputPrice: '$0.6', domain: 'openai.com', type: '闭源', strength: '高性价比', mmlu: 82.0, humaneval: 84.1 },
  { name: 'o3', provider: 'OpenAI', params: '未公开', context: '200K', inputPrice: '$10', outputPrice: '$40', domain: 'openai.com', type: '闭源', strength: '推理最强', mmlu: 91.3, humaneval: 96.1 },
  { name: 'Claude Opus 4', provider: 'Anthropic', params: '~2T', context: '200K', inputPrice: '$15', outputPrice: '$75', domain: 'claude.ai', type: '闭源', strength: '长文写作', mmlu: 89.1, humaneval: 92.5 },
  { name: 'Claude Sonnet 4', provider: 'Anthropic', params: '~700B', context: '200K', inputPrice: '$3', outputPrice: '$15', domain: 'claude.ai', type: '闭源', strength: '均衡优秀', mmlu: 87.5, humaneval: 89.8 },
  { name: 'Gemini 2.5 Pro', provider: 'Google', params: '~1.5T', context: '1M', inputPrice: '$1.25', outputPrice: '$10', domain: 'deepmind.google', type: '闭源', strength: '超长上下文', mmlu: 89.8, humaneval: 88.5 },
  { name: 'Gemini 2.5 Flash', provider: 'Google', params: '~400B', context: '1M', inputPrice: '$0.15', outputPrice: '$0.6', domain: 'deepmind.google', type: '闭源', strength: '速度最快', mmlu: 83.2, humaneval: 82.5 },
  // 国产模型
  { name: 'DeepSeek R2', provider: 'DeepSeek', params: '685B MoE', context: '128K', inputPrice: '¥1', outputPrice: '¥2', domain: 'chat.deepseek.com', type: '开源', strength: '推理+免费', mmlu: 88.5, humaneval: 91.0 },
  { name: 'Qwen3-235B', provider: '阿里云', params: '235B MoE', context: '128K', inputPrice: '¥2', outputPrice: '¥6', domain: 'tongyi.aliyun.com', type: '开源', strength: '中文编程', mmlu: 86.1, humaneval: 88.3 },
  { name: 'GLM-4-Plus', provider: '智谱AI', params: '未公开', context: '128K', inputPrice: '¥0.05', outputPrice: '¥0.05', domain: 'bigmodel.cn', type: '闭源', strength: 'API超低价', mmlu: 84.5, humaneval: 85.2 },
  { name: '豆包-Pro', provider: '火山引擎', params: '未公开', context: '128K', inputPrice: '¥0.04', outputPrice: '¥0.12', domain: 'www.volcengine.com', type: '闭源', strength: '价格最低', mmlu: 82.3, humaneval: 81.8 },
  { name: 'Kimi (Moonshot)', provider: '月之暗面', params: '未公开', context: '200万', inputPrice: '¥12', outputPrice: '¥12', domain: 'kimi.moonshot.cn', type: '闭源', strength: '超长文本', mmlu: 80.1, humaneval: 78.5 },
  // 开源模型
  { name: 'Llama 4 Maverick', provider: 'Meta', params: '400B MoE', context: '1M', inputPrice: '免费', outputPrice: '免费', domain: 'llama.meta.com', type: '开源', strength: '开源最强', mmlu: 85.2, humaneval: 86.1 },
  { name: 'Qwen3-32B', provider: '阿里云', params: '32B', context: '32K', inputPrice: '免费', outputPrice: '免费', domain: 'huggingface.co', type: '开源', strength: '轻量开源', mmlu: 79.8, humaneval: 80.5 },
  { name: 'DeepSeek R1-671B', provider: 'DeepSeek', params: '671B MoE', context: '128K', inputPrice: '免费', outputPrice: '免费', domain: 'huggingface.co', type: '开源', strength: '推理开源', mmlu: 86.5, humaneval: 89.2 },
];

export default function ModelsPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('mmlu');

  const filtered = filter === 'all' ? modelData :
    filter === 'open' ? modelData.filter(m => m.type === '开源') :
    modelData.filter(m => m.type === '闭源');

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'mmlu') return b.mmlu - a.mmlu;
    if (sortBy === 'humaneval') return b.humaneval - a.humaneval;
    if (sortBy === 'context') {
      const parse = (s) => { if (s.includes('万')) return parseFloat(s) * 10000; return parseFloat(s) || 0; };
      return parse(b.context) - parse(a.context);
    }
    return 0;
  });

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href="/zh">首页</a><span>/</span>AI模型
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI模型</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>主流AI大模型对比，帮你选最合适的模型</p>

      {/* 筛选 + 排序 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div className="usage-tabs" style={{ marginBottom: 0 }}>
          {[
            { id: 'all', label: '全部模型' },
            { id: 'closed', label: '闭源商业' },
            { id: 'open', label: '开源免费' },
          ].map(f => (
            <button
              key={f.id}
              className={`usage-tab ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'mmlu', label: 'MMLU排名' },
            { id: 'humaneval', label: '代码能力' },
            { id: 'context', label: '上下文长度' },
          ].map(s => (
            <button
              key={s.id}
              className={`usage-tab ${sortBy === s.id ? 'active' : ''}`}
              onClick={() => setSortBy(s.id)}
              style={{ fontSize: '0.78rem' }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ color: 'var(--text3)', fontSize: '0.78rem', marginBottom: 14 }}>
        共 {sorted.length} 个模型
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>模型</th>
              <th>提供方</th>
              <th>类型</th>
              <th>参数量</th>
              <th>上下文</th>
              <th>擅长</th>
              <th>MMLU</th>
              <th>代码</th>
              <th>输入价格</th>
              <th>输出价格</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(m => (
              <tr key={m.name}>
                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <Favicon domain={m.domain} name={m.name} size={18} />
                  {m.name}
                </td>
                <td style={{ color: 'var(--text2)' }}>{m.provider}</td>
                <td>
                  <span style={{
                    fontSize: '0.68rem', padding: '2px 8px', borderRadius: 6,
                    background: m.type === '开源' ? 'rgba(52,211,153,0.08)' : 'rgba(96,165,250,0.08)',
                    color: m.type === '开源' ? 'var(--green)' : 'var(--blue)', fontWeight: 600,
                  }}>
                    {m.type}
                  </span>
                </td>
                <td style={{ color: 'var(--text2)', fontSize: '0.82rem' }}>{m.params}</td>
                <td><span style={{ color: 'var(--accent2)', fontWeight: 600, fontSize: '0.82rem' }}>{m.context}</span></td>
                <td style={{ fontSize: '0.82rem' }}>{m.strength}</td>
                <td style={{ fontWeight: 700 }}>{m.mmlu}</td>
                <td style={{ fontWeight: 700 }}>{m.humaneval}</td>
                <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.82rem' }}>{m.inputPrice}</td>
                <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.82rem' }}>{m.outputPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 28, padding: 20, background: 'var(--surface)',
        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
        fontSize: '0.82rem', color: 'var(--text3)',
      }}>
        <h3 style={{ marginBottom: 10, fontSize: '0.92rem', color: 'var(--text2)' }}>📊 指标说明</h3>
        <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
          <li><strong>MMLU</strong>：大规模多任务语言理解基准，测试模型知识广度和推理能力</li>
          <li><strong>代码(HumanEval)</strong>：Python代码生成能力基准，测试编程水平</li>
          <li><strong>价格</strong>：每百万tokens的API调用费用，闭源模型以美元计，国产模型以人民币计</li>
          <li>数据基于官方公布和公开基准测试，实际表现可能因场景不同而变化</li>
        </ul>
      </div>
    </div>
  );
}
