'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconSearch, IconFire, IconCompare, IconGift, IconMenu, IconX, IconRobot } from './icons/Icons';

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/compare/china-ai', label: '国产AI横评', icon: <IconFire size={14} /> },
  { href: '/compare', label: '横评对比', icon: <IconCompare size={14} /> },
  { href: '/deals', label: '优惠专区', icon: <IconGift size={14} /> },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="topnav">
        <div className="topnav-inner">
          <Link href="/" className="topnav-logo">
            <IconRobot size={22} />
            AI情报站
          </Link>

          <div className="topnav-links">
            {navLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href}
                className={`topnav-link ${isActive(link.href) ? 'active' : ''}`}
              >
                {link.icon}{link.label}
              </Link>
            ))}
          </div>

          <div className="topnav-search">
            <span className="search-icon"><IconSearch size={15} /></span>
            <input placeholder="搜索工具..." />
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
        {navLinks.map(link => (
          <Link 
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
