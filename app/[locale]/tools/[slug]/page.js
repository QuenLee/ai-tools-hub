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
    'zh': `免费在线${tool.name}，${tool.desc}。AI工具箱提供60款免费工具，无需注册即开即用。`,
    'zh-HK': `免費在線${tool.name}，${tool.desc}。AI工具箱提供60款免費工具，無需註冊即開即用。`,
    'en': `Free online ${tool.name} - ${tool.desc}. AI Toolbox offers 60 free tools, no registration required.`,
  };

  return {
    title: titles[locale] || titles['zh'],
    description: descriptions[locale] || descriptions['zh'],
    keywords: `${tool.name},${tool.desc},AI工具,免费在线工具,AI工具箱`,
    openGraph: {
      title: titles[locale] || titles['zh'],
      description: descriptions[locale] || descriptions['zh'],
      type: 'website',
    },
  };
}

export default async function ToolSlugPage({ params }) {
  const { locale, slug } = await params;
  const tool = ALL_TOOLS.find(t => t.id === slug);

  if (!tool) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text3)' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>工具未找到</div>
        <a href={`/${locale}/tools`} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>← 返回工具箱</a>
      </div>
    );
  }

  return <ToolDetailClient tool={tool} locale={locale} />;
}
