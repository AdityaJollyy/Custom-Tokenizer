import React, { useState, useEffect } from 'react';
import CustomTokenizer from './Tokenizer';
import Vocabulary from './Vocabulary';
import './App.css';

function App() {
  const [tokenizer] = useState(new CustomTokenizer());
  const [currentPage, setCurrentPage] = useState('tokenizer'); // 'tokenizer' or 'vocabulary'

  // Encoding section state
  const [inputText, setInputText] = useState('Hello World!');
  const [encodedTokens, setEncodedTokens] = useState([]);
  const [addSpecialTokens, setAddSpecialTokens] = useState(true);
  const [copiedTokenId, setCopiedTokenId] = useState(null);

  // Decoding section state
  const [tokenInput, setTokenInput] = useState('');
  const [decodedText, setDecodedText] = useState('');

  // Real-time tokenization effect
  useEffect(() => {
    if (inputText.trim()) {
      const tokens = tokenizer.encode(inputText, addSpecialTokens);
      setEncodedTokens(tokens);
    } else {
      setEncodedTokens([]);
    }
  }, [inputText, addSpecialTokens, tokenizer]);

  // Real-time decoding effect
  useEffect(() => {
    if (tokenInput.trim()) {
      try {
        const tokens = tokenInput.split(',').map(t => parseInt(t.trim())).filter(t => !isNaN(t));
        if (tokens.length > 0) {
          const text = tokenizer.decode(tokens);
          setDecodedText(text);
        } else {
          setDecodedText('');
        }
      } catch (error) {
        setDecodedText('');
      }
    } else {
      setDecodedText('');
    }
  }, [tokenInput, tokenizer]);

  // Copy to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTokenId(type);
      setTimeout(() => setCopiedTokenId(null), 1500);
    });
  };

  const sampleTexts = [
    "Hello World!",
    "AI Tokenizer",
    "123 Test!",
    "How are you?"
  ];

  // If viewing vocabulary page, render that component
  if (currentPage === 'vocabulary') {
    return (
      <Vocabulary
        tokenizer={tokenizer}
        onBack={() => setCurrentPage('tokenizer')}
      />
    );
  }

  return (
    <div className="app">
      {/* Compact Header */}
      <header className="compact-header">
        <div className="header-content">
          <h1 className="title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
              <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#61dafb" />
              <path d="M3 17L12 22L21 17M3 12L12 17L21 12" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Custom Character Tokenizer
          </h1>
          <div className="vocab-info">
            Vocabulary: {tokenizer.getVocabSize()} tokens | Special: BOS, EOS
            <button
              onClick={() => setCurrentPage('vocabulary')}
              className="view-vocab-btn"
            >
              View Full Vocabulary →
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="main-grid">
        {/* Left Panel - Text to Tokens */}
        <div className="panel encode-panel">
          <div className="panel-header">
            <h2>⚡ Text → Tokens</h2>
            <label className="toggle">
              <input
                type="checkbox"
                checked={addSpecialTokens}
                onChange={(e) => setAddSpecialTokens(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">BOS/EOS</span>
            </label>
          </div>

          <div className="input-section">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type text here..."
              className="text-input"
              rows="3"
            />

            <div className="sample-buttons">
              {sampleTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(text)}
                  className="sample-btn"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          <div className="output-section">
            <div className="output-header">
              <span className="output-label">Token IDs:</span>
              <button
                onClick={() => copyToClipboard(encodedTokens.join(', '), 'tokens')}
                className={`copy-btn ${copiedTokenId === 'tokens' ? 'copied' : ''}`}
              >
                {copiedTokenId === 'tokens' ? '✅' : '📋'}
              </button>
            </div>
            <div className="tokens-display">
              {encodedTokens.length > 0 ? (
                <span>[{encodedTokens.join(', ')}]</span>
              ) : (
                <span className="placeholder">Enter text to see tokens...</span>
              )}
            </div>

            <div className="stats-row">
              <span>Characters: {inputText.length}</span>
              <span>Tokens: {encodedTokens.length}</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Tokens to Text */}
        <div className="panel decode-panel">
          <div className="panel-header">
            <h2>🔓 Tokens → Text</h2>
          </div>

          <div className="input-section">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter token IDs (comma-separated)"
              className="token-input"
            />

            <div className="example-buttons">
              <button onClick={() => setTokenInput('0,55,26,33,33,36,1')} className="example-btn">
                Hello
              </button>
              <button onClick={() => setTokenInput('55,56,2')} className="example-btn">
                Hi
              </button>
              <button onClick={() => setTokenInput('0,67,26,40,41,5,1')} className="example-btn">
                Test!
              </button>
            </div>
          </div>

          <div className="output-section">
            <div className="output-header">
              <span className="output-label">Decoded Text:</span>
              <button
                onClick={() => copyToClipboard(decodedText, 'text')}
                className={`copy-btn ${copiedTokenId === 'text' ? 'copied' : ''}`}
                disabled={!decodedText}
              >
                {copiedTokenId === 'text' ? '✅' : '📋'}
              </button>
            </div>
            <div className="text-display">
              {decodedText ? (
                <span>"{decodedText}"</span>
              ) : (
                <span className="placeholder">Enter tokens to see text...</span>
              )}
            </div>

            <div className="stats-row">
              <span>Valid Tokens: {tokenInput.split(',').filter(t => t.trim() && !isNaN(parseInt(t.trim()))).length}</span>
              <span>Characters: {decodedText.length}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
