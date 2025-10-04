import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useEffect, useState } from 'react';
import { getQuestionDetailsById } from '../lib/db';
import { useSelector } from 'react-redux';

export default function NamasteDevDetail() {
  const [copied, setCopied] = useState(false);
  const [detail, setDetail] = useState(null);
  const router = useRouter();
  const questions = useSelector((state) => state.namasteDevQuestions.questions);
  const { id } = router.query;

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
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const backButton = () => {
    router.back();
  };

  return (
    <div className="project-detail-container">
      <div className="back-button">
        <button onClick={backButton}>&larr; Back</button>
      </div>
      <div className="left-container">
        <div className="project-header">
          <h1>{summary.title}</h1>
          {summary.image && <img src={summary.image} alt={summary.title} />}
          <p>
            {detail?.problem.split('\r\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {detail?.examples && detail.examples.length > 0 && (
            <section className="examples-section">
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

      {code && (
        <div className="right-container">
          <h2>Code</h2>
          <div className="code-block">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              showLineNumbers
              wrapLines
              customStyle={{
                margin: 0,
                padding: '1rem 1rem 2rem 1rem',
                fontSize: '14px',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              className="project-detail-container"
            >
              {code}
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
