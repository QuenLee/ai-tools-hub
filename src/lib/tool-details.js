// AI工具详情补充数据（targetUsers, useCases, howToUse, faq）
// 主数据在 data.js 中，这里存详情页所需的丰富内容

export const toolDetails = {
  chatgpt: {
    targetUsers: ['自媒体创作者', '程序员', '学生', '翻译工作者', '产品经理'],
    useCases: [
      { title: '内容创作', desc: '用ChatGPT撰写公众号文章、小红书文案、短视频脚本，效率提升5-10倍' },
      { title: '代码编程', desc: '生成、调试、重构代码，支持Python/JS/Go等50+语言' },
      { title: '学习助手', desc: '解释复杂概念、生成练习题、辅助论文写作' },
      { title: '数据分析', desc: '上传CSV/Excel文件，让ChatGPT分析数据并生成洞察' },
    ],
    howToUse: [
      '访问 chatgpt.com，用邮箱注册OpenAI账号',
      '免费版直接开始对话；Plus用户可切换GPT-4o模型',
      '在输入框描述你的需求，越具体效果越好',
      '可以上传文件、图片让AI分析，也可让它联网搜索最新信息',
      '使用自定义GPT获取专业领域的定制化回复',
    ],
    faq: [
      { q: 'ChatGPT免费版和Plus有什么区别？', a: '免费版使用GPT-4o mini，响应较快但能力稍弱；Plus版（$20/月）使用GPT-4o，能力更强，还可使用DALL-E画图、联网搜索、自定义GPT等高级功能。日常使用免费版已够用。' },
      { q: 'ChatGPT需要翻墙吗？', a: '需要。ChatGPT未对中国大陆开放，需使用科学上网工具访问。建议选择美国、日本节点，稳定性较好。' },
      { q: 'ChatGPT和Claude哪个更好？', a: '日常对话和多功能场景ChatGPT更强；长文写作、文档分析Claude更优。建议两个都用，各取所长。' },
    ],
  },
  claude: {
    targetUsers: ['论文作者', '技术文档工程师', '产品经理', '法律从业者', '长文阅读爱好者'],
    useCases: [
      { title: '论文写作', desc: '一次上传10篇论文，让Claude对比分析并生成综述' },
      { title: '代码审查', desc: '提交整个代码文件，Claude能理解上下文并给出优化建议' },
      { title: '长文档分析', desc: '200K上下文一次吃下整本书，生成摘要和重点提取' },
      { title: '创意写作', desc: '小说、剧本、长文内容创作，逻辑连贯性远超GPT' },
    ],
    howToUse: [
      '访问 claude.ai，注册Anthropic账号（需要梯子）',
      '免费版每天可发送约10条消息',
      '可以上传PDF、TXT等文件让Claude阅读分析',
      '使用Artifacts功能可实时预览代码、网页、图表等生成内容',
      'Pro版支持更多对话次数和Projects功能，可组织多文档上下文',
    ],
    faq: [
      { q: 'Claude免费版每天能用多少次？', a: '免费版大约每天可发送8-10条消息，具体数量根据当前负载动态调整。Pro版（$20/月）可发送5倍以上的消息。' },
      { q: 'Claude和ChatGPT哪个写文章更好？', a: '对于长文写作（2000字以上），Claude的连贯性和逻辑性明显优于ChatGPT。短文和创意灵感方面两者差距不大。' },
      { q: 'Claude能画图吗？', a: 'Claude目前不支持直接生成图片，但可以用Artifacts生成SVG图表和网页。如需AI画图，建议搭配Midjourney使用。' },
    ],
  },
  kimi: {
    targetUsers: ['学术研究者', '公务员', '自媒体运营', '法律从业者', '中文写作爱好者'],
    useCases: [
      { title: '论文阅读', desc: '上传PDF论文，Kimi自动提炼核心观点、研究方法和结论' },
      { title: '网页总结', desc: '给Kimi一个URL，它能读取全文并生成精炼摘要' },
      { title: '长文写作', desc: '200万字上下文，写连载小说也不怕丢上下文' },
      { title: '资料整理', desc: '批量上传多份文档，让Kimi交叉对比整理成表格' },
    ],
    howToUse: [
      '访问 kimi.moonshot.cn，用手机号登录（国内直连）',
      '直接在输入框提问，或上传文件让Kimi阅读',
      '粘贴网页链接，Kimi会自动读取并总结内容',
      '使用"Kimi+智能体"获取专业领域的增强能力',
      '下载手机App可随时使用语音输入',
    ],
    faq: [
      { q: 'Kimi是完全免费的吗？', a: '是的，Kimi目前完全免费使用，没有消息次数限制。月之暗面表示会长期保持免费策略。' },
      { q: 'Kimi和DeepSeek有什么区别？', a: 'Kimi擅长长文本阅读和中文写作，DeepSeek擅长推理和编程。日常阅读选Kimi，逻辑分析选DeepSeek。' },
      { q: 'Kimi上下文200万字是真的吗？', a: '是的，Kimi支持200万字超长上下文，实测上传整本小说都能完整记忆。但极长文本时响应速度会变慢。' },
    ],
  },
  tongyi: {
    targetUsers: ['开发者', '阿里云用户', '企业办公人员', '钉钉用户', 'API调用者'],
    useCases: [
      { title: 'API开发', desc: '免费100万tokens API额度，是开发者入门LLM的首选' },
      { title: '企业办公', desc: '与钉钉深度整合，企业用户可无缝接入AI能力' },
      { title: 'AI绘画', desc: '通义万相生图，中文提示词效果优秀' },
      { title: '代码助手', desc: '通义灵码插件，VSCode内AI编程补全' },
    ],
    howToUse: [
      '访问 tongyi.aliyun.com，用支付宝/淘宝账号登录',
      '对话模式直接提问，支持文本/图片/文件输入',
      '开发者可申请API Key，免费额度100万tokens',
      '安装通义灵码VSCode插件，获得AI代码补全',
      '企业用户可在钉钉中直接使用通义千问',
    ],
    faq: [
      { q: '通义千问API怎么申请？', a: '注册阿里云账号后，进入百炼平台(console.bailian.aliyun.com)创建应用获取API Key，新用户免费100万tokens。' },
      { q: '通义千问和ChatGPT哪个好？', a: '中文场景两者差距不大，通义千问的优势在于国内直连、免费API额度大、与阿里生态整合好。英文和创意方面ChatGPT略强。' },
      { q: '通义千问免费额度用完怎么办？', a: '免费额度用完后按量计费，价格非常低（约0.002元/千tokens），比大多数竞品便宜。' },
    ],
  },
  doubao: {
    targetUsers: ['学生', '日常聊天用户', '短视频创作者', 'AI绘画入门者', '音乐创作者'],
    useCases: [
      { title: '日常对话', desc: '完全免费的AI聊天，中文理解和表达流畅自然' },
      { title: 'AI绘画', desc: '文生图、局部重绘、扩图等功能全部免费使用' },
      { title: 'AI音乐', desc: '输入描述生成歌曲，支持11种风格' },
      { title: '视频生成', desc: '上传图片一键生成视频，每天10次免费额度' },
    ],
    howToUse: [
      '访问 doubao.com，用手机号直接登录（国内直连）',
      '无需付费即可使用全部功能，无消息限制',
      '在智能体中心可创建自己的AI智能体',
      '点击AI图片生成，输入描述即可画图',
      '下载手机App获得更好的移动端体验',
    ],
    faq: [
      { q: '豆包真的是完全免费的吗？', a: '是的，豆包的对话、画图、音乐、视频功能全部免费使用，无消息次数限制。这是字节跳动的策略，用免费吸引用户。' },
      { q: '豆包和DeepSeek哪个更好？', a: '豆包功能更全面（画图、音乐、视频），DeepSeek推理和编程更强。日常使用选豆包，专业分析选DeepSeek。' },
      { q: '豆包能写代码吗？', a: '可以，豆包有AI编程功能，支持上传代码文件和GitHub仓库。但代码质量不如Cursor/DeepSeek，更适合非专业用户。' },
    ],
  },
  deepseek: {
    targetUsers: ['程序员', '数据分析师', '逻辑推理需求者', '学术研究者', 'AI开发者'],
    useCases: [
      { title: '深度推理', desc: 'DeepSeek R2推理能力媲美o3，数学/逻辑问题首选' },
      { title: '代码编程', desc: 'HumanEval 91分，编程能力仅次于o3' },
      { title: 'API开发', desc: '¥1/百万tokens输入，是国产最便宜的API' },
      { title: '学术研究', desc: '论文理解、公式推导、实验设计，理工科神器' },
    ],
    howToUse: [
      '访问 chat.deepseek.com，用手机号或邮箱注册',
      '默认使用DeepSeek-V3模型，点击"深度思考"切换到R2',
      '深度思考模式会展示推理过程，适合复杂问题',
      '开发者可在平台开放API API Key，价格极低',
      '支持文件上传分析，也可让它联网搜索',
    ],
    faq: [
      { q: 'DeepSeek的深度思考模式是什么？', a: '深度思考模式使用DeepSeek R2模型，会展示AI的推理思维链，适合数学、逻辑、编程等需要深度思考的问题。日常对话用普通模式即可。' },
      { q: 'DeepSeek API价格多少？', a: 'DeepSeek-V3：输入¥1/百万tokens，输出¥2/百万tokens。DeepSeek R2：输入¥4/百万tokens，输出¥16/百万tokens。是市面上最便宜的API之一。' },
      { q: 'DeepSeek和ChatGPT怎么选？', a: '推理和编程选DeepSeek（免费且强），多功能和生态选ChatGPT。中文场景DeepSeek性价比远超ChatGPT。' },
    ],
  },
  midjourney: {
    targetUsers: ['插画师', '设计师', '自媒体创作者', '电商美工', '游戏美术'],
    useCases: [
      { title: '角色设计', desc: '生成游戏/动画角色设定图，风格统一可控' },
      { title: '电商素材', desc: '生成产品场景图、模特图，节省拍摄成本' },
      { title: 'AI插画', desc: '绘本、海报、封面插画，质量接近专业画师' },
      { title: '品牌视觉', desc: '生成品牌风格的概念图和视觉方案' },
    ],
    howToUse: [
      '访问 midjourney.com，通过Discord使用或官网直接使用',
      '在输入框输入 /imagine 命令后写提示词',
      '使用 --ar 参数控制画面比例（如 --ar 16:9）',
      '使用 --sref 参数锁定风格一致性',
      '生成4张图后可U(放大)或V(变体)选择最佳结果',
    ],
    faq: [
      { q: 'Midjourney有免费版吗？', a: '目前没有免费版，最便宜的Basic计划$10/月，约200张图。但经常有免费试用活动。' },
      { q: 'Midjourney和Stable Diffusion有什么区别？', a: 'Midjourney出图质量更高、操作更简单但需付费；Stable Diffusion免费开源但需本地部署，学习成本高。新手选MJ，技术党选SD。' },
      { q: 'Midjourney中文能用吗？', a: 'Midjourney对英文提示词效果最好。中文提示词需要翻译后使用，或搭配翻译工具。V6版本后对中文理解有所改善。' },
    ],
  },
  cursor: {
    targetUsers: ['前端开发者', '全栈工程师', '独立开发者', '编程学习者', '自由职业者'],
    useCases: [
      { title: 'Vibe Coding', desc: '用自然语言描述需求，Cursor自动生成代码' },
      { title: '代码重构', desc: '选中代码让AI重构优化，保持功能不变' },
      { title: 'Bug修复', desc: '粘贴报错信息，Cursor自动定位并修复' },
      { title: '自由职业接单', desc: '3天交付一个项目，效率提升5-10倍' },
    ],
    howToUse: [
      '访问 cursor.com，下载安装客户端（基于VSCode）',
      '免费版每月2000次补全+50次高级请求',
      '用Ctrl+K打开编辑框，用自然语言描述你想做的改动',
      '用Ctrl+L打开对话，可以问问题或让AI解释代码',
      '在Composer模式下可同时编辑多个文件，完成大型功能',
    ],
    faq: [
      { q: 'Cursor免费版够用吗？', a: '轻度使用够用，每月2000次补全+50次高级请求。重度使用者建议Pro版$20/月，无限补全+500次高级请求。' },
      { q: 'Cursor和GitHub Copilot有什么区别？', a: 'Cursor是独立IDE，有更强大的上下文理解（能读整个项目）；Copilot是VSCode插件，轻量但上下文有限。新手推荐Cursor，已有VSCode工作流推荐Copilot。' },
      { q: 'Cursor能替代程序员吗？', a: '目前还不能完全替代。Cursor擅长写代码，但架构设计、业务理解、测试调试仍需人工。更准确的说法是"让1个程序员干5个人的活"。' },
    ],
  },
  suno: {
    targetUsers: ['音乐爱好者', '短视频创作者', '自媒体运营', '内容创作者', '游戏开发者'],
    useCases: [
      { title: '原创歌曲', desc: '输入歌词或描述，10秒生成完整歌曲' },
      { title: '短视频配乐', desc: '为抖音/小红书视频生成原创BGM，版权无忧' },
      { title: '广告音乐', desc: '快速生成品牌广告的配乐和jingle' },
      { title: '游戏音效', desc: '为独立游戏生成背景音乐和主题歌' },
    ],
    howToUse: [
      '访问 suno.com，用Google账号登录',
      '在Create页面输入歌曲描述（支持中文）',
      '可以选择音乐风格、人声类型',
      '免费版每天可生成10首歌曲',
      '生成后可下载mp3或分享链接',
    ],
    faq: [
      { q: 'Suno生成的歌曲有版权吗？', a: '免费版生成的歌曲版权归Suno，不可商用；Pro版生成的歌曲归用户，可用于商业用途。' },
      { q: 'Suno支持中文歌曲吗？', a: '支持，中文歌词和中文演唱都能生成，效果不错。但中文发音偶尔不够自然，建议多生成几首选最好的。' },
      { q: 'Suno和Udio哪个更好？', a: 'Suno操作更简单、出歌更快，适合新手；Udio音质更细腻、风格更多样，适合音乐创作者。建议两个都试试。' },
    ],
  },
  sora: {
    targetUsers: ['视频创作者', '广告制作', '自媒体运营', '影视从业者', '电商运营'],
    useCases: [
      { title: '文生视频', desc: '输入文字描述生成60秒高质量视频' },
      { title: '图生视频', desc: '上传图片让AI添加动态效果生成视频' },
      { title: '广告创意', desc: '快速生成产品展示视频和品牌故事短片' },
      { title: '概念验证', desc: '影视前期用AI生成概念视频验证创意' },
    ],
    howToUse: [
      '访问 sora.com（需ChatGPT Plus账号）',
      '在输入框描述你想生成的视频场景',
      '可选择视频时长（5-20秒）和画面比例',
      '上传参考图片可以更精确控制画面风格',
      '生成后可下载或分享，也可在时间线上编辑',
    ],
    faq: [
      { q: 'Sora多少钱？', a: 'Sora包含在ChatGPT Plus（$20/月）中，Plus用户可生成50个视频/月。Pro版（$200/月）可生成更多。' },
      { q: 'Sora和可灵AI有什么区别？', a: 'Sora画质更好、物理理解更强，但贵且需翻墙；可灵AI国内直连、价格低、出视频快。国内用户建议先用可灵。' },
      { q: 'Sora生成的视频能商用吗？', a: '付费用户生成的视频可以商用，但需遵守OpenAI的使用条款。建议仔细阅读商用许可细则。' },
    ],
  },
  kling: {
    targetUsers: ['短视频创作者', '电商运营', '广告制作', '自媒体运营', '动画制作者'],
    useCases: [
      { title: '文生视频', desc: '中文描述生成高清视频，国内最好用' },
      { title: '图生视频', desc: '上传人物/产品照片，生成动态展示视频' },
      { title: '视频续写', desc: '上传短视频，AI自动续写后续内容' },
      { title: '电商展示', desc: '产品图一键生成使用场景视频' },
    ],
    howToUse: [
      '访问 kling.kuaishou.com，用手机号登录',
      '选择"文生视频"或"图生视频"模式',
      '输入描述或上传参考图片',
      '免费版每天可生成约6个视频（每次消耗灵感值）',
      '生成视频后可下载MP4或直接分享',
    ],
    faq: [
      { q: '可灵AI免费版能用多少次？', a: '每天登录送66灵感值，生成一次视频消耗约10灵感值，大约可生成6个视频/天。' },
      { q: '可灵AI和Sora哪个好？', a: '国内使用选可灵（直连、中文友好、便宜）；追求极致画质和物理真实感选Sora。两者差距在缩小。' },
    ],
  },
  trae: {
    targetUsers: ['前端开发者', '编程初学者', '独立开发者', '字节跳动生态用户'],
    useCases: [
      { title: 'AI编程', desc: '完全免费的AI编程IDE，内置AI对话和代码补全' },
      { title: '代码生成', desc: '用自然语言描述需求，自动生成代码' },
      { title: '项目开发', desc: '从0到1快速搭建完整项目' },
    ],
    howToUse: [
      '访问 trae.ai，下载安装客户端',
      '完全免费，无需注册即可使用所有功能',
      '使用AI Chat对话或内联编辑功能',
      '支持多种编程语言和框架',
    ],
    faq: [
      { q: 'TRAE真的完全免费吗？', a: '是的，TRAE目前完全免费，包括AI对话和代码补全。字节跳动出品，长期策略可能是先占市场后变现。' },
      { q: 'TRAE和Cursor有什么区别？', a: 'TRAE完全免费但功能不如Cursor成熟；Cursor付费但生态更好。预算有限选TRAE，追求效率选Cursor。' },
    ],
  },
  'github-copilot': {
    targetUsers: ['GitHub用户', 'VSCode开发者', '企业开发团队', '编程学习者'],
    useCases: [
      { title: '代码补全', desc: '写代码时实时AI补全建议，提高编码速度' },
      { title: '代码解释', desc: '选中代码一键获取解释，快速理解他人代码' },
      { title: '测试生成', desc: '自动为函数生成单元测试' },
    ],
    howToUse: [
      '安装VSCode的GitHub Copilot插件',
      '用GitHub账号登录，免费版每月2000次补全',
      '写代码时Tab接受建议，Ctrl+Enter查看多个建议',
      'Copilot Chat可对话式提问',
    ],
    faq: [
      { q: 'Copilot免费版限制多少？', a: '免费版每月2000次代码补全和50次Chat请求。对学生、开源贡献者完全免费无限使用。' },
    ],
  },
  metaso: {
    targetUsers: ['研究人员', '学生', '信息工作者', '无广告搜索爱好者'],
    useCases: [
      { title: '学术搜索', desc: '搜索学术资料并自动整理引用来源' },
      { title: '深度研究', desc: '输入研究问题，AI搜索全网并生成分析报告' },
      { title: '日常搜索', desc: '无广告直达答案，不用翻页找信息' },
    ],
    howToUse: [
      '访问 metaso.cn，用手机号登录',
      '直接输入问题或研究主题',
      '选择"简洁"或"深入"模式',
      '免费版每天可搜索多次',
    ],
    faq: [
      { q: '秘塔AI搜索和Perplexity有什么区别？', a: '秘塔是国内产品、无需翻墙、中文搜索更准确；Perplexity英文搜索更全面、信息源更广。国内使用选秘塔。' },
    ],
  },
  perplexity: {
    targetUsers: ['英文内容研究者', '海外市场分析', '学术搜索', '技术人员'],
    useCases: [
      { title: '深度问答', desc: '搜索全网实时信息并生成带引用的回答' },
      { title: '学术研究', desc: '搜索arXiv等学术源，生成文献综述' },
      { title: '新闻追踪', desc: '实时搜索最新新闻并总结要点' },
    ],
    howToUse: [
      '访问 perplexity.ai（需要梯子）',
      '免费版每天可搜索5次Pro查询',
      '输入问题即可获得AI生成的引用回答',
      'Pro版$20/月，无限搜索+更强模型',
    ],
    faq: [
      { q: 'Perplexity需要翻墙吗？', a: '需要。Perplexity目前未对中国开放，需科学上网。英文搜索效果远超国内产品。' },
    ],
  },
  aippt: {
    targetUsers: ['上班族', '学生', '教师', '销售', '咨询师'],
    useCases: [
      { title: '工作汇报', desc: '输入大纲一键生成专业PPT' },
      { title: '课件制作', desc: '教师快速生成教学课件' },
      { title: '商业提案', desc: '产品方案、投资PPT一键生成' },
    ],
    howToUse: [
      '访问 aippt.com，注册登录',
      '选择"AI生成"模式，输入主题或大纲',
      '选择模板风格，AI自动生成内容+排版',
      '在线编辑调整后下载PPT文件',
    ],
    faq: [
      { q: 'AiPPT免费版能做什么？', a: '免费版可生成基础PPT，部分高级模板需付费。日常简单需求免费版够用。' },
    ],
  },
  'notion-ai': {
    targetUsers: ['Notion用户', '知识工作者', '项目管理', '团队协作者'],
    useCases: [
      { title: '文档写作', desc: '在Notion中直接AI写作、续写、润色' },
      { title: '笔记总结', desc: '一键总结会议记录、长文档' },
      { title: '任务管理', desc: 'AI辅助项目规划和任务分解' },
    ],
    howToUse: [
      '在Notion中按空格键或输入/ai调用AI功能',
      'Notion AI需单独订阅$10/月',
      '选中文字后可选择翻译、润色、总结等操作',
    ],
    faq: [
      { q: 'Notion AI要额外付费吗？', a: '是的，Notion AI需单独付费$10/月，不含在Notion基础版中。' },
    ],
  },
  'youdao-ai': {
    targetUsers: ['翻译需求者', '学生', '外贸从业者', '留学生'],
    useCases: [
      { title: 'AI翻译', desc: '中英互译质量远超传统翻译工具' },
      { title: '写作润色', desc: '英文写作语法纠错和表达优化' },
      { title: '论文翻译', desc: '学术论文级中英翻译' },
    ],
    howToUse: ['访问 youdao.com，使用AI翻译功能', '输入或粘贴文本，选择翻译方向', 'AI会自动识别语境并提供翻译'],
    faq: [{ q: '有道AI写作免费吗？', a: '基础翻译功能免费，高级AI写作功能需订阅。' }],
  },
  bililing: {
    targetUsers: ['公文写作者', '体制内工作者', '行政人员', '合同撰写者'],
    useCases: [
      { title: '公文写作', desc: '生成标准格式的政府/企业公文' },
      { title: '合同起草', desc: '快速生成各类型合同模板' },
      { title: '周报月报', desc: '一键生成工作汇报' },
    ],
    howToUse: ['访问 bililing.com 注册登录', '选择公文类型，输入关键信息', 'AI自动生成标准格式文档'],
    faq: [{ q: '笔灵AI免费吗？', a: '有免费额度，高级模板需要付费。' }],
  },
  liblibai: {
    targetUsers: ['AI绘画爱好者', 'Stable Diffusion用户', '中国创作者'],
    useCases: [
      { title: '在线生图', desc: '无需显卡，在线使用SD模型生成图片' },
      { title: '模型分享', desc: '社区分享和下载训练好的模型' },
      { title: 'LoRA训练', desc: '上传图片训练自己的风格模型' },
    ],
    howToUse: ['访问 liblib.art 注册登录', '选择模型和LoRA，输入提示词', '在线生成图片，无需本地部署'],
    faq: [{ q: 'LiblibAI和Stable Diffusion有什么区别？', a: 'LiblibAI是在线版SD，无需本地显卡即可使用。底层技术相同，但省去了部署的麻烦。' }],
  },
  'stable-diffusion': {
    targetUsers: ['技术爱好者', 'AI绘画深度用户', '本地部署需求者'],
    useCases: [
      { title: '本地生图', desc: '在自己的电脑上运行，隐私和速度完全可控' },
      { title: '模型训练', desc: '训练自己的LoRA风格模型' },
      { title: '批量生成', desc: '无人值守批量生成大量图片' },
    ],
    howToUse: ['安装Python和PyTorch环境', '下载SD模型到本地', '使用WebUI界面生成图片', '可安装ControlNet等插件增强控制力'],
    faq: [{ q: 'Stable Diffusion需要什么显卡？', a: '最低8GB显存（RTX3060），推荐12GB+（RTX4070）。也可用CPU运行但速度很慢。' }],
  },
  'd-design': {
    targetUsers: ['设计师', '电商美工', '海报制作', '品牌设计'],
    useCases: [
      { title: '海报设计', desc: 'AI辅助生成营销海报' },
      { title: '品牌视觉', desc: '快速生成品牌VI方案' },
    ],
    howToUse: ['访问 d.design 注册', '选择设计类型和模板', 'AI辅助生成设计方案'],
    faq: [{ q: '堆友AI免费吗？', a: '基础功能免费，高级模板和AI次数需付费。' }],
  },
  huiwa: {
    targetUsers: ['电商卖家', '淘宝天猫商家', '跨境电商', '模特图制作'],
    useCases: [
      { title: 'AI模特图', desc: '上传衣服平铺图，AI自动生成模特穿着效果' },
      { title: '商品图', desc: '一键生成白底图、场景图' },
    ],
    howToUse: ['访问 huiwa.com 注册', '上传商品图片', '选择AI模特和场景生成'],
    faq: [{ q: '绘蛙能替代真人模特吗？', a: '日常商品展示可以替代，省去大量拍摄成本。但高端品牌宣传仍需真人拍摄。' }],
  },
  gaoding: {
    targetUsers: ['自媒体运营', '公众号编辑', '海报设计', 'H5制作'],
    useCases: [
      { title: '公众号配图', desc: 'AI生成公众号封面和配图' },
      { title: '营销海报', desc: '快速制作活动海报和宣传图' },
    ],
    howToUse: ['访问 gaoding.com 注册', '选择模板或AI生成', '在线编辑后下载'],
    faq: [{ q: '稿定设计AI功能免费吗？', a: '基础模板免费，AI生成和高级模板需付费。' }],
  },
  piaoxing: {
    targetUsers: ['广告投放', '素材优化', '信息流运营'],
    useCases: [
      { title: '广告素材', desc: 'AI生成信息流广告素材' },
      { title: 'A/B测试', desc: '批量生成变体用于测试' },
    ],
    howToUse: ['访问平台注册', '输入广告主题和目标人群', 'AI批量生成广告素材'],
    faq: [{ q: '飘星AI适合什么行业？', a: '主要面向电商、教育、游戏等行业的广告投放优化。' }],
  },
  'copilot-design': {
    targetUsers: ['图片编辑需求者', '修图用户', '证件照制作'],
    useCases: [
      { title: 'AI修图', desc: '一键美颜、去背景、换背景' },
      { title: '证件照', desc: '手机拍的照片一键生成标准证件照' },
    ],
    howToUse: ['下载美图设计室App', '上传照片选择功能', 'AI自动处理并保存'],
    faq: [{ q: '美图设计室免费吗？', a: '基础功能免费，高级滤镜和批量处理需付费。' }],
  },
  'canva-ai': {
    targetUsers: ['非设计师', '社媒运营', 'PPT制作', '品牌设计'],
    useCases: [
      { title: 'AI设计', desc: '输入描述自动生成设计稿' },
      { title: 'AI写作', desc: '在设计稿中AI辅助文案撰写' },
      { title: '视频剪辑', desc: 'AI辅助视频编辑和特效' },
    ],
    howToUse: ['访问 canva.com 注册', '选择Magic Design功能', '输入描述让AI生成设计方案'],
    faq: [{ q: 'Canva AI免费版有哪些功能？', a: '基础AI设计功能免费，Magic Write等高级功能需Pro版。' }],
  },
  fenng: {
    targetUsers: ['UI设计师', '产品设计', '前端开发者'],
    useCases: [
      { title: 'UI设计', desc: 'AI辅助界面设计和组件生成' },
      { title: '原型制作', desc: '快速制作高保真原型' },
    ],
    howToUse: ['访问即时设计官网注册', '选择AI功能辅助设计', '在线协作和交付'],
    faq: [{ q: '即时设计有免费版吗？', a: '个人版免费，团队版需付费。' }],
  },
  motiff: {
    targetUsers: ['UI设计师', '前端开发者', '设计团队'],
    useCases: [
      { title: 'AI设计系统', desc: 'AI辅助建立和维护设计系统' },
      { title: '界面生成', desc: 'AI根据描述生成UI界面' },
    ],
    howToUse: ['访问 motiff.com 注册', '使用AI功能辅助设计', '团队协作和版本管理'],
    faq: [{ q: 'Motiff和Figma有什么区别？', a: 'Motiff更侧重AI辅助设计，有更强的AI生成能力；Figma生态更成熟但AI功能较新。' }],
  },
  udio: {
    targetUsers: ['音乐创作者', '独立音乐人', '视频配乐'],
    useCases: [
      { title: '歌曲创作', desc: '生成高品质原创歌曲' },
      { title: '视频配乐', desc: '为视频生成匹配的背景音乐' },
    ],
    howToUse: ['访问 udio.com 注册', '描述你想生成的音乐风格和内容', '选择参数并生成'],
    faq: [{ q: 'Udio和Suno哪个更好？', a: 'Udio音质更细腻，适合专业创作；Suno更易用，适合快速出歌。' }],
  },
  'fish-audio': {
    targetUsers: ['有声书制作者', '播客创作者', '配音需求者'],
    useCases: [
      { title: '语音克隆', desc: '上传10秒语音样本即可克隆声音' },
      { title: 'AI配音', desc: '用克隆的声音生成任意文本的语音' },
    ],
    howToUse: ['访问 fish.audio 注册', '上传语音样本克隆声音', '输入文本生成语音'],
    faq: [{ q: 'Fish Audio免费吗？', a: '有免费额度，高级功能需付费。' }],
  },
  wenxin: {
    targetUsers: ['企业用户', '百度生态用户', '文心一言App用户'],
    useCases: [
      { title: 'AI对话', desc: '百度出品AI对话助手' },
      { title: 'AI绘画', desc: '文心一格AI绘画' },
    ],
    howToUse: ['访问 yiyan.baidu.com 登录百度账号', '直接对话或使用绘画功能'],
    faq: [{ q: '文心一言免费吗？', a: '基础版免费，文心4.0等高级模型需付费。' }],
  },
  zhipu: {
    targetUsers: ['API开发者', '国产模型用户', '低成本需求者'],
    useCases: [
      { title: '低价API', desc: '¥0.05/百万tokens，国产最便宜' },
      { title: 'AI对话', desc: '智谱清言免费对话' },
    ],
    howToUse: ['访问 chatglm.cn 注册', '直接对话或申请API Key'],
    faq: [{ q: '智谱清言API有多便宜？', a: 'GLM-4-Flash免费，GLM-4-Plus仅¥0.05/百万tokens，是国产最便宜的API。' }],
  },
  hailuo: {
    targetUsers: ['视频创作者', 'AI视频入门者', 'MiniMax生态用户'],
    useCases: [
      { title: 'AI视频', desc: '输入文本/图片生成视频' },
      { title: 'AI对话', desc: 'MiniMax出品的AI助手' },
    ],
    howToUse: ['访问 hailuoai.com 注册', '选择视频生成功能', '输入描述生成视频'],
    faq: [{ q: '海螺AI免费吗？', a: '基础视频生成有免费额度，高级功能需付费。' }],
  },
};

// 获取工具详情（带默认值）
export function getToolDetail(slug) {
  const detail = toolDetails[slug];
  if (!detail) return null;
  return detail;
}
