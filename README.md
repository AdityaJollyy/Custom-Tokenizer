# Custom Character Tokenizer

A web-based character-level tokenizer built with React and Vite. This interactive tool allows you to encode text into token sequences and decode token sequences back into text, making it perfect for understanding tokenization concepts or preprocessing text for machine learning models.

## ✨ Features

- **Real-time Tokenization**: Instantly see your text converted to tokens as you type
- **Bidirectional Processing**: Encode text to tokens and decode tokens back to text
- **Character-level Tokenization**: Each character maps to a unique token ID
- **Special Tokens**: Includes Beginning of Sequence (BOS) and End of Sequence (EOS) tokens
- **Interactive Vocabulary Viewer**: Browse and search through the complete token vocabulary
- **Copy to Clipboard**: Easily copy token sequences or decoded text
- **Modern UI**: Clean, responsive interface with real-time feedback

## 🎯 Use Cases

- **Educational**: Learn how tokenization works in NLP
- **Preprocessing**: Prepare text data for machine learning models
- **Debugging**: Understand how your text gets tokenized
- **Research**: Experiment with character-level tokenization approaches

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd custom-tokenizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   or with yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   or with yarn:

   ```bash
   yarn dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see the tokenizer in action!

## 📖 How to Use

### Encoding Text to Tokens

1. Enter your text in the left panel input field
2. Watch as the text is automatically tokenized in real-time
3. Toggle "Add Special Tokens" to include/exclude BOS and EOS tokens
4. Click on any token to copy it to your clipboard
5. Use the sample texts for quick testing

### Decoding Tokens to Text

1. Enter comma-separated token IDs in the right panel
2. See the decoded text appear automatically
3. Copy the decoded text with the copy button

### Exploring the Vocabulary

1. Click "View Full Vocabulary" to see all available tokens
2. Search for specific characters or token IDs
3. Filter by token type (special, letters, numbers, punctuation)
4. View statistics about the vocabulary composition

## 🏗️ Project Structure

```
custom-tokenizer/
├── public/
│   └── react-icon.svg          # App favicon
├── src/
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── Tokenizer.jsx           # Core tokenizer class and component
│   ├── Vocabulary.jsx          # Vocabulary browser component
│   ├── main.jsx               # Application entry point
│   └── assets/
│       └── react.svg          # React logo
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint configuration
└── README.md                  # This file
```

## 🔧 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the project for production         |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint to check code quality         |

## 📚 Tokenizer Specification

### Vocabulary

The tokenizer uses a character-level approach with the following vocabulary:

- **Special Tokens**: `<BOS>` (ID: 0), `<EOS>` (ID: 1)
- **Punctuation**: Space, period, comma, exclamation, question mark, etc.
- **Numbers**: 0-9 (IDs: 12-21)
- **Lowercase Letters**: a-z (IDs: 22-47)
- **Uppercase Letters**: A-Z (IDs: 48-73)

**Total Vocabulary Size**: 74 tokens

### API

The `CustomTokenizer` class provides the following methods:

```javascript
// Create a new tokenizer instance
const tokenizer = new CustomTokenizer();

// Encode text to token IDs
const tokens = tokenizer.encode("Hello!", (addSpecialTokens = true));
// Returns: [0, 55, 26, 33, 33, 36, 5, 1] (with special tokens)

// Decode token IDs to text
const text = tokenizer.decode([55, 26, 33, 33, 36, 5]);
// Returns: "Hello!"

// Get vocabulary size
const vocabSize = tokenizer.getVocabSize();
// Returns: 74

// Get character-to-ID mapping
const charToId = tokenizer.charToId;

// Get ID-to-character mapping
const idToChar = tokenizer.idToChar;
```

## 🛠️ Development

### Technology Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Code Quality**: ESLint with React-specific rules

### Development Guidelines

1. **Code Style**: Follow the existing ESLint configuration
2. **Components**: Keep components focused and reusable
3. **State Management**: Use React hooks for state management
4. **Styling**: Use CSS modules or styled-components for component-specific styles

### Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Happy Tokenizing! 🚀**
