import { useState } from 'react';
import TopicGenerator from './components/TopicGenerator';
import PdfGenerator from './components/PdfGenerator';
import ImageGenerator from './components/ImageGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('topic');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">📊</div>
            <div>
              <h1>EduSlide AI</h1>
              <p className="tagline">AI-Powered Educational Slide Generator</p>
            </div>
          </div>
          <p className="header-description">
            Transform your teaching materials into beautiful presentations instantly
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'topic' ? 'active' : ''}`}
            onClick={() => setActiveTab('topic')}
          >
            <span className="tab-icon">💡</span>
            Topic Input
          </button>
          <button
            className={`tab ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            <span className="tab-icon">📄</span>
            PDF Upload
          </button>
          <button
            className={`tab ${activeTab === 'image' ? 'active' : ''}`}
            onClick={() => setActiveTab('image')}
          >
            <span className="tab-icon">🖼️</span>
            Image Upload
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'topic' && <TopicGenerator />}
          {activeTab === 'pdf' && <PdfGenerator />}
          {activeTab === 'image' && <ImageGenerator />}
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ for educators worldwide</p>
      </footer>
    </div>
  );
}

export default App;
