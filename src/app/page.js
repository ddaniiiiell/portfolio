'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Star, GitFork, ArrowUpRight, Award, Server } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [githubData, setGithubData] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);

  // Fetch GitHub repos dynamically
  useEffect(() => {
    async function fetchGithub() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          setGithubData(data);
        }
      } catch (err) {
        console.error('Failed to fetch github stats', err);
      } finally {
        setGithubLoading(false);
      }
    }
    fetchGithub();
  }, []);

  const projects = [
    {
      title: 'CT Scan Radiation Exposure Simulator',
      description: 'Estimation of radiation dose for COVID-19 patients undergoing computed tomography exams to optimize patient health safety. Published in Radiation Physics and Chemistry.',
      tags: ['MATLAB', 'Medical Imaging', 'Data Analysis'],
      category: 'Research',
      githubLink: 'https://github.com/ddaniiiiell',
      liveLink: 'https://doi.org/10.1016/j.radphyschem.2024.111773',
    },
    {
      title: 'Monkey Anatomical Posture Modeler',
      description: 'Organ dose simulations for voxel-based monkey anatomical models under external photon fields. Published in Nuclear Engineering and Technology.',
      tags: ['C++', 'Java', 'Voxel Modeling', 'Simulation'],
      category: 'Computational Modeling',
      githubLink: 'https://github.com/ddaniiiiell',
      liveLink: 'https://doi.org/10.1016/j.net.2025.103603',
    },
    {
      title: 'Internal Radiation Source Solver',
      description: 'Calculates S-values for voxel monkey computational models exposed to internally distributed radiation sources. Published in Radiation Physics and Chemistry.',
      tags: ['Python', 'Applied Physics', 'Monte Carlo Sim'],
      category: 'Computational Modeling',
      githubLink: 'https://github.com/ddaniiiiell',
      liveLink: 'https://doi.org/10.1016/j.radphyschem.2025.112549',
    },
  ];

  const experience = [
    {
      role: 'Academic Research Intern',
      company: 'Inova Fairfax Hospital',
      date: '2026 - Present',
      description: 'Collaborating on medical imaging analyses and clinical research workflows under the mentorship of Dr. In H. Yeo.',
    },
    {
      role: 'Biomedical Research Intern',
      company: 'East Carolina University',
      date: '2023 - 2024',
      description: 'Conducted dose estimation modeling for COVID-19 computed tomography scans and voxel monkey anatomy models under the mentorship of Dr. Jaewon Jung. Co-authored three publications in peer-reviewed scientific journals.',
    },
    {
      role: 'Robotics Program Scholar',
      company: 'GEMS (U.S. Army sponsored)',
      date: '2023',
      description: 'Participated in the Gains in the Education of Mathematics and Science robotics program developing logic controls.',
    },
  ];

  const filterCategories = ['All', 'Research', 'Computational Modeling'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  return (
    <>
      <Navbar />

      <main className="container">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">Applied Physics & Bioengineering</span>
            <h1 className="hero-title">
              Hi, I'm <span>Daniel D. Lee</span>
            </h1>
            <p className="hero-subtitle">
              Applied Physics student at the University of Maryland, College Park, focusing on computational modeling, medical imaging analysis, and bioengineering simulations.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">
                <span className="btn-text" data-text="View My Projects">View My Projects</span> <ArrowUpRight size={18} />
              </a>
              <a href="#contact" className="btn-secondary">
                <span className="btn-text" data-text="Get in Touch">Get in Touch</span>
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="section-header">
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <p className="section-subtitle">
              A curated collection of digital interfaces and full-stack solutions.
            </p>
          </div>

          <div className="filter-buttons">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`filter-btn ${selectedFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="section-header">
            <h2 className="section-title">My <span>Experience</span></h2>
            <p className="section-subtitle">
              Professional history and technical roles in software engineering.
            </p>
          </div>

          <div className="timeline-container">
            {experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card glass-card">
                  <span className="timeline-date">{exp.date}</span>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <h4 className="timeline-company">{exp.company}</h4>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live GitHub Stats Dashboard */}
        <section id="github" className="section">
          <div className="section-header">
            <h2 className="section-title">Live <span>GitHub Activity</span></h2>
            <p className="section-subtitle">
              Real-time feed showing active repositories, language statistics, and code contributions.
            </p>
          </div>

          {githubLoading ? (
            <div className="github-loading">
              <div className="form-submit-btn" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Server size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <p>Fetching data from the GitHub API...</p>
            </div>
          ) : (
            <div className="github-grid">
              {githubData?.repos?.map((repo, idx) => (
                <div key={idx} className="github-card glass-card">
                  <div className="github-card-header">
                    <span className="github-repo-name">{repo.name}</span>
                    <Award size={18} style={{ color: 'var(--accent-secondary)' }} />
                  </div>
                  <p className="github-repo-desc">{repo.description || 'No description available for this repository.'}</p>
                  <div className="github-repo-meta">
                    {repo.language && (
                      <span className="github-repo-stat">
                        <span style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: 'var(--accent-primary)',
                          display: 'inline-block' 
                        }}></span> {repo.language}
                      </span>
                    )}
                    <span className="github-repo-stat">
                      <Star size={14} /> {repo.stargazers_count}
                    </span>
                    <span className="github-repo-stat">
                      <GitFork size={14} /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="section-header">
            <h2 className="section-title">Let's <span>Connect</span></h2>
            <p className="section-subtitle">
              Have a question or want to work together? Drop me a message.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="contact-info-title">Contact Information</h3>
              <p className="contact-info-desc">
                Feel free to reach out via the form, email, or telephone. I am usually responsive and will get back to you within 24 hours.
              </p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><Mail size={20} /></div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Email</span>
                    <span className="contact-detail-value">danieldoowonlee@gmail.com</span>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><Phone size={20} /></div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Phone</span>
                    <span className="contact-detail-value">240-550-3763</span>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><MapPin size={20} /></div>
                  <div className="contact-detail-content">
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">Rockville, MD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container glass-card" style={{ padding: '2rem' }}>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-section">
        <div className="container footer-wrapper">
          <p className="footer-text">
            © {new Date().getFullYear()} Daniel D. Lee. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="https://github.com/ddaniiiiell" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/danieldoowonlee/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
