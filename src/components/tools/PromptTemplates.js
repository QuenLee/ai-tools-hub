'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

const PROMPTS = [
  { cat: '写作', items: [
    { title: '高质量文章', prompt: '请以专业、深入的风格撰写一篇关于{主题}的文章，要求：1. 结构清晰，包含引言、正文、结论 2. 论点有数据支撑 3. 语言精炼，避免空洞表述' },
    { title: '小红书种草文', prompt: '写一篇小红书种草笔记，主题是{产品}，要求：1. 标题带emoji+悬念 2. 正文3-5个要点 3. 口语化+真实感 4. 末尾加话题标签' },
    { title: '公众号推文', prompt: '撰写一篇微信公众号推文，主题是{主题}，要求：1. 标题有吸引力 2. 开头用故事/数据引入 3. 分3-4个段落阐述 4. 末尾有互动引导' },
  ]},
  { cat: '编程', items: [
    { title: '代码生成', prompt: '请用{语言}编写一个{功能描述}，要求：1. 代码整洁有注释 2. 包含错误处理 3. 遵循最佳实践 4. 提供使用示例' },
    { title: '代码审查', prompt: '请审查以下代码，从以下维度给出改进建议：1. 潜在bug 2. 性能优化 3. 代码风格 4. 安全性问题\n\n代码：\n{粘贴代码}' },
    { title: 'SQL查询', prompt: '请编写SQL查询：{需求描述}\n\n表结构：{表结构信息}\n\n要求：1. 查询高效 2. 添加适当索引建议 3. 考虑边界情况' },
  ]},
  { cat: '营销', items: [
    { title: '产品文案', prompt: '为{产品名}写一段产品文案，目标用户是{用户画像}，要求：1. 突出核心卖点 2. 用场景化描述 3. 有行动号召 4. 控制在200字内' },
    { title: 'SEO文章大纲', prompt: '为关键词"{关键词}"生成SEO文章大纲，要求：1. H1主标题含关键词 2. 3-5个H2子标题 3. 每个子标题下2-3个要点 4. 考虑搜索意图' },
    { title: '竞品分析', prompt: '请分析{产品A}和{产品B}的竞争关系，从以下维度：1. 目标用户差异 2. 核心功能对比 3. 定价策略 4. 各自优劣势 5. 市场机会' },
  ]},
  { cat: '学习', items: [
    { title: '知识解释', prompt: '请用通俗易懂的语言解释{概念}，要求：1. 先给一句话概括 2. 用生活类比 3. 举具体例子 4. 说明常见误区' },
    { title: '学习路线', prompt: '请为{技能/领域}制定一份从零到就业的学习路线，要求：1. 分阶段（入门/进阶/实战） 2. 每阶段推荐资源 3. 预估学习时间 4. 关键里程碑' },
    { title: '面试准备', prompt: '请为{岗位}面试准备20个高频问题及参考答案，涵盖：1. 技术基础 2. 项目经验 3. 系统设计 4. 行为面试' },
  ]},
  { cat: '效率', items: [
    { title: '周报生成', prompt: '根据以下工作内容，生成一份专业周报：\n{本周工作列表}\n\n要求：1. 分类整理（完成/进行中/下周计划） 2. 突出成果 3. 标注风险 4. 简洁精炼' },
    { title: '会议纪要', prompt: '将以下会议记录整理为正式会议纪要：\n{会议内容}\n\n要求：1. 会议信息（时间/参会人/主题） 2. 决议事项 3. 待办事项（责任人+截止日期） 4. 下次会议安排' },
    { title: '邮件撰写', prompt: '请写一封{类型}邮件：\n主题：{邮件主题}\n收件人：{收件人身份}\n要点：{要传达的内容}\n\n要求：1. 语气恰当 2. 结构清晰 3. 有明确行动号召' },
  ]},
];

export function PromptTemplates({ onBack, locale }) {
  const [activeCat, setActiveCat] = useState(PROMPTS[0].cat);
  const guard = useToolGuard('prompt-templates');
  const currentItems = PROMPTS.find(p => p.cat === activeCat)?.items || [];
  return (
    <ToolWrapper title="Prompt模板库" desc="按场景分类的AI提示词模板，一键复制" icon="💡" onBack={onBack} remaining={guard.paid ? Infinity : 0}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {PROMPTS.map(p => <button key={p.cat} onClick={() => setActiveCat(p.cat)} style={{ padding: '5px 14px', borderRadius: 'var(--radius-2xs)', border: activeCat === p.cat ? '1px solid var(--accent)' : '1px solid var(--border)', background: activeCat === p.cat ? 'rgba(99,102,241,0.08)' : 'transparent', color: activeCat === p.cat ? 'var(--accent)' : 'var(--text2)', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem' }}>{p.cat}</button>)}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {currentItems.map((item, i) => (
          <div key={i} style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{item.title}</span>
              <button onClick={() => navigator.clipboard.writeText(item.prompt)} style={{ padding: '3px 10px', borderRadius: 'var(--radius-2xs)', border: '1px solid var(--border)', background: 'transparent', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--text2)' }}>复制</button>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.6, whiteSpace: 'pre-wrap', maxHeight: 80, overflow: 'hidden' }}>{item.prompt}</div>
          </div>
        ))}
      </div>
      {!guard.paid && <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.82rem', color: 'var(--text2)' }}>💡 会员可解锁高级模板+自定义模板功能</div>}
    </ToolWrapper>
  );
}
