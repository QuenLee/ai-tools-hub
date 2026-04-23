/** @type {import('next').MetadataRoute} */
export default function sitemap() {
  const base = 'https://ai.quen.us.kg';
  const { ALL_TOOLS } = require('@/lib/tools-registry');
  const locales = ['zh', 'zh-HK', 'en'];
  const defaultLocale = 'zh';

  const staticRoutes = [
    { path: '', priority: 1.0, changefreq: 'daily' },       // 首页
    { path: '/tools', priority: 1.0, changefreq: 'daily' },  // 工具列表
    { path: '/faq', priority: 0.7, changefreq: 'monthly' },
    { path: '/privacy', priority: 0.3, changefreq: 'monthly' },
    { path: '/terms', priority: 0.3, changefreq: 'monthly' },
  ];

  const toolRoutes = ALL_TOOLS.map(t => ({
    path: `/tools/${t.id}`,
    priority: t.apiTool ? 0.8 : 0.6,  // AI工具优先级更高
    changefreq: 'weekly',
  }));

  const allRoutes = [...staticRoutes, ...toolRoutes];
  const urls = [];

  for (const route of allRoutes) {
    for (const locale of locales) {
      const url = {
        url: `${base}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changefreq,
        priority: route.priority,
        // hreflang alternate links for multi-language SEO
        alternates: {
          languages: Object.fromEntries(
            locales
              .filter(l => l !== locale)
              .map(l => [l, `${base}/${l}${route.path}`])
          ),
        },
      };
      urls.push(url);
    }
  }

  return urls;
}
