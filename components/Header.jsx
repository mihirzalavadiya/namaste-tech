import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function: check active route
  const isActive = (path) => router.pathname === path;

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          NamsteTech
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                href="/about"
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
            </li> */}
            <li>
              <Link
                href="/namastedev"
                className={`nav-link ${
                  isActive('/namastedev') ? 'active' : ''
                }`}
              >
                Namaste Dev
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/leetcode"
                className={`nav-link ${isActive('/leetcode') ? 'active' : ''}`}
              >
                LeetCode
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <Link
              href="/"
              className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              href="/about"
              className={`mobile-nav-link ${
                isActive('/about') ? 'active' : ''
              }`}
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </li> */}
          <li>
            <Link
              href="/namastedev"
              className={`mobile-nav-link ${
                isActive('/namastedev') ? 'active' : ''
              }`}
              onClick={toggleMobileMenu}
            >
              Namaste Dev
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`mobile-nav-link ${isActive('/blog') ? 'active' : ''}`}
              onClick={toggleMobileMenu}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/leetcode"
              className={`mobile-nav-link ${
                isActive('/leetcode') ? 'active' : ''
              }`}
              onClick={toggleMobileMenu}
            >
              LeetCode
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
