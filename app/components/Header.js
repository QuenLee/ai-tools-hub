'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Toggle sidebar via custom event
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
    // Dispatch custom event for Sidebar component
    window.dispatchEvent(new CustomEvent('sidebar-toggle'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <input 
            placeholder="搜索AI工具..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}
