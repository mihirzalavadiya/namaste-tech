import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Isolated so the (heavy) syntax highlighter can be lazy-loaded via next/dynamic.
const CodeBlock = ({ files = [] }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  if (!files.length) return null;

  const current = files[Math.min(activeTab, files.length - 1)];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <>
      <div className="code-card-head">
        <div className="detail-label">Code Files</div>
        <div className="tabs">
          {files.map((file, index) => (
            <button
              key={index}
              className={`tab ${index === activeTab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(index);
                setCopied(false);
              }}
            >
              {file.filename}
            </button>
          ))}
        </div>
      </div>

      <div className="code-card-body">
        <div className="code-shell">
          <button onClick={handleCopy} className="code-copy">
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <SyntaxHighlighter
            language={current.language || 'javascript'}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '16px',
              fontSize: '13px',
              background: 'transparent',
              fontFamily: "'JetBrains Mono', monospace",
            }}
            codeTagProps={{
              style: {
                background: 'transparent',
                textShadow: 'none',
                fontFamily: "'JetBrains Mono', monospace",
              },
            }}
            lineNumberStyle={{
              color: '#3a4557',
              background: 'transparent',
              minWidth: '2.4em',
            }}
          >
            {current.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};

export default CodeBlock;
