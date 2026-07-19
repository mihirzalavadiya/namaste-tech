// Shared UI metadata + class helpers for the IDE-themed design.

// Tiny dark placeholder shown (blurred) while remote images load — smooths pop-in.
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxMic+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyBmaWxsPScjMGIwZjE4Jy8+PC9zdmc+';

export const SECTIONS = {
  namastedev: {
    key: 'namastedev',
    label: 'Namaste Dev',
    path: '~/namastedev',
    icon: 'JSX',
    accent: '#58a6ff',
    accentBg: 'rgba(88,166,255,0.12)',
    href: '/namastedev',
    blurb:
      'Solutions to all Namaste Dev machine-coding & practice problems, with all test cases passed.',
  },
  leetcode: {
    key: 'leetcode',
    label: 'LeetCode',
    path: '~/leetcode',
    icon: 'ALG',
    accent: '#e3b341',
    accentBg: 'rgba(227,179,65,0.12)',
    href: '/leetcode',
    blurb:
      'Solutions to various LeetCode problems in JavaScript — with the intuition and the code.',
  },
  blog: {
    key: 'blog',
    label: 'Blogs',
    path: '~/blog',
    icon: 'MD',
    accent: '#ff7ac6',
    accentBg: 'rgba(255,122,198,0.12)',
    href: '/blog',
    blurb:
      'In-depth articles and blog posts on web development, programming, and technology.',
  },
};

export function chipClass(tag = '') {
  const t = tag.toLowerCase();
  if (t.includes('react')) return 'chip chip-react';
  if (t.includes('next')) return 'chip chip-next';
  if (t.includes('javascript') || t === 'js') return 'chip chip-js';
  return 'chip chip-default';
}

export function diffClass(category = '') {
  const c = String(category).toLowerCase();
  if (c === 'easy') return 'diff diff-easy';
  if (c === 'medium') return 'diff diff-medium';
  if (c === 'hard') return 'diff diff-hard';
  return 'diff diff-default';
}
