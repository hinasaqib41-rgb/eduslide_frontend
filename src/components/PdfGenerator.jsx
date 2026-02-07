import { useState } from 'react';
import { generateFromPdf } from '../api';
import './Generator.css';

function PdfGenerator() {
  const [file, setFile] = useState(null);
  const [slidesPerChapter, setSlidesPerChapter] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
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
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Please drop a valid PDF file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const blob = await generateFromPdf(file, slidesPerChapter);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}_slides.pptx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setFile(null);
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
          <h2>Generate from PDF/eBook</h2>
          <p>Upload your PDF or eBook and get slides for each chapter</p>
        </div>

        <form onSubmit={handleSubmit} className="generator-form">
          <div className="form-group">
            <label>PDF File</label>
            <div
              className={`file-drop-zone ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="pdf-file"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
                disabled={loading}
              />
              <label htmlFor="pdf-file" className="file-label">
                {file ? (
                  <>
                    <span className="file-icon">📄</span>
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="upload-icon">📤</span>
                    <span className="upload-text">
                      Drag & drop your PDF here or click to browse
                    </span>
                    <span className="upload-hint">Maximum file size: 50MB</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="slidesPerChapter">Slides per Chapter</label>
            <input
              type="number"
              id="slidesPerChapter"
              value={slidesPerChapter}
              onChange={(e) => setSlidesPerChapter(parseInt(e.target.value))}
              min="5"
              max="30"
              className="form-input"
              disabled={loading}
            />
            <span className="form-hint">Each chapter will generate this many slides</span>
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
                Processing PDF...
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
            <span className="feature-icon">📚</span>
            <span>Multi-Chapter</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔍</span>
            <span>Smart Extraction</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Auto-Summarize</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfGenerator;
