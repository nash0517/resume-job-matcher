# Resume Job Matcher 🎯

A modern, AI-powered web application that analyzes resumes and job descriptions to provide intelligent matching scores and career recommendations.

## 🌟 Features

- **LinkedIn URL Integration**: Fetch job descriptions directly from LinkedIn job URLs
- **File Upload Support**: Upload resumes and job descriptions in PDF, DOC, DOCX, and TXT formats
- **Drag & Drop Interface**: Intuitive drag-and-drop file upload functionality
- **Text Input**: Paste job descriptions directly into the text area
- **AI-Powered Analysis**: Intelligent matching algorithm that compares:
  - Required vs. existing skills
  - Experience levels
  - Education requirements
  - Certifications and qualifications
- **Match Scoring**: Comprehensive scoring system with detailed breakdowns
- **Smart Recommendations**: Personalized suggestions for improving job match
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, professional interface with smooth animations

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start using the application immediately!

### Option 2: Local Server (Recommended)
```bash
# Navigate to the project directory
cd resume-job-matcher

# Start a simple HTTP server (Python 3)
python -m http.server 8000

# Or using Node.js (if you have it installed)
npx serve .

# Or using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
resume-job-matcher/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript logic and functionality
└── README.md           # This documentation file
```

## 🎨 How It Works

### 1. Upload Documents
- **Resume Upload**: Upload your resume in PDF, DOC, or DOCX format
- **Job Description**: 
  - **LinkedIn URL**: Enter a LinkedIn job URL to automatically fetch the job description
  - **File Upload**: Upload a job description file (PDF, DOC, DOCX, TXT)
  - **Text Input**: Paste the job description text directly

### 2. AI Analysis
The system analyzes both documents and extracts:
- **Skills and Technologies**
- **Experience Requirements**
- **Education Background**
- **Certifications**
- **Key Responsibilities**

### 3. Matching Algorithm
The matching algorithm calculates scores based on:
- **Skills Match (60%)**: How well your skills align with job requirements
- **Experience Match (25%)**: Experience level compatibility
- **Education Match (15%)**: Educational background alignment

### 4. Results & Recommendations
- **Overall Match Score**: Percentage-based compatibility score
- **Detailed Breakdown**: Individual scores for each category
- **Smart Recommendations**: Actionable advice to improve your match

## 🛠️ Customization

### Adding New File Types
To support additional file formats, modify the `accept` attribute in the HTML:

```html
<input type="file" id="resume-upload" accept=".pdf,.doc,.docx,.rtf">
```

### Modifying the Matching Algorithm
Edit the `calculateMatchScore()` function in `script.js` to adjust:
- Scoring weights
- Matching criteria
- Additional factors

### Styling Changes
All styling is in `styles.css`. Key sections:
- `.header` - Header styling
- `.upload-section` - Upload area styling
- `.results-section` - Results display styling
- `@media` queries - Responsive design

## 🔧 Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Size Limits
- Maximum file size: 10MB (configurable in JavaScript)
- Supported formats: PDF, DOC, DOCX, TXT

### Performance
- Client-side processing for fast analysis
- No server required for basic functionality
- Optimized for mobile devices

## 🚀 Deployment Options

### GitHub Pages
1. Upload files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Get instant deployment with custom domain options

### Vercel
1. Connect your GitHub repository to Vercel
2. Automatic deployments on every push

### Traditional Web Hosting
1. Upload all files to your web server
2. Ensure proper MIME types are configured

## 🔮 Future Enhancements

### Planned Features
- **Real AI Integration**: Connect to OpenAI GPT or similar services
- **PDF Text Extraction**: Actual PDF parsing for real document analysis
- **Resume Templates**: Built-in resume builder
- **Job Board Integration**: Connect to popular job sites
- **User Accounts**: Save and manage multiple resumes
- **Advanced Analytics**: Detailed career insights and trends
- **Export Options**: Download analysis reports as PDF

### API Integration Ideas
- **LinkedIn API**: Import profile data
- **Job Board APIs**: Real-time job matching
- **AI Services**: OpenAI, Google Cloud AI, AWS Comprehend
- **Resume Parsing**: ATS-friendly resume analysis

## 🐛 Troubleshooting

### Common Issues

**Files not uploading:**
- Check file size (must be under 10MB)
- Ensure file format is supported
- Try refreshing the page

**Analysis not working:**
- Ensure both resume and job description are provided
- Check browser console for errors
- Try with different file formats

**Styling issues:**
- Clear browser cache
- Ensure all CSS files are loaded
- Check for JavaScript errors

### Browser Console
Open browser developer tools (F12) and check the Console tab for any error messages.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit:
- Bug reports
- Feature requests
- Pull requests
- Documentation improvements

## 📞 Support

For questions or support:
- Create an issue in the repository
- Check the troubleshooting section
- Review the code comments for technical details

---

**Built with ❤️ for better career matching**
