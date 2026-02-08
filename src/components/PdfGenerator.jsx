import { useState } from 'react';
import { generateFromPdf, downloadPptx } from '../api';
import './Generator.css';

const PdfGenerator = () => {
  const [file, setFile] = useState(null);
  const [numSlides, setNumSlides] = useState(10);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!file) return alert("Please upload a PDF first");
    
    setLoading(true);
    try {
      // API returns the JSON array of slides
      const data = await generateFromPdf(file, numSlides);
      setSlides(data);
    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Failed to process PDF. Make sure it's not password protected.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (slides.length === 0) return;
    setIsDownloading(true);
    try {
      // Using the filename or a generic title for the PPTX
      const reportName = file ? file.name.replace('.pdf', '') : "PDF_Presentation";
      await downloadPptx(slides, reportName);
    } catch (err) {
      alert("Could not download the file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="generator-container">
      {/* The Beautiful Box for PDF Upload */}
      <div className="upload-card">
        <div className="form-group">
          <label>Transform PDF into Slides</label>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
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
            disabled={loading || !file} 
            className="generate-btn"
          >
            {loading ? 'Analyzing PDF...' : 'Generate Slides from PDF'}
          </button>
        </div>
      </div>

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

      {/* Slides Display */}
      <div className="slides-results">
        {slides.length > 0 && <h2>Content from PDF</h2>}
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

export default PdfGenerator;
