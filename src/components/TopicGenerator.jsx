import { useState } from 'react';
import { generateFromTopic } from '../api';
import './Generator.css';

function TopicGenerator() {
  const [topic, setTopic] = useState('');
  const [numSlides, setNumSlides] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const blob = await generateFromTopic(topic, numSlides);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${topic.replace(/\s+/g, '_')}_slides.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setTopic('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate slides. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-card">
        <div className="card-header">
          <h2>Generate from Topic</h2>
          <p>Enter any educational topic and get AI-generated slides</p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label htmlFor="topic">Topic or Subject</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, World War II, Python Programming"
              className="form-input"
              disabled={loading}
            />
            <span className="form-hint">Be specific for better results</span>
          </div>

          <div className="form-group">
            <label htmlFor="numSlides">Number of Slides</label>
            <input
              type="number"
              id="numSlides"
              value={numSlides}
              onChange={(e) => setNumSlides(parseInt(e.target.value))}
              min="5"
              max="50"
              className="form-input"
              disabled={loading}
            />
            <span className="form-hint">Minimum 5, maximum 50 slides</span>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating Slides...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Presentation
              </>
            )}
          </button>
        </form>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Beautiful Design</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <span>AI-Powered</span>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Fast Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicGenerator;
