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
    'zh': "AI工具箱 - 47款免费在线AI工具 | Quen's AI",
    'zh-HK': "AI工具箱 - 47款免費在線AI工具 | Quen's AI",
    'en': "AI Toolbox - 47 Free Online AI Tools | Quen's AI",
  };
  const descriptions = {
    'zh': '47款免费在线工具，含AI驱动：小红书文案、周报生成、SEO标题、图片压缩、PDF合并等，即开即用，无需注册。',
    'zh-HK': '47款免費在線工具，含AI驅動：小紅書文案、週報生成、SEO標題、圖片壓縮、PDF合併等，即開即用，無需註冊。',
    'en': '47 free online tools, AI-powered: Xiaohongshu copywriting, weekly reports, SEO titles, image compress, PDF merge and more. No registration required.',
  };
  return {
    title: titles[locale] || titles['zh'],
    description: descriptions[locale] || descriptions['zh'],
    keywords: 'AI工具箱,免费AI工具,小红书文案生成器,SEO标题生成,图片压缩,PDF合并,在线工具,AI写作',
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
        <nav className="topnav">
          <div className="topnav-inner">
            <a href={`/${locale}/tools`} className="topnav-logo">
              <span style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'var(--gradient1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', color: '#fff',
              }}>⚔️</span>
              AI工具箱
            </a>
            <div className="topnav-links">
              <a href={`/${locale}/tools`} className="topnav-link active">全部工具</a>
              <a href={`/${locale}/faq`} className="topnav-link">常见问题</a>
              <ThemeToggle />
            </div>
            <MobileMenu locale={locale} />
          </div>
        </nav>

        {children}

        <footer className="main-footer">
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span>© 2026 AI工具箱</span>
            <a href={`/${locale}/faq`}>常见问题</a>
            <a href={`/${locale}/privacy`}>隐私政策</a>
            <a href={`/${locale}/terms`}>服务条款</a>
          </div>
        </footer>

        <CheckinWidget />

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
      </body>
    </html>
  );
}
