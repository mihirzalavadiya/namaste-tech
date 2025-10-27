import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useEffect, useState } from 'react';
import { getQuestionDetailsById } from '../lib/db';
import { useSelector } from 'react-redux';
import { RiShareBoxFill } from 'react-icons/ri';
import Link from 'next/link';

export default function NamasteDevDetail() {
  const [copied, setCopied] = useState(false);
  const [detail, setDetail] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const questions = useSelector((state) => state.namasteDevQuestions.questions);
  const { id } = router.query;
  const { pathname } = router;

  const colorClass = pathname.includes('/namastedev/') ? 'blue' : '';

  if (!id && !questions) return <p className="loading">Loading...</p>;

  const summary = questions?.length && questions.find((p) => p.id === id);

  useEffect(() => {
    if (id) {
      getQuestionDetailsById(id).then((data) => {
        setDetail(data);
      });
    }
  }, [id]);

  if (!summary) return <p className="loading">Project not found</p>;

  const code = Array.isArray(detail?.code)
    ? detail.code.join('\n')
    : detail?.code || '';

  const handleCopy = () => {
    if (detail?.files?.length) {
      const currentCode = detail.files[activeTab].code;
      navigator.clipboard.writeText(currentCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const backButton = () => {
    router.back();
  };

  return (
    <div className="project-detail-container">
      <div className={`back-button back-button-${colorClass}`}>
        <button onClick={backButton}>&larr; Back</button>
      </div>
      <div className={`left-container left-container-${colorClass}`}>
        <div className="project-header">
          <h1>
            {summary.title}{' '}
            {detail?.questionurl && (
              <Link
                href={detail.questionurl}
                target="_blank"
                rel="noopener noreferrer"
                className={`arrow-link arrow-link-${colorClass}`}
              >
                <RiShareBoxFill className="arrow-icon-3d" />
              </Link>
            )}
          </h1>
          {summary.image && (
            <div className="detail-image-wrapper">
              <img
                src={summary.image}
                alt={summary.title}
                className="detail-image"
              />
            </div>
          )}
          <p>
            {detail?.problem.split('\r\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {detail?.examples && detail.examples.length > 0 && (
            <section
              className={`examples-section examples-section-${colorClass}`}
            >
              <h2>Examples</h2>
              <ul className="examples-list">
                {detail.examples.map((ex, i) => (
                  <li key={i} className="example-card">
                    <p>
                      <strong>Input:</strong> {ex.input}
                    </p>
                    <p>
                      <strong>Output:</strong> {ex.output}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {detail?.files && detail.files.length > 0 && (
        <div className={`right-container right-container-${colorClass}`}>
          <h2>Code Files</h2>

          {/* Tabs */}
          <div className="tabs">
            {detail.files.map((file, index) => (
              <button
                key={index}
                className={`tab-btn ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {file.filename}
              </button>
            ))}
          </div>

          {/* Code View */}
          <div className="code-block">
            <SyntaxHighlighter
              language={detail.files[activeTab].language || 'javascript'}
              style={oneDark}
              showLineNumbers
              wrapLines
              customStyle={{
                margin: 0,
                padding: '1rem 1rem 2rem 1rem',
                fontSize: '14px',
                overflowY: 'auto',
              }}
            >
              {detail.files[activeTab].code}
            </SyntaxHighlighter>

            <button onClick={handleCopy} className="code-block-copy-button">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
