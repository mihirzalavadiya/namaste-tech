// Central SEO / site configuration.
// Set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://namaste-tech.vercel.app)
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://namaste-tech.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'NamasteTech';

export const DEFAULT_DESCRIPTION =
  'NamasteTech is a developer learning hub featuring NamasteDev questions and answers, in-depth articles, blogs, and LeetCode solutions to help you grow as a modern web developer.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
