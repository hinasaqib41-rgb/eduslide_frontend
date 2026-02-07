import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7860';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes (generation takes time!)
  // Note: We removed the global 'Content-Type' header here because 
  // Axios handles it automatically for FormData and JSON.
});

// API endpoints
export const generateFromTopic = async (topic, numSlides = 10, educationLevel = "High School") => {
  // Topics can be sent as simple JSON
  const response = await api.post('/api/generate/topic', {
    topic: topic,
    num_slides: numSlides,
    education_level: educationLevel,
    input_type: 'topic' // Matches our new backend logic
  });
  
  return response.data; // This will now be your JSON array of slides
};

export const generateFromPdf = async (file, numSlides = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_slides', numSlides);
  formData.append('input_type', 'pdf_text'); // Critical for chunking logic
  
  const response = await api.post('/api/generate/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export const generateFromImage = async (file, numSlides = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_slides', numSlides);
  formData.append('input_type', 'image_description');
  
  const response = await api.post('/api/generate/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.data;
};

export default api;
