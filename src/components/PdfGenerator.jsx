import { useState } from 'react';
import { generateFromPdf } from '../api';

const PdfGenerator = () => {
  const [file, setFile] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!file) return alert("Please upload a PDF first");
    setLoading(true);
    try {
      // API now returns the JSON array of slides
      const data = await generateFromPdf(file, 10);
      setSlides(data);
    } catch (err) {
      console.error("PDF Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <div className="upload-box">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Analyzing PDF & Generating...' : 'Generate Slides'}
        </button>
      </div>

      <div className="slides-display">
        {slides.map((slide, index) => (
          <div key={index} className="slide-card">
            <h3>{slide.title}</h3>
            <ul>
              {slide.content.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
            <div className="example-box">
              <strong>💡 Teacher's Example:</strong> {slide.example}
            </div>
            <div className="visual-suggestion">
              <strong>🎨 Suggested Visual:</strong> {slide.visual_suggestion}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfGenerator;
