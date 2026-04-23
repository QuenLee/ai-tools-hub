// 全部AI驱动工具的配置 — 输入字段、示例、prompt构建逻辑

const TOOL_CONFIGS = {
  // ===== 自媒体神器 =====
  'xhs-writer': {
    title: '小红书种草文生成器',
    desc: '输入产品信息，AI生成爆款种草笔记（标题+正文+标签）',
    icon: '📕',
    fields: [
      { label: '产品名称', placeholder: '例如：一款AI编程助手Cursor', required: true },
      { label: '产品描述/卖点', type: 'textarea', placeholder: '例如：支持自然语言写代码，免费2000次/月，比Copilot更便宜...', minHeight: 80, required: true },
      { label: '目标人群', type: 'select', options: ['学生党', '上班族', '宝妈', '男生', '女生', '所有人'], required: false },
    ],
    examples: [
      { label: '护肤品', values: ['一款烟酰胺美白精华', '3%烟酰胺浓度，28天淡斑，敏感肌可用', '女生'] },
      { label: 'AI工具', values: ['Cursor编程助手', 'AI写代码，自然语言描述需求自动生成代码', '上班族'] },
    ],
    buildPrompt: (inputs) => `产品：${inputs[0]}\n卖点：${inputs[1]}\n目标人群：${inputs[2] || '所有人'}\n\n请为这个产品生成一篇小红书种草笔记。`
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
    examples: [
      { label: '效率技巧', values: ['5个效率翻倍的手机技巧', '知识科普', '节奏要快'] },
      { label: '产品种草', values: ['分享一个让我月省500元的APP', '产品种草', ''] },
    ],
    buildPrompt: (inputs) => `视频主题：${inputs[0]}\n内容类型：${inputs[1]}\n额外要求：${inputs[2] || '无'}\n\n请生成完整的抖音短视频脚本。`
  },

  'live-script': {
    title: '直播话术生成器',
    desc: '输入产品信息，AI生成整场直播话术+排品策略',
    icon: '📺',
    fields: [
      { label: '主营产品', placeholder: '例如：美妆护肤套装', required: true },
      { label: '产品数量和价格', type: 'textarea', placeholder: '例如：洁面乳59元，精华液129元，面霜89元，体验装9.9元', minHeight: 80, required: true },
      { label: '直播时长', type: 'select', options: ['1小时', '2小时', '3小时', '4小时'], required: true },
    ],
    examples: [
      { label: '美妆直播', values: ['美妆护肤', '洁面乳59元，精华液129元，面霜89元，体验装9.9元', '2小时'] },
    ],
    buildPrompt: (inputs) => `主营产品：${inputs[0]}\n产品清单：${inputs[1]}\n直播时长：${inputs[2]}\n\n请生成完整的直播话术脚本和排品表。`
  },

  'comment-reply': {
    title: '评论回复助手',
    desc: '粘贴评论，AI生成得体高互动回复',
    icon: '💬',
    fields: [
      { label: '评论内容（可多行，每行一条）', type: 'textarea', placeholder: '例如：这个东西真的好用吗？\n太贵了吧\n已下单，期待！', minHeight: 120, required: true },
      { label: '回复风格', type: 'select', options: ['温暖亲切', '专业靠谱', '幽默有趣', '官方正式'], required: false },
    ],
    examples: [
      { label: '好评差评混合', values: ['真的好用吗？\n太贵了不值得\n已下单期待', '温暖亲切'] },
    ],
    buildPrompt: (inputs) => `以下是需要回复的评论：\n${inputs[0]}\n\n回复风格：${inputs[1] || '温暖亲切'}\n\n请为每条评论生成1-2个回复选项。`
  },

  'wechat-article': {
    title: '公众号文章生成器',
    desc: '输入主题，AI生成完整公众号推文',
    icon: '📰',
    fields: [
      { label: '文章主题', placeholder: '例如：如何用AI工具提升工作效率', required: true },
      { label: '目标读者', placeholder: '例如：职场白领/创业者/学生', required: true },
      { label: '核心观点/要点', type: 'textarea', placeholder: '简要列出核心要点', minHeight: 80, required: false },
    ],
    examples: [
      { label: '职场效率', values: ['2026年职场人必备的5个AI效率工具', '职场白领', '1.DeepSeek 2.Cursor 3.秘塔AI搜索'] },
    ],
    buildPrompt: (inputs) => `文章主题：${inputs[0]}\n目标读者：${inputs[1]}\n核心要点：${inputs[2] || '由你发挥'}\n\n请生成一篇完整的公众号文章。`
  },

  'bili-script': {
    title: 'B站视频脚本生成器',
    desc: '输入主题，AI生成中长视频脚本+弹幕互动设计',
    icon: '📺',
    fields: [
      { label: '视频主题', placeholder: '例如：AI到底会不会取代程序员？', required: true },
      { label: '视频分区', type: 'select', options: ['知识区', '科技区', '生活区', '游戏区', '影视区'], required: true },
      { label: '补充要求', type: 'textarea', placeholder: '例如：要讲得有趣/加案例...', minHeight: 60, required: false },
    ],
    examples: [
      { label: 'AI话题', values: ['AI到底会不会取代程序员？', '科技区', '要有数据支撑'] },
    ],
    buildPrompt: (inputs) => `视频主题：${inputs[0]}\n分区：${inputs[1]}\n补充要求：${inputs[2] || '无'}\n\n请生成完整的B站视频脚本，包含弹幕触发点设计。`
  },

  'private-domain': {
    title: '社群运营文案生成器',
    desc: '选择场景，AI生成群公告/欢迎语/活动文案',
    icon: '🏠',
    fields: [
      { label: '文案场景', type: 'select', options: ['新成员入群欢迎', '群公告/规则', '限时活动通知', '早安资讯分享', '干货内容推荐', '沉睡用户唤醒', '节日祝福+促销', '直播/活动预告'], required: true },
      { label: '社群主题', placeholder: '例如：AI学习交流群', required: true },
      { label: '具体内容/要求', type: 'textarea', placeholder: '例如：活动时间/福利/优惠等', minHeight: 80, required: false },
    ],
    examples: [
      { label: '欢迎新人', values: ['新成员入群欢迎', 'AI工具交流群', '鼓励大家自我介绍'] },
      { label: '活动通知', values: ['限时活动通知', '副业赚钱群', '限时48小时，AI写作课程5折'] },
    ],
    buildPrompt: (inputs) => `文案场景：${inputs[0]}\n社群主题：${inputs[1]}\n具体内容：${inputs[2] || '由你发挥'}\n\n请生成社群运营文案。`
  },

  // ===== 职场办公 =====
  'weekly-report': {
    title: '周报/日报生成器',
    desc: '输入工作内容，AI生成专业周报/日报',
    icon: '📋',
    fields: [
      { label: '报告类型', type: 'select', options: ['周报', '日报'], required: true },
      { label: '工作内容', type: 'textarea', placeholder: '零散列举即可，例如：完成了首页改版、修复了3个bug...', minHeight: 100, required: true },
      { label: '额外补充', type: 'textarea', placeholder: '例如：遇到什么困难/下周重点...', minHeight: 60, required: false },
    ],
    examples: [
      { label: '程序员周报', values: ['周报', '完成首页改版，修复3个bug，对齐V2.0需求', '下周重点：支付模块'] },
      { label: '运营日报', values: ['日报', '发了2篇小红书笔记，回复30条评论，社群新增15人', ''] },
    ],
    buildPrompt: (inputs) => `报告类型：${inputs[0]}\n工作内容：${inputs[1]}\n额外补充：${inputs[2] || '无'}\n\n请生成格式规范的专业${inputs[0]}。`
  },

  'meeting-notes': {
    title: '会议纪要生成器',
    desc: '输入会议内容，AI生成结构化纪要+待办清单',
    icon: '📝',
    fields: [
      { label: '会议主题', placeholder: '例如：Q2产品路线图评审', required: true },
      { label: '会议内容', type: 'textarea', placeholder: '尽量详细，口语化也行', minHeight: 140, required: true },
    ],
    examples: [
      { label: '产品评审', values: ['Q2产品路线图评审', '张总说Q2重点做AI功能，决定AI优先社区延后Q3，王工负责技术方案'] },
    ],
    buildPrompt: (inputs) => `会议主题：${inputs[0]}\n会议内容：${inputs[1]}\n\n请生成结构化的会议纪要。`
  },

  'email-writer': {
    title: '邮件撰写助手',
    desc: '输入场景+要点，AI生成专业邮件',
    icon: '📧',
    fields: [
      { label: '邮件场景', type: 'select', options: ['工作汇报', '请示审批', '催办跟进', '委婉拒绝', '邀请合作', '感谢信', '道歉信', '商务谈判'], required: true },
      { label: '收件人', placeholder: '例如：直属领导/客户/合作方/HR', required: true },
      { label: '邮件要点', type: 'textarea', placeholder: '简述邮件核心内容', minHeight: 80, required: true },
    ],
    examples: [
      { label: '请假', values: ['请示审批', '直属领导', '申请下周五请假1天，原因家中有事，工作已安排小明代管'] },
      { label: '催办', values: ['催办跟进', '合作方项目经理', '上次说的API对接方案已经一周未回复，能否这周五前给回复'] },
    ],
    buildPrompt: (inputs) => `邮件场景：${inputs[0]}\n收件人：${inputs[1]}\n邮件要点：${inputs[2]}\n\n请生成完整的商务邮件。`
  },

  'ppt-outline': {
    title: 'PPT大纲生成器',
    desc: '输入主题，AI生成PPT结构+每页要点+视觉建议',
    icon: '📊',
    fields: [
      { label: 'PPT主题', placeholder: '例如：2026年Q1营销策略', required: true },
      { label: 'PPT用途', type: 'select', options: ['工作汇报', '项目提案', '产品发布', '培训教学', '年度总结', '融资路演'], required: true },
      { label: '核心内容', type: 'textarea', placeholder: '简要列出要覆盖的要点', minHeight: 80, required: false },
    ],
    examples: [
      { label: '季度汇报', values: ['2026年Q1营销策略', '工作汇报', '去年复盘，市场分析，Q1策略，预算分配，KPI目标'] },
    ],
    buildPrompt: (inputs) => `PPT主题：${inputs[0]}\n用途：${inputs[1]}\n核心内容：${inputs[2] || '由你规划'}\n\n请生成完整的PPT大纲。`
  },

  'speech-writer': {
    title: '演讲稿生成器',
    desc: '输入场景，AI生成完整演讲稿',
    icon: '🎙',
    fields: [
      { label: '演讲场景', type: 'select', options: ['公司年会', '行业论坛', '产品路演', '述职报告', '毕业典礼', '婚礼致辞', '其他'], required: true },
      { label: '演讲时长', type: 'select', options: ['3分钟', '5分钟', '10分钟', '15分钟', '30分钟'], required: true },
      { label: '核心观点/故事', type: 'textarea', placeholder: '想传达的2-3个核心观点或故事素材', minHeight: 80, required: true },
    ],
    examples: [
      { label: '年会发言', values: ['公司年会', '5分钟', '回顾团队一年成长，3个项目里程碑，感谢团队，明年展望'] },
    ],
    buildPrompt: (inputs) => `演讲场景：${inputs[0]}\n时长：${inputs[1]}\n核心观点：${inputs[2]}\n\n请生成完整的演讲稿。`
  },

  'excel-formula': {
    title: 'Excel公式生成器',
    desc: '描述需求，AI生成Excel公式+解释',
    icon: '📈',
    fields: [
      { label: '需求描述', type: 'textarea', placeholder: '例如：A列是产品名，B列是销量，我想算销量前3的产品总销售额', minHeight: 100, required: true },
    ],
    examples: [
      { label: '条件求和', values: ['A列是部门，B列是工资，想求技术部的工资总和'] },
      { label: '查找匹配', values: ['Sheet1的A列是学号B列是姓名，Sheet2的A列也是学号，想在Sheet2的B列自动填入姓名'] },
    ],
    buildPrompt: (inputs) => `我的Excel需求：${inputs[0]}\n\n请给出推荐的公式方案。`
  },

  'competitor-analysis': {
    title: '竞品分析报告',
    desc: '输入产品名，AI生成结构化竞品分析',
    icon: '🔍',
    fields: [
      { label: '你的产品', placeholder: '例如：Notion', required: true },
      { label: '竞品（可多个，逗号分隔）', placeholder: '例如：Evernote, Obsidian, Roam Research', required: true },
      { label: '分析重点', type: 'select', options: ['全面分析', '功能对比', '商业模式', '用户画像', '市场定位'], required: false },
    ],
    examples: [
      { label: 'AI编程', values: ['Cursor', 'GitHub Copilot, Windsurf, Codeium', '功能对比'] },
    ],
    buildPrompt: (inputs) => `我的产品：${inputs[0]}\n竞品：${inputs[1]}\n分析重点：${inputs[2] || '全面分析'}\n\n请生成竞品分析报告。`
  },

  // ===== 专业工具 =====
  'seo-article': {
    title: 'SEO文章生成器',
    desc: '输入关键词，AI生成完整SEO优化文章',
    icon: '🔍',
    fields: [
      { label: '目标关键词', placeholder: '例如：AI写作工具推荐', required: true },
      { label: '文章方向', type: 'textarea', placeholder: '例如：面向国内用户，推荐免费和低价工具', minHeight: 80, required: true },
      { label: '文章字数', type: 'select', options: ['1500字', '2000字', '3000字', '5000字'], required: false },
    ],
    examples: [
      { label: 'AI工具', values: ['AI写作工具推荐', '面向国内用户，推荐免费和低价工具', '3000字'] },
    ],
    buildPrompt: (inputs) => `目标关键词：${inputs[0]}\n文章方向：${inputs[1]}\n目标字数：${inputs[2] || '2000字'}\n\n请生成完整的SEO优化文章。`
  },

  'product-desc': {
    title: '产品详情页文案',
    desc: '输入产品信息，AI生成电商详情页文案',
    icon: '🛒',
    fields: [
      { label: '产品名称', placeholder: '例如：无线降噪耳机Pro', required: true },
      { label: '产品卖点', type: 'textarea', placeholder: '例如：主动降噪40dB，续航30小时，蓝牙5.3，299元', minHeight: 80, required: true },
      { label: '投放平台', type: 'select', options: ['淘宝/天猫', '京东', '拼多多', '抖音商城', '小红书'], required: false },
    ],
    examples: [
      { label: '耳机', values: ['无线降噪耳机Pro', '主动降噪40dB，续航30小时，蓝牙5.3，299元', '淘宝/天猫'] },
    ],
    buildPrompt: (inputs) => `产品：${inputs[0]}\n卖点：${inputs[1]}\n投放平台：${inputs[2] || '通用'}\n\n请生成电商详情页文案。`
  },

  'ad-copy': {
    title: '广告文案生成器',
    desc: '输入产品+平台，AI生成多套广告素材文案',
    icon: '📢',
    fields: [
      { label: '广告产品', placeholder: '例如：AI英语学习APP', required: true },
      { label: '投放平台', type: 'select', options: ['抖音信息流', '朋友圈广告', '小红书', '百度搜索', '微信广点通', '快手'], required: true },
      { label: '广告目标', type: 'select', options: ['品牌曝光', '应用下载', '表单收集', '直接购买', '加微信/社群'], required: true },
      { label: '产品亮点', type: 'textarea', placeholder: '简述产品核心卖点', minHeight: 60, required: false },
    ],
    examples: [
      { label: 'APP推广', values: ['AI英语学习APP', '抖音信息流', '应用下载', 'AI口语对话，每天15分钟，首月免费'] },
    ],
    buildPrompt: (inputs) => `广告产品：${inputs[0]}\n投放平台：${inputs[1]}\n广告目标：${inputs[2]}\n产品亮点：${inputs[3] || '由你提炼'}\n\n请生成多套广告文案。`
  },

  'contract-review': {
    title: '合同审查助手',
    desc: '粘贴合同，AI识别风险条款+给出修改建议',
    icon: '⚖️',
    fields: [
      { label: '合同类型', type: 'select', options: ['劳动合同', '服务合同', '买卖合同', '租赁合同', '合作协议', '保密协议', '借款合同', '其他'], required: true },
      { label: '你的身份', type: 'select', options: ['甲方（出资/购买方）', '乙方（服务/提供方）', '不确定'], required: true },
      { label: '合同文本', type: 'textarea', placeholder: '粘贴合同核心条款，可以只粘贴你觉得有疑问的部分', minHeight: 160, required: true },
    ],
    examples: [
      { label: '劳动合同', values: ['劳动合同', '乙方（服务/提供方）', '合同期限3年试用期6个月，竞业限制2年补偿金工资30%，违约金10万元'] },
    ],
    buildPrompt: (inputs) => `合同类型：${inputs[0]}\n我的身份：${inputs[1]}\n合同文本：${inputs[2]}\n\n请审查合同风险并给出修改建议。`
  },

  'data-analysis': {
    title: '数据分析助手',
    desc: '描述数据和问题，AI给出分析框架+思路',
    icon: '📊',
    fields: [
      { label: '分析背景', placeholder: '例如：电商网站，日均1万UV', required: true },
      { label: '分析问题', type: 'textarea', placeholder: '例如：最近转化率从3%降到2%，想找出哪个环节出了问题', minHeight: 100, required: true },
    ],
    examples: [
      { label: '转化率下降', values: ['电商网站，日均1万UV', '转化率从3%降到2%，有漏斗数据，想找出问题环节'] },
    ],
    buildPrompt: (inputs) => `分析背景：${inputs[0]}\n分析问题：${inputs[1]}\n\n请给出数据分析框架和建议。`
  },

  'interview-prep': {
    title: '面试准备助手',
    desc: '输入岗位，AI生成20高频问题+参考答案',
    icon: '🎯',
    fields: [
      { label: '目标岗位', placeholder: '例如：字节跳动-产品经理', required: true },
      { label: '你的背景', type: 'textarea', placeholder: '例如：3年产品经验，做过电商和社交产品', minHeight: 80, required: true },
      { label: '面试轮次', type: 'select', options: ['一面（业务面）', '二面（交叉面）', '三面（HR面）', '终面（老板面）', '全部准备'], required: false },
    ],
    examples: [
      { label: '产品经理', values: ['字节跳动-产品经理', '3年产品经验，做过电商和社交产品', '全部准备'] },
    ],
    buildPrompt: (inputs) => `目标岗位：${inputs[0]}\n我的背景：${inputs[1]}\n面试轮次：${inputs[2] || '全部准备'}\n\n请生成面试准备方案。`
  },

  // ===== 补充高需求工具 =====
  'blog-writer': {
    title: '博客文章生成器',
    desc: '输入主题，AI生成深度博客长文',
    icon: '📝',
    fields: [
      { label: '文章主题', placeholder: '例如：2026年AI Agent发展趋势', required: true },
      { label: '文章风格', type: 'select', options: ['技术深度', '商业分析', '个人成长', '生活方式', '行业评论'], required: true },
      { label: '核心观点', type: 'textarea', placeholder: '列出你想表达的核心观点', minHeight: 60, required: false },
    ],
    examples: [
      { label: 'AI趋势', values: ['2026年AI Agent发展趋势', '技术深度', 'Agent将取代传统SaaS，多Agent协作是未来'] },
    ],
    buildPrompt: (inputs) => `文章主题：${inputs[0]}\n风格：${inputs[1]}\n核心观点：${inputs[2] || '由你发挥'}\n\n请生成一篇深度博客文章。`
  },

  'summary-gen': {
    title: '智能摘要生成',
    desc: '粘贴长文，AI生成精炼摘要',
    icon: '📋',
    fields: [
      { label: '原文内容', type: 'textarea', placeholder: '粘贴需要摘要的文本，支持文章、报告、会议记录等', minHeight: 160, required: true },
      { label: '摘要语言', type: 'select', options: ['中文', 'English', '原文语言'], required: false },
    ],
    examples: [
      { label: '新闻摘要', values: ['OpenAI发布了最新模型GPT-5，在推理能力和多模态理解方面大幅提升，数学推理超过人类专家水平。CEO表示GPT-5标志着AI进入新阶段。', '中文'] },
    ],
    buildPrompt: (inputs) => `请为以下文本生成摘要：${inputs[0]} 输出语言：${inputs[1] || '原文语言'} 请生成三个层级的摘要：1.一句话总结 2.核心要点(100字内) 3.详细摘要(300字内)`
  },

  'story-gen': {
    title: 'AI故事创作',
    desc: '输入设定，AI生成完整故事',
    icon: '📖',
    fields: [
      { label: '故事类型', type: 'select', options: ['微小说', '短篇悬疑', '温馨治愈', '科幻', '品牌故事', '寓言童话'], required: true },
      { label: '故事设定', type: 'textarea', placeholder: '例如：主角是AI程序员，背景2030年上海，发现自己写的AI有了意识', minHeight: 80, required: true },
    ],
    examples: [
      { label: '品牌故事', values: ['品牌故事', '一家做AI工具的创业公司，价值观：让AI人人可用，困境：大厂压境如何突围'] },
    ],
    buildPrompt: (inputs) => `故事类型：${inputs[0]}\n故事设定：${inputs[1]}\n\n请创作一个完整的故事。`
  },

  'study-plan': {
    title: '学习计划生成器',
    desc: '输入学习目标，AI生成系统学习计划',
    icon: '📚',
    fields: [
      { label: '学习目标', placeholder: '例如：学会Python编程', required: true },
      { label: '当前水平', type: 'select', options: ['完全零基础', '有一些了解', '有基础经验', '想进阶提升'], required: true },
      { label: '可用时间', type: 'select', options: ['每天30分钟', '每天1小时', '每天2小时', '周末集中学习'], required: true },
      { label: '补充说明', type: 'textarea', placeholder: '例如：预算有限/偏好视频学习...', minHeight: 60, required: false },
    ],
    examples: [
      { label: 'Python入门', values: ['学会Python编程', '完全零基础', '每天1小时', '希望3个月能写简单项目'] },
      { label: 'AI工程师', values: ['成为AI应用工程师', '有一些了解', '每天2小时', '有编程基础，想学AI Agent开发'] },
    ],
    buildPrompt: (inputs) => `学习目标：${inputs[0]}\n当前水平：${inputs[1]}\n可用时间：${inputs[2]}\n补充：${inputs[3] || '无'}\n\n请生成系统化的学习计划。`
  },

  'brainstorm': {
    title: '创意头脑风暴',
    desc: '输入问题，AI发散20+创意想法',
    icon: '💡',
    fields: [
      { label: '要解决的问题/主题', placeholder: '例如：如何让更多年轻人了解传统文化？', required: true },
      { label: '方向限制（可选）', type: 'textarea', placeholder: '例如：预算1万以内，目标人群大学生', minHeight: 60, required: false },
    ],
    examples: [
      { label: '传统文化', values: ['如何让更多年轻人了解传统文化？', '预算1万以内，目标人群大学生'] },
      { label: '产品创新', values: ['如何让AI工具的日活用户翻倍？', ''] },
    ],
    buildPrompt: (inputs) => `问题/主题：${inputs[0]}\n方向限制：${inputs[1] || '无限制，越有创意越好'}\n\n请进行头脑风暴，先发散出至少20个想法，然后分类、评估、推荐TOP5。`
  },

  'translate-polish': {
    title: '翻译+润色助手',
    desc: '粘贴文本，AI翻译或润色优化',
    icon: '🌐',
    fields: [
      { label: '功能选择', type: 'select', options: ['中→英翻译', '英→中翻译', '中文润色', '英文润色'], required: true },
      { label: '文本内容', type: 'textarea', placeholder: '粘贴需要翻译或润色的文本...', minHeight: 120, required: true },
      { label: '使用场景', type: 'select', options: ['学术论文', '商务邮件', '营销文案', '社交媒体', '日常沟通', '文学创作'], required: false },
    ],
    examples: [
      { label: '中译英', values: ['中→英翻译', '我们公司专注于AI工具开发，致力于让每个人都能使用人工智能提升工作效率。', '商务邮件'] },
      { label: '中文润色', values: ['中文润色', '这个东西很好用，用了之后效率提高了不少', '营销文案'] },
    ],
    buildPrompt: (inputs) => `功能：${inputs[0]}\n使用场景：${inputs[2] || '通用'}\n原文：${inputs[1]}\n\n请${inputs[0]}。`
  },

  'name-gen': {
    title: '品牌命名+Slogan',
    desc: '输入产品描述，AI生成品牌名+口号',
    icon: '🏷️',
    fields: [
      { label: '产品/品牌描述', placeholder: '例如：一款AI编程助手工具', required: true },
      { label: '命名风格', type: 'select', options: ['科技感', '温暖亲切', '国潮风', '国际范', '极简风', '趣味搞笑'], required: true },
      { label: '补充要求', type: 'textarea', placeholder: '例如：2-3个字/要好记/域名能注册到...', minHeight: 60, required: false },
    ],
    examples: [
      { label: 'AI工具', values: ['一款AI编程助手', '科技感', '要好记，2-3个字'] },
      { label: '茶饮品牌', values: ['新式茶饮品牌，主打健康低糖', '国潮风', '要有诗意'] },
    ],
    buildPrompt: (inputs) => `产品/品牌：${inputs[0]}\n命名风格：${inputs[1]}\n补充要求：${inputs[2] || '无'}\n\n请生成10个品牌命名方案，每个配一个Slogan。`
  },

  'api-doc': {
    title: 'API文档生成器',
    desc: '描述API功能，AI生成完整接口文档',
    icon: '🔧',
    fields: [
      { label: 'API名称', placeholder: '例如：用户管理API', required: true },
      { label: 'API功能描述', type: 'textarea', placeholder: '描述API功能和参数，例如：POST /users 创建用户(参数: name, email)，GET /users/:id 获取用户', minHeight: 120, required: true },
      { label: '代码示例语言', type: 'select', options: ['Python', 'JavaScript', 'cURL', 'Go', 'Java'], required: false },
    ],
    examples: [
      { label: '用户管理', values: ['用户管理API', 'POST /users 创建用户(name,email)，GET /users/:id 获取用户，PUT /users/:id 更新用户，DELETE /users/:id 删除用户', 'Python'] },
    ],
    buildPrompt: (inputs) => `API名称：${inputs[0]}\n功能描述：${inputs[1]}\n代码示例语言：${inputs[2] || 'Python + cURL'}\n\n请生成完整的API文档。`
  },
  // ===== 基础AI工具（升级为真AI）=====
  'ai-text-detect': {
    title: 'AI文本检测器', desc: '粘贴文本，AI判断是否由AI生成', icon: '🔍',
    fields: [
      { label: '待检测文本', type: 'textarea', placeholder: '粘贴要检测的文本（建议100字以上）...', minHeight: 150, required: true },
    ],
    examples: [{ label: 'AI文风', values: ['随着人工智能技术的快速发展，越来越多的行业开始拥抱数字化转型。'] }],
    buildPrompt: (inputs) => '请分析以下文本是否由AI生成，给出：1）AI生成概率（0-100%）2）判断依据 3）具体可疑点。\n\n文本内容：\n' + inputs[0]
  },
  'ai-translate': {
    title: 'AI翻译对比', desc: '一段文本多语言翻译', icon: '🌐',
    fields: [
      { label: '待翻译文本', type: 'textarea', placeholder: '输入要翻译的文本...', minHeight: 100, required: true },
      { label: '目标语言', type: 'select', options: ['英语', '日语', '韩语', '法语', '德语', '西班牙语', '俄语', '繁体中文'], required: true },
      { label: '翻译风格', type: 'select', options: ['专业正式', '日常口语', '文学优美', '简洁明快'], required: false },
    ],
    examples: [{ label: '商务', values: ['感谢贵司的合作意向，我们将在三个工作日内回复详细方案。', '英语', '专业正式'] }],
    buildPrompt: (inputs) => '请将以下文本翻译为' + inputs[1] + '，风格：' + (inputs[2] || '专业正式') + '。\n\n提供：1）翻译结果 2）关键词汇注释 3）翻译要点\n\n原文：\n' + inputs[0]
  },
  'ai-resume': {
    title: 'AI简历优化器', desc: '粘贴简历，AI给出修改建议和改写版本', icon: '💼',
    fields: [
      { label: '简历内容', type: 'textarea', placeholder: '粘贴你的简历内容...', minHeight: 200, required: true },
      { label: '目标岗位', placeholder: '例如：前端开发工程师', required: true },
      { label: '优化重点', type: 'select', options: ['全面优化', '量化成果', '突出技术栈', '优化排版表述', '匹配JD关键词'], required: false },
    ],
    examples: [{ label: '开发', values: ['张三，3年前端开发经验，负责公司官网维护，使用React和Vue。', '前端开发工程师', '量化成果'] }],
    buildPrompt: (inputs) => '目标岗位：' + inputs[1] + '\n优化重点：' + (inputs[2] || '全面优化') + '\n\n请给出：1）5条优化建议 2）改写后的关键段落 3）加分项建议\n\n简历：\n' + inputs[0]
  },
  'ai-code-review': {
    title: 'AI代码审查', desc: '粘贴代码，AI找出Bug和安全漏洞', icon: '💻',
    fields: [
      { label: '编程语言', type: 'select', options: ['JavaScript', 'Python', 'Java', 'Go', 'TypeScript', 'Rust', 'C++', 'PHP'], required: true },
      { label: '代码内容', type: 'textarea', placeholder: '粘贴你的代码...', minHeight: 200, required: true },
      { label: '审查重点', type: 'select', options: ['全面审查', '安全漏洞', '性能优化', '代码风格', '最佳实践'], required: false },
    ],
    examples: [{ label: 'SQL注入', values: ['JavaScript', 'function getUser(id) {\n  const user = db.query("SELECT * FROM users WHERE id=" + id);\n  return user.name;\n}', '安全漏洞'] }],
    buildPrompt: (inputs) => '编程语言：' + inputs[0] + '\n审查重点：' + (inputs[2] || '全面审查') + '\n\n请审查代码，给出：1）Bug和安全问题 2）优化建议 3）改写后代码\n\n代码：\n' + inputs[1]
  },
  'seo-title-gen': {
    title: 'SEO标题生成器', desc: '批量生成高点击率SEO标题', icon: '📈',
    fields: [
      { label: '文章主题', placeholder: '例如：AI写作工具', required: true },
      { label: '关键词', placeholder: '例如：免费、2026、对比', required: true },
      { label: '标题数量', type: 'select', options: ['5个', '10个', '15个', '20个'], required: false },
    ],
    examples: [{ label: 'AI工具', values: ['AI写作工具', '免费、2026最新、对比', '10个'] }],
    buildPrompt: (inputs) => '主题：' + inputs[0] + '\n关键词：' + inputs[1] + '\n数量：' + (inputs[2] || '10个') + '\n\n请生成SEO友好标题，包含关键词、30字内、多种句式。'
  },
  'ai-copywriter': {
    title: 'AI文案生成器', desc: '输入产品信息，AI生成多平台营销文案', icon: '✍️',
    fields: [
      { label: '产品/服务名称', placeholder: '例如：AI工具箱', required: true },
      { label: '产品描述/卖点', type: 'textarea', placeholder: '描述产品功能和卖点...', minHeight: 80, required: true },
      { label: '文案平台', type: 'select', options: ['通用', '小红书', '抖音', '微信朋友圈', '淘宝详情页', '公众号推文', '广告投放'], required: true },
      { label: '语气风格', type: 'select', options: ['专业', '活泼', '温暖', '高级感', '接地气'], required: false },
    ],
    examples: [{ label: '小红书', values: ['AI工具箱', '60款在线工具，28款AI驱动，免费可用', '小红书', '活泼'] }],
    buildPrompt: (inputs) => '产品：' + inputs[0] + '\n卖点：' + inputs[1] + '\n平台：' + inputs[2] + '\n风格：' + (inputs[3] || '专业') + '\n\n请生成3套' + inputs[2] + '文案，每套含标题和正文。'
  }
};

module.exports = { TOOL_CONFIGS };