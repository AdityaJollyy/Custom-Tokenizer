import React from 'react';
import './App.css';

export const Tokenizer = () => {
    return (
        <div className="app">
            <header className="header">
                <h1>Custom Tokenizer</h1>
                <p>Efficient and simple tokenization for your text.</p>
            </header>
            <main className="main">
                <div className="stats">
                    <span>Tokens: 100</span>
                    <span>Vocabulary Size: 74</span>
                </div>
                <textarea
                    className="text-input"
                    placeholder="Enter your text here..."
                ></textarea>
                <button className="btn">Tokenize</button>
            </main>
        </div>
    );
};

class CustomTokenizer {
    constructor() {
        this.specialTokens = {
            '<BOS>': 0, // Beginning of sequence
            '<EOS>': 1, // End of sequence
        };

        this.charToId = {
            // Special tokens
            '<BOS>': 0,
            '<EOS>': 1,

            // Space and common punctuation
            ' ': 2,
            '.': 3,
            ',': 4,
            '!': 5,
            '?': 6,
            ':': 7,
            ';': 8,
            '-': 9,
            "'": 10,
            '"': 11,

            // Numbers
            '0': 12, '1': 13, '2': 14, '3': 15, '4': 16,
            '5': 17, '6': 18, '7': 19, '8': 20, '9': 21,

            // Lowercase letters
            'a': 22, 'b': 23, 'c': 24, 'd': 25, 'e': 26, 'f': 27, 'g': 28, 'h': 29,
            'i': 30, 'j': 31, 'k': 32, 'l': 33, 'm': 34, 'n': 35, 'o': 36, 'p': 37,
            'q': 38, 'r': 39, 's': 40, 't': 41, 'u': 42, 'v': 43, 'w': 44, 'x': 45,
            'y': 46, 'z': 47,

            // Uppercase letters
            'A': 48, 'B': 49, 'C': 50, 'D': 51, 'E': 52, 'F': 53, 'G': 54, 'H': 55,
            'I': 56, 'J': 57, 'K': 58, 'L': 59, 'M': 60, 'N': 61, 'O': 62, 'P': 63,
            'Q': 64, 'R': 65, 'S': 66, 'T': 67, 'U': 68, 'V': 69, 'W': 70, 'X': 71,
            'Y': 72, 'Z': 73,
        };

        // Create reverse mapping (id -> character)
        this.idToChar = {};
        Object.entries(this.charToId).forEach(([char, id]) => {
            this.idToChar[id] = char;
        });

        this.vocabSize = Object.keys(this.charToId).length;
    }

    // Custom encode function - character level tokenization
    encode(text, addSpecialTokens = true) {
        const tokens = [];

        // Add beginning of sequence token
        if (addSpecialTokens) {
            tokens.push(this.specialTokens['<BOS>']);
        }

        // Convert each character to its token ID
        for (let char of text) {
            if (this.charToId.hasOwnProperty(char)) {
                tokens.push(this.charToId[char]);
            }
            // Skip unknown characters (they're simply not included)
        }

        // Add end of sequence token
        if (addSpecialTokens) {
            tokens.push(this.specialTokens['<EOS>']);
        }

        return tokens;
    }

    // Custom decode function
    decode(tokenIds) {
        return tokenIds
            .map(id => this.idToChar[id] || '')
            .filter(char => !['<BOS>', '<EOS>'].includes(char))
            .join('');
    }

    // Get vocabulary size
    getVocabSize() {
        return this.vocabSize;
    }

    // Get supported characters
    getSupportedChars() {
        return Object.keys(this.charToId)
            .filter(char => !['<BOS>', '<EOS>'].includes(char))
            .sort();
    }

    // Get token breakdown for visualization
    getTokenBreakdown(text) {
        const breakdown = [];
        for (let char of text) {
            if (this.charToId.hasOwnProperty(char)) {
                breakdown.push({
                    char: char,
                    id: this.charToId[char],
                    type: char === ' ' ? 'space' :
                        /[.!?,:;\-'"]/.test(char) ? 'punctuation' :
                            /[0-9]/.test(char) ? 'number' :
                                /[a-zA-Z]/.test(char) ? 'letter' : 'other'
                });
            }
        }
        return breakdown;
    }
}

export default CustomTokenizer;
