'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { t, locales } from '@/lib/i18n';
import { IconSearch, IconFire, IconCompare, IconGift, IconMenu, IconX, IconWrite, IconCode, IconChat } from '@/components/icons/Icons';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '', labelKey: 'nav.home' },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/products', labelKey: 'nav.products' },
  { href: '/tools', labelKey: 'nav.tools' },
  { href: '/models', labelKey: 'nav.models' },
  { href: '/tutorials', labelKey: 'nav.tutorials' },
];

export default function TopNav({ locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(locale);

  const isActive = (href) => {
    if (!href) {
      return pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
    }
    return pathname.startsWith(`/${currentLocale}${href}`);
  };

  const switchLocale = (newLocale) => {
    const pathWithoutLocale = pathname.replace(/^\/(zh|zh-HK|en)/, '');
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
  };

  const localeLabels = [
    { code: 'zh', label: '简' },
    { code: 'zh-HK', label: '繁' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <>
      <nav className="topnav">
        <div className="topnav-inner">
          <Link href={`/${currentLocale}`} className="topnav-logo">
            Quen&apos;s AI
          </Link>

          <div className="topnav-links">
            {navItems.map(item => (
              <Link
                key={item.labelKey}
                href={`/${currentLocale}${item.href}`}
                className={`topnav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {t(currentLocale, item.labelKey)}
              </Link>
            ))}
          </div>

          <div className="topnav-search">
            <span className="search-icon"><IconSearch size={14} /></span>
            <input placeholder={t(currentLocale, 'nav.search')} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ThemeToggle />
            <div className="lang-switch">
              {localeLabels.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn ${currentLocale === l.code ? 'active' : ''}`}
                  onClick={() => switchLocale(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
            <IconMenu />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
          <IconX />
        </button>
        {navItems.map(item => (
          <Link
            key={item.labelKey}
            href={`/${currentLocale}${item.href}`}
            onClick={() => setMobileOpen(false)}
          >
            {t(currentLocale, item.labelKey)}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, alignItems: 'center' }}>
          <ThemeToggle />
          {localeLabels.map(l => (
            <button
              key={l.code}
              className={`lang-btn ${currentLocale === l.code ? 'active' : ''}`}
              onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
              style={{ padding: '8px 16px', fontSize: '0.86rem' }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
