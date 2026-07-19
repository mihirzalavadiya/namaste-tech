import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Card from './Card';
import { SECTIONS } from '../lib/ui';

const SectionListing = ({ sectionKey, items = [] }) => {
  const router = useRouter();
  const section = SECTIONS[sectionKey];
  const isBlog = sectionKey === 'blog';
  const [filter, setFilter] = useState(null);

  const difficulties = useMemo(() => {
    if (isBlog) return [];
    return [...new Set(items.map((it) => it?.category?.[0]).filter(Boolean))];
  }, [items, isBlog]);

  const shown = useMemo(
    () =>
      !isBlog && filter
        ? items.filter((it) => it?.category?.[0] === filter)
        : items,
    [items, filter, isBlog]
  );

  return (
    <section
      className="listing"
      style={{ '--accent': section.accent, '--accent-bg': section.accentBg }}
    >
      <button className="back-link" onClick={() => router.push('/')}>
        ← cd ~/home
      </button>

      <div className="listing-head">
        <span className="listing-icon">{section.icon}</span>
        <div className="listing-head-text">
          <span className="listing-path">{section.path}</span>
          <h1 className="listing-title">{section.label}</h1>
          <p className="listing-blurb">{section.blurb}</p>
        </div>
      </div>

      {difficulties.length > 0 && (
        <div className="filters">
          <button
            className={`filter-btn ${filter === null ? 'active' : ''}`}
            onClick={() => setFilter(null)}
          >
            All
          </button>
          {difficulties.map((d) => (
            <button
              key={d}
              className={`filter-btn ${filter === d ? 'active' : ''}`}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {shown.length > 0 ? (
        <Card projects={shown} isBlog={isBlog} accent={section.accent} />
      ) : (
        <div className="empty-state">// nothing here yet</div>
      )}
    </section>
  );
};

export default SectionListing;
