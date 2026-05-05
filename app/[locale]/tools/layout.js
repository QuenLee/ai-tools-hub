export const metadata = {
  title: 'AI工具箱 - 47款免费在线AI工具 | Quen\'s AI',
  description: 'AI工具箱提供47款免费在线工具，含AI驱动：小红书文案、抖音脚本、周报生成、SEO优化、图片压缩、PDF合并等，无需注册即开即用。',
  keywords: 'AI工具箱,免费AI工具,在线AI工具,小红书文案生成,抖音脚本,周报生成,SEO工具,图片压缩,PDF合并',
  openGraph: {
    title: 'AI工具箱 - 47款免费在线AI工具',
    description: '47款免费工具，含AI驱动，无需注册即开即用。',
    type: 'website',
    url: 'https://ai.quen.us.kg/zh/tools',
    siteName: 'AI工具箱',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary',
    title: 'AI工具箱 - 47款免费在线AI工具',
    description: '47款免费工具，含AI驱动，无需注册即开即用。',
  },
  alternates: {
    canonical: 'https://ai.quen.us.kg/zh/tools',
    languages: {
      'zh-CN': 'https://ai.quen.us.kg/zh/tools',
      'zh-HK': 'https://ai.quen.us.kg/zh-HK/tools',
      'en': 'https://ai.quen.us.kg/en/tools',
    },
  },
};

export default function ToolsLayout({ children }) {
  return children;
}
