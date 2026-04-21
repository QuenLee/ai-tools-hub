import './globals.css';

export const metadata = {
  title: 'AI工具情报站 - 深度评测，发现好用的AI工具',
  description: '深度评测AI工具，帮你看清哪个值得用、哪个不值得花钱。AI写作、AI绘画、AI视频、AI编程全覆盖。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="header">
          <div className="header-inner">
            <a href="/" className="logo">🤖 AI工具情报站</a>
            <nav className="nav">
              <a href="/">首页</a>
              <a href="/compare">横评</a>
              <a href="/deals">优惠</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            <p>🤖 AI工具情报站 — 深度评测，发现好用的AI工具</p>
            <p style={{ marginTop: 8 }}>© 2026 AI Tools Hub. 所有评测基于实际使用体验。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
