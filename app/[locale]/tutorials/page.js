import Link from 'next/link';

const tutorials = [
  { cat: '内容创作', title: 'AI二创萌系IP：从流量爆款到实物变现', views: '12.3K', tag: '专业级' },
  { cat: '内容创作', title: 'AI"邪修"构图法：小红书轻松获赞3万+', views: '34.1K', tag: '专业级' },
  { cat: '开发变现', title: '利用AI自动化搭建SaaS，实现日入$200', views: '49.0K', tag: '专业级' },
  { cat: '自媒体', title: 'AI视频起号：零粉到万粉爆款玩法', views: '32.6K', tag: '入门级' },
  { cat: '工具教程', title: 'DeepSeek R2完全指南：从入门到精通', views: '28.5K', tag: '入门级' },
  { cat: 'Prompt技巧', title: '10个Prompt让AI写作质量翻倍', views: '18.7K', tag: '入门级' },
];

export default function TutorialsPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb" style={{ padding: '0 24px' }}>
        <a href="/">首页</a><span>/</span>AI教程
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, padding: '0 24px' }}>AI教程</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28, padding: '0 24px' }}>AI赚钱案例、工具使用教程、Prompt技巧</p>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tutorials.map((t, i) => (
          <a key={i} href="#" className="deal-card" style={{ textDecoration: 'none' }}>
            <div className="deal-info">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                {t.title}
                <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(124,92,252,0.1)', color: 'var(--accent2)', fontWeight: 600 }}>{t.tag}</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>{t.cat}</p>
            </div>
            <div style={{ color: 'var(--text3)', fontSize: '0.82rem', flexShrink: 0 }}>{t.views} 阅读</div>
          </a>
        ))}
      </div>
    </div>
  );
}
