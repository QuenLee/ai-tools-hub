// 使用次数管理 + 用户状态
const FREE_LIMITS = {
  // 📱 自媒体AI工具
  'xhs-writer': { daily: 1 },
  'douyin-script': { daily: 1 },
  'live-script': { daily: 1 },
  'comment-reply': { daily: 5 },
  'wechat-article': { daily: 1 },
  'bili-script': { daily: 1 },
  'private-domain': { daily: 2 },
  // 💼 职场办公
  'weekly-report': { daily: 3 },
  'meeting-notes': { daily: 3 },
  'email-writer': { daily: 5 },
  'ppt-outline': { daily: 2 },
  'speech-writer': { daily: 1 },
  'excel-formula': { daily: 5 },
  'competitor-analysis': { daily: 1 },
  // 🔧 专业工具
  'seo-article': { daily: 1 },
  'product-desc': { daily: 2 },
  'ad-copy': { daily: 2 },
  'contract-review': { daily: 1 },
  'data-analysis': { daily: 2 },
  'interview-prep': { daily: 1 },
  // 📄 基础工具
  'ai-text-detect': { daily: 3 },
  'ai-watermark': { daily: 1 },
  'short-url': { daily: 5 },
  'ai-translate': { daily: 3 },
  'ai-resume': { total: 1 },
  'prompt-templates': { basic: true },
  'ai-code-review': { daily: 3 },
  'seo-title-gen': { daily: 3 },
  'pdf-convert': { daily: 3 },
  'ai-copywriter': { daily: 3 },
  'image-convert': { daily: 5 },
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
