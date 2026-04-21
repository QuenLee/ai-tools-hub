import './globals.css';
import TopNav from './components/TopNav';

export const metadata = {
  title: 'AI工具情报站 - 深度评测，发现好用的AI工具',
  description: '深度评测AI工具，帮你看清哪个值得用、哪个不值得花钱。AI写作、AI绘画、AI视频、AI编程、AI对话全覆盖。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <TopNav />
        {children}
        <footer className="footer">
          <a href="/">首页</a>
          <a href="/compare">横评</a>
          <a href="/deals">优惠</a>
          <br style={{ margin: 10 }} />
          🤖 AI工具情报站 · 深度评测，发现好用的AI工具 · © 2026
        </footer>
      </body>
    </html>
  );
}
