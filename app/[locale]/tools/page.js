import Link from 'next/link';
import Favicon from '@/components/Favicon';

export default function ToolsPage() {
  const tools = [
    { name: '模型选型对比器', desc: '按场景选最合适的AI大模型', icon: '⚖️', href: '/compare' },
    { name: 'API费用计算器', desc: '对比各模型API调用成本', icon: '🧮', href: '#' },
    { name: '模型竞技场', desc: '盲评模型输出质量', icon: '🏟️', href: '#' },
  ];

  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb" style={{ padding: '0 24px' }}>
        <a href="/">首页</a><span>/</span>AI工具
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, padding: '0 24px' }}>AI工具</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28, padding: '0 24px' }}>自建实用AI工具</p>
      <div style={{ padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {tools.map(tool => (
          <Link key={tool.name} href={tool.href} className="tool-card" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{tool.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{tool.name}</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.86rem' }}>{tool.desc}</div>
          </Link>
        ))}
      </div>
      <div style={{ padding: '0 24px', marginTop: 32 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 24, textAlign: 'center', color: 'var(--text3)' }}>
          更多工具正在开发中… 敬请期待
        </div>
      </div>
    </div>
  );
}
