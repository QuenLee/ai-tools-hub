/** @type {import('next').MetadataRoute} */
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://ai.quen.us.kg/sitemap.xml',
  };
}
