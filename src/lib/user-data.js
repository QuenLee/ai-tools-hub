// 用户数据 — 收藏、最近使用（纯localStorage，后续可接账户同步）
// 独立模块，所有用户个人数据统一管理

const FAV_KEY = 'quen_ai_favorites';
const RECENT_KEY = 'quen_ai_recent';
const MAX_RECENT = 10;

/* ═══ 收藏 ═══ */

export function getFavorites() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isFavorited(toolId) {
  return getFavorites().includes(toolId);
}

export function toggleFavorite(toolId) {
  const favs = getFavorites();
  const idx = favs.indexOf(toolId);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(toolId);
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  return idx < 0; // 返回新状态：true=已收藏
}

/* ═══ 最近使用 ═══ */

export function getRecent() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addRecent(toolId) {
  if (typeof window === 'undefined') return;
  let list = getRecent();
  // 去重并移到最前
  list = list.filter(id => id !== toolId);
  list.unshift(toolId);
  // 限制数量
  if (list.length > MAX_RECENT) list = list.slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}
