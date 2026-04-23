// 使用次数管理 — 纯免费限次模式，无登录/付费

const FREE_LIMITS = {
  // 📱 自媒体AI工具
  'xhs-writer': { daily: 3 },
  'douyin-script': { daily: 3 },
  'live-script': { daily: 3 },
  'comment-reply': { daily: 5 },
  'wechat-article': { daily: 3 },
  'bili-script': { daily: 3 },
  'private-domain': { daily: 3 },
  // 💼 职场办公
  'weekly-report': { daily: 3 },
  'meeting-notes': { daily: 3 },
  'email-writer': { daily: 5 },
  'ppt-outline': { daily: 3 },
  'speech-writer': { daily: 3 },
  'excel-formula': { daily: 5 },
  'competitor-analysis': { daily: 3 },
  // 🔧 专业工具
  'seo-article': { daily: 3 },
  'product-desc': { daily: 3 },
  'ad-copy': { daily: 3 },
  'contract-review': { daily: 3 },
  'data-analysis': { daily: 3 },
  'interview-prep': { daily: 3 },
  // 🌟 补充工具
  'blog-writer': { daily: 3 },
  'summary-gen': { daily: 5 },
  'story-gen': { daily: 3 },
  'study-plan': { daily: 3 },
  'brainstorm': { daily: 5 },
  'translate-polish': { daily: 5 },
  'name-gen': { daily: 3 },
  'api-doc': { daily: 3 },
  // 💻 开发者工具（全部免费无限）
  'json-formatter': { unlimited: true },
  'json-to-yaml': { unlimited: true },
  'base64-tool': { unlimited: true },
  'url-encode': { unlimited: true },
  'hash-gen': { unlimited: true },
  'regex-tester': { unlimited: true },
  'timestamp-tool': { unlimited: true },
  'uuid-gen': { unlimited: true },
  'color-tool': { unlimited: true },
  'text-diff': { unlimited: true },
  'jwt-parser': { unlimited: true },
  'qr-code': { unlimited: true },
  // 🎁 免费粘性工具（全部免费无限）
  'word-count': { unlimited: true },
  'text-replace': { unlimited: true },
  'lorem-ipsum': { unlimited: true },
  'slug-gen': { unlimited: true },
  'markdown-preview': { unlimited: true },
  'emoji-picker': { unlimited: true },
  'password-gen': { unlimited: true },
  'html-entity': { unlimited: true },
  // 📄 基础工具
  'ai-text-detect': { daily: 5 },
  'ai-watermark': { daily: 5 },
  'short-url': { daily: 10 },
  'ai-translate': { daily: 5 },
  'ai-resume': { daily: 3 },
  'prompt-templates': { unlimited: true },
  'ai-code-review': { daily: 5 },
  'seo-title-gen': { daily: 5 },
  'pdf-convert': { daily: 10 },
  'ai-copywriter': { daily: 5 },
  'image-convert': { daily: 10 },
  'markdown-editor': { unlimited: true },
};

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getUsageData() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('quen_usage') || '{}'); } catch { return {}; }
}

function saveUsageData(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('quen_usage', JSON.stringify(data));
}

// Clean up old usage data (>7 days) to prevent localStorage bloat
export function cleanupOldUsage() {
  const data = getUsageData();
  const today = getTodayKey();
  let changed = false;
  for (const toolId of Object.keys(data)) {
    for (const key of Object.keys(data[toolId])) {
      if (key !== 'total' && key < today.slice(0, 8) + '01' && key !== today) {
        delete data[toolId][key];
        changed = true;
      }
    }
  }
  if (changed) saveUsageData(data);
}

export function canUseTool(toolId) {
  const limit = FREE_LIMITS[toolId];
  if (!limit) return { allowed: true, remaining: Infinity };
  if (limit.unlimited) return { allowed: true, remaining: Infinity };

  const data = getUsageData();
  const today = getTodayKey();
  const toolData = data[toolId] || {};
  const usedToday = toolData[today] || 0;
  return { allowed: usedToday < limit.daily, remaining: Math.max(0, limit.daily - usedToday) };
}

export function recordUsage(toolId) {
  const data = getUsageData();
  const today = getTodayKey();
  if (!data[toolId]) data[toolId] = {};
  data[toolId][today] = (data[toolId][today] || 0) + 1;
  saveUsageData(data);
}

export function getFreeLimitDisplay(toolId) {
  const limit = FREE_LIMITS[toolId] || {};
  if (limit.unlimited) return '免费无限';
  if (limit.daily !== undefined) return `免费${limit.daily}次/天`;
  return '免费';
}

export { FREE_LIMITS };
