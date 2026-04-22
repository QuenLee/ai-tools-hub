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

  // ===== 职场办公 =====
  'weekly-report': {
    title: '周报/日报生成器',
    desc: '输入工作内容，AI生成专业周报/日报',
    icon: '📋',
    fields: [
      { label: '报告类型', type: 'select', options: ['周报', '日报'], required: true },
      { label: '工作内容', type: 'textarea', placeholder: '零散列举即可，例如：\n- 完成了首页改版设计\n- 修复了3个bug\n- 和产品开了需求评审会\n- 写了技术方案文档', minHeight: 100, required: true },
      { label: '额外补充', type: 'textarea', placeholder: '例如：遇到什么困难/下周重点/需要协调的资源...', minHeight: 60, required: false },
    ],
    placeholders: ['选择报告类型', '列举工作内容', '额外补充'],
    examples: [
      { label: '程序员周报', values: ['周报', '完成了首页改版\n修复了3个线上bug\n和产品对齐了V2.0需求\n写了技术方案文档', '下周重点是支付模块开发'] },
      { label: '运营日报', values: ['日报', '发了2篇小红书笔记\n回复了30条评论\n社群新增15人', ''] },
    ],
    buildPrompt: (inputs) => `报告类型：${inputs[0]}\n工作内容：\n${inputs[1]}\n额外补充：${inputs[2] || '无'}\n\n请生成格式规范的专业${inputs[0]}。`,
  },

  'meeting-notes': {
    title: '会议纪要生成器',
    desc: '输入会议内容，AI生成结构化纪要+待办清单',
    icon: '📝',
    fields: [
      { label: '会议主题', placeholder: '例如：Q2产品路线图评审', required: true },
      { label: '会议内容', type: 'textarea', placeholder: '尽量详细，口语化也行，例如：\n张总说Q2重点做AI功能\n李经理觉得时间不够，建议砍掉社区模块\n最后决定AI功能优先，社区延后到Q3\n王工负责技术方案，下周三前出', minHeight: 140, required: true },
    ],
    placeholders: ['会议主题', '粘贴会议内容/笔记'],
    examples: [
      { label: '产品评审', values: ['Q2产品路线图评审', '张总说Q2重点做AI功能\n李经理觉得时间不够，建议砍掉社区模块\n最后决定AI功能优先，社区延后到Q3\n王工负责技术方案，下周三前出'] },
    ],
    buildPrompt: (inputs) => `会议主题：${inputs[0]}\n会议内容：\n${inputs[1]}\n\n请生成结构化的会议纪要。`,
  },

  'email-writer': {
    title: '邮件撰写助手',
    desc: '输入场景+要点，AI生成专业邮件',
    icon: '📧',
    fields: [
      { label: '邮件场景', type: 'select', options: ['工作汇报', '请示审批', '催办跟进', '委婉拒绝', '邀请合作', '感谢信', '道歉信', '商务谈判'], required: true },
      { label: '收件人', placeholder: '例如：直属领导/客户/合作方/HR', required: true },
      { label: '邮件要点', type: 'textarea', placeholder: '例如：\n- 申请下周三请假1天\n- 原因：家中有事\n- 工作已安排同事代管', minHeight: 80, required: true },
    ],
    placeholders: ['选择场景', '收件人身份', '邮件核心要点'],
    examples: [
      { label: '请假', values: ['请示审批', '直属领导', '申请下周五请假1天\n原因：家中有事\n工作已安排小明代管'] },
      { label: '催办', values: ['催办跟进', '合作方项目经理', '上次说的API对接方案\n已经过去一周了\n能否这周五前给回复'] },
    ],
    buildPrompt: (inputs) => `邮件场景：${inputs[0]}\n收件人：${inputs[1]}\n邮件要点：\n${inputs[2]}\n\n请生成完整的商务邮件。`,
  },

  'ppt-outline': {
    title: 'PPT大纲生成器',
    desc: '输入主题，AI生成PPT结构+每页要点+视觉建议',
    icon: '📊',
    fields: [
      { label: 'PPT主题', placeholder: '例如：2026年Q1营销策略', required: true },
      { label: 'PPT用途', type: 'select', options: ['工作汇报', '项目提案', '产品发布', '培训教学', '年度总结', '融资路演'], required: true },
      { label: '核心内容', type: 'textarea', placeholder: '简要列出要覆盖的要点\n例如：\n1. 去年回顾\n2. 市场分析\n3. Q1策略\n4. 预算分配', minHeight: 80, required: false },
    ],
    placeholders: ['PPT主题', '选择用途', '核心内容要点'],
    examples: [
      { label: '季度汇报', values: ['2026年Q1营销策略', '工作汇报', '去年回顾\n市场分析\nQ1策略\n预算分配\nKPI目标'] },
    ],
    buildPrompt: (inputs) => `PPT主题：${inputs[0]}\n用途：${inputs[1]}\n核心内容：${inputs[2] || '由你规划'}\n\n请生成完整的PPT大纲。`,
  },

  'speech-writer': {
    title: '演讲稿生成器',
    desc: '输入场景，AI生成完整演讲稿',
    icon: '🎙',
    fields: [
      { label: '演讲场景', type: 'select', options: ['公司年会', '行业论坛', '产品路演', '述职报告', '毕业典礼', '婚礼致辞', '其他'], required: true },
      { label: '演讲时长', type: 'select', options: ['3分钟', '5分钟', '10分钟', '15分钟', '30分钟'], required: true },
      { label: '核心观点/故事', type: 'textarea', placeholder: '例如：\n- 我从0到1做AI产品的经历\n- 3个关键转折点\n- 最重要的经验：坚持长期主义', minHeight: 80, required: true },
    ],
    placeholders: ['选择场景', '选择时长', '核心观点/故事素材'],
    examples: [
      { label: '年会发言', values: ['公司年会', '5分钟', '回顾团队一年成长\n3个项目里程碑\n感谢团队每个人的付出\n明年展望'] },
    ],
    buildPrompt: (inputs) => `演讲场景：${inputs[0]}\n时长：${inputs[1]}\n核心观点：\n${inputs[2]}\n\n请生成完整的演讲稿。`,
  },

  'excel-formula': {
    title: 'Excel公式生成器',
    desc: '描述需求，AI生成Excel公式+解释',
    icon: '📈',
    fields: [
      { label: '需求描述', type: 'textarea', placeholder: '例如：\nA列是产品名，B列是销量，C列是单价\n我想算出销量前3的产品的总销售额\n数据从第2行开始', minHeight: 100, required: true },
    ],
    placeholders: ['描述你的Excel需求'],
    examples: [
      { label: '条件求和', values: ['A列是部门，B列是工资\n想求"技术部"的工资总和'] },
      { label: '查找匹配', values: ['Sheet1的A列是学号，B列是姓名\nSheet2的A列也是学号\n我想在Sheet2的B列自动填入姓名'] },
    ],
    buildPrompt: (inputs) => `我的Excel需求：\n${inputs[0]}\n\n请给我推荐的公式方案。`,
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
    placeholders: ['你的产品', '竞品名称', '分析重点'],
    examples: [
      { label: '笔记软件', values: ['Notion', 'Evernote, Obsidian, Roam Research', '全面分析'] },
      { label: 'AI编程', values: ['Cursor', 'GitHub Copilot, Windsurf, Codeium', '功能对比'] },
    ],
    buildPrompt: (inputs) => `我的产品：${inputs[0]}\n竞品：${inputs[1]}\n分析重点：${inputs[2] || '全面分析'}\n\n请生成竞品分析报告。`,
  },

  // ===== 专业工具 =====
  'seo-article': {
    title: 'SEO文章生成器',
    desc: '输入关键词，AI生成完整SEO优化文章',
    icon: '🔍',
    fields: [
      { label: '目标关键词', placeholder: '例如：AI写作工具推荐', required: true },
      { label: '文章方向', type: 'textarea', placeholder: '例如：\n- 面向国内用户\n- 重点推荐免费/低价工具\n- 对比各工具优劣', minHeight: 80, required: true },
      { label: '文章字数', type: 'select', options: ['1500字', '2000字', '3000字', '5000字'], required: false },
    ],
    placeholders: ['目标关键词', '文章方向/要求', '选择字数'],
    examples: [
      { label: 'AI工具', values: ['AI写作工具推荐', '面向国内用户，推荐免费和低价工具\n重点对比功能差异', '3000字'] },
    ],
    buildPrompt: (inputs) => `目标关键词：${inputs[0]}\n文章方向：${inputs[1]}\n目标字数：${inputs[2] || '2000字'}\n\n请生成完整的SEO优化文章。`,
  },

  'product-desc': {
    title: '产品详情页文案',
    desc: '输入产品信息，AI生成电商详情页文案',
    icon: '🛒',
    fields: [
      { label: '产品名称', placeholder: '例如：无线降噪耳机Pro', required: true },
      { label: '产品卖点', type: 'textarea', placeholder: '例如：\n- 主动降噪40dB\n- 续航30小时\n- 蓝牙5.3\n- 299元（竞品599+）', minHeight: 80, required: true },
      { label: '投放平台', type: 'select', options: ['淘宝/天猫', '京东', '拼多多', '抖音商城', '小红书'], required: false },
    ],
    placeholders: ['产品名称', '产品卖点/特色', '投放平台'],
    examples: [
      { label: '耳机', values: ['无线降噪耳机Pro', '主动降噪40dB\n续航30小时\n蓝牙5.3\n299元', '淘宝/天猫'] },
    ],
    buildPrompt: (inputs) => `产品：${inputs[0]}\n卖点：\n${inputs[1]}\n投放平台：${inputs[2] || '通用'}\n\n请生成电商详情页文案。`,
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
    placeholders: ['广告产品', '投放平台', '广告目标', '产品亮点'],
    examples: [
      { label: 'APP推广', values: ['AI英语学习APP', '抖音信息流', '应用下载', 'AI口语对话练习\n每天15分钟\n首月免费'] },
    ],
    buildPrompt: (inputs) => `广告产品：${inputs[0]}\n投放平台：${inputs[1]}\n广告目标：${inputs[2]}\n产品亮点：${inputs[3] || '由你提炼'}\n\n请生成多套广告文案。`,
  },

  'contract-review': {
    title: '合同审查助手',
    desc: '粘贴合同，AI识别风险条款+给出修改建议',
    icon: '⚖️',
    fields: [
      { label: '合同类型', type: 'select', options: ['劳动合同', '服务合同', '买卖合同', '租赁合同', '合作协议', '保密协议', '借款合同', '其他'], required: true },
      { label: '你的身份', type: 'select', options: ['甲方（出资/购买方）', '乙方（服务/提供方）', '不确定'], required: true },
      { label: '合同文本', type: 'textarea', placeholder: '粘贴合同核心条款\n可以只粘贴你觉得有疑问的部分\n也可以粘贴全文', minHeight: 160, required: true },
    ],
    placeholders: ['选择合同类型', '你的身份', '粘贴合同文本'],
    examples: [
      { label: '劳动合同', values: ['劳动合同', '乙方（服务/提供方）', '合同期限3年，试用期6个月\n竞业限制2年，补偿金为工资30%\n违约金10万元'] },
    ],
    buildPrompt: (inputs) => `合同类型：${inputs[0]}\n我的身份：${inputs[1]}\n合同文本：\n${inputs[2]}\n\n请审查合同风险并给出修改建议。`,
  },

  'data-analysis': {
    title: '数据分析助手',
    desc: '描述数据和问题，AI给出分析框架+思路',
    icon: '📊',
    fields: [
      { label: '分析背景', placeholder: '例如：电商网站，日均1万UV', required: true },
      { label: '分析问题', type: 'textarea', placeholder: '例如：\n最近转化率从3%降到2%\n想找出是哪个环节出了问题\n有漏斗数据、用户分群数据', minHeight: 100, required: true },
    ],
    placeholders: ['业务背景', '分析问题和可用数据'],
    examples: [
      { label: '转化率下降', values: ['电商网站，日均1万UV', '最近转化率从3%降到2%\n有漏斗数据：首页→搜索→详情→加购→下单\n想知道是哪个环节掉的最厉害'] },
    ],
    buildPrompt: (inputs) => `分析背景：${inputs[0]}\n分析问题：\n${inputs[1]}\n\n请给出数据分析框架和建议。`,
  },

  'interview-prep': {
    title: '面试准备助手',
    desc: '输入岗位，AI生成20高频问题+参考答案',
    icon: '🎯',
    fields: [
      { label: '目标岗位', placeholder: '例如：字节跳动-产品经理', required: true },
      { label: '你的背景', type: 'textarea', placeholder: '例如：\n- 3年产品经验\n- 做过电商和社交产品\n- 有0到1项目经验\n- 本科计算机专业', minHeight: 80, required: true },
      { label: '面试轮次', type: 'select', options: ['一面（业务面）', '二面（交叉面）', '三面（HR面）', '终面（老板面）', '全部准备'], required: false },
    ],
    placeholders: ['目标岗位', '你的背景经历', '面试轮次'],
    examples: [
      { label: '产品经理', values: ['字节跳动-产品经理', '3年产品经验\n做过电商和社交产品\n有0到1项目经验', '全部准备'] },
      { label: '前端开发', values: ['腾讯-前端开发工程师', '2年前端经验\nReact+Vue\n做过SaaS产品', '一面（业务面）'] },
    ],
    buildPrompt: (inputs) => `目标岗位：${inputs[0]}\n我的背景：\n${inputs[1]}\n面试轮次：${inputs[2] || '全部准备'}\n\n请生成面试准备方案。`,
  },
};

module.exports = { TOOL_CONFIGS };
