// Resume Job Matcher - JavaScript Logic

class ResumeJobMatcher {
    constructor() {
        this.resumeFile = null;
        this.jobFile = null;
        this.jobDescription = '';
        this.linkedinUrl = '';
        this.fetchedJobData = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // File upload listeners
        document.getElementById('resume-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'resume');
        });

        document.getElementById('job-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'job');
        });

        // LinkedIn URL input
        document.getElementById('linkedin-url').addEventListener('input', (e) => {
            this.linkedinUrl = e.target.value;
            this.updateFetchButton();
        });

        // Fetch job button
        document.getElementById('fetch-job-btn').addEventListener('click', () => {
            this.fetchJobFromLinkedIn();
        });

        // Job description text input
        document.getElementById('job-description-text').addEventListener('input', (e) => {
            this.jobDescription = e.target.value;
            this.updateAnalyzeButton();
        });

        // Analyze button
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.performAnalysis();
        });

        // Drag and drop functionality
        this.setupDragAndDrop();
    }

    handleFileUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        if (type === 'resume') {
            this.resumeFile = file;
            this.displayFileInfo('resume-info', file);
        } else if (type === 'job') {
            this.jobFile = file;
            this.displayFileInfo('job-info', file);
        }

        this.updateAnalyzeButton();
    }

    displayFileInfo(elementId, file) {
        const fileInfo = document.getElementById(elementId);
        fileInfo.innerHTML = `
            <i class="fas fa-file"></i>
            <strong>${file.name}</strong> (${this.formatFileSize(file.size)})
        `;
        fileInfo.classList.add('show');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    setupDragAndDrop() {
        const uploadCards = document.querySelectorAll('.upload-card');
        
        uploadCards.forEach(card => {
            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                card.classList.add('dragover');
            });

            card.addEventListener('dragleave', () => {
                card.classList.remove('dragover');
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const file = files[0];
                    const isResumeCard = card.querySelector('h3').textContent.includes('Resume');
                    
                    if (isResumeCard) {
                        this.resumeFile = file;
                        this.displayFileInfo('resume-info', file);
                    } else {
                        this.jobFile = file;
                        this.displayFileInfo('job-info', file);
                    }
                    
                    this.updateAnalyzeButton();
                }
            });
        });
    }

    updateFetchButton() {
        const fetchBtn = document.getElementById('fetch-job-btn');
        const isValidUrl = this.isValidLinkedInUrl(this.linkedinUrl);
        fetchBtn.disabled = !isValidUrl;
    }

    isValidLinkedInUrl(url) {
        if (!url) return false;
        const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/jobs\/(view|search)\//;
        return linkedinPattern.test(url);
    }

    async fetchJobFromLinkedIn() {
        const fetchBtn = document.getElementById('fetch-job-btn');
        const statusDiv = document.getElementById('url-status');
        
        // Show loading state
        fetchBtn.classList.add('loading');
        fetchBtn.disabled = true;
        fetchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching...';
        
        statusDiv.className = 'url-status loading';
        statusDiv.textContent = 'Fetching job description from LinkedIn...';
        statusDiv.style.display = 'block';

        try {
            // Simulate fetching job data (in real implementation, you'd use a backend service)
            await this.delay(2000);
            
            // Mock job data based on the LinkedIn URL pattern
            this.fetchedJobData = await this.simulateLinkedInJobFetch(this.linkedinUrl);
            
            // Update the job description text area
            document.getElementById('job-description-text').value = this.fetchedJobData.description;
            this.jobDescription = this.fetchedJobData.description;
            
            // Show success status
            statusDiv.className = 'url-status success';
            statusDiv.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Successfully fetched job: <strong>${this.fetchedJobData.title}</strong> at ${this.fetchedJobData.company}
            `;
            
            // Update analyze button
            this.updateAnalyzeButton();
            
        } catch (error) {
            console.error('Error fetching job:', error);
            statusDiv.className = 'url-status error';
            statusDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                Failed to fetch job description. Please try uploading a file or pasting the text manually.
            `;
        } finally {
            // Reset button state
            fetchBtn.classList.remove('loading');
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = '<i class="fas fa-download"></i> Fetch Job';
        }
    }

    async simulateLinkedInJobFetch(url) {
        // This simulates fetching job data from LinkedIn
        // In a real implementation, you'd need a backend service to scrape LinkedIn
        // due to CORS restrictions and LinkedIn's anti-scraping measures
        
        const mockJobData = {
            title: "Sales Director of AIDC",
            company: "Ruijie Networks",
            location: "Taiwan",
            description: `
Sales Director of AIDC - Ruijie Networks

About the Role:
We are seeking an experienced Sales Director to lead our AIDC (Automatic Identification and Data Capture) business unit. This role will be responsible for driving sales growth, managing key client relationships, and developing strategic partnerships.

Key Responsibilities:
• Develop and execute sales strategies for AIDC products and solutions
• Manage and grow existing client relationships
• Identify and pursue new business opportunities
• Lead a team of sales professionals
• Collaborate with product development teams
• Achieve sales targets and KPIs
• Prepare sales reports and forecasts

Required Qualifications:
• Bachelor's degree in Business, Engineering, or related field
• 5+ years of experience in sales management
• Experience in AIDC, RFID, or related technologies
• Strong leadership and team management skills
• Excellent communication and negotiation skills
• Proven track record of meeting sales targets
• Experience in B2B sales environment

Preferred Qualifications:
• Master's degree in Business Administration
• Experience in technology or manufacturing industry
• Knowledge of Asian markets
• Multilingual capabilities

Benefits:
• Competitive salary and commission structure
• Health insurance and retirement benefits
• Professional development opportunities
• Flexible work arrangements
• International travel opportunities

Location: Taiwan (with potential for remote work)
Employment Type: Full-time
Experience Level: Executive
            `.trim(),
            requirements: [
                "Bachelor's degree in Business, Engineering, or related field",
                "5+ years of experience in sales management",
                "Experience in AIDC, RFID, or related technologies",
                "Strong leadership and team management skills",
                "Excellent communication and negotiation skills",
                "Proven track record of meeting sales targets",
                "Experience in B2B sales environment"
            ],
            preferred: [
                "Master's degree in Business Administration",
                "Experience in technology or manufacturing industry",
                "Knowledge of Asian markets",
                "Multilingual capabilities"
            ]
        };

        return mockJobData;
    }

    updateAnalyzeButton() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const hasResume = this.resumeFile !== null;
        const hasJob = this.jobFile !== null || this.jobDescription.trim() !== '' || this.fetchedJobData !== null;
        
        analyzeBtn.disabled = !(hasResume && hasJob);
    }

    async performAnalysis() {
        // Show results section
        document.getElementById('results-section').style.display = 'block';
        
        // Scroll to results
        document.getElementById('results-section').scrollIntoView({ 
            behavior: 'smooth' 
        });

        try {
            // Simulate analysis delay
            await this.delay(2000);

            // Analyze resume
            const resumeAnalysis = await this.analyzeResume();
            this.displayResumeAnalysis(resumeAnalysis);

            // Analyze job
            const jobAnalysis = await this.analyzeJob();
            this.displayJobAnalysis(jobAnalysis);

            // Calculate match score
            const matchScore = this.calculateMatchScore(resumeAnalysis, jobAnalysis);
            this.displayMatchScore(matchScore);

            // Generate recommendations
            const recommendations = this.generateRecommendations(resumeAnalysis, jobAnalysis, matchScore);
            this.displayRecommendations(recommendations);

        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('Analysis failed. Please try again.');
        }
    }

    async analyzeResume() {
        // Simulate resume analysis
        await this.delay(1000);
        
        return {
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
            experience: '5 years',
            education: 'Bachelor of Computer Science',
            certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
            languages: ['English', 'Spanish'],
            summary: 'Experienced full-stack developer with strong background in web development and cloud technologies.'
        };
    }

    async analyzeJob() {
        // Simulate job analysis
        await this.delay(1000);
        
        // Use fetched job data if available, otherwise use default
        if (this.fetchedJobData) {
            return {
                title: this.fetchedJobData.title,
                company: this.fetchedJobData.company,
                location: this.fetchedJobData.location,
                requiredSkills: this.extractSkillsFromText(this.fetchedJobData.description),
                preferredSkills: this.extractPreferredSkills(this.fetchedJobData.description),
                experience: this.extractExperience(this.fetchedJobData.description),
                education: this.extractEducation(this.fetchedJobData.description),
                responsibilities: this.fetchedJobData.requirements || [],
                benefits: this.extractBenefits(this.fetchedJobData.description)
            };
        }
        
        // Default analysis for uploaded/pasted job descriptions
        return {
            requiredSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
            preferredSkills: ['AWS', 'Docker', 'TypeScript'],
            experience: '3-5 years',
            education: 'Bachelor degree in Computer Science or related field',
            responsibilities: [
                'Develop and maintain web applications',
                'Collaborate with cross-functional teams',
                'Write clean, maintainable code',
                'Participate in code reviews'
            ],
            benefits: ['Health insurance', 'Remote work', 'Professional development budget']
        };
    }

    extractSkillsFromText(text) {
        // Simple skill extraction (in real implementation, use NLP)
        const commonSkills = [
            'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
            'Sales', 'Management', 'Leadership', 'Communication', 'Negotiation',
            'AIDC', 'RFID', 'B2B', 'Business Development', 'Client Relations'
        ];
        
        const foundSkills = commonSkills.filter(skill => 
            text.toLowerCase().includes(skill.toLowerCase())
        );
        
        return foundSkills.length > 0 ? foundSkills : ['Sales', 'Management', 'Leadership'];
    }

    extractPreferredSkills(text) {
        const preferredKeywords = ['preferred', 'nice to have', 'bonus', 'advantage'];
        // This is a simplified extraction - in reality, you'd use more sophisticated NLP
        return ['Master\'s degree', 'International experience', 'Multilingual'];
    }

    extractExperience(text) {
        const experienceMatch = text.match(/(\d+)\+?\s*years?\s*(of\s*)?experience/i);
        if (experienceMatch) {
            return `${experienceMatch[1]}+ years`;
        }
        return '5+ years';
    }

    extractEducation(text) {
        if (text.toLowerCase().includes('master')) return 'Master\'s degree preferred';
        if (text.toLowerCase().includes('bachelor')) return 'Bachelor\'s degree required';
        return 'Bachelor\'s degree or equivalent';
    }

    extractBenefits(text) {
        const benefits = [];
        if (text.toLowerCase().includes('health insurance')) benefits.push('Health insurance');
        if (text.toLowerCase().includes('remote')) benefits.push('Remote work options');
        if (text.toLowerCase().includes('development')) benefits.push('Professional development');
        if (text.toLowerCase().includes('travel')) benefits.push('Travel opportunities');
        return benefits.length > 0 ? benefits : ['Competitive benefits package'];
    }

    calculateMatchScore(resumeAnalysis, jobAnalysis) {
        // Simple matching algorithm
        const requiredSkills = jobAnalysis.requiredSkills;
        const resumeSkills = resumeAnalysis.skills;
        
        const matchedSkills = requiredSkills.filter(skill => 
            resumeSkills.some(resumeSkill => 
                resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(resumeSkill.toLowerCase())
            )
        );

        const skillMatchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
        
        // Experience matching
        const experienceMatch = this.matchExperience(resumeAnalysis.experience, jobAnalysis.experience);
        
        // Education matching
        const educationMatch = this.matchEducation(resumeAnalysis.education, jobAnalysis.education);
        
        // Overall score calculation
        const overallScore = Math.round(
            (skillMatchPercentage * 0.6) + 
            (experienceMatch * 0.25) + 
            (educationMatch * 0.15)
        );

        return {
            overall: Math.min(overallScore, 100),
            breakdown: {
                skills: Math.round(skillMatchPercentage),
                experience: experienceMatch,
                education: educationMatch
            },
            matchedSkills: matchedSkills,
            missingSkills: requiredSkills.filter(skill => !matchedSkills.includes(skill))
        };
    }

    matchExperience(resumeExp, jobExp) {
        const resumeYears = parseInt(resumeExp);
        const jobYears = parseInt(jobExp.split('-')[0]);
        
        if (resumeYears >= jobYears) return 100;
        if (resumeYears >= jobYears - 1) return 80;
        if (resumeYears >= jobYears - 2) return 60;
        return 40;
    }

    matchEducation(resumeEdu, jobEdu) {
        if (resumeEdu.toLowerCase().includes('bachelor') && jobEdu.toLowerCase().includes('bachelor')) {
            return 100;
        }
        if (resumeEdu.toLowerCase().includes('master') && jobEdu.toLowerCase().includes('bachelor')) {
            return 100;
        }
        return 70;
    }

    displayResumeAnalysis(analysis) {
        const container = document.getElementById('resume-analysis');
        container.innerHTML = `
            <div class="analysis-item">
                <h4><i class="fas fa-code"></i> Skills</h4>
                <div class="skills-list">
                    ${analysis.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-briefcase"></i> Experience</h4>
                <p>${analysis.experience}</p>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                <p>${analysis.education}</p>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-certificate"></i> Certifications</h4>
                <ul>
                    ${analysis.certifications.map(cert => `<li>${cert}</li>`).join('')}
                </ul>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-comment"></i> Summary</h4>
                <p>${analysis.summary}</p>
            </div>
        `;
    }

    displayJobAnalysis(analysis) {
        const container = document.getElementById('job-analysis');
        
        let jobHeader = '';
        if (analysis.title && analysis.company) {
            jobHeader = `
                <div class="analysis-item job-header">
                    <h4><i class="fas fa-briefcase"></i> Job Details</h4>
                    <div class="job-info">
                        <h5>${analysis.title}</h5>
                        <p><strong>Company:</strong> ${analysis.company}</p>
                        ${analysis.location ? `<p><strong>Location:</strong> ${analysis.location}</p>` : ''}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = `
            ${jobHeader}
            <div class="analysis-item">
                <h4><i class="fas fa-star"></i> Required Skills</h4>
                <div class="skills-list">
                    ${analysis.requiredSkills.map(skill => `<span class="skill-tag required">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-heart"></i> Preferred Skills</h4>
                <div class="skills-list">
                    ${analysis.preferredSkills.map(skill => `<span class="skill-tag preferred">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-clock"></i> Experience Required</h4>
                <p>${analysis.experience}</p>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                <p>${analysis.education}</p>
            </div>
            <div class="analysis-item">
                <h4><i class="fas fa-tasks"></i> Key Responsibilities</h4>
                <ul>
                    ${analysis.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
            ${analysis.benefits && analysis.benefits.length > 0 ? `
                <div class="analysis-item">
                    <h4><i class="fas fa-gift"></i> Benefits</h4>
                    <ul>
                        ${analysis.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
    }

    displayMatchScore(score) {
        const scoreElement = document.querySelector('.score-number');
        const breakdownElement = document.getElementById('score-breakdown');
        
        // Animate score
        this.animateScore(scoreElement, score.overall);
        
        breakdownElement.innerHTML = `
            <div class="score-item">
                <span class="score-item-label">Skills Match</span>
                <span class="score-item-value">${score.breakdown.skills}%</span>
            </div>
            <div class="score-item">
                <span class="score-item-label">Experience</span>
                <span class="score-item-value">${score.breakdown.experience}%</span>
            </div>
            <div class="score-item">
                <span class="score-item-label">Education</span>
                <span class="score-item-value">${score.breakdown.education}%</span>
            </div>
        `;
    }

    animateScore(element, targetScore) {
        let currentScore = 0;
        const increment = targetScore / 50;
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            element.textContent = Math.round(currentScore) + '%';
        }, 30);
    }

    generateRecommendations(resumeAnalysis, jobAnalysis, matchScore) {
        const recommendations = [];
        
        if (matchScore.overall < 70) {
            recommendations.push({
                type: 'improvement',
                title: 'Improve Skill Match',
                description: `Focus on learning: ${matchScore.missingSkills.join(', ')}`
            });
        }
        
        if (matchScore.breakdown.experience < 80) {
            recommendations.push({
                type: 'experience',
                title: 'Highlight Relevant Experience',
                description: 'Emphasize projects and achievements that align with the job requirements'
            });
        }
        
        recommendations.push({
            type: 'optimization',
            title: 'Optimize Resume Keywords',
            description: 'Include more job-specific keywords from the job description'
        });
        
        recommendations.push({
            type: 'networking',
            title: 'Network and Connect',
            description: 'Reach out to current employees or connect with the hiring team on LinkedIn'
        });
        
        return recommendations;
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations');
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h4><i class="fas fa-lightbulb"></i> ${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }

    showError(message) {
        // Simple error display
        alert(message);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeJobMatcher();
});

// Add some additional CSS for the new elements
const additionalStyles = `
    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .skill-tag {
        background: #e6f3ff;
        color: #667eea;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
    }
    
    .skill-tag.required {
        background: #fed7d7;
        color: #c53030;
    }
    
    .skill-tag.preferred {
        background: #fef5e7;
        color: #d69e2e;
    }
    
    .analysis-item {
        margin-bottom: 1.5rem;
    }
    
    .analysis-item h4 {
        color: #2d3748;
        font-weight: 600;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .analysis-item p {
        color: #718096;
        line-height: 1.6;
    }
    
    .analysis-item ul {
        color: #718096;
        padding-left: 1.5rem;
    }
    
    .analysis-item li {
        margin-bottom: 0.25rem;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
