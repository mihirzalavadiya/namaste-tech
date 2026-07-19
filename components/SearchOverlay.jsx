import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const DB_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

// Fetch a node from Firebase RTDB via its public REST endpoint (no SDK in the bundle).
async function fetchNode(path) {
  if (!DB_URL) return [];
  try {
    const res = await fetch(`${DB_URL}/${path}.json`);
    if (!res.ok) return [];
    const val = await res.json();
    return val ? Object.values(val) : [];
  } catch {
    return [];
  }
}

const KIND_STYLE = {
  namastedev: { color: '#58a6ff', background: 'rgba(88,166,255,0.12)' },
  leetcode: { color: '#e3b341', background: 'rgba(227,179,65,0.12)' },
  blog: { color: '#ff7ac6', background: 'rgba(255,122,198,0.12)' },
};

const SearchOverlay = ({ onClose }) => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
    let alive = true;
    (async () => {
      const [q, lc, blogs] = await Promise.all([
        fetchNode('questions'),
        fetchNode('leetcode'),
        fetchNode('blogs'),
      ]);
      if (!alive) return;
      const items = [
        ...q.map((it) => ({
          title: it.title,
          kind: 'namastedev',
          label: 'Namaste Dev',
          href: `/namastedev/${it.id}`,
          external: false,
        })),
        ...lc.map((it) => ({
          title: it.problemNo ? `${it.problemNo} ${it.title}` : it.title,
          kind: 'leetcode',
          label: 'LeetCode',
          href: `/leetcode/${it.id}`,
          external: false,
        })),
        ...blogs.map((it) => ({
          title: it.title,
          kind: 'blog',
          label: 'Blog',
          href: it.link || '#',
          external: true,
        })),
      ].filter((it) => it.title);
      setIndex(items);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    return index.filter((it) => it.title.toLowerCase().includes(q)).slice(0, 12);
  }, [query, index]);

  useEffect(() => setActive(0), [query]);

  const goTo = (item) => {
    if (!item) return;
    onClose();
    if (item.external) window.open(item.href, '_blank', 'noopener');
    else router.push(item.href);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      goTo(results[active]);
    }
  };

  return (
    <div
      className="search-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <span style={{ color: '#6b788b' }}>/</span>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="search solutions, problems, blogs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="search-hint">esc</span>
        </div>
        <div className="search-results">
          {loading ? (
            <div className="search-empty">indexing…</div>
          ) : results.length === 0 ? (
            <div className="search-empty">no matches for “{query}”</div>
          ) : (
            results.map((item, i) => (
              <button
                key={`${item.kind}-${i}`}
                className={`search-result ${i === active ? 'active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => goTo(item)}
              >
                <span
                  className="search-result-kind"
                  style={KIND_STYLE[item.kind]}
                >
                  {item.label}
                </span>
                <span className="search-result-title">{item.title}</span>
                <span className="recent-open" style={{ marginLeft: 'auto' }}>
                  {item.external ? '↗' : '→'}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
