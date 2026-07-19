import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import SearchOverlay from './SearchOverlay';

const NAV = [
  { href: '/', label: 'Home', dot: '#ff8a4c' },
  { href: '/namastedev', label: 'Namaste Dev', dot: '#58a6ff' },
  { href: '/blog', label: 'Blogs', dot: '#ff7ac6' },
  { href: '/leetcode', label: 'LeetCode', dot: '#e3b341' },
];

const Header = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href) =>
    href === '/'
      ? router.pathname === '/'
      : router.pathname === href || router.pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">न</span>
          <span className="brand-name">
            namaste<span>.tech</span>
          </span>
        </Link>

        <nav className="nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-tab ${isActive(item.href) ? 'active' : ''}`}
            >
              <span
                className="nav-dot"
                style={{ background: item.dot }}
              />
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="search-btn"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          search <span className="kbd">⌘K</span>
        </button>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Header;
