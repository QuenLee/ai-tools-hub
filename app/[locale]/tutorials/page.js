'use client';

import Link from 'next/link';

const tutorials = [
  {
    cat: '内容创作',
    catColor: 'var(--pink)',
    items: [
      { title: 'AI二创萌系IP：从流量爆款到实物变现', desc: '用AI生成萌系角色→小红书起号→周边变现，完整链路拆解', views: '12.3K', difficulty: '专业级', time: '15分钟' },
      { title: 'AI"邪修"构图法：小红书轻松获赞3万+', desc: 'Midjourney+创意构图→爆款图文，不需要绘画基础', views: '34.1K', difficulty: '入门级', time: '10分钟' },
      { title: '用AI做儿童绘本：从故事到插画的完整流程', desc: 'ChatGPT写故事→Midjourney画插图→自动排版成书', views: '8.5K', difficulty: '入门级', time: '20分钟' },
    ]
  },
  {
    cat: '开发变现',
    catColor: 'var(--cyan)',
    items: [
      { title: '利用AI自动化搭建SaaS，实现日入$200', desc: 'Cursor全栈开发→Stripe收款→Vercel部署，零成本启动', views: '49.0K', difficulty: '专业级', time: '30分钟' },
      { title: 'AI Chrome插件：从想法到上架全流程', desc: '用AI写代码→Chrome商店发布→赚取安装量变现', views: '15.2K', difficulty: '进阶级', time: '25分钟' },
      { title: '用Cursor做自由职业：接单实战攻略', desc: '在Upwork/Fiverr接AI开发订单的技巧和定价策略', views: '22.8K', difficulty: '进阶级', time: '12分钟' },
    ]
  },
  {
    cat: '自媒体运营',
    catColor: 'var(--yellow)',
    items: [
      { title: 'AI视频起号：零粉到万粉爆款玩法', desc: 'Suno做音乐→可灵生成视频→抖音起号全流程', views: '32.6K', difficulty: '入门级', time: '18分钟' },
      { title: 'AI公众号涨粉：每天10分钟日增100粉', desc: 'Kimi写文→AI配图→定时发布，可复制的涨粉SOP', views: '19.4K', difficulty: '入门级', time: '10分钟' },
      { title: 'AI短剧制作：一部手机就能拍', desc: 'AI写剧本→AI生画面→剪映合成，零成本拍短剧', views: '27.1K', difficulty: '进阶级', time: '22分钟' },
    ]
  },
  {
    cat: '工具教程',
    catColor: 'var(--accent2)',
    items: [
      { title: 'DeepSeek R2完全指南：从入门到精通', desc: '注册、Prompt技巧、推理模式、API使用，一篇搞定', views: '28.5K', difficulty: '入门级', time: '15分钟' },
      { title: 'Cursor从零开始：Vibe Coding实操手册', desc: '安装配置→第一个项目→高级技巧→常见问题解决', views: '41.2K', difficulty: '入门级', time: '20分钟' },
      { title: 'Midjourney提示词宝典：从新手到大师', desc: '参数详解、风格词、构图词、负面提示词完全指南', views: '56.3K', difficulty: '进阶级', time: '25分钟' },
    ]
  },
  {
    cat: 'Prompt技巧',
    catColor: 'var(--green)',
    items: [
      { title: '10个Prompt让AI写作质量翻倍', desc: '角色设定、格式约束、示例引导等实战技巧', views: '18.7K', difficulty: '入门级', time: '8分钟' },
      { title: '结构化Prompt框架：CRISPE法则详解', desc: 'Capacity-Role-Insight-Statement-Personality-Experiment', views: '14.2K', difficulty: '进阶级', time: '12分钟' },
      { title: 'AI编程Prompt最佳实践', desc: '让Cursor/Copilot写出更好代码的提示词模板', views: '23.8K', difficulty: '进阶级', time: '15分钟' },
    ]
  },
];

export default function TutorialsPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb">
        <a href="/zh">首页</a><span>/</span>AI教程
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>AI教程</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>AI赚钱案例、工具使用教程、Prompt技巧</p>

      {tutorials.map(section => (
        <div key={section.cat} style={{ marginBottom: 36 }}>
          <h2 style={{
            fontSize: '1.05rem', fontWeight: 700, marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 4, height: 20, borderRadius: 2,
              background: section.catColor, display: 'inline-block',
            }} />
            {section.cat}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.items.map((t, i) => (
              <article
                key={i}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '18px 22px',
                  boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
                      {t.title}
                      <span style={{
                        fontSize: '0.65rem', padding: '2px 8px', borderRadius: 6,
                        background: t.difficulty === '入门级' ? 'rgba(52,211,153,0.08)' :
                          t.difficulty === '进阶级' ? 'rgba(251,191,36,0.08)' : 'rgba(124,92,252,0.08)',
                        color: t.difficulty === '入门级' ? 'var(--green)' :
                          t.difficulty === '进阶级' ? 'var(--yellow)' : 'var(--accent2)',
                        fontWeight: 600, marginLeft: 8,
                      }}>
                        {t.difficulty}
                      </span>
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.5 }}>{t.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{t.views} 阅读</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: 4 }}>{t.time}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
