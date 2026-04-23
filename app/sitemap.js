/** @type {import('next').MetadataRoute} */
export default function sitemap() {
  const base = 'https://ai.quen.us.kg';
  const locale = 'zh';
  const { ALL_TOOLS } = require('@/lib/tools-registry');

  const staticRoutes = [
    '/tools',
    '/privacy',
    '/terms',
  ];

  // Individual tool pages with SEO-friendly URLs
  const toolRoutes = ALL_TOOLS.map(t => `/tools/${t.id}`);

  const allRoutes = [...staticRoutes, ...toolRoutes];

  return allRoutes.map(route => ({
    url: `${base}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/tools' ? 'daily' : 'weekly',
    priority: route === '/tools' ? 1.0 : 0.8,
  }));
}
