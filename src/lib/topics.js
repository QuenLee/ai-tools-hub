// 热门专题数据 — 围绕SEO热点词，按时间倒序
export const topics = [
  {
    id: 'deepseek-r2-guide',
    title: 'DeepSeek R2 完全指南：免费最强推理模型怎么用',
    desc: 'DeepSeek R2开源发布，推理能力超越GPT-4o且完全免费。本文详解R2能力实测、和R1对比、使用教程、API调用方法。',
    badge: '重大发布',
    badgeColor: 'var(--red)',
    badgeBg: 'rgba(239,68,68,0.1)',
    keywords: 'DeepSeek R2,DeepSeek R2教程,DeepSeek R2怎么用,DeepSeek R2和R1区别,免费AI推理模型',
    date: '2026-04-19',
    slug: 'deepseek-r2-guide',
    sections: [
      {
        title: 'DeepSeek R2 是什么',
        content: 'DeepSeek R2 是深度求索于2026年4月发布的第二代推理大模型，采用MoE架构，总参数量1.2T，激活参数量120B。在数学推理、代码生成、科学问答等任务上达到GPT-4o水平，且完全开源免费使用。R2在MMLU-Pro上得分78.3%，在LiveCodeBench上得分62.1%，均超过同级别开源模型。',
      },
      {
        title: 'R2 vs R1：核心升级',
        content: `与R1相比，R2在以下方面显著提升：

• **推理速度提升3倍**：R2优化了思维链生成策略，同等任务下token消耗减少约40%
• **长文本支持**：上下文窗口从128K扩展到256K，可一次性处理整篇论文
• **多模态能力**：新增图片理解，支持截图/图表/PDF直接输入
• **代码能力跨越**：在SWE-Bench上得分从R1的42%提升到58%
• **免费额度更大**：网页端无限制，API免费额度从50万tokens提升到200万tokens`,
      },
      {
        title: '怎么用DeepSeek R2',
        content: `**方式一：网页端（最简单）**
访问 chat.deepseek.com → 选择R2模型 → 直接对话。无需注册即可使用，注册后可保存对话历史。

**方式二：API调用（开发者）**
1. 注册 deepseek.com 开放平台账号
2. 创建API Key
3. 调用接口：
\`\`\`
POST https://api.deepseek.com/chat/completions
Model: deepseek-reasoner
\`\`\`
R2 API定价：输入¥1/百万tokens，输出¥2/百万tokens（业内最低价之一）

**方式三：本地部署**
R2已开源，可通过Ollama一键部署：
\`\`\`
ollama run deepseek-r2:120b
\`\`\`
需要至少2×A100 80G或等效GPU。`,
      },
      {
        title: 'R2 适合什么场景',
        content: `✅ **最佳场景**：
- 数学/物理/工程计算推导
- 复杂代码编写与调试（尤其算法题、系统设计）
- 论文阅读与深度分析（256K上下文）
- 逻辑推理与决策分析

⚠️ **一般场景**：
- 日常闲聊（用免费版R1就够了）
- 创意写作（Claude/GPT在文学性上更好）
- 图片生成（需要配合其他工具）`,
      },
      {
        title: '和竞品对比',
        content: `| 模型 | 推理能力 | 代码能力 | 价格 | 上下文 |
|------|---------|---------|------|--------|
| DeepSeek R2 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 免费/极低 | 256K |
| GPT-4o | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $20/月 | 128K |
| Claude Opus 4 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $20/月 | 200K |
| 豆包1.5 Pro | ⭐⭐⭐⭐ | ⭐⭐⭐½ | 免费 | 128K |

**结论**：如果你需要强力推理+免费使用，R2是目前最佳选择。`,
      },
    ],
    relatedTools: ['deepseek', 'chatgpt', 'claude', 'doubao', 'kimi'],
  },
  {
    id: 'cursor-vs-copilot-2026',
    title: '2026年AI编程工具对比：Cursor vs Copilot vs TRAE',
    desc: 'Cursor、GitHub Copilot、TRAE三大AI编程工具深度横评，从代码补全、对话编程、项目理解、价格等8个维度实测对比。',
    badge: '对比选购',
    badgeColor: 'var(--cyan)',
    badgeBg: 'rgba(34,211,238,0.1)',
    keywords: 'Cursor vs Copilot,Cursor TRAE对比,AI编程工具推荐,2026 AI编程,免费AI编程工具',
    date: '2026-04-18',
    slug: 'cursor-vs-copilot-2026',
    sections: [
      {
        title: '三款工具定位',
        content: `**Cursor**：基于VS Code的AI原生IDE，主打"对话式编程"（Vibe Coding），理解整个项目上下文，适合从零开始写项目。

**GitHub Copilot**：微软旗下代码补全插件，嵌入主流IDE，主打"行内补全"，适合已有项目日常编码提效。

**TRAE**：字节跳动推出的免费AI IDE，定位对标Cursor，完全免费使用，中文支持好，适合国内开发者。`,
      },
      {
        title: '8维度实测对比',
        content: `| 维度 | Cursor | Copilot | TRAE |
|------|--------|---------|------|
| 代码补全 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 对话编程 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 项目理解 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 多文件编辑 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 中文支持 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 免费额度 | 2000次/月 | 无免费版 | 完全免费 |
| 付费价格 | $20/月Pro | $10-19/月 | 永久免费 |
| 上手难度 | 中等 | 简单 | 简单 |`,
      },
      {
        title: '谁该选什么',
        content: `🎯 **选Cursor如果你**：
- 经常从零开始写新项目
- 需要AI理解整个代码库
- 愿意付费获得最强体验
- 做全栈/前端开发

🎯 **选Copilot如果你**：
- 已有大型项目，主要做增量开发
- 用JetBrains/VS Code习惯不想换IDE
- 团队协作已用GitHub生态
- 预算有限，只需代码补全

🎯 **选TRAE如果你**：
- 想免费体验AI编程
- 主要写中文注释/文档
- 不想折腾配置
- 国内网络环境优先`,
      },
      {
        title: '真实场景测试',
        content: `**测试1：写一个Todo List全栈应用**
- Cursor：5分钟完成（前后端+数据库），一次对话搞定 ⭐⭐⭐⭐⭐
- Copilot：需要自己写框架+逐步补全，15分钟 ⭐⭐⭐
- TRAE：8分钟完成，中文注释很顺 ⭐⭐⭐⭐

**测试2：给500行代码找Bug**
- Cursor：读懂整个文件后精准定位 ⭐⭐⭐⭐⭐
- Copilot：只能看当前函数，需要手动跳转 ⭐⭐⭐
- TRAE：能理解上下文但偶有遗漏 ⭐⭐⭐⭐

**测试3：修改10个文件的重构任务**
- Cursor：一次性改完全部文件 ⭐⭐⭐⭐⭐
- Copilot：无法跨文件编辑 ⭐⭐
- TRAE：大部分能改，偶尔需要手动确认 ⭐⭐⭐⭐`,
      },
    ],
    relatedTools: ['cursor', 'trae'],
  },
  {
    id: 'free-ai-tools-2026-may',
    title: '2026年5月AI工具免费额度汇总：能白嫖绝不花钱',
    desc: '全网最全AI工具免费额度清单，每月更新。DeepSeek/Cursor/豆包/通义/Kimi/Suno等30+工具的免费限制和薅羊毛攻略。',
    badge: '省钱攻略',
    badgeColor: 'var(--green)',
    badgeBg: 'rgba(52,211,153,0.1)',
    keywords: 'AI工具免费额度,免费AI工具,AI白嫖,DeepSeek免费,Cursor免费额度,2026免费AI',
    date: '2026-05-01',
    slug: 'free-ai-tools-2026-may',
    sections: [
      {
        title: '永久免费工具',
        content: `这些工具核心功能完全免费，不设次数限制：

| 工具 | 免费内容 | 限制 |
|------|---------|------|
| DeepSeek | 对话+推理+代码 | 高峰期可能排队 |
| 豆包 | 对话+绘画+视频生成 | 部分高级模型需付费 |
| TRAE | AI编程IDE全功能 | 无限制 |
| Kimi | 长文本对话+文件阅读 | 单文件限200万字 |
| 秘塔AI搜索 | 深度搜索+研报 | 每日搜索次数限制 |
| 通义千问 | 对话+绘画+代码 | API免费100万tokens |`,
      },
      {
        title: '有免费额度的付费工具',
        content: `| 工具 | 免费额度 | 付费价格 | 薅羊毛技巧 |
|------|---------|---------|-----------|
| Cursor | 2000次补全/月 | $20/月Pro | 多账号轮换 |
| ChatGPT | GPT-4o免费版 | $20/月Plus | 免费版已够日常 |
| Claude | Sonnet免费版 | $20/月Pro | 免费版限额较大 |
| Suno | 10首/天 | $10/月Pro | 每天用完10首 |
| Midjourney | 无免费版 | $10/月起 | 用Discord免费频道 |
| Runway | 3个视频/月 | $12/月 | 精打细算用 |
| Suno | 10首/天免费 | $8/月Pro | 每天薅完额度 |
| ChatGPT | GPT-4o免费 | $20/月Plus | 足够日常使用 |`,
      },
      {
        title: '开发者专属免费额度',
        content: `| 平台 | 免费额度 | 开通方式 |
|------|---------|---------|
| 通义千问API | 100万tokens免费 | 注册即送 |
| 豆包大模型API | 50万tokens免费 | 注册即送 |
| Google Colab | 免费GPU笔记本 | Google账号直接用 |
| Hugging Face | 免费模型托管+推理 | 注册即用 |
| Cloudflare Workers | 10万次/天免费 | 注册即用 |
| Vercel | 个人项目免费部署 | GitHub登录即用 |
| GitHub Pages | 静态站免费托管 | 仓库设置开启 |`,
      },
      {
        title: '本月更新日志',
        content: `📅 **2026年5月更新**：
- ✅ DeepSeek R2发布，免费使用新推理模型
- ✅ 豆包视频生成免费开放
- ✅ TRAE永久免费政策确认
- ⚠️ Cursor免费额度从500次降到2000次/月（实际提升了）
- ⚠️ Suno免费额度从50首/月降到10首/天（日均更多了）

每月1日更新，关注本页面获取最新免费额度信息。`,
      },
    ],
    relatedTools: ['deepseek', 'doubao', 'cursor', 'chatgpt', 'claude', 'tongyi', 'kimi', 'suno'],
  },
  {
    id: 'ai-paper-reading-tools',
    title: '论文党必看：5个AI文献阅读工具实测，Kimi/通义/ChatGPT谁最强',
    desc: '研究生/科研人员专属攻略：5款AI论文阅读工具从PDF解析、公式识别、跨文献对比等维度深度实测，附使用技巧。',
    badge: '场景推荐',
    badgeColor: 'var(--accent2)',
    badgeBg: 'rgba(124,92,252,0.1)',
    keywords: 'AI读论文,AI文献阅读,Kimi读论文,论文阅读工具,AI读PDF,研究生AI工具',
    date: '2026-04-15',
    slug: 'ai-paper-reading-tools',
    sections: [
      {
        title: '为什么需要AI读论文',
        content: `一篇AI顶会论文动辄20页+，公式+图表+引用，传统阅读效率极低。AI工具可以：
- **秒出摘要**：1分钟了解论文核心贡献
- **公式解释**：自动解读复杂数学推导
- **图表分析**：理解实验结果和数据趋势
- **跨文献对比**：同时分析多篇论文的异同
- **翻译+笔记**：一键生成中文摘要和批注`,
      },
      {
        title: '5款工具实测',
        content: `**1. Kimi（推荐指数⭐⭐⭐⭐⭐）**
- 上下文200万字，一次性吃透10篇论文
- 支持PDF/图片/网址直接输入
- 免费，中文理解最好
- 不足：偶尔漏读公式

**2. ChatGPT（推荐指数⭐⭐⭐⭐）**
- GPT-4o分析能力强
- 支持PDF上传和图片识别
- 免费版可用，Plus体验更好
- 不足：上下文只有128K，长论文会截断

**3. 通义千问（推荐指数⭐⭐⭐⭐）**
- 免费API额度大，可批量处理
- 和钉钉/阿里云盘联动
- 不足：学术理解略逊Kimi

**4. Claude（推荐指数⭐⭐⭐⭐）**
- 200K上下文，长文理解最强
- 公式解读准确率最高
- 不足：国内需翻墙，免费版限额

**5. DeepSeek R2（推荐指数⭐⭐⭐½）**
- 256K上下文最长
- 推理型论文理解最好（数学/理论）
- 免费
- 不足：非推理型论文表现一般`,
      },
      {
        title: '不同场景推荐',
        content: `| 场景 | 首选 | 理由 |
|------|------|------|
| 快速浏览10篇论文 | Kimi | 200万上下文一次全读 |
| 精读1篇硬核论文 | Claude | 公式理解最准 |
| 批量处理100篇 | 通义千问API | 免费额度大可自动化 |
| 数学/理论论文 | DeepSeek R2 | 推理能力强 |
| 写综述需要对比 | ChatGPT | 多轮对话+搜索好 |`,
      },
      {
        title: '使用技巧',
        content: `🔑 **Prompt技巧**：
1. 先让AI出摘要："请用500字总结这篇论文的核心贡献、方法和实验结果"
2. 再深挖细节："第3.2节的公式(7)是什么意思？请逐步解释"
3. 跨文献对比："这篇论文和[另一篇]的方法有什么区别？"
4. 批判性思考："这篇论文的方法有什么局限性？"

💡 **效率技巧**：
- 用Kimi一次上传多篇，先让AI做分类再逐篇精读
- 用通义API写脚本批量出摘要，存到Notion
- 遇到关键公式截图问Claude，解读最准确`,
      },
    ],
    relatedTools: ['kimi', 'chatgpt', 'tongyi', 'claude', 'deepseek'],
  },
  {
    id: 'cursor-beginner-guide',
    title: '零基础用Cursor写APP：从安装到上线的保姆级教程',
    desc: '不会编程也能用Cursor做应用。从安装配置到写第一个项目、调试部署，手把手教你Vibe Coding，附实战案例。',
    badge: '入门教程',
    badgeColor: 'var(--yellow)',
    badgeBg: 'rgba(251,191,36,0.1)',
    keywords: 'Cursor教程,Cursor入门,Vibe Coding,零基础编程,Cursor写APP,AI编程入门',
    date: '2026-04-12',
    slug: 'cursor-beginner-guide',
    sections: [
      {
        title: 'Cursor是什么',
        content: `Cursor是一款AI驱动的代码编辑器，你只需要用自然语言描述需求，它就能帮你写代码、建项目、修Bug。

**核心理念**：Vibe Coding — 你说需求，AI写代码。不用记忆语法，不用查文档，像和工程师对话一样开发。`,
      },
      {
        title: '安装与配置（5分钟）',
        content: `**Step 1：下载安装**
1. 访问 cursor.com 下载客户端（支持Mac/Windows/Linux）
2. 安装后用邮箱注册（免费版每月2000次AI调用）

**Step 2：首次配置**
- 打开Cursor → 登录 → 选择主题（Dark推荐）
- 按 Cmd+Shift+P → 输入 "Model" → 选择 Claude 4 Sonnet（免费版最强模型）

**Step 3：了解3个核心快捷键**
- Cmd+K：AI写代码（选中代码后按K让AI修改）
- Cmd+L：AI对话（打开侧边栏和AI聊天）
- Tab：接受AI补全建议

就这3个键，够用了！`,
      },
      {
        title: '实战：写一个个人主页',
        content: `打开Cursor → New File → 按 Cmd+L 打开对话 → 输入：

"帮我创建一个个人主页，用HTML+CSS，要求：
- 居中布局，深色背景
- 顶部大标题'我的主页'
- 3个技能卡片（前端/设计/写作）
- 底部社交链接
- 手机也能正常看"

AI会直接生成完整代码，你只需点"Accept"保存，然后右键→Open with Live Preview就能看到效果。

**想修改？继续对话：**
"把背景改成渐变色，从深蓝到紫色"
"给卡片加hover动画效果"
"标题加个打字机动画"

每句话AI都会直接改代码，实时看效果。`,
      },
      {
        title: '部署上线（免费）',
        content: `**方式一：Vercel（推荐）**
1. 把项目推到GitHub（Cursor内置Git）
2. 登录 vercel.com → Import Project → 选仓库
3. 一键部署，获得 xxx.vercel.app 域名
4. 可绑定自定义域名

**方式二：GitHub Pages**
1. 仓库 Settings → Pages → 选main分支
2. 等1分钟，获得 username.github.io/repo 域名

全程0费用，5分钟上线。`,
      },
      {
        title: '进阶技巧',
        content: `🔑 **让Cursor更好用的设置**：
1. 在项目根目录创建 cursorrules文件 文件，写上你的编码规范
2. 用 @file 引用项目中的其他文件："参考 @utils.js 的风格重写这个函数"
3. 用 @docs 引用框架文档："按照 @nextjs 文档配置路由"

💡 **避坑指南**：
- 一次只提一个需求，别一句话塞5个改动
- AI写的代码要过一遍，别完全不看就Accept
- 遇到Bug先贴报错信息给AI，90%的情况它能自己修
- 免费额度用完可以换账号，或升级Pro $20/月`,
      },
    ],
    relatedTools: ['cursor', 'trae'],
  },
  {
    id: 'ai-video-generation-2026',
    title: '2026年AI视频生成工具横评：Sora vs 可灵 vs 即梦 vs Runway',
    desc: 'AI视频生成赛道爆发！Sora/可灵/即梦/Runway/Pika五大工具从画质、时长、价格、易用性全面对比，附最佳场景推荐。',
    badge: '对比选购',
    badgeColor: 'var(--cyan)',
    badgeBg: 'rgba(34,211,238,0.1)',
    keywords: 'AI视频生成,Sora vs可灵,AI视频工具对比,2026 AI视频,免费AI视频生成',
    date: '2026-04-10',
    slug: 'ai-video-generation-2026',
    sections: [
      {
        title: 'AI视频生成现状',
        content: `2026年是AI视频生成的爆发年。OpenAI Sora正式开放、快手可灵升级2.0、字节即梦免费开放、Runway Gen-4发布。现在任何人都能用自然语言生成高质量视频。`,
      },
      {
        title: '五款工具横评',
        content: `| 维度 | Sora | 可灵 | 即梦 | Runway | Pika |
|------|------|------|------|--------|------|
| 画质 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐½ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 最长时长 | 60秒 | 30秒 | 15秒 | 30秒 | 10秒 |
| 中文提示词 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 免费额度 | 50视频/月 | 10视频/天 | 完全免费 | 3视频/月 | 5视频/天 |
| 付费价格 | $20/月 | ¥68/月 | 免费 | $12/月 | $8/月 |
| 角色一致性 | 强 | 中 | 弱 | 强 | 中 |
| 运动幅度 | 大 | 大 | 中 | 中 | 中 |`,
      },
      {
        title: '场景推荐',
        content: `🎬 **选Sora**：需要电影级画质+长视频（广告/短片/MV）
🎬 **选可灵**：国内用户首选，中文提示词最准，快手生态
🎬 **选即梦**：零成本试水AI视频，完全免费
🎬 **选Runway**：专业影视制作，需要角色一致性和精准控制
🎬 **选Pika**：快速出短视频/表情包/GIF，上手最简单`,
      },
      {
        title: '新手入门建议',
        content: `1. 先用即梦免费体验，理解AI视频生成的基本逻辑
2. 学写好的Prompt："一个女孩在海边慢跑，逆光，电影感，4K"
3. 关键词公式：主体 + 动作 + 场景 + 光线 + 画质风格
4. 短视频先用免费额度做，满意再考虑付费升级
5. 同一提示词多生成几次，选最好的`,
      },
    ],
    relatedTools: ['suno'],
  },
];
