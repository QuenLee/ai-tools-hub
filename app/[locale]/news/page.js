import Link from 'next/link';

const newsList = [
  { title: '华为硬核上新：Pura90 系列领衔，AI眼镜与阔折叠手机齐亮相', time: '2026-04-21', source: '华为官网' },
  { title: 'Chrome 浏览器 Gemini 功能扩展至更多亚太地区国家', time: '2026-04-21', source: 'Google Blog' },
  { title: '阿里开源 Qwen3.6-35B：30亿激活参数实现编程能力跨越式升级', time: '2026-04-20', source: '阿里云' },
  { title: 'Anthropic 发布全新 Claude Opus 4.7，功能显著提升', time: '2026-04-20', source: 'Anthropic' },
  { title: 'Midjourney V8.1 重磅发布：原生2K高清渲染速度成本双降3倍', time: '2026-04-19', source: 'Midjourney' },
  { title: 'DeepSeek R2 开源：推理能力再破纪录，完全免费', time: '2026-04-19', source: 'DeepSeek' },
  { title: '特斯拉2026春季更新：FSD一键订阅，车载AI语音时代', time: '2026-04-18', source: 'Tesla' },
  { title: '谷歌或将推出无屏健身手环 Fitbit Air，主打AI健康教练', time: '2026-04-18', source: '9to5Google' },
];

export default function NewsPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div className="breadcrumb" style={{ padding: '0 24px' }}>
        <a href="/">首页</a><span>/</span>AI资讯
      </div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6, padding: '0 24px' }}>AI资讯</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28, padding: '0 24px' }}>热点AI新闻，每日更新</p>
      <div style={{ padding: '0 24px' }}>
        {newsList.map((item, i) => (
          <div key={i} className="news-item" style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
            <span className="news-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>{item.source} · {item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
