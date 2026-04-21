import './globals.css';
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'AI工具情报站 - 深度评测，发现好用的AI工具',
  description: '深度评测AI工具，帮你看清哪个值得用、哪个不值得花钱。AI写作、AI绘画、AI视频、AI编程、AI对话全覆盖。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <header className="header">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input placeholder="搜索AI工具..." />
              </div>
            </header>
            {children}
          </div>
        </div>
        <footer className="footer">
          🤖 AI工具情报站 — 深度评测，发现好用的AI工具 · © 2026
        </footer>
      </body>
    </html>
  );
}
