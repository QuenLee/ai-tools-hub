'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/i18n';
import { IconSearch, IconMenu, IconX } from '@/components/icons/Icons';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { href: '', labelKey: 'nav.home' },
  { href: '/tools', labelKey: 'nav.tools' },
  { href: '/products', labelKey: 'nav.products' },
  { href: '/models', labelKey: 'nav.models' },
  { href: '/tutorials', labelKey: 'nav.tutorials' },
];

export default function TopNav({ locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentLocale = locale;

  const isActive = (href) => {
    if (!href) return pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
    return pathname.startsWith(`/${currentLocale}${href}`);
  };

  return (
    <>
      <nav className="topnav">
        <div className="topnav-inner">
          <Link href={`/${currentLocale}`} className="topnav-logo">
            Quen&apos;s AI
          </Link>
          <div className="topnav-links">
            {navItems.map(item => (
              <Link key={item.labelKey} href={`/${currentLocale}${item.href}`} className={`topnav-link ${isActive(item.href) ? 'active' : ''}`}>
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
          <Link key={item.labelKey} href={`/${currentLocale}${item.href}`} onClick={() => setMobileOpen(false)}>
            {t(currentLocale, item.labelKey)}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, alignItems: 'center' }}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
