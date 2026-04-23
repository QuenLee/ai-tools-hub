// 工具注册表 — 全部工具元数据
const ALL_TOOLS = [
  // ===== 📱 自媒体神器（AI驱动，调NVIDIA API）=====
  { id: 'xhs-writer', name: '小红书种草文', desc: '输入产品→爆款笔记标题+正文+标签', icon: '📕', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'douyin-script', name: '抖音脚本生成', desc: '输入主题→完整短视频脚本', icon: '🎵', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'live-script', name: '直播话术生成', desc: '输入产品→整场直播话术+排品', icon: '📺', price: '19.9元/月', cat: 'social', apiTool: true },
  { id: 'comment-reply', name: '评论回复助手', desc: '粘贴评论→智能生成得体回复', icon: '💬', price: '免费', cat: 'social', apiTool: true },
  { id: 'wechat-article', name: '公众号文章', desc: '输入主题→完整公众号推文', icon: '📰', price: '19.9元/月', cat: 'social', apiTool: true },
  { id: 'bili-script', name: 'B站视频脚本', desc: '输入主题→中长视频脚本+弹幕点', icon: '🎬', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'private-domain', name: '社群运营文案', desc: '群公告/欢迎语/活动文案', icon: '🏠', price: '9.9元/月', cat: 'social', apiTool: true },

  // ===== 💼 职场办公神器（AI驱动）=====
  { id: 'weekly-report', name: '周报/日报生成', desc: '输入工作内容→专业周报/日报', icon: '📋', price: '9.9元/月', cat: 'office', apiTool: true },
  { id: 'meeting-notes', name: '会议纪要生成', desc: '输入会议内容→纪要+待办清单', icon: '📝', price: '9.9元/月', cat: 'office', apiTool: true },
  { id: 'email-writer', name: '邮件撰写助手', desc: '场景+要点→专业邮件', icon: '📧', price: '免费', cat: 'office', apiTool: true },
  { id: 'ppt-outline', name: 'PPT大纲生成', desc: '主题→PPT结构+每页要点+视觉建议', icon: '📊', price: '9.9元/月', cat: 'office', apiTool: true },
  { id: 'speech-writer', name: '演讲稿生成', desc: '场景→完整演讲稿+金句', icon: '🎙', price: '19.9元/月', cat: 'office', apiTool: true },
  { id: 'excel-formula', name: 'Excel公式生成', desc: '描述需求→公式+解释', icon: '📈', price: '免费', cat: 'office', apiTool: true },
  { id: 'competitor-analysis', name: '竞品分析报告', desc: '输入产品→结构化竞品分析', icon: '🔎', price: '19.9元/月', cat: 'office', apiTool: true },

  // ===== 🔧 专业工具（AI驱动）=====
  { id: 'seo-article', name: 'SEO文章生成', desc: '关键词→完整SEO优化文章', icon: '🔍', price: '19.9元/月', cat: 'pro', apiTool: true },
  { id: 'product-desc', name: '产品详情页文案', desc: '产品信息→电商详情页文案', icon: '🛒', price: '9.9元/月', cat: 'pro', apiTool: true },
  { id: 'ad-copy', name: '广告文案生成', desc: '产品+平台→多套广告素材', icon: '📢', price: '9.9元/月', cat: 'pro', apiTool: true },
  { id: 'contract-review', name: '合同审查助手', desc: '粘贴合同→风险点+修改建议', icon: '⚖️', price: '19.9元/月', cat: 'pro', apiTool: true },
  { id: 'data-analysis', name: '数据分析助手', desc: '描述问题→分析框架+思路', icon: '📊', price: '9.9元/月', cat: 'pro', apiTool: true },
  { id: 'interview-prep', name: '面试准备助手', desc: '岗位→20高频问题+参考答案', icon: '🎯', price: '19.9元/月', cat: 'pro', apiTool: true },

  // ===== 🌟 补充高需求工具（AI驱动）=====
  { id: 'blog-writer', name: '博客文章生成', desc: '主题→深度博客长文', icon: '📝', price: '9.9元/月', cat: 'pro', apiTool: true },
  { id: 'summary-gen', name: '智能摘要生成', desc: '粘贴长文→精炼摘要', icon: '📋', price: '免费', cat: 'office', apiTool: true },
  { id: 'story-gen', name: 'AI故事创作', desc: '设定→完整故事', icon: '📖', price: '9.9元/月', cat: 'social', apiTool: true },
  { id: 'study-plan', name: '学习计划生成', desc: '目标→系统学习计划', icon: '📚', price: '9.9元/月', cat: 'office', apiTool: true },
  { id: 'brainstorm', name: '创意头脑风暴', desc: '问题→20+创意想法', icon: '💡', price: '免费', cat: 'pro', apiTool: true },
  { id: 'translate-polish', name: '翻译+润色', desc: '文本翻译或语言润色', icon: '🌐', price: '免费', cat: 'office', apiTool: true },
  { id: 'name-gen', name: '品牌命名+Slogan', desc: '产品描述→品牌名+口号', icon: '🏷️', price: '9.9元/月', cat: 'pro', apiTool: true },
  { id: 'api-doc', name: 'API文档生成', desc: 'API描述→完整接口文档', icon: '🔧', price: '9.9元/月', cat: 'pro', apiTool: true },

  // ===== 💻 开发者工具（前端本地，免费无限）=====
  { id: 'json-formatter', name: 'JSON格式化', desc: 'JSON美化/压缩/校验', icon: '{ }', price: '免费', cat: 'dev', apiTool: false },
  { id: 'json-to-yaml', name: 'JSON转YAML', desc: 'JSON↔YAML互转', icon: '📋', price: '免费', cat: 'dev', apiTool: false },
  { id: 'base64-tool', name: 'Base64编解码', desc: '文本/文件Base64编解码', icon: '🔐', price: '免费', cat: 'dev', apiTool: false },
  { id: 'url-encode', name: 'URL编解码', desc: 'URL编码/解码', icon: '🔗', price: '免费', cat: 'dev', apiTool: false },
  { id: 'hash-gen', name: '哈希生成器', desc: 'MD5/SHA1/SHA256哈希', icon: '#️⃣', price: '免费', cat: 'dev', apiTool: false },
  { id: 'regex-tester', name: '正则表达式测试', desc: '正则实时匹配测试', icon: '🎯', price: '免费', cat: 'dev', apiTool: false },
  { id: 'timestamp-tool', name: '时间戳转换', desc: 'Unix时间戳↕日期互转', icon: '⏱️', price: '免费', cat: 'dev', apiTool: false },
  { id: 'uuid-gen', name: 'UUID生成器', desc: '批量生成UUID v4', icon: '🆔', price: '免费', cat: 'dev', apiTool: false },
  { id: 'color-tool', name: '颜色转换器', desc: 'HEX↔RGB↔HSL互转', icon: '🎨', price: '免费', cat: 'dev', apiTool: false },
  { id: 'text-diff', name: '文本对比', desc: '两段文本差异高亮对比', icon: '📝', price: '免费', cat: 'dev', apiTool: false },
  { id: 'jwt-parser', name: 'JWT解析器', desc: '解码JWT Token查看内容', icon: '🔑', price: '免费', cat: 'dev', apiTool: false },
  { id: 'qr-code', name: '二维码生成器', desc: '文本/链接→二维码', icon: '📱', price: '免费', cat: 'dev', apiTool: false },
  // ===== 🎁 免费粘性工具（引流+SEO）=====
  { id: 'word-count', name: '字数统计', desc: '字数/词数/行数/字符统计', icon: '📊', price: '免费', cat: 'free', apiTool: false },
  { id: 'text-replace', name: '批量文本替换', desc: '查找替换+正则替换', icon: '🔄', price: '免费', cat: 'free', apiTool: false },
  { id: 'lorem-ipsum', name: '占位文本生成', desc: '中英文占位文本Lorem', icon: '📃', price: '免费', cat: 'free', apiTool: false },
  { id: 'slug-gen', name: 'URL Slug生成', desc: '中文标题→URL友好slug', icon: '🌐', price: '免费', cat: 'free', apiTool: false },
  { id: 'markdown-preview', name: 'Markdown预览', desc: '实时Markdown渲染预览', icon: '👁️', price: '免费', cat: 'free', apiTool: false },
  { id: 'emoji-picker', name: 'Emoji选择器', desc: '搜索复制Emoji表情', icon: '😊', price: '免费', cat: 'free', apiTool: false },
  { id: 'password-gen', name: '密码生成器', desc: '安全随机密码生成', icon: '🔐', price: '免费', cat: 'free', apiTool: false },
  { id: 'html-entity', name: 'HTML实体转换', desc: 'HTML特殊字符编码解码', icon: '&amp;', price: '免费', cat: 'free', apiTool: false },
  // ===== 📄 基础工具（前端本地）=====
  { id: 'ai-text-detect', name: 'AI文本检测', desc: '检测文本是否AI生成', icon: '🔍', price: '9.9元/月', cat: 'basic' },
  { id: 'ai-watermark', name: 'AI去水印', desc: '上传图片智能去除水印', icon: '🖼️', price: '19.9元/月', cat: 'basic' },
  { id: 'short-url', name: '短链接生成', desc: '生成短链接+点击统计', icon: '🔗', price: '9.9元/月', cat: 'basic' },
  { id: 'ai-translate', name: 'AI翻译对比', desc: '多模型翻译结果对比', icon: '🌐', price: '9.9元/月', cat: 'basic' },
  { id: 'ai-resume', name: 'AI简历优化', desc: 'AI改写优化你的简历', icon: '💼', price: '19.9元/月', cat: 'basic' },
  { id: 'prompt-templates', name: 'Prompt模板库', desc: '按场景分类的提示词模板', icon: '💡', price: '9.9元/月', cat: 'basic' },
  { id: 'ai-code-review', name: 'AI代码审查', desc: 'AI找出bug和优化建议', icon: '💻', price: '19.9元/月', cat: 'basic' },
  { id: 'seo-title-gen', name: 'SEO标题生成', desc: '批量生成SEO友好标题', icon: '📈', price: '9.9元/月', cat: 'basic' },
  { id: 'pdf-convert', name: 'PDF转Word/Excel', desc: 'PDF一键转可编辑文档', icon: '📄', price: '免费', cat: 'basic' },
  { id: 'ai-copywriter', name: 'AI文案生成器', desc: '多平台营销文案一键生成', icon: '✍️', price: '9.9元/月', cat: 'basic' },
  { id: 'image-convert', name: '图片格式转换', desc: 'WebP/PNG/JPG互转', icon: '🔄', price: '免费', cat: 'basic' },
  { id: 'markdown-editor', name: 'Markdown编辑器', desc: '实时预览+导出HTML', icon: '📝', price: '免费', cat: 'basic' },
];

module.exports = { ALL_TOOLS };
