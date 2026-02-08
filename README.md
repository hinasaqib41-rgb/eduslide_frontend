# EduSlide AI Frontend

AI-Powered Educational Slide Generator - React Frontend

## 🚀 Features

- **Topic Input**: Generate slides from any educational topic
- **PDF Upload**: Convert eBooks and PDFs into presentations (10 slides per chapter)
- **Image Upload**: Extract text from images using OCR and create slides
- **Beautiful UI**: Modern, responsive design with drag-and-drop support
- **Fast Generation**: AI-powered slide creation in seconds

## 📋 Prerequisites

- Node.js 18+ installed
- Backend API running (HuggingFace Space or local)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eduslide-ai-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   backend API URL:
   ```
   VITE_API_URL=https://hinasaqib41-eduslide-backend.hf.space
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

## 🔧 Configuration

### Backend API URL

Update the API URL in `.env`:

- **Local development**: `http://localhost:7860`
- **HuggingFace Space**: `https://hinasaqib41-eduslide-backend.hf.space`

### API Endpoints

The frontend connects to these backend endpoints:

- `POST /generate-from-topic` - Generate from topic input
- `POST /generate-from-pdf` - Generate from PDF file
- `POST /generate-from-image` - Generate from image file

## 📱 Usage

### Topic Generator
1. Enter any educational topic
2. Set number of slides (5-50)
3. Click "Generate Presentation"
4. Download the PPTX file

### PDF Generator
1. Upload a PDF or eBook
2. Set slides per chapter (5-30)
3. Click "Generate Presentation"
4. Download the PPTX file

### Image Generator
1. Upload an image (JPG, PNG, etc.)
2. Set number of slides (5-50)
3. Click "Generate Presentation"
4. Download the PPTX file

## 🎨 Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling with animations

## 📂 Project Structure

```
src/
├── components/
│   ├── TopicGenerator.jsx    # Topic input component
│   ├── PdfGenerator.jsx       # PDF upload component
│   ├── ImageGenerator.jsx     # Image upload component
│   └── Generator.css          # Shared styles
├── api.js                     # API configuration
├── App.jsx                    # Main app with tabs
├── App.css                    # App styles
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   ```
   VITE_API_URL=https://hinasaqib41-eduslide-backend.hf.space
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Set environment variable in Netlify:
   ```
   VITE_API_URL=https://hinasaqib41-eduslide-backend.hf.space
   ```

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, make sure your backend allows requests from your frontend domain.

### Long Loading Times
Slide generation can take 30-120 seconds depending on complexity. The timeout is set to 5 minutes.

### File Upload Limits
- PDFs: Maximum 50MB
- Images: Maximum 10MB

## 📄 License

MIT License

## 👤 Author

Your Name

## 🙏 Acknowledgments

Built for educators worldwide to make teaching materials creation easier!
