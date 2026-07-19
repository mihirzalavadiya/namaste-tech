import React from 'react';
import Header from './Header';

const Layout = ({ children, count }) => {
  return (
    <div className="app">
      <Header />
      <main className="site-main">{children}</main>
      <footer className="status-bar">
        <span className="st-branch">⎇ main</span>
        {typeof count === 'number' && (
          <span className="st-count">
            <span className="st-dot" />
            {count} solutions
          </span>
        )}
        <span className="st-push">UTF-8</span>
        <span>LF</span>
        <span className="st-lang">JavaScript</span>
        <span>namaste 🙏</span>
      </footer>
    </div>
  );
};

export default Layout;
