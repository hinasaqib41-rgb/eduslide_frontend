import React, { useState } from 'react';
import { generateFromTopic, downloadPptx } from '../api';
import './Generator.css'; 

const TopicGenerator = () => {
  const [topic, setTopic] = useState('');
  const [numSlides, setNumSlides] = useState(10);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return alert("Please enter a topic");
    
    setLoading(true);
    try {
      const data = await generateFromTopic(topic, numSlides);
      setSlides(data);
    } catch (err) {
      console.error("Topic Generation failed:", err);
      alert("Failed to generate slides. Check your API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (slides.length === 0) return;
    setIsDownloading(true);
    try {
      await downloadPptx(slides, topic);
    } catch (err) {
      alert("Could not download the file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="generator-container">
      {/* Input Section */}
      <form onSubmit={handleGenerate} className="input-section">
        <div className="form-group">
          <label>What topic do you want to teach?</label>
          <input 
            type="text" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
            placeholder="e.g., Photosynthesis, Civil War, Quantum Physics..."
            className="topic-input"
          />
        </div>
        
        <div className="form-controls">
          <select value={numSlides} onChange={(e) => setNumSlides(parseInt(e.target.value))}>
            <option value={5}>5 Slides</option>
            <option value={10}>10 Slides</option>
            <option value={15}>15 Slides</option>
          </select>
          
          <button type="submit" disabled={loading} className="generate-btn">
            {loading ? 'AI is Planning Lessons...' : 'Generate Educational Slides'}
          </button>
        </div>
      </form>

      {/* Download Section - Only shows after slides are generated */}
      {slides.length > 0 && (
        <div className="download-container">
          <button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="download-button"
          >
            {isDownloading ? "Creating File..." : "📥 Download PowerPoint"}
          </button>
        </div>
      )}

      {/* Results Section */}
      <div className="slides-results">
        {slides.length > 0 && <h2>Generated Presentation Plan</h2>}
        {slides.map((slide, index) => (
          <div key={index} className="slide-card">
            <div className="slide-number">Slide {index + 1}</div>
            <h3>{slide.title}</h3>
            
            <ul className="slide-bullet-points">
              {slide.content && slide.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <div className="example-section">
              <strong>💡 Real-world Example:</strong>
              <p>{slide.example}</p>
            </div>

            {slide.visual_suggestion && (
              <div className="visual-hint">
                <strong>🎨 Visual Suggestion:</strong> {slide.visual_suggestion}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicGenerator;
