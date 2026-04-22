// AI教程数据 — 15篇真实教程
export const tutorials = [
  // ===== 内容创作 =====
  {
    slug: 'ai-ip-monetization', title: 'AI二创萌系IP：从流量爆款到实物变现',
    desc: '用AI生成萌系角色→小红书起号→周边变现，完整链路拆解',
    cat: '内容创作', catColor: 'var(--pink)', views: '12.3K', difficulty: '专业级', time: '15分钟', date: '2026-04-18',
    keywords: 'AI二创,AI IP变现,AI萌系角色,小红书AI',
    relatedTools: ['midjourney', 'chatgpt', 'suno'],
    sections: [
      { title: '为什么AI萌系IP是2026年最佳副业', content: 'AI绘画工具让普通人也能创作出精美的萌系角色。2025-2026年，小红书上AI萌系IP账号平均涨粉速度是普通账号的3倍。核心优势：零绘画基础、出图速度快、风格统一可控。一个成功的萌系IP可以在3个月内积累5万+粉丝，通过周边、约稿、授权实现月入5000-20000元。' },
      { title: '第一步：用Midjourney打造统一风格角色', content: '关键在于风格一致性。建议使用以下方法：\n1. 确定角色基础Prompt模板，包含固定风格词：kawaii, chibi, pastel colors, simple background\n2. 每次生成时只替换场景描述，保持风格参数不变\n3. 使用--sref参数锁定风格参考图，确保每次输出视觉一致\n4. 生成20-30张后选出最满意的5张作为角色定妆照\n\n实操示例：a cute cat girl sitting in cafe, drinking bubble tea, kawaii style, chibi proportions, pastel pink and blue, simple background --sref YOUR_REF --ar 3:4 --niji 6' },
      { title: '第二步：小红书起号SOP', content: '发布节奏：每天1-2条，固定在12:00和20:00发布（流量高峰）。\n\n内容策略：\n- 角色日常系列（占60%）：角色在咖啡店、上学、下雨天等场景\n- 互动系列（占25%）：让粉丝投票决定角色下一步做什么\n- 过程分享（占15%）：展示AI生成过程，吸引同好交流\n\n标题公式：[角色名]的XX日常 | 太XX了吧\n标签：#AI绘画 #原创IP #萌系 #治愈系\n封面要求：统一色调+大字标题+角色居中' },
      { title: '第三步：变现路径', content: '变现层级（从易到难）：\n\n1. 约稿接单（最快）：500-2000元/张，在主页留接单信息\n2. 周边制作：找1688工厂做亚克力立牌/贴纸/手机壳，成本2-5元/个，售价15-30元\n3. 付费壁纸包：整理50-100张高清图，在小红书店铺卖9.9元/套\n4. 品牌合作：5万粉后会有品牌找你做联名，单次2000-5000元\n5. IP授权：角色形象授权给游戏/动画公司，年收入5-20万\n\n关键数据：约稿转化率约2-3%，周边复购率约15%，品牌合作门槛5万粉。' },
    ],
  },
  {
    slug: 'ai-creative-composition', title: 'AI邪修构图法：小红书轻松获赞3万+',
    desc: 'Midjourney+创意构图→爆款图文，不需要绘画基础',
    cat: '内容创作', catColor: 'var(--pink)', views: '34.1K', difficulty: '入门级', time: '10分钟', date: '2026-04-16',
    keywords: 'AI构图,Midjourney构图,小红书AI图文',
    relatedTools: ['midjourney'],
    sections: [
      { title: '什么是邪修构图法', content: '邪修构图 = 打破常规构图的视觉冲击法。传统构图讲究黄金分割、对称，但小红书爆款往往需要不按常理出牌的画面。邪修构图的核心：超大特写、极端透视、留白失衡、色彩冲突。这些在传统美术中被视为禁忌的手法，反而能在信息流中抓住眼球。AI绘画让零基础的人也能轻松实现这些效果。' },
      { title: '5种邪修构图公式', content: '公式1：极端俯视\n关键词：extreme top-down view, bird eye view, looking down\n效果：从天空俯瞰，画面像地图，适合美食/桌面摆设\n\n公式2：超近特写\n关键词：extreme close-up, macro shot, detail focus\n效果：只拍局部，放大细节，制造好奇感\n\n公式3：鱼眼透视\n关键词：fisheye lens, barrel distortion, ultra wide angle\n效果：中心膨胀边缘压缩，有科幻感\n\n公式4：倾斜地平线\n关键词：dutch angle, tilted horizon, diagonal composition\n效果：画面倾斜15-30度，制造不安和动感\n\n公式5：负空间\n关键词：negative space, minimalist, vast empty background\n效果：主体只占画面10-20%，大量留白，适合情绪表达' },
      { title: '小红书发布技巧', content: '1. 封面用邪修构图，正文配常规构图，形成反差\n2. 文案加点悬念：这是我试了100次才出的构图\n3. 合集类内容最容易爆：5种邪修构图做成1篇笔记\n4. 不要加水印，方便被收藏转发\n5. 发布时间：工作日12:00-13:00，周末10:00-11:00' },
    ],
  },
  {
    slug: 'ai-children-book', title: '用AI做儿童绘本：从故事到插画的完整流程',
    desc: 'ChatGPT写故事→Midjourney画插图→自动排版成书',
    cat: '内容创作', catColor: 'var(--pink)', views: '8.5K', difficulty: '入门级', time: '20分钟', date: '2026-04-14',
    keywords: 'AI绘本,AI儿童书,AI插画',
    relatedTools: ['chatgpt', 'midjourney'],
    sections: [
      { title: '市场机会', content: '儿童绘本市场2026年规模超500亿元。自出版绘本在淘宝/拼多多上单本售价15-38元，月销1000+的店铺不少。AI让绘本制作成本从传统的5000-20000元/本降到几乎为零。你只需要：一个好故事+20-30张插图+简单排版。' },
      { title: '用ChatGPT写绘本故事', content: 'Prompt模板：请写一本适合3-6岁儿童的绘本故事，要求：\n1. 主角是一只叫豆豆的小兔子\n2. 主题：克服怕黑\n3. 共10页，每页1-2句话\n4. 语言简洁，有韵律感\n5. 每页给出配图描述（英文）供AI绘画使用\n\nChatGPT会输出每页的文字+配图描述。关键是要求英文配图描述，因为Midjourney对英文支持更好。\n修改技巧：让AI增加重复句式（豆豆又遇到了...这次它...），儿童喜欢重复结构。' },
      { title: '排版与出版', content: '推荐用Canva免费版排版：\n1. 创建自定义尺寸（推荐200x200mm方形）\n2. 每页左文字右插图\n3. 字体选圆体/楷体，字号24-30pt\n4. 导出PDF\n\n出版渠道：\n- 淘宝/拼多多：找1688印刷厂，成本3-5元/本\n- 京东/当当：需要ISBN，成本较高\n- 电子版：上传微信读书/Amazon Kindle，零成本\n- 小红书引流：发制作过程吸引家长关注' },
    ],
  },
  // ===== 开发变现 =====
  {
    slug: 'ai-saas-build', title: '利用AI自动化搭建SaaS，实现日入$200',
    desc: 'Cursor全栈开发→Stripe收款→Vercel部署，零成本启动',
    cat: '开发变现', catColor: 'var(--cyan)', views: '49.0K', difficulty: '专业级', time: '30分钟', date: '2026-04-20',
    keywords: 'AI SaaS,Cursor创业,零成本创业',
    relatedTools: ['cursor', 'chatgpt'],
    sections: [
      { title: 'AI SaaS的商业模式', content: '2026年最适合独立开发者的SaaS模型：\n\n1. 工具型SaaS：AI写作/翻译/摘要/改写工具，月费$9-29\n2. API包装型：把大模型API包装成垂直场景工具，加价5-10倍卖\n3. 数据分析型：AI分析SEO/广告/社交数据，月费$29-99\n\n关键指标：\n- 目标MRR：$5000\n- 付费转化率：3-5%\n- 流失率：月5%以下\n- 获客成本：低于$20\n\n日入$200 = MRR $6000 = 约200-600个付费用户' },
      { title: '零成本技术栈', content: '前端：Next.js 16（免费）\n后端：Next.js API Routes（免费）\n数据库：Supabase免费版（500MB+5万行）\n认证：NextAuth（免费）\n支付：Stripe（只收手续费2.9%+$0.3）\n部署：Vercel免费版（100GB带宽/月）\n域名：.us.kg免费域名或.com约$10/年\nAI API：DeepSeek API（最便宜，输入$0.14/百万tokens）\n\n总启动成本：$0（用免费额度）到$10（买域名）' },
      { title: '获客渠道', content: '1. Product Hunt发布：一次性带来500-2000访客\n2. Reddit相关subreddit发帖\n3. Twitter/X分享开发过程：#buildinpublic标签\n4. SEO：写3-5篇博客覆盖长尾关键词\n5. 知乎/小红书中文市场\n\n关键：前100个用户靠手动推广，之后靠SEO和口碑。' },
    ],
  },
  {
    slug: 'ai-chrome-extension', title: 'AI Chrome插件：从想法到上架全流程',
    desc: '用AI写代码→Chrome商店发布→赚取安装量变现',
    cat: '开发变现', catColor: 'var(--cyan)', views: '15.2K', difficulty: '进阶级', time: '25分钟', date: '2026-04-15',
    keywords: 'Chrome插件,AI插件开发',
    relatedTools: ['cursor', 'chatgpt'],
    sections: [
      { title: '为什么Chrome插件是好生意', content: 'Chrome商店月活用户超20亿，优质插件可以轻松获得10万+安装量。变现方式：\n1. 免费+Pro升级：免费版基础功能，Pro版$3-5/月\n2. 广告变现：免费插件内嵌广告\n3. 联盟佣金：插件推荐相关工具/服务\n\n热门AI插件类型：AI写作助手、AI阅读助手、AI填表助手' },
      { title: '用Cursor开发插件', content: 'Chrome插件结构：manifest.json + popup.html + content.js + background.js\n\n用Cursor开发：\n1. 新建项目文件夹\n2. 对话：帮我创建一个Chrome插件，功能是选中网页文字后右键菜单出现AI改写选项，调用OpenAI API改写选中文本\n3. Cursor会生成所有文件\n4. chrome://extensions 打开开发者模式加载已解压的扩展\n5. 测试功能\n\n关键技术点：content.js注入网页获取选中文本，background.js处理右键菜单和API调用' },
      { title: '上架Chrome商店', content: '1. 准备素材：128x128图标、宣传图440x280和920x680、详细描述、隐私政策URL\n2. 注册开发者账号：$5一次性费用\n3. 在扩展管理页点击打包扩展程序\n4. 上传到Chrome Web Store Developer Dashboard\n5. 审核周期：1-3个工作日\n\n上架后优化：标题包含核心关键词，描述前100字最重要，截图展示核心功能' },
    ],
  },
  {
    slug: 'cursor-freelance', title: '用Cursor做自由职业：接单实战攻略',
    desc: '在Upwork/Fiverr接AI开发订单的技巧和定价策略',
    cat: '开发变现', catColor: 'var(--cyan)', views: '22.8K', difficulty: '进阶级', time: '12分钟', date: '2026-04-13',
    keywords: 'Cursor自由职业,AI接单,Upwork',
    relatedTools: ['cursor'],
    sections: [
      { title: 'Cursor自由职业的优势', content: '传统开发接单需要数年编程经验。Cursor改变了游戏规则：你只需要描述需求，AI写代码。开发速度提升5-10倍，单个项目利润率从30%提升到80%以上。\n\n适合接的项目类型：\n- 企业官网/落地页：$300-800\n- 小型Web应用：$500-2000\n- Chrome插件/浏览器工具：$200-500\n- API集成/自动化脚本：$100-500' },
      { title: '平台选择与定价', content: '推荐平台：\n1. Upwork：高端客户多，适合$500+项目\n2. Fiverr：快速起步，适合$50-300小项目\n3. 闲鱼/淘宝：国内市场\n\n定价策略：\n- 不要按小时算，按项目价值定价\n- 落地页：$300-500（成本：3小时AI编码）\n- 全栈应用：$1000-3000（成本：1-3天AI编码）\n- 年度维护合同：项目金额的20%/年\n\n效率关键：一次只接1-2个项目，用Cursor对话功能快速迭代' },
    ],
  },
  // ===== 自媒体运营 =====
  {
    slug: 'ai-video-account', title: 'AI视频起号：零粉到万粉爆款玩法',
    desc: 'Suno做音乐→可灵生成视频→抖音起号全流程',
    cat: '自媒体运营', catColor: 'var(--yellow)', views: '32.6K', difficulty: '入门级', time: '18分钟', date: '2026-04-19',
    keywords: 'AI视频起号,AI短视频,抖音AI',
    relatedTools: ['suno'],
    sections: [
      { title: 'AI视频赛道的红利', content: '2026年AI视频内容在抖音/快手的完播率比传统内容高40%。原因：画面新奇、节奏快、风格统一。零粉新号用AI内容起号，平均7-14天可以破1000粉，30天破万粉。关键是选对赛道和持续输出。' },
      { title: '制作流程详解', content: '以AI音乐MV为例：\n\n步骤1：Suno生成歌曲（5分钟）\n- 输入风格描述：Chinese pop, soft female vocal, dreamy, about chasing dreams\n- 生成2首，选更好的那首\n\n步骤2：AI生成画面（15分钟）\n- 用可灵/即梦，根据歌词逐句生成视频片段\n- 每个片段4-8秒，总共需要10-15个片段\n- 风格统一：same art style, consistent color palette\n\n步骤3：剪辑合成（10分钟）\n- 剪映导入所有片段+音频\n- 对齐画面和歌词节奏\n- 加转场效果（推荐：叠化/缩放）\n- 导出9:16竖版视频\n\n总耗时：约30分钟/条' },
      { title: '发布与运营', content: '发布时间：18:00-21:00（抖音黄金时段）\n标签策略：#AI音乐 #Suno #AI创作 #原创音乐\n互动技巧：评论区问你们觉得AI能取代歌手吗？引发讨论\n数据目标：完播率大于40%，互动率大于5%\n新号前7天每天发1条，之后2天1条' },
    ],
  },
  {
    slug: 'ai-wechat-growth', title: 'AI公众号涨粉：每天10分钟日增100粉',
    desc: 'Kimi写文→AI配图→定时发布，可复制的涨粉SOP',
    cat: '自媒体运营', catColor: 'var(--yellow)', views: '19.4K', difficulty: '入门级', time: '10分钟', date: '2026-04-17',
    keywords: 'AI公众号,AI涨粉,公众号AI写作',
    relatedTools: ['kimi', 'chatgpt'],
    sections: [
      { title: 'AI公众号的核心优势', content: '传统公众号写作一篇1500字文章需要2-3小时，AI辅助后缩短到10-15分钟。这意味着你可以日增甚至一日多更。公众号算法推荐下，更新频率直接决定曝光量。日更账号的平均涨粉速度是周更账号的4倍。' },
      { title: '内容选题与AI写作', content: '选题公式：热点+实用\n- 热点：AI圈最新消息（新模型发布/工具更新/行业动态）\n- 实用：AI工具教程/赚钱方法/效率技巧\n\nAI写作Prompt：请写一篇1500字的公众号文章，主题是[具体主题]，要求：\n1. 标题吸引点击（含数字+痛点词）\n2. 开头3句话必须抓住读者\n3. 每段不超过4行\n4. 包含3个实用tips\n5. 结尾有互动引导\n\n用Kimi写初稿，自己花5分钟润色+加个人观点即可。' },
      { title: '配图与发布', content: '配图方案：\n1. 首图：用通义万相/Midjourney生成与主题相关的封面图\n2. 文中插图：每300-500字配1张图\n3. 末尾引导图：固定模板，引导关注/点赞/转发\n\n发布SOP：\n- 周一到周五每天7:30发布（通勤时间阅读高峰）\n- 用公众号后台定时发布功能，周末一次排好下周5篇\n- 标题格式：数字+好奇词，如5个AI工具让效率翻倍，第3个90%的人不知道' },
    ],
  },
  {
    slug: 'ai-short-drama', title: 'AI短剧制作：一部手机就能拍',
    desc: 'AI写剧本→AI生画面→剪映合成，零成本拍短剧',
    cat: '自媒体运营', catColor: 'var(--yellow)', views: '27.1K', difficulty: '进阶级', time: '22分钟', date: '2026-04-12',
    keywords: 'AI短剧,AI视频制作',
    relatedTools: ['chatgpt', 'suno'],
    sections: [
      { title: 'AI短剧的市场', content: '短剧市场2026年规模超500亿，抖音短剧日播放量超100亿。AI短剧用AI生成画面替代实拍，成本从传统的5-20万/部降到几乎为零。虽然画面不如实拍精细，但胜在题材自由、出片极快。适合入局的赛道：玄幻/修仙/穿越（AI画面优势最大的类型）。' },
      { title: '制作全流程', content: '步骤1：ChatGPT写剧本（30分钟）\nPrompt：写一部5集短剧，每集2分钟，题材为都市重生逆袭，要求每集结尾有悬念，角色3-4个，场景用AI画面可实现\n\n步骤2：AI生成画面（2小时/集）\n- 每个镜头4-8秒，一集约需要20-30个镜头\n- 用可灵/即梦生成，保持角色一致性用相同的描述词\n- 旁白/对话用ChatGPT写+TTS配音\n\n步骤3：剪映合成（1小时/集）\n- 导入所有视频片段+音频\n- 按剧本顺序排列，加字幕、转场、BGM\n- 导出9:16竖版\n\n总耗时：约3-4小时/集' },
      { title: '变现方式', content: '1. 抖音短剧计划：加入平台短剧分成，按播放量收益\n2. 付费解锁：前2集免费，后续每集1-3元\n3. 广告分成：万次播放约30-80元\n4. 品牌植入：集均500-2000元\n5. IP开发：成功短剧可改编为长剧/小说\n\n爆款短剧单集播放100万+，收入3000-8000元/集' },
    ],
  },
  // ===== 工具教程 =====
  {
    slug: 'deepseek-r2-guide', title: 'DeepSeek R2完全指南：从入门到精通',
    desc: '注册、Prompt技巧、推理模式、API使用，一篇搞定',
    cat: '工具教程', catColor: 'var(--accent2)', views: '28.5K', difficulty: '入门级', time: '15分钟', date: '2026-04-19',
    keywords: 'DeepSeek R2教程,DeepSeek使用',
    relatedTools: ['deepseek'],
    sections: [
      { title: 'DeepSeek R2基础', content: 'DeepSeek R2是深度求索2026年4月发布的开源推理大模型，完全免费使用。核心能力：数学推理、代码生成、逻辑分析、长文本理解。在MMLU-Pro上得分78.3%，LiveCodeBench得分62.1%，均达到GPT-4o水平。上下文窗口256K，一次可处理整篇论文或大型代码库。' },
      { title: '网页端使用技巧', content: '访问 chat.deepseek.com，选择R2模型即可使用。\n\n关键技巧：\n1. 推理模式：勾选深度思考按钮，R2会先进行内部推理再回答，复杂问题质量显著提升\n2. 上传文件：支持PDF/Word/图片，256K上下文可一次处理50页PDF\n3. 联网搜索：勾选联网可获取最新信息\n\nPrompt技巧：\n- 数学题：请一步步推理，不要跳步\n- 代码题：先分析需求，再写代码，最后给出测试用例\n- 论文分析：先给500字摘要，再逐节详细解读' },
      { title: 'API调用指南', content: '注册 deepseek.com 开发者平台，创建API Key。\n\n调用示例（Python）：\nimport openai\nclient = openai.OpenAI(api_key=YOUR_KEY, base_url=https://api.deepseek.com)\nresponse = client.chat.completions.create(model=deepseek-reasoner, messages=[{role:user,content:你的问题}])\n\n定价：输入1元/百万tokens，输出2元/百万tokens（业界最低之一）\n免费额度：新注册送200万tokens\n\n推荐场景：自动化推理任务、批量文档分析、代码审查自动化' },
    ],
  },
  {
    slug: 'cursor-beginner-handbook', title: 'Cursor从零开始：Vibe Coding实操手册',
    desc: '安装配置→第一个项目→高级技巧→常见问题解决',
    cat: '工具教程', catColor: 'var(--accent2)', views: '41.2K', difficulty: '入门级', time: '20分钟', date: '2026-04-11',
    keywords: 'Cursor教程,Vibe Coding,Cursor入门',
    relatedTools: ['cursor', 'trae'],
    sections: [
      { title: '安装与配置', content: '1. 下载：访问 cursor.com，下载Mac/Windows/Linux版本\n2. 安装后登录邮箱注册\n3. 配置模型：Cmd+Shift+P 输入Model 选择Claude 4 Sonnet（推荐）\n4. 导入VS Code设置：首次打开时选择Import from VS Code\n\n3个核心快捷键：\n- Cmd+K：AI写代码（选中代码后按K让AI修改）\n- Cmd+L：AI对话（打开侧边栏和AI聊天）\n- Tab：接受AI补全建议\n\n可选配置：在项目根目录创建cursorrules文件，写上编码规范（如使用中文注释，代码风格简洁），AI会遵守。' },
      { title: '第一个项目实战', content: '目标：5分钟做一个个人主页\n\n1. 新建文件夹，在Cursor中打开\n2. Cmd+L打开对话，输入：创建一个index.html，要求深色背景，居中布局，标题我的主页，3个技能卡片，底部社交链接，手机自适应\n3. AI直接生成完整HTML+CSS\n4. 点Accept保存\n5. 右键 Open with Live Preview预览\n\n想修改？继续对话：把背景改成渐变色 / 卡片加hover动画 / 标题加打字机效果\n每句话AI直接改代码，实时看效果。' },
      { title: '高级技巧', content: '1. @file引用：在对话中输入@文件名，让AI参考项目中其他文件\n2. @docs引用：输入@nextjs或@react，让AI参考官方文档\n3. 多文件编辑：选中多个文件，Cmd+K一次性修改\n4. Codebase扫描：Cmd+L后输入@codebase 这个项目的架构是什么，AI会分析整个项目\n5. 终端集成：Cmd+J打开内置终端，AI建议的命令可以直接执行\n\n避坑：一次只提一个需求 / AI写的代码要过一遍再Accept / 遇到Bug先贴报错给AI' },
    ],
  },
  {
    slug: 'midjourney-prompt-guide', title: 'Midjourney提示词宝典：从新手到大师',
    desc: '参数详解、风格词、构图词、负面提示词完全指南',
    cat: '工具教程', catColor: 'var(--accent2)', views: '56.3K', difficulty: '进阶级', time: '25分钟', date: '2026-04-10',
    keywords: 'Midjourney提示词,Midjourney教程',
    relatedTools: ['midjourney'],
    sections: [
      { title: 'Prompt结构公式', content: '完美Prompt = 主体+场景+风格+参数\n\n示例：a young woman reading a book in a cozy cafe, watercolor illustration style, warm lighting, soft colors --ar 3:4 --s 750 --niji 6\n\n拆解：\n- 主体：a young woman reading a book\n- 场景：in a cozy cafe\n- 风格：watercolor illustration style, warm lighting, soft colors\n- 参数：--ar 3:4（宽高比）--s 750（风格化程度）--niji 6（动漫模型）' },
      { title: '必背风格关键词', content: '画风类：\n- watercolor 水彩 / oil painting 油画 / pencil sketch 铅笔画\n- anime 动漫 / photorealistic 照片级写实 / pixel art 像素风\n- ukiyo-e 浮世绘 / cyberpunk 赛博朋克 / steampunk 蒸汽朋克\n- minimalist 极简 / baroque 巴洛克 / art nouveau 新艺术\n\n光影类：\n- golden hour 黄金时刻 / blue hour 蓝调时刻\n- dramatic lighting 戏剧光 / soft diffused light 柔和散射光\n- volumetric light 体积光 / neon glow 霓虹光\n\n画质类：8k, ultra detailed, masterpiece, best quality, sharp focus, bokeh' },
      { title: '核心参数详解', content: '--ar 宽高比：1:1方形 3:4竖版 16:9横版 9:16手机竖屏\n--s 风格化：0-1000，越高越艺术化，推荐250-750\n--q 质量：1或2，2更精细但耗双倍fast时间\n--c 混乱度：0-100，越高越随机/创意\n--niji 动漫模型：6为最新版\n--sref 风格参考：后加图片URL，锁定视觉风格\n--cref 角色参考：后加人物图片URL，保持角色一致\n--no 负面提示：--no text, watermark, blurry\n--tile 无缝贴图：生成可重复拼接的图案\n--repeat 重复生成：一次生成多组' },
    ],
  },
  // ===== Prompt技巧 =====
  {
    slug: 'prompt-writing-10x', title: '10个Prompt让AI写作质量翻倍',
    desc: '角色设定、格式约束、示例引导等实战技巧',
    cat: 'Prompt技巧', catColor: 'var(--green)', views: '18.7K', difficulty: '入门级', time: '8分钟', date: '2026-04-08',
    keywords: 'Prompt技巧,AI写作Prompt',
    relatedTools: ['chatgpt', 'claude'],
    sections: [
      { title: '技巧1-3：角色+格式+约束', content: '技巧1：角色设定\n不要直接问写一篇文章，而是：你是一位10年经验的新媒体运营专家，擅长写爆款标题和增长策略。\n\n技巧2：格式约束\n请用以下格式输出：\n- 标题（15字以内，含数字）\n- 正文（3段，每段不超过4行）\n- 行动号召（1句话）\n\n技巧3：负面约束\n不要使用：然而、总之、首先其次最后、众所周知\n不要写：空洞的废话、没有数据支撑的观点\n\n这3个技巧组合使用，输出质量提升约60%。' },
      { title: '技巧4-7：示例+分步+迭代+对比', content: '技巧4：给示例\n好的标题示例：3个AI工具让效率翻倍，第2个太香了\n坏的标题示例：AI工具推荐\n请参照好的示例风格写5个标题。\n\n技巧5：分步引导\n请分3步完成：\n第1步：列出10个选题方向\n第2步：我选一个后，你展开写大纲\n第3步：我确认大纲后，你写完整文章\n\n技巧6：迭代优化\n这篇文章不够抓人，请：1. 缩短段落 2. 加更多数据 3. 标题更有点击欲\n\n技巧7：让AI对比\n请分别用正式风格和口语风格各写一版开头，我来选。' },
      { title: '技巧8-10：思维链+检查+特定场景', content: '技巧8：思维链（Chain of Thought）\n请先分析这个问题的3个关键因素，再给出你的结论和理由。\n\n技巧9：自检\n写完后，请自我检查：是否有逻辑矛盾？是否有重复表述？数据是否准确？如有问题请修正。\n\n技巧10：场景化模板\n写产品文案时用这个模板：\n[痛点场景] + [传统方案的问题] + [AI方案的优势] + [具体数据] + [行动号召]\n\n示例：每天花2小时写公众号文章？传统方式效率低，AI辅助写作15分钟搞定一篇，实测节省85%时间，立即试试。' },
    ],
  },
  {
    slug: 'crispe-prompt-framework', title: '结构化Prompt框架：CRISPE法则详解',
    desc: 'Capacity-Role-Insight-Statement-Personality-Experiment',
    cat: 'Prompt技巧', catColor: 'var(--green)', views: '14.2K', difficulty: '进阶级', time: '12分钟', date: '2026-04-06',
    keywords: 'CRISPE,结构化Prompt,Prompt框架',
    relatedTools: ['chatgpt', 'deepseek'],
    sections: [
      { title: 'CRISPE框架介绍', content: 'CRISPE是6个维度的Prompt结构化方法：\n\nC - Capacity（能力）：告诉AI它的角色和能力范围\nR - Role（角色）：指定AI扮演的专家身份\nI - Insight（洞察）：提供背景信息和上下文\nS - Statement（陈述）：具体任务描述\nP - Personality（个性）：输出的语气风格\nE - Experiment（实验）：要求AI提供多个版本或选项\n\n相比随意提问，CRISPE框架能让输出质量稳定提升50%以上。' },
      { title: '每个维度详解', content: 'C - Capacity：你是一个擅长数据分析和商业洞察的AI助手\nR - Role：你现在是麦肯锡的高级咨询顾问\nI - Insight：目标用户是25-35岁的互联网从业者，他们关心效率和收入提升\nS - Statement：请分析AI工具对自由职业者收入的影响，给出3个关键发现和2个行动建议\nP - Personality：专业但易懂，用数据说话，避免空话套话\nE - Experiment：请给出乐观和保守两种预测，并说明各自的假设条件' },
      { title: '实战案例', content: '普通Prompt：帮我写一篇AI工具推荐文章\n\nCRISPE版：\nC：你是一个专业的科技媒体编辑，擅长写深度评测和工具推荐\nR：你目前在36氪担任资深作者\nI：目标读者是中国的互联网从业者和创业者，他们对AI工具感兴趣但不知道怎么选\nS：写一篇2000字的AI编程工具推荐文章，覆盖Cursor/Copilot/TRAE，每款包含核心功能、适用场景、价格、优缺点\nP：专业客观，用第一人称测评视角，避免广告味\nE：每款工具给出使用场景推荐和避坑提示\n\n效果对比：CRISPE版的文章结构更清晰、内容更专业、读者价值更高。' },
    ],
  },
  {
    slug: 'coding-prompt-best-practices',
    title: 'AI编程Prompt最佳实践',
    desc: '让Cursor/Copilot写出更好代码的提示词模板',
    cat: 'Prompt技巧',
    catColor: 'var(--green)',
    views: '23.8K',
    difficulty: '进阶级',
    time: '15分钟',
    date: '2026-04-05',
    keywords: 'AI编程Prompt,Cursor Prompt,编程提示词',
    relatedTools: ['cursor', 'chatgpt'],
    sections: [
      {
        title: 'AI编程Prompt的核心原则',
        content: '1. 明确输入输出：不要说做一个登录功能，而是创建一个邮箱+密码登录组件，登录成功后跳转到dashboard，失败时显示红色错误提示\n2. 指定技术栈：使用Next.js 16 + TypeScript + Tailwind CSS\n3. 提供约束条件：不需要注册功能、密码要8位以上、记住登录状态7天\n4. 要求测试：写完后给出3个测试用例\n\n遵循这4个原则，AI生成的代码可用率从40%提升到85%以上。',
      },
      {
        title: '5个高频场景模板',
        content: '模板1：创建新组件\n创建一个组件，要求：明确功能描述，指定技术栈，支持移动端自适应\n\n模板2：修复Bug\n粘贴报错信息和代码，让AI分析原因并修复\n\n模板3：重构代码\n要求：提取重复逻辑为函数、添加TypeScript类型、优化性能、保持功能不变\n\n模板4：添加功能\n要求：不破坏现有功能、代码风格保持一致、添加必要的错误处理\n\n模板5：写测试\n覆盖正常路径+边界情况+错误情况，使用Jest框架',
      },
    ],
  },
];
