import { locales } from '@/lib/i18n';
import Script from 'next/script';
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
    openGraph: {
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
      type: 'website',
      locale: locale === 'zh-HK' ? 'zh_HK' : locale === 'en' ? 'en_US' : 'zh_CN',
    },
  };
}

// Google Analytics — replace G-XXXXXXX with real ID after setup
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        <meta name="msvalidate.01" content="B61D38B6AEB3EAD525BBF30D0C454B69" />
      </head>
      <body>
        {children}
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '0.72rem',
          color: 'var(--text3)',
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <span>© 2026 AI工具箱</span>
          <a href={`/${locale}/faq`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>常见问题</a>
          <a href={`/${locale}/privacy`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>隐私政策</a>
          <a href={`/${locale}/terms`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>服务条款</a>
        </footer>
      </body>
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
    </html>
  );
}
