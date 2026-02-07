import axios from 'axios';

// Update this URL to your HuggingFace Docker backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7860';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes timeout for slide generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const generateFromTopic = async (topic, numSlides = 10) => {
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('num_slides', numSlides);
  
  const response = await api.post('/generate-from-topic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  });
  
  return response.data;
};

export const generateFromPdf = async (file, slidesPerChapter = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('slides_per_chapter', slidesPerChapter);
  
  const response = await api.post('/generate-from-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  });
  
  return response.data;
};

export const generateFromImage = async (file, numSlides = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_slides', numSlides);
  
  const response = await api.post('/generate-from-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  });
  
  return response.data;
};

export default api;
