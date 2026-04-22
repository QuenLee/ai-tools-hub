// 工具注册表 — 12个工具的元数据
const ALL_TOOLS = [
  { id: 'ai-text-detect', name: 'AI文本检测', desc: '检测文本是否AI生成', icon: '🔍', price: '9.9元/月', cat: 'high' },
  { id: 'ai-watermark', name: 'AI去水印', desc: '上传图片智能去除水印', icon: '🖼️', price: '19.9元/月', cat: 'high' },
  { id: 'short-url', name: '短链接生成', desc: '生成短链接+点击统计', icon: '🔗', price: '9.9元/月', cat: 'high' },
  { id: 'ai-translate', name: 'AI翻译对比', desc: '多模型翻译结果对比', icon: '🌐', price: '9.9元/月', cat: 'high' },
  { id: 'pdf-convert', name: 'PDF转Word/Excel', desc: 'PDF一键转可编辑文档', icon: '📄', price: '9.9元/月', cat: 'existing' },
  { id: 'ai-copywriter', name: 'AI文案生成器', desc: '多平台营销文案一键生成', icon: '✍️', price: '9.9元/月', cat: 'existing' },
  { id: 'image-convert', name: '图片格式转换', desc: 'WebP/PNG/JPG互转', icon: '🔄', price: '免费', cat: 'existing' },
  { id: 'markdown-editor', name: 'Markdown编辑器', desc: '实时预览+导出HTML', icon: '📝', price: '免费', cat: 'existing' },
  { id: 'ai-resume', name: 'AI简历优化', desc: 'AI改写优化你的简历', icon: '💼', price: '19.9元/月', cat: 'mid' },
  { id: 'prompt-templates', name: 'Prompt模板库', desc: '按场景分类的提示词模板', icon: '💡', price: '9.9元/月', cat: 'mid' },
  { id: 'ai-code-review', name: 'AI代码审查', desc: 'AI找出bug和优化建议', icon: '💻', price: '19.9元/月', cat: 'mid' },
  { id: 'seo-title-gen', name: 'SEO标题生成', desc: '批量生成SEO友好标题', icon: '📈', price: '9.9元/月', cat: 'mid' },
];

module.exports = { ALL_TOOLS };
