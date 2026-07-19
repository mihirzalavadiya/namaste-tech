import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { SECTIONS, diffClass, BLUR_DATA_URL } from '../lib/ui';

// Lazy-load the syntax highlighter — keeps it out of the initial bundle.
const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: false,
  loading: () => <div className="code-loading">Loading code…</div>,
});

/**
 * Shared detail view for both NamasteDev and LeetCode problems.
 * Data arrives as props (from getStaticProps) so the problem text is
 * server-rendered and fully crawlable.
 */
const ProblemDetail = ({ summary, detail, sectionKey, nextItem }) => {
  const router = useRouter();
  const section = SECTIONS[sectionKey] || SECTIONS.namastedev;

  if (!summary) return <p className="loading">Problem not found</p>;

  const difficulty = summary?.category?.[0];
  const paragraphs = detail?.problem
    ? detail.problem.split(/\r\n\r\n|\r\n/).filter((p) => p.trim())
    : [];

  return (
    <section
      className="detail"
      style={{ '--accent': section.accent, '--accent-bg': section.accentBg }}
    >
      <button className="back-link" onClick={() => router.push(section.href)}>
        ← {section.path}
      </button>

      <div className="detail-grid">
        {/* LEFT — problem */}
        <div className="detail-card">
          <div className="detail-head">
            <div className="detail-head-tags">
              <span className="detail-section-label">{section.label}</span>
              {difficulty && (
                <span className={diffClass(difficulty)}>{difficulty}</span>
              )}
            </div>
            {detail?.questionurl && (
              <Link
                href={detail.questionurl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-open"
              >
                open ↗
              </Link>
            )}
          </div>

          <h1 className="detail-title">{summary.title}</h1>

          {summary.image && (
            <div className="detail-media">
              <Image
                src={summary.image}
                alt={summary.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 560px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              {summary?.problemNo && (
                <span className="card-num">#{summary.problemNo}</span>
              )}
            </div>
          )}

          <div className="detail-body">
            <div className="detail-label">Description</div>
            {paragraphs.length > 0 && (
              <div className="detail-desc">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {detail?.examples?.length > 0 && (
              <>
                <div className="detail-label" style={{ marginTop: '20px' }}>
                  Examples
                </div>
                <div className="examples">
                  {detail.examples.map((ex, i) => (
                    <div key={i} className="example-card">
                      <p>
                        <strong>Input:</strong> {ex.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {ex.output}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT — code */}
        {detail?.files?.length > 0 && (
          <div className="detail-card">
            <CodeBlock files={detail.files} />
          </div>
        )}
      </div>

      <div className="detail-nav">
        <button
          className="btn btn-ghost"
          onClick={() => router.push(section.href)}
        >
          ← all {section.label}
        </button>
        {nextItem && (
          <Link href={nextItem.href} className="btn btn-primary">
            {nextItem.title} →
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProblemDetail;
