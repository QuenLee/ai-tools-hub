import zh from '../messages/zh.json';
import zhHK from '../messages/zh-HK.json';
import en from '../messages/en.json';

export const locales = ['zh', 'zh-HK', 'en'];
export const defaultLocale = 'zh';

const allMessages = { zh, 'zh-HK': zhHK, en };

export function getMessages(locale) {
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  return allMessages[validLocale];
}

export function t(locale, key) {
  const messages = getMessages(locale);
  const keys = key.split('.');
  let result = messages;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key; // fallback to key if not found
    }
  }
  return result;
}

export function getLocalizedPath(locale, path) {
  return `/${locale}${path === '/' ? '' : path}`;
}
