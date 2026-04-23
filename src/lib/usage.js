// 使用次数管理 + 用户状态
const FREE_LIMITS = {
  // 📱 自媒体AI工具
  'xhs-writer': { daily: 3 },
  'douyin-script': { daily: 3 },
  'live-script': { daily: 2 },
  'comment-reply': { daily: 5 },
  'wechat-article': { daily: 3 },
  'bili-script': { daily: 3 },
  'private-domain': { daily: 3 },
  // 💼 职场办公
  'weekly-report': { daily: 3 },
  'meeting-notes': { daily: 3 },
  'email-writer': { daily: 5 },
  'ppt-outline': { daily: 3 },
  'speech-writer': { daily: 2 },
  'excel-formula': { daily: 5 },
  'competitor-analysis': { daily: 2 },
  // 🔧 专业工具
  'seo-article': { daily: 2 },
  'product-desc': { daily: 3 },
  'ad-copy': { daily: 3 },
  'contract-review': { daily: 2 },
  'data-analysis': { daily: 3 },
  'interview-prep': { daily: 2 },
  // 🌟 补充工具
  'blog-writer': { daily: 2 },
  'summary-gen': { daily: 5 },
  'story-gen': { daily: 2 },
  'study-plan': { daily: 2 },
  'brainstorm': { daily: 3 },
  'translate-polish': { daily: 5 },
  'name-gen': { daily: 2 },
  'api-doc': { daily: 2 },
  // 📄 基础工具
  'ai-text-detect': { daily: 5 },
  'ai-watermark': { daily: 3 },
  'short-url': { daily: 5 },
  'ai-translate': { daily: 5 },
  'ai-resume': { total: 3 },
  'prompt-templates': { basic: true },
  'ai-code-review': { daily: 5 },
  'seo-title-gen': { daily: 5 },
  'pdf-convert': { daily: 5 },
  'ai-copywriter': { daily: 5 },
  'image-convert': { daily: 8 },
  'markdown-editor': { unlimited: true },
};

const PAID_PRICES = { monthly: 9.9, pro_monthly: 19.9 };

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function getUsageData() { if (typeof window === 'undefined') return {}; try { return JSON.parse(localStorage.getItem('quen_usage') || '{}'); } catch { return {}; } }
function saveUsageData(data) { if (typeof window === 'undefined') return; localStorage.setItem('quen_usage', JSON.stringify(data)); }
export function getUser() { if (typeof window === 'undefined') return null; try { return JSON.parse(localStorage.getItem('quen_user') || 'null'); } catch { return null; } }
export function saveUser(user) { if (typeof window === 'undefined') return; localStorage.setItem('quen_user', JSON.stringify(user)); }
export function logout() { if (typeof window === 'undefined') return; localStorage.removeItem('quen_user'); }
export function isPaidUser() { const user = getUser(); if (!user || !user.paidUntil) return false; return new Date(user.paidUntil) > new Date(); }
export function getUsageCount(toolId) { const data = getUsageData(); const today = getTodayKey(); const toolData = data[toolId] || {}; if (toolData.total !== undefined) return toolData.total; return toolData[today] || 0; }
export function canUseTool(toolId) {
  if (isPaidUser()) return { allowed: true, remaining: Infinity };
  const limit = FREE_LIMITS[toolId];
  if (!limit) return { allowed: true, remaining: Infinity };
  if (limit.unlimited) return { allowed: true, remaining: Infinity };
  const data = getUsageData();
  const today = getTodayKey();
  const toolData = data[toolId] || {};
  if (limit.total !== undefined) { const used = toolData.total || 0; return { allowed: used < limit.total, remaining: Math.max(0, limit.total - used) }; }
  const usedToday = toolData[today] || 0;
  return { allowed: usedToday < limit.daily, remaining: Math.max(0, limit.daily - usedToday) };
}
export function recordUsage(toolId) {
  const data = getUsageData();
  const today = getTodayKey();
  const limit = FREE_LIMITS[toolId];
  if (!data[toolId]) data[toolId] = {};
  if (limit && limit.total !== undefined) { data[toolId].total = (data[toolId].total || 0) + 1; }
  else { data[toolId][today] = (data[toolId][today] || 0) + 1; }
  saveUsageData(data);
}
export function getToolLimit(toolId) { return FREE_LIMITS[toolId] || {}; }
export function getFreeLimitDisplay(toolId) {
  const limit = FREE_LIMITS[toolId] || {};
  if (limit.unlimited) return '免费无限';
  if (limit.total !== undefined) return `免费${limit.total}次`;
  if (limit.daily !== undefined) return `免费${limit.daily}次/天`;
  if (limit.basic) return '基础模板免费';
  return '免费试用';
}
export { FREE_LIMITS, PAID_PRICES };
