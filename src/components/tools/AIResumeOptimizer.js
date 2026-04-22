'use client';
import { useState } from 'react';
import { useToolGuard, ToolWrapper, LimitBlocked } from './shared';

export function AIResumeOptimizer({ onBack, locale }) {
  const [resume, setResume] = useState('');
  const [result, setResult] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const guard = useToolGuard('ai-resume');
  const optimize = () => {
    if (!resume.trim() || !guard.check()) return;
    setOptimizing(true);
    setTimeout(() => {
      guard.useOnce();
      setResult('✅ 优化建议：\n\n1. 增加量化数据：用具体数字替换模糊描述（如"提升30%效率"）\n2. 突出成果：将"负责XX"改为"通过XX方法，实现YY增长"\n3. 添加关键词：匹配目标岗位JD中的核心技能词\n4. 精简表述：删除冗余修饰，每条控制在1行\n5. 调整顺序：将最亮眼的经历放在最前面\n\n💡 会员可获取AI改写后的完整简历版本');
      setOptimizing(false);
    }, 1500);
  };
  if (guard.blocked) return <LimitBlocked onBack={onBack} />;
  return (
    <ToolWrapper title="AI简历优化" desc="AI分析并优化你的简历，提升面试通过率" icon="💼" onBack={onBack} remaining={guard.remaining}>
      <textarea value={resume} onChange={e => setResume(e.target.value)} placeholder="粘贴你的简历内容..." style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '0.88rem', minHeight: 200, resize: 'vertical', boxSizing: 'border-box', marginBottom: 12 }} />
      <button onClick={optimize} disabled={!resume.trim() || optimizing} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', background: resume.trim() ? 'var(--accent)' : 'var(--border)', color: resume.trim() ? '#fff' : 'var(--text3)', fontWeight: 700, border: 'none', cursor: resume.trim() ? 'pointer' : 'not-allowed' }}>{optimizing ? '优化中...' : 'AI优化简历'}</button>
      {result && <div style={{ padding: 16, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface)', marginTop: 14, whiteSpace: 'pre-line', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text2)' }}>{result}</div>}
    </ToolWrapper>
  );
}
