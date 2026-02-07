import { useState } from 'react';
import { generateFromImage } from '../api';
import './Generator.css';

function ImageGenerator() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [numSlides, setNumSlides] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setError('Please select a valid image file (JPG, PNG, etc.)');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        setError('');
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setError('Please drop a valid image file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const blob = await generateFromImage(file, numSlides);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}_slides.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setFile(null);
      setPreview(null);
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
          <h2>Generate from Image</h2>
          <p>Upload an educational image and get AI-generated presentation slides</p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label>Image File</label>
            <div
              className={`file-drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="image-file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                disabled={loading}
              />
              <label htmlFor="image-file" className="file-label">
                {preview ? (
                  <div className="image-preview">
                    <img src={preview} alt="Preview" />
                    <span className="file-name">{file.name}</span>
                  </div>
                ) : (
                  <>
                    <span className="upload-icon">🖼️</span>
                    <span className="upload-text">
                      Drag & drop your image here or click to browse
                    </span>
                    <span className="upload-hint">
                      Supports JPG, PNG, GIF, WEBP (Max 10MB)
                    </span>
                  </>
                )}
              </label>
            </div>
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
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing Image...
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
            <span className="feature-icon">👁️</span>
            <span>OCR Technology</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <span>Content Analysis</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Visual Enhancement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
