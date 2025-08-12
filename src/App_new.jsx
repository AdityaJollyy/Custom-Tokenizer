import React, { useState, useEffect } from 'react';
import CustomTokenizer from './Tokenizer';
import './App.css';

function App() {
    const [tokenizer] = useState(new CustomTokenizer());

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

    return (
        <div className="app">
            {/* Compact Header */}
            <header className="compact-header">
                <div className="header-content">
                    <h1 className="title">🤖 Custom Character Tokenizer</h1>
                    <div className="vocab-info">
                        Vocabulary: {tokenizer.getVocabSize()} tokens | Special: BOS, EOS
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

                {/* Bottom Panel - Vocabulary */}
                <div className="panel vocab-panel">
                    <div className="panel-header">
                        <h2>📚 Character Vocabulary</h2>
                        <div className="vocab-stats">
                            <span>Letters: {Object.keys(tokenizer.charToId).filter(char => /[a-zA-Z]/.test(char)).length}</span>
                            <span>Numbers: {Object.keys(tokenizer.charToId).filter(char => /[0-9]/.test(char)).length}</span>
                            <span>Symbols: {Object.keys(tokenizer.charToId).filter(char => /[^a-zA-Z0-9]/.test(char) && !['<BOS>', '<EOS>'].includes(char)).length}</span>
                        </div>
                    </div>

                    <div className="vocab-grid">
                        {/* Special Tokens */}
                        <div className="vocab-category">
                            <h4>Special</h4>
                            <div className="vocab-items">
                                <div className="vocab-item special" onClick={() => copyToClipboard('0', '0')}>
                                    <span className="char">&lt;BOS&gt;</span>
                                    <span className="id">#0</span>
                                    {copiedTokenId === '0' && <span className="copied">✓</span>}
                                </div>
                                <div className="vocab-item special" onClick={() => copyToClipboard('1', '1')}>
                                    <span className="char">&lt;EOS&gt;</span>
                                    <span className="id">#1</span>
                                    {copiedTokenId === '1' && <span className="copied">✓</span>}
                                </div>
                            </div>
                        </div>

                        {/* Letters */}
                        <div className="vocab-category">
                            <h4>Letters</h4>
                            <div className="vocab-items">
                                {tokenizer.getSupportedChars()
                                    .filter(char => /[a-zA-Z]/.test(char))
                                    .slice(0, 20) // Show first 20 for space
                                    .map(char => (
                                        <div
                                            key={char}
                                            className="vocab-item letter"
                                            onClick={() => copyToClipboard(tokenizer.charToId[char].toString(), tokenizer.charToId[char].toString())}
                                        >
                                            <span className="char">{char}</span>
                                            <span className="id">#{tokenizer.charToId[char]}</span>
                                            {copiedTokenId === tokenizer.charToId[char].toString() && <span className="copied">✓</span>}
                                        </div>
                                    ))}
                                {tokenizer.getSupportedChars().filter(char => /[a-zA-Z]/.test(char)).length > 20 && (
                                    <div className="vocab-item more">
                                        <span className="char">...</span>
                                        <span className="id">+{tokenizer.getSupportedChars().filter(char => /[a-zA-Z]/.test(char)).length - 20}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Numbers & Common Symbols */}
                        <div className="vocab-category">
                            <h4>Numbers & Symbols</h4>
                            <div className="vocab-items">
                                {tokenizer.getSupportedChars()
                                    .filter(char => /[0-9!@#$%^&*()_+\-=\[\]{}|;':".,<>?/\\` ]/.test(char))
                                    .slice(0, 15) // Show common ones
                                    .map(char => (
                                        <div
                                            key={char}
                                            className="vocab-item number"
                                            onClick={() => copyToClipboard(tokenizer.charToId[char].toString(), tokenizer.charToId[char].toString())}
                                        >
                                            <span className="char">{char === ' ' ? '␣' : char}</span>
                                            <span className="id">#{tokenizer.charToId[char]}</span>
                                            {copiedTokenId === tokenizer.charToId[char].toString() && <span className="copied">✓</span>}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
