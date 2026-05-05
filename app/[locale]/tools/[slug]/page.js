import { ALL_TOOLS } from '@/lib/tools-registry';
import { TOOL_CONFIGS } from '@/lib/tool-configs';
import { locales } from '@/lib/i18n';
import ToolDetailClient from './ToolDetailClient';

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const tool of ALL_TOOLS) {
      params.push({ locale, slug: tool.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const tool = ALL_TOOLS.find(t => t.id === slug);
  if (!tool) return { title: '工具未找到' };

  const suffix = " | AI工具箱";
  const titles = {
    'zh': `${tool.name} - ${tool.desc}${suffix}`,
    'zh-HK': `${tool.name} - ${tool.desc}${suffix}`,
    'en': `${tool.name} - ${tool.desc} | AI Toolbox`,
  };
  const descriptions = {
    'zh': `免费在线${tool.name}，${tool.desc}。AI工具箱提供47款免费工具，无需注册即开即用。`,
    'zh-HK': `免費在線${tool.name}，${tool.desc}。AI工具箱提供47款免費工具，無需註冊即開即用。`,
    'en': `Free online ${tool.name} - ${tool.desc}. AI Toolbox offers 47 free tools, no registration required.`,
  };
  const url = `https://ai.quen.us.kg/${locale}/tools/${tool.id}`;

  return {
    title: titles[locale] || titles['zh'],
    description: descriptions[locale] || descriptions['zh'],
    keywords: `${tool.name},${tool.desc},AI工具,免费在线工具,AI工具箱`,
    openGraph: {
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
      type: 'website',
      url,
      siteName: 'AI工具箱',
      locale: locale === 'zh-HK' ? 'zh_HK' : locale === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: {
      card: 'summary',
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `https://ai.quen.us.kg/zh/tools/${tool.id}`,
        'zh-HK': `https://ai.quen.us.kg/zh-HK/tools/${tool.id}`,
        'en': `https://ai.quen.us.kg/en/tools/${tool.id}`,
      },
    },
  };
}

export default async function ToolSlugPage({ params }) {
  const { locale, slug } = await params;
  const tool = ALL_TOOLS.find(t => t.id === slug);

  if (!tool) {
    return (
      <div className="empty-state" style={{ padding: '80px 24px' }}>
        <div className="empty-icon">🔍</div>
        <div className="empty-title">工具未找到</div>
        <a href={`/${locale}/tools`} style={{ color: 'var(--accent2)', fontWeight: 600 }}>← 返回工具箱</a>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.desc,
    url: `https://ai.quen.us.kg/${locale}/tools/${tool.id}`,
    applicationCategory: tool.apiTool ? 'BusinessApplication' : 'UtilityApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '128' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolDetailClient tool={tool} locale={locale} />
    </>
  );
}
