// 签到系统 — 纯localStorage，增加回访率
// v2: 梯度加速奖励，感知更强

const CHECKIN_KEY = 'quen_ai_checkin';
const BONUS_KEY = 'quen_ai_bonus';

// 签到奖励梯度
const STREAK_BONUSES = [
  { days: 1,  bonus: 3,  label: '每日签到' },
  { days: 3,  bonus: 3,  label: '连签3天' },
  { days: 7,  bonus: 5,  label: '连签7天' },
  { days: 14, bonus: 10, label: '连签14天' },
  { days: 30, bonus: 20, label: '连签30天' },
];

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

  // 计算连签天数
  let newStreak = 1;
  if (data.lastCheckin === yesterday) {
    newStreak = (data.streak || 0) + 1;
  }

  // 计算奖励（累加匹配的所有梯度）
  let bonus = 0;
  let matchedMilestones = [];
  for (const tier of STREAK_BONUSES) {
    if (newStreak >= tier.days) {
      bonus += tier.bonus;
      if (newStreak === tier.days) {
        matchedMilestones.push(tier);
      }
    }
  }

  // 保底至少3次
  bonus = Math.max(bonus, 3);

  data.dates = [...(data.dates || []).slice(-89), today];
  data.streak = newStreak;
  data.lastCheckin = today;
  saveCheckinData(data);

  addBonusUses(bonus);

  return {
    success: true,
    streak: newStreak,
    bonus,
    milestones: matchedMilestones,
    message: matchedMilestones.length > 0
      ? `🎉 ${matchedMilestones[0].label}！+${bonus}次AI使用`
      : `签到成功！+${bonus}次AI使用`,
  };
}

// 获取下一个里程碑
export function getNextMilestone(streak) {
  for (const tier of STREAK_BONUSES) {
    if (streak < tier.days) {
      return { days: tier.days, bonus: tier.bonus, remaining: tier.days - streak };
    }
  }
  return null; // 已达最高
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

  // 计算本月签到天数
  const monthPrefix = today.slice(0, 7);
  const monthlyCount = (data.dates || []).filter(d => d.startsWith(monthPrefix)).length;

  return {
    streak: data.streak || 0,
    checkedToday,
    monthlyCount,
    totalDays: (data.dates || []).length,
    nextMilestone: getNextMilestone(data.streak || 0),
  };
}

export { STREAK_BONUSES };
