import { locales } from '@/lib/i18n';
import Script from 'next/script';
import ThemeToggle from '@/components/ThemeToggle';
import MobileMenu from '@/components/MobileMenu';
import CheckinWidget from '@/components/CheckinWidget';
import './globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    'zh': "AI工具箱 - 60款免费在线AI工具 | Quen's AI",
    'zh-HK': "AI工具箱 - 60款免費在線AI工具 | Quen's AI",
    'en': "AI Toolbox - 60 Free Online AI Tools | Quen's AI",
  };
  const descriptions = {
    'zh': '60款免费在线工具，34款AI驱动：小红书文案、周报生成、SEO标题、代码审查、翻译对比等，即开即用，无需注册。',
    'zh-HK': '60款免費在線工具，34款AI驅動：小紅書文案、週報生成、SEO標題、代碼審查、翻譯對比等，即開即用，無需註冊。',
    'en': '60 free online tools, 34 AI-powered: Xiaohongshu copywriting, weekly reports, SEO titles, code review, translation and more. No registration required.',
  };
  return {
    title: titles[locale] || titles['zh'],
    description: descriptions[locale] || descriptions['zh'],
    keywords: 'AI工具箱,免费AI工具,小红书文案生成器,SEO标题生成,代码审查,AI翻译,在线工具,AI写作',
    icons: {
      icon: [{ url: '/icon.png', sizes: '32x32', type: 'image/png' }],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    openGraph: {
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
      type: 'website',
      locale: locale === 'zh-HK' ? 'zh_HK' : locale === 'en' ? 'en_US' : 'zh_CN',
      images: [{ url: '/android-icon-192x192.png', width: 192, height: 192 }],
    },
  };
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        <meta name="msvalidate.01" content="B61D38B6AEB3EAD525BBF30D0C454B69" />
        <meta name="google-site-verification" content="ukEoNUvpr6BRkzEAYA0kw_nckghHvtOMt-VNggFznUg" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {/* ── 顶部导航栏 ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 200,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto', padding: '0 16px',
            height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* Logo */}
            <a href={`/${locale}/tools`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 30, height: 30, borderRadius: 9,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', color: '#fff', fontWeight: 900,
              }}>⚔️</span>
              <span className="nav-logo-text" style={{
                fontWeight: 900, fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>AI工具箱</span>
            </a>

            {/* Desktop Nav */}
            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <a href={`/${locale}/tools`} style={{ fontSize: '0.85rem', color: 'var(--text2)', textDecoration: 'none', fontWeight: 600 }}>全部工具</a>
              <a href={`/${locale}/faq`} style={{ fontSize: '0.85rem', color: 'var(--text2)', textDecoration: 'none', fontWeight: 600 }}>常见问题</a>
              <ThemeToggle />
            </div>

            {/* Mobile hamburger (client component) */}
            <MobileMenu locale={locale} />
          </div>
        </nav>

        {/* ── 页面内容 ── */}
        {children}

        {/* ── 页脚 ── */}
        <footer className="main-footer" style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 16px', textAlign: 'center',
          background: 'var(--surface)',
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            display: 'flex', justifyContent: 'center', gap: 16,
            flexWrap: 'wrap', fontSize: '0.72rem', color: 'var(--text3)',
          }}>
            <span>© 2026 AI工具箱</span>
            <a href={`/${locale}/faq`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>常见问题</a>
            <a href={`/${locale}/privacy`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>隐私政策</a>
            <a href={`/${locale}/terms`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>服务条款</a>
          </div>
        </footer>

        <CheckinWidget />

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        )}

        {/* ── 导航栏移动端响应式 ── */}
        <style>{`
          @media (max-width: 640px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; }
            .main-footer { padding: 16px 12px !important; }
            .main-footer > div { gap: 10px !important; font-size: 0.65rem !important; }
          }
        `}</style>
      </body>
    </html>
  );
}
