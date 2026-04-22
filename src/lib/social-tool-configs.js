// 7个自媒体AI工具的配置 — 每个工具的输入字段、示例、prompt构建逻辑

const SOCIAL_TOOL_CONFIGS = {
  'xhs-writer': {
    title: '小红书种草文生成器',
    desc: '输入产品信息，AI生成爆款种草笔记（标题+正文+标签）',
    icon: '📕',
    fields: [
      { label: '产品名称', placeholder: '例如：一款AI编程助手Cursor', required: true },
      { label: '产品描述/卖点', type: 'textarea', placeholder: '例如：支持自然语言写代码，免费2000次/月，比Copilot更便宜...', minHeight: 80, required: true },
      { label: '目标人群', type: 'select', options: ['学生党', '上班族', '宝妈', '男生', '女生', '所有人'], required: false },
    ],
    placeholders: ['产品名称', '描述产品卖点、特色、价格等', '选择目标人群'],
    examples: [
      { label: '护肤品', values: ['一款烟酰胺美白精华', '3%烟酰胺浓度，28天淡斑，敏感肌可用，性价比超大牌', '女生'] },
      { label: 'AI工具', values: ['Cursor编程助手', 'AI写代码，自然语言描述需求自动生成代码，免费2000次/月', '上班族'] },
    ],
    buildPrompt: (inputs) => `产品：${inputs[0]}\n卖点：${inputs[1]}\n目标人群：${inputs[2] || '所有人'}\n\n请为这个产品生成一篇小红书种草笔记。`,
  },

  'douyin-script': {
    title: '抖音短视频脚本',
    desc: '输入主题，AI生成完整短视频脚本（黄金3秒+内容+钩子）',
    icon: '🎵',
    fields: [
      { label: '视频主题', placeholder: '例如：5个效率翻倍的手机技巧', required: true },
      { label: '内容类型', type: 'select', options: ['知识科普', '产品种草', '剧情反转', '日常Vlog', '测评对比'], required: true },
      { label: '额外要求', type: 'textarea', placeholder: '例如：要幽默一点/加反转结尾/30秒以内...', minHeight: 60, required: false },
    ],
    placeholders: ['视频主题', '选择内容类型', '其他要求（可选）'],
    examples: [
      { label: '效率技巧', values: ['5个效率翻倍的手机技巧', '知识科普', '节奏要快，每条技巧10秒'] },
      { label: '产品种草', values: ['分享一个让我月省500元的APP', '产品种草', ''] },
    ],
    buildPrompt: (inputs) => `视频主题：${inputs[0]}\n内容类型：${inputs[1]}\n额外要求：${inputs[2] || '无'}\n\n请生成完整的抖音短视频脚本。`,
  },

  'live-script': {
    title: '直播话术生成器',
    desc: '输入产品信息，AI生成整场直播话术+排品策略',
    icon: '📺',
    fields: [
      { label: '主营产品', placeholder: '例如：美妆护肤套装', required: true },
      { label: '产品数量和价格', type: 'textarea', placeholder: '例如：\n1. 洁面乳 59元\n2. 精华液 129元\n3. 面霜 89元\n4. 体验装 9.9元', minHeight: 80, required: true },
      { label: '直播时长', type: 'select', options: ['1小时', '2小时', '3小时', '4小时'], required: true },
    ],
    placeholders: ['主营产品品类', '列出产品名和价格', '选择直播时长'],
    examples: [
      { label: '美妆直播', values: ['美妆护肤', '洁面乳59元\n精华液129元\n面霜89元\n体验装9.9元', '2小时'] },
    ],
    buildPrompt: (inputs) => `主营产品：${inputs[0]}\n产品清单：\n${inputs[1]}\n直播时长：${inputs[2]}\n\n请生成完整的直播话术脚本和排品表。`,
  },

  'comment-reply': {
    title: '评论回复助手',
    desc: '粘贴评论，AI生成得体高互动回复',
    icon: '💬',
    fields: [
      { label: '评论内容（可多行，每行一条）', type: 'textarea', placeholder: '例如：\n这个东西真的好用吗？\n太贵了吧\n已下单，期待！\n用了过敏怎么办', minHeight: 120, required: true },
      { label: '回复风格', type: 'select', options: ['温暖亲切', '专业靠谱', '幽默有趣', '官方正式'], required: false },
    ],
    placeholders: ['粘贴评论内容', '选择回复风格'],
    examples: [
      { label: '好评差评混合', values: ['真的好用吗？\n太贵了不值得\n已下单期待\n用了过敏怎么办', '温暖亲切'] },
    ],
    buildPrompt: (inputs) => `以下是需要回复的评论：\n${inputs[0]}\n\n回复风格：${inputs[1] || '温暖亲切'}\n\n请为每条评论生成1-2个回复选项。`,
  },

  'wechat-article': {
    title: '公众号文章生成器',
    desc: '输入主题，AI生成完整公众号推文',
    icon: '📰',
    fields: [
      { label: '文章主题', placeholder: '例如：如何用AI工具提升工作效率', required: true },
      { label: '目标读者', placeholder: '例如：职场白领/创业者/学生', required: true },
      { label: '核心观点/要点', type: 'textarea', placeholder: '例如：\n1. AI写作工具\n2. AI翻译工具\n3. AI日程管理\n每点简单一句话描述即可', minHeight: 80, required: false },
    ],
    placeholders: ['文章主题', '目标读者', '核心要点（可选）'],
    examples: [
      { label: '职场效率', values: ['2026年职场人必备的5个AI效率工具', '职场白领', '1.DeepSeek写报告 2.Cursor写代码 3.秘塔AI搜索 4.豆包翻译 5.Kimi长文总结'] },
    ],
    buildPrompt: (inputs) => `文章主题：${inputs[0]}\n目标读者：${inputs[1]}\n核心要点：${inputs[2] || '由你发挥'}\n\n请生成一篇完整的公众号文章。`,
  },

  'bili-script': {
    title: 'B站视频脚本生成器',
    desc: '输入主题，AI生成中长视频脚本+弹幕互动设计',
    icon: '📺',
    fields: [
      { label: '视频主题', placeholder: '例如：AI到底会不会取代程序员？', required: true },
      { label: '视频分区', type: 'select', options: ['知识区', '科技区', '生活区', '游戏区', '影视区'], required: true },
      { label: '补充要求', type: 'textarea', placeholder: '例如：要讲得有趣/加案例/10分钟左右...', minHeight: 60, required: false },
    ],
    placeholders: ['视频主题', '选择分区', '补充要求'],
    examples: [
      { label: 'AI话题', values: ['AI到底会不会取代程序员？', '科技区', '要有数据支撑，节奏有趣'] },
    ],
    buildPrompt: (inputs) => `视频主题：${inputs[0]}\n分区：${inputs[1]}\n补充要求：${inputs[2] || '无'}\n\n请生成完整的B站视频脚本，包含弹幕触发点设计。`,
  },

  'private-domain': {
    title: '社群运营文案生成器',
    desc: '选择场景，AI生成群公告/欢迎语/活动文案',
    icon: '🏠',
    fields: [
      { label: '文案场景', type: 'select', options: ['新成员入群欢迎', '群公告/规则', '限时活动通知', '早安资讯分享', '干货内容推荐', '沉睡用户唤醒', '节日祝福+促销', '直播/活动预告'], required: true },
      { label: '社群主题', placeholder: '例如：AI学习交流群/美妆种草群/副业赚钱群', required: true },
      { label: '具体内容/要求', type: 'textarea', placeholder: '例如：\n- 活动时间：本周五晚8点\n- 福利：前50名下单送赠品\n- 优惠：全场8折', minHeight: 80, required: false },
    ],
    placeholders: ['选择文案场景', '社群主题/名称', '具体内容要求'],
    examples: [
      { label: '欢迎新人', values: ['新成员入群欢迎', 'AI工具交流群', '鼓励大家自我介绍+分享常用AI工具'] },
      { label: '活动通知', values: ['限时活动通知', '副业赚钱群', '限时48小时，AI写作课程5折'] },
    ],
    buildPrompt: (inputs) => `文案场景：${inputs[0]}\n社群主题：${inputs[1]}\n具体内容：${inputs[2] || '由你发挥'}\n\n请生成社群运营文案。`,
  },
};

module.exports = { SOCIAL_TOOL_CONFIGS };
