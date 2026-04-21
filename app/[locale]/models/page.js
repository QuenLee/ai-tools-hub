import Link from 'next/link';
import Favicon from '@/components/Favicon';

const popularModels = [
  { name: 'GPT-4o', provider: 'OpenAI', params: '~1.8T', context: '128K', price: '$2.5/1M in', domain: 'openai.com' },
  { name: 'Claude Opus 4', provider: 'Anthropic', params: '~2T', context: '200K', price: '$15/1M in', domain: 'claude.ai' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', params: '~1.5T', context: '1M', price: '$1.25/1M in', domain: 'deepmind.google' },
  { name: 'DeepSeek R2', provider: 'DeepSeek', params: '685B MoE', context: '128K', price: '¥1/1M in', domain: 'chat.deepseek.com' },
  { name: 'Qwen3-235B', provider: '阿里云', params: '235B MoE', context: '128K', price: '¥2/1M in', domain: 'tongyi.aliyun.com' },
  { name: 'Llama 4 Maverick', provider: 'Meta', params: '400B MoE', context: '1M', price: '开源免费', domain: 'llama.meta.com' },
];

export default function ModelsPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb" style={{ padding: '0 24px' }}>
        <a href="/">首页</a><span>/</span>AI模型
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, padding: '0 24px' }}>AI模型</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28, padding: '0 24px' }}>全球最热门、最优质、最好用的AI模型皆汇聚于此</p>
      <div style={{ padding: '0 24px', overflowX: 'auto' }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>模型</th>
              <th>提供方</th>
              <th>参数量</th>
              <th>上下文</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody>
            {popularModels.map(m => (
              <tr key={m.name}>
                <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Favicon domain={m.domain} name={m.name} size={18} />
                  {m.name}
                </td>
                <td style={{ color: 'var(--text2)' }}>{m.provider}</td>
                <td style={{ color: 'var(--text2)' }}>{m.params}</td>
                <td><span style={{ color: 'var(--accent2)', fontWeight: 600 }}>{m.context}</span></td>
                <td style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.82rem' }}>{m.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
