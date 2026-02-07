import { useState } from 'react';
import { generateFromImage } from '../api';

const ImageGenerator = () => {
  const [image, setImage] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!image) return alert("Please upload an image first");
    setLoading(true);
    try {
      const data = await generateFromImage(image, 10);
      setSlides(data);
    } catch (err) {
      console.error("Image Generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Processing Image...' : 'Generate Slides'}
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
              <strong>💡 Example:</strong> {slide.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
