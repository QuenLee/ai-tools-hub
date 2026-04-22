/** @type {import('next').MetadataRoute} */
export default function sitemap() {
  const base = 'https://ai.quen.us.kg';
  const locale = 'zh';
  const routes = [
    '', '/products', '/tools', '/models', '/tutorials', '/deals',
    '/compare', '/compare/china-ai', '/about', '/privacy', '/terms',
  ];
  const { tools } = require('@/lib/data');
  const { topics } = require('@/lib/topics');
  const { tutorials } = require('@/lib/tutorials');

  const toolRoutes = tools.map(t => `/tool/${t.id}`);
  const topicRoutes = topics.map(t => `/topic/${t.slug}`);
  const tutorialRoutes = tutorials.map(t => `/tutorial/${t.slug}`);
  const catRoutes = [
    'writing', 'image', 'video', 'code', 'office', 'search', 'marketing', 'design', 'audio', 'chat'
  ].map(c => `/category/${c}`);

  const allRoutes = [...routes, ...toolRoutes, ...topicRoutes, ...tutorialRoutes, ...catRoutes];
  return allRoutes.map(route => ({
    url: `${base}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('/tool/') ? 0.8 : 0.6,
  }));
}
