import axios from 'axios';
import { downloadPptx } from '../api';
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

export const downloadPptx = async (slides, topic) => {
  const response = await api.post('/api/export/pptx', { slides, topic }, {
    responseType: 'blob', // MUST HAVE THIS
  });
  
  // Create a link in the browser memory and "click" it for the user
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${topic}.pptx`);
  document.body.appendChild(link);
  link.click();
  link.remove(); // Clean up
};
