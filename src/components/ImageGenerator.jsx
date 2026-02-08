import { useState } from 'react';
import { generateFromImage, downloadPptx } from '../api';
import './Generator.css';

const ImageGenerator = () => {
  const [image, setImage] = useState(null);
  const [numSlides, setNumSlides] = useState(10);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!image) return alert("Please upload an image first");
    
    setLoading(true);
    try {
      const data = await generateFromImage(image, numSlides);
      setSlides(data);
    } catch (err) {
      console.error("Image Generation failed", err);
      alert("Failed to process the image. Please ensure it is a clear JPG or PNG.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (slides.length === 0) return;
    setIsDownloading(true);
    try {
      const fileName = image ? image.name.split('.')[0] : "Image_Presentation";
      await downloadPptx(slides, fileName);
    } catch (err) {
      alert("Could not download the file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="generator-container">
      {/* The Beautiful Box for Image Upload */}
      <div className="upload-card">
        <div className="form-group">
          <label>Turn Image into Slides</label>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '10px' }}>
            Upload a photo of a textbook page, a whiteboard, or a diagram.
          </p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="file-input"
          />
        </div>

        <div className="form-controls">
          <select 
            value={numSlides} 
            onChange={(e) => setNumSlides(parseInt(e.target.value))}
          >
            <option value={5}>5 Slides</option>
            <option value={10}>10 Slides</option>
            <option value={15}>15 Slides</option>
          </select>

          <button 
            onClick={handleGenerate} 
            disabled={loading || !image} 
            className="generate-btn"
          >
            {loading ? 'Reading Image...' : 'Generate Slides from Image'}
          </button>
        </div>
      </div>

      {/* Download Section */}
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

      {/* Results Display */}
      <div className="slides-results">
        {slides.length > 0 && <h2>Analyzed Content</h2>}
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
              <strong>💡 Example:</strong>
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

export default ImageGenerator;
