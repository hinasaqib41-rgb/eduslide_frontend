import axios from 'axios';

// Ensure there is no trailing slash here
const API_BASE_URL = 'https://hinasaqib41-eduslide-backend.hf.space';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, 
});

export const generateFromTopic = async (topic, numSlides = 10) => {
  const formData = new FormData();
  formData.append('topic', topic);
  formData.append('num_slides', numSlides);
  formData.append('education_level', 'High School');

  // Path must match @app.post in Python
  const response = await api.post('/api/generate/topic', formData);
  return response.data;
};

export const generateFromPdf = async (file, numSlides = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_slides', numSlides);

  const response = await api.post('/api/generate/pdf', formData);
  return response.data;
};

export const generateFromImage = async (file, numSlides = 10) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('num_slides', numSlides);

  const response = await api.post('/api/generate/image', formData);
  return response.data;
};

export default api;
