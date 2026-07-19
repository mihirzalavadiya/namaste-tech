import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SECTIONS, chipClass, diffClass, BLUR_DATA_URL } from '../lib/ui';

const TRACK_ORDER = ['namastedev', 'blog', 'leetcode'];
const TRACK_CHIPS = {
  namastedev: ['React', 'JavaScript'],
  blog: ['React', 'Next.js', 'JavaScript'],
  leetcode: ['JavaScript'],
};
const TRACK_COVER = {
  namastedev:
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
  blog: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
  leetcode: 'https://leetcode.com/static/images/LeetCode_Sharing.png',
};

const HomePage = ({ stats = {}, recent = [] }) => {
  const total = stats.total ?? 0;

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div>
          <span className="hero-badge">
            <span className="live" />// developer learning hub
          </span>
          <h1 className="hero-title">
            Namaste <span>Tech</span>
          </h1>
          <p className="hero-sub">
            Solution to all Namaste Dev problems, blog posts, project ideas and
            more — with every test case passed, in JavaScript &amp; React.
          </p>
          <div className="hero-actions">
            <Link href="/namastedev" className="btn btn-primary">
              ./explore --solutions
            </Link>
            <Link href="/leetcode" className="btn btn-ghost">
              leetcode/*
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-value">{total || '—'}</div>
              <div className="stat-label">solutions</div>
            </div>
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">tests passing</div>
            </div>
            <div>
              <div className="stat-value">JS · React</div>
              <div className="stat-label">stack</div>
            </div>
          </div>
        </div>

        {/* Code window mockup */}
        <div className="code-window">
          <div className="code-window-bar">
            <span className="tl-dot tl-red" />
            <span className="tl-dot tl-yellow" />
            <span className="tl-dot tl-green" />
            <span className="code-window-file">ChipsInput.js</span>
          </div>
          <div className="code-window-body">
            <pre className="code-gutter">{`1\n2\n3\n4\n5\n6`}</pre>
            <pre className="code-lines">
              <span className="tok-key">const</span>{' '}
              <span className="tok-fn">addChip</span> = (e){' '}
              <span className="tok-key">=&gt;</span> {'{'}
              {'\n'}  <span className="tok-key">if</span> (e.key ==={' '}
              <span className="tok-str">"Enter"</span> &amp;&amp; value.
              <span className="tok-fn">trim</span>()) {'{'}
              {'\n'}    <span className="tok-fn">setChips</span>([...chips,
              value.<span className="tok-fn">trim</span>()]);
              {'\n'}    <span className="tok-fn">setValue</span>(
              <span className="tok-str">""</span>);
              {'\n'}  {'}'}
              {'\n'}
              {'}'};
            </pre>
          </div>
          <div className="code-window-status">
            ✓ all test cases passed <span className="t">0.42s</span>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="section-block">
        <h2 className="section-h2">
          / tracks<span>.length === {TRACK_ORDER.length}</span>
        </h2>
        <div className="tracks-grid">
          {TRACK_ORDER.map((key) => {
            const s = SECTIONS[key];
            const count = stats[key] ?? 0;
            return (
              <Link
                key={key}
                href={s.href}
                className="card"
                style={{ '--accent': s.accent }}
              >
                <div className="card-media">
                  <Image
                    src={TRACK_COVER[key]}
                    alt={s.label}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <span className="card-badge">{s.icon}</span>
                </div>
                <div className="card-body">
                  <div className="card-body-head">
                    <h3 className="card-title">{s.label}</h3>
                    <span className="card-count">{count} entries →</span>
                  </div>
                  <p className="card-blurb">{s.blurb}</p>
                  <div className="card-chips">
                    {TRACK_CHIPS[key].map((c) => (
                      <span key={c} className={chipClass(c)}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* RECENTLY ADDED */}
      {recent.length > 0 && (
        <section className="section-block-last">
          <h2 className="section-h2">/ recently added</h2>
          <div className="recent-list">
            {recent.map((row, i) => {
              const s = SECTIONS[row.section];
              return (
                <Link key={i} href={row.href} className="recent-row">
                  <span className="recent-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="recent-sec"
                    style={{ color: s.accent, background: s.accentBg }}
                  >
                    {s.label}
                  </span>
                  <span className="recent-title">{row.title}</span>
                  {row.difficulty && (
                    <span className={diffClass(row.difficulty)}>
                      {row.difficulty}
                    </span>
                  )}
                  <span className="recent-open">open →</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
