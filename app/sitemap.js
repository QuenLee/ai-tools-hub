/** @type {import('next').MetadataRoute} */
export default function sitemap() {
  const base = 'https://ai.quen.us.kg';
  const locale = 'zh';
  const { ALL_TOOLS } = require('@/lib/tools-registry');

  const routes = [
    '',
    '/tools',
    '/privacy',
    '/terms',
  ];

  // Add individual tool pages
  const toolRoutes = ALL_TOOLS.map(t => `/tools?tool=${t.id}`);

  const allRoutes = [...routes, ...toolRoutes];

  return allRoutes.map(route => ({
    url: `${base}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/tools' ? 0.9 : 0.8,
  }));
}
