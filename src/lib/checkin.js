// 签到系统 — 纯localStorage，增加回访率
const CHECKIN_KEY = 'quen_checkin';
const BONUS_KEY = 'quen_checkin_bonus';

export function getCheckinData() {
  if (typeof window === 'undefined') return { dates: [], streak: 0, lastCheckin: null };
  try {
    return JSON.parse(localStorage.getItem(CHECKIN_KEY) || '{"dates":[],"streak":0,"lastCheckin":null}');
  } catch {
    return { dates: [], streak: 0, lastCheckin: null };
  }
}

function saveCheckinData(data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CHECKIN_KEY, JSON.stringify(data));
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function canCheckinToday() {
  const data = getCheckinData();
  return data.lastCheckin !== getTodayStr();
}

export function doCheckin() {
  const data = getCheckinData();
  const today = getTodayStr();
  const yesterday = getYesterdayStr();

  if (data.lastCheckin === today) {
    return { success: false, message: '今天已签到', streak: data.streak };
  }

  // Calculate streak
  let newStreak = 1;
  if (data.lastCheckin === yesterday) {
    newStreak = (data.streak || 0) + 1;
  }

  // Calculate bonus AI uses
  let bonus = 2; // Base checkin bonus
  if (newStreak >= 7) bonus += 5; // 7-day streak bonus
  if (newStreak >= 30) bonus += 10; // 30-day streak bonus

  data.dates = [...(data.dates || []).slice(-89), today]; // Keep last 90 days
  data.streak = newStreak;
  data.lastCheckin = today;
  saveCheckinData(data);

  // Add bonus AI uses
  addBonusUses(bonus);

  return { success: true, streak: newStreak, bonus, message: `签到成功！+${bonus}次AI使用` };
}

function addBonusUses(count) {
  if (typeof window === 'undefined') return;
  const current = parseInt(localStorage.getItem(BONUS_KEY) || '0');
  localStorage.setItem(BONUS_KEY, String(current + count));
}

export function getBonusUses() {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(BONUS_KEY) || '0');
}

export function consumeBonusUse() {
  if (typeof window === 'undefined') return false;
  const bonus = getBonusUses();
  if (bonus > 0) {
    localStorage.setItem(BONUS_KEY, String(bonus - 1));
    return true;
  }
  return false;
}

export function getCheckinInfo() {
  const data = getCheckinData();
  const today = getTodayStr();
  const checkedToday = data.lastCheckin === today;
  
  // Calculate monthly checkins
  const monthPrefix = today.slice(0, 7);
  const monthlyCount = (data.dates || []).filter(d => d.startsWith(monthPrefix)).length;

  return {
    streak: data.streak || 0,
    checkedToday,
    monthlyCount,
    totalDays: (data.dates || []).length,
  };
}
