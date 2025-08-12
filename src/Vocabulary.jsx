import React, { useState } from 'react';
import './App.css';

function Vocabulary({ tokenizer, onBack }) {
    const [copiedTokenId, setCopiedTokenId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // Copy to clipboard
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedTokenId(type);
            setTimeout(() => setCopiedTokenId(null), 1500);
        });
    };

    // Get all vocabulary items
    const getAllVocab = () => {
        return Object.entries(tokenizer.charToId).map(([char, id]) => ({
            char,
            id,
            type: char === '<BOS>' || char === '<EOS>' ? 'special' :
                char === ' ' ? 'space' :
                    /[.!?,:;\-'"`~@#$%^&*()_+=\[\]{}|\\;:<>?/]/.test(char) ? 'punctuation' :
                        /[0-9]/.test(char) ? 'number' :
                            /[a-z]/.test(char) ? 'lowercase' :
                                /[A-Z]/.test(char) ? 'uppercase' : 'other'
        }));
    };

    // Filter vocabulary based on search and type
    const getFilteredVocab = () => {
        let vocab = getAllVocab();

        // Filter by type
        if (filterType !== 'all') {
            vocab = vocab.filter(item => item.type === filterType);
        }

        // Filter by search term
        if (searchTerm) {
            vocab = vocab.filter(item =>
                item.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toString().includes(searchTerm)
            );
        }

        return vocab.sort((a, b) => a.id - b.id);
    };

    const filteredVocab = getFilteredVocab();
    const totalVocab = getAllVocab();

    // Get stats
    const stats = {
        total: totalVocab.length,
        special: totalVocab.filter(item => item.type === 'special').length,
        lowercase: totalVocab.filter(item => item.type === 'lowercase').length,
        uppercase: totalVocab.filter(item => item.type === 'uppercase').length,
        numbers: totalVocab.filter(item => item.type === 'number').length,
        punctuation: totalVocab.filter(item => item.type === 'punctuation').length,
        space: totalVocab.filter(item => item.type === 'space').length,
        other: totalVocab.filter(item => item.type === 'other').length,
    };

    return (
        <div className="app vocabulary-page">
            {/* Header */}
            <header className="vocab-header">
                <div className="header-content">
                    <button onClick={onBack} className="back-btn">
                        ← Back to Tokenizer
                    </button>
                    <h1 className="title">📚 Complete Vocabulary</h1>
                    <div className="vocab-summary">
                        <span>Total: {stats.total} tokens</span>
                    </div>
                </div>
            </header>

            {/* Controls */}
            <div className="vocab-controls">
                <div className="search-section">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search vocabulary... (character or token ID)"
                        className="search-input"
                    />
                </div>

                <div className="filter-section">
                    <label>Filter by type:</label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All ({stats.total})</option>
                        <option value="special">Special ({stats.special})</option>
                        <option value="lowercase">Lowercase ({stats.lowercase})</option>
                        <option value="uppercase">Uppercase ({stats.uppercase})</option>
                        <option value="number">Numbers ({stats.numbers})</option>
                        <option value="punctuation">Punctuation ({stats.punctuation})</option>
                        <option value="space">Space ({stats.space})</option>
                        {stats.other > 0 && <option value="other">Other ({stats.other})</option>}
                    </select>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="vocab-stats-overview">
                <div className="stat-item special">
                    <span className="stat-label">Special</span>
                    <span className="stat-value">{stats.special}</span>
                </div>
                <div className="stat-item lowercase">
                    <span className="stat-label">Lowercase</span>
                    <span className="stat-value">{stats.lowercase}</span>
                </div>
                <div className="stat-item uppercase">
                    <span className="stat-label">Uppercase</span>
                    <span className="stat-value">{stats.uppercase}</span>
                </div>
                <div className="stat-item number">
                    <span className="stat-label">Numbers</span>
                    <span className="stat-value">{stats.numbers}</span>
                </div>
                <div className="stat-item punctuation">
                    <span className="stat-label">Punctuation</span>
                    <span className="stat-value">{stats.punctuation}</span>
                </div>
                <div className="stat-item space">
                    <span className="stat-label">Space</span>
                    <span className="stat-value">{stats.space}</span>
                </div>
            </div>

            {/* Vocabulary Grid */}
            <div className="full-vocab-container">
                <div className="results-info">
                    Showing {filteredVocab.length} of {stats.total} tokens
                </div>

                <div className="full-vocab-grid">
                    {filteredVocab.map(({ char, id, type }) => (
                        <div
                            key={id}
                            className={`vocab-token ${type}`}
                            onClick={() => copyToClipboard(id.toString(), id.toString())}
                            title={`Click to copy token ID: ${id}`}
                        >
                            <div className="token-char">
                                {char === ' ' ? '␣' :
                                    char === '<BOS>' ? '⏵' :
                                        char === '<EOS>' ? '⏹' :
                                            char}
                            </div>
                            <div className="token-id">#{id}</div>
                            <div className="token-type">{type}</div>
                            {copiedTokenId === id.toString() && (
                                <div className="copy-indicator">✓</div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredVocab.length === 0 && (
                    <div className="no-results">
                        No tokens found matching your search criteria.
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="vocab-legend">
                <h3>Legend:</h3>
                <div className="legend-items">
                    <div className="legend-item special">
                        <span className="legend-color"></span>
                        <span>Special Tokens</span>
                    </div>
                    <div className="legend-item lowercase">
                        <span className="legend-color"></span>
                        <span>Lowercase Letters</span>
                    </div>
                    <div className="legend-item uppercase">
                        <span className="legend-color"></span>
                        <span>Uppercase Letters</span>
                    </div>
                    <div className="legend-item number">
                        <span className="legend-color"></span>
                        <span>Numbers</span>
                    </div>
                    <div className="legend-item punctuation">
                        <span className="legend-color"></span>
                        <span>Punctuation</span>
                    </div>
                    <div className="legend-item space">
                        <span className="legend-color"></span>
                        <span>Space</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vocabulary;
