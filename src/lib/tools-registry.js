// 工具注册表 — 全部工具元数据
const ALL_TOOLS = [
  // ===== 自媒体神器（调AI API，有真实输出）=====
  { id: 'xhs-writer', name: '小红书种草文', desc: '输入产品→爆款笔记标题+正文+标签', icon: '📕', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'douyin-script', name: '抖音脚本生成', desc: '输入主题→完整短视频脚本', icon: '🎵', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'live-script', name: '直播话术生成', desc: '输入产品→整场直播话术+排品', icon: '📺', price: '19.9元/月', cat: 'social', apiTool: true },
  { id: 'comment-reply', name: '评论回复助手', desc: '粘贴评论→智能生成得体回复', icon: '💬', price: '免费', cat: 'social', apiTool: true },
  { id: 'wechat-article', name: '公众号文章', desc: '输入主题→完整公众号推文', icon: '📰', price: '19.9元/月', cat: 'social', apiTool: true },
  { id: 'bili-script', name: 'B站视频脚本', desc: '输入主题→中长视频脚本+弹幕点', icon: '📺', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'private-domain', name: '社群运营文案', desc: '群公告/欢迎语/活动文案', icon: '🏠', price: '9.9元/月', cat: 'social', apiTool: true },

  // ===== 高频刚需（前端演示+后端可升级）=====
  { id: 'ai-text-detect', name: 'AI文本检测', desc: '检测文本是否AI生成', icon: '🔍', price: '9.9元/月', cat: 'high' },
  { id: 'ai-watermark', name: 'AI去水印', desc: '上传图片智能去除水印', icon: '🖼️', price: '19.9元/月', cat: 'high' },
  { id: 'short-url', name: '短链接生成', desc: '生成短链接+点击统计', icon: '🔗', price: '9.9元/月', cat: 'high' },
  { id: 'ai-translate', name: 'AI翻译对比', desc: '多模型翻译结果对比', icon: '🌐', price: '9.9元/月', cat: 'high' },

  // ===== 实用工具 =====
  { id: 'ai-resume', name: 'AI简历优化', desc: 'AI改写优化你的简历', icon: '💼', price: '19.9元/月', cat: 'mid' },
  { id: 'prompt-templates', name: 'Prompt模板库', desc: '按场景分类的提示词模板', icon: '💡', price: '9.9元/月', cat: 'mid' },
  { id: 'ai-code-review', name: 'AI代码审查', desc: 'AI找出bug和优化建议', icon: '💻', price: '19.9元/月', cat: 'mid' },
  { id: 'seo-title-gen', name: 'SEO标题生成', desc: '批量生成SEO友好标题', icon: '📈', price: '9.9元/月', cat: 'mid' },

  // ===== 基础工具（免费）=====
  { id: 'pdf-convert', name: 'PDF转Word/Excel', desc: 'PDF一键转可编辑文档', icon: '📄', price: '免费', cat: 'existing' },
  { id: 'ai-copywriter', name: 'AI文案生成器', desc: '多平台营销文案一键生成', icon: '✍️', price: '9.9元/月', cat: 'existing' },
  { id: 'image-convert', name: '图片格式转换', desc: 'WebP/PNG/JPG互转', icon: '🔄', price: '免费', cat: 'existing' },
  { id: 'markdown-editor', name: 'Markdown编辑器', desc: '实时预览+导出HTML', icon: '📝', price: '免费', cat: 'existing' },
];

module.exports = { ALL_TOOLS };
