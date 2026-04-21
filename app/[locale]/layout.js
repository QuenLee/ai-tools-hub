import { locales } from '@/lib/i18n';
import TopNav from '@/components/TopNav';
import './globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: 'QuenAI - 通往AGI之路',
    description: 'AI工具深度评测、AI资讯、AI模型对比、AI变现指南',
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <TopNav locale={locale} />
        {children}
        <footer className="footer">
          <div style={{ maxWidth: '80%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>QuenAI</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>通往AGI之路</div>
            </div>
            <div style={{ display: 'flex', gap: 24, fontSize: '0.78rem' }}>
              <a href={`/${locale}/products`}>AI产品</a>
              <a href={`/${locale}/tools`}>AI工具</a>
              <a href={`/${locale}/models`}>AI模型</a>
              <a href={`/${locale}/tutorials`}>AI教程</a>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
              © 2026 QuenAI · All rights reserved
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
