import { locales } from '@/lib/i18n';
import TopNav from '@/components/TopNav';
import './globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    'zh': "Quen's AI - AI工具深度评测与推荐 | 通往AGI之路",
    'zh-HK': "Quen's AI - AI工具深度評測與推薦 | 通往AGI之路",
    'en': "Quen's AI - Best AI Tool Reviews & Recommendations",
  };
  const descriptions = {
    'zh': '深度评测DeepSeek、ChatGPT、豆包、Kimi、Cursor等34+主流AI工具。AI工具排行榜、免费AI工具大全、AI变现指南、AI模型横评，帮你选对不花冤枉钱。',
    'zh-HK': '深度評測DeepSeek、ChatGPT、豆包、Kimi、Cursor等34+主流AI工具。AI工具排行榜、免費AI工具大全、AI變現指南、AI模型橫評，幫你選對不花冤枉錢。',
    'en': 'In-depth reviews of 34+ AI tools including DeepSeek, ChatGPT, Doubao, Kimi, Cursor. AI tool rankings, free AI tools, monetization guides, and model comparisons.',
  };
  return {
    title: titles[locale] || titles['zh'],
    description: descriptions[locale] || descriptions['zh'],
    keywords: 'AI工具,AI评测,DeepSeek,ChatGPT,豆包,Kimi,Cursor,AI排行榜,免费AI,AI变现,AI绘画,AI写作,AI编程,AI视频,人工智能',
    openGraph: {
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
      type: 'website',
      locale: locale === 'zh-HK' ? 'zh_HK' : locale === 'en' ? 'en_US' : 'zh_CN',
    },
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
          <div style={{ maxWidth: '92%', margin: '0 auto', padding: '0 28px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: '0.9rem' }}>Quen&apos;s AI</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text3)', maxWidth: 260 }}>通往AGI之路 · 深度评测·真实体验·帮你选对</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>导航</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.75rem' }}>
                <a href={`/${locale}/products`}>AI产品</a>
                <a href={`/${locale}/tools`}>AI工具</a>
                <a href={`/${locale}/models`}>AI模型</a>
                <a href={`/${locale}/tutorials`}>AI变现攻略</a>
                <a href={`/${locale}/deals`}>省钱指南</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>工具</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.75rem' }}>
                <a href={`/${locale}/tools`}>AI文本检测</a>
                <a href={`/${locale}/tools`}>AI去水印</a>
                <a href={`/${locale}/tools`}>短链接生成</a>
                <a href={`/${locale}/tools`}>AI翻译对比</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>关于</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.75rem' }}>
                <a href={`/${locale}/about`}>关于我们</a>
                <a href={`/${locale}/privacy`}>隐私政策</a>
                <a href={`/${locale}/terms`}>服务条款</a>
                <a href="mailto:quen@ai.tools">联系我们</a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '92%', margin: '12px auto 0', padding: '12px 28px 0', borderTop: '1px solid var(--border)', fontSize: '0.68rem', color: 'var(--text3)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span>© 2026 Quen&apos;s AI · All rights reserved</span>
            <span>本站部分链接为推广链接，不影响评测客观性</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
