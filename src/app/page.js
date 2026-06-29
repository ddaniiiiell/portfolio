'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Star, GitFork, ArrowUpRight, Award, Server } from 'lucide-react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import CTHelix from './components/CTHelix';
import BubbleChamber from './components/BubbleChamber';

export default function Home() {
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
      imageUrl: '/images/ct_scan_abstract.jpg',
    },
    {
      title: 'Monkey Anatomical Posture Modeler',
      description: 'Organ dose simulations for voxel-based monkey anatomical models under external photon fields. Published in Nuclear Engineering and Technology.',
      tags: ['C++', 'Java', 'Voxel Modeling', 'Simulation'],
      category: 'Computational Modeling',
      githubLink: 'https://github.com/ddaniiiiell',
      liveLink: 'https://doi.org/10.1016/j.net.2025.103603',
      imageUrl: '/images/posture_modeler_abstract.jpg',
    },
    {
      title: 'Internal Radiation Source Solver',
      description: 'Calculates S-values for voxel monkey computational models exposed to internally distributed radiation sources. Published in Radiation Physics and Chemistry.',
      tags: ['Python', 'Applied Physics', 'Monte Carlo Sim'],
      category: 'Computational Modeling',
      githubLink: 'https://github.com/ddaniiiiell',
      liveLink: 'https://doi.org/10.1016/j.radphyschem.2025.112549',
      imageUrl: '/images/internal_source_abstract.jpg',
    },
  ];

  const experience = [
    {
      role: 'Academic Intern',
      company: 'Inova Fairfax Hospital',
      date: 'Jun 2026 - Present',
      description: 'Working in the Department of Radiation Oncology under Dr. In H. Yeo and the medical physics team. Analyzing and extracting numerical data for Dr. Yeo’s research abstract alongside other physicians, gaining hands-on exposure to the full treatment workflow in radiation therapy. Shadowed medical physicists, radiation oncologists, and engineers during proton, CyberKnife, and Ethos adaptive radiotherapy treatments. Assisted with patient-specific quality assurance (PSQA) on proton machines.',
    },
    {
      role: 'Research Intern',
      company: 'East Carolina University',
      date: '2024 - 2024',
      description: 'Assisted Dr. Jaewon Jung with Monte Carlo–based radiation dose calculations in computational non-human primate models, focusing on how posture and source distribution affect organ doses. Prepared figures, tables, and text for manuscripts on monkey organ doses from external photons and S-values for internal emitters, co-authoring publications in Nuclear Engineering and Technology and Radiation Physics and Chemistry.',
    },
    {
      role: 'Research Intern',
      company: 'East Carolina University',
      date: '2023 - 2023',
      description: 'Contributed to research on patient dose from CT imaging for COVID-19 diagnosis, including data organization, basic dose calculations, and literature review on CT protocols and radiation risk. Co-authored a publication in Radiation Physics and Chemistry.',
    },
  ];

  // Render all projects directly without filter tags

  return (
    <>
      <Navbar />

      <main className="container">
        {/* Hero Section */}
        <section id="home" className="hero-section" style={{ position: 'relative' }}>
          <BubbleChamber />
          <div className="hero-content" style={{ textAlign: 'center', alignItems: 'center', margin: '0 auto' }}>
            <span className="hero-badge">Applied Physics</span>
            <h1 className="hero-title">
              Hi, I'm{' '}
              <span className="hero-name-container" style={{ position: 'relative', display: 'inline-block' }}>
                <span className="hero-star hero-star-left">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="currentColor" />
                  </svg>
                </span>
                Daniel Lee
                <span className="hero-star hero-star-right">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
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
            <h2 className="section-title">Research <span>Abstracts</span></h2>
            <p className="section-subtitle">
              Selected research abstracts, mathematical models, and simulated publications in computational radiation physics and dosimetry.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, idx) => (
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

        {/* Hobbies Section */}
        <section id="hobbies" className="section">
          <div className="section-header">
            <h2 className="section-title">Beyond <span>Physics</span></h2>
            <p className="section-subtitle">
              Some of the creative outlets, hobbies, and musical arts I pursue in my free time.
            </p>
          </div>

          <div className="github-grid">
            <div className="github-card glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', position: 'relative' }}>
                <img 
                  src="/images/hobby_photography.jpg" 
                  alt="Photography" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '600', zIndex: 1 }}>[Hobby Image: Photography]</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="github-repo-name" style={{ fontSize: '1.2rem' }}>Photography</h3>
                <p className="github-repo-desc">Capturing visual frames, playing with lighting, natural shadows, and urban architectures through the lens of a camera.</p>
              </div>
            </div>

            <div className="github-card glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', position: 'relative' }}>
                <img 
                  src="/images/hobby_cello.jpg" 
                  alt="Playing Cello" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '600', zIndex: 1 }}>[Hobby Image: Cello]</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="github-repo-name" style={{ fontSize: '1.2rem' }}>Playing Cello</h3>
                <p className="github-repo-desc">Exploring strings, playing classical compositions, and practicing the deep, resonant harmonies of the cello.</p>
              </div>
            </div>

            <div className="github-card glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', position: 'relative' }}>
                <img 
                  src="/images/hobby_music.jpg" 
                  alt="Music & Vocal Performance" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '600', zIndex: 1 }}>[Hobby Image: Singing & Music]</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 className="github-repo-name" style={{ fontSize: '1.2rem' }}>Music & Vocal Performance</h3>
                <p className="github-repo-desc">A deep passion for music, performing classical vocal arts, singing in ensembles, and exploring new musical styles.</p>
              </div>
            </div>
          </div>
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
            <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <h3 className="contact-info-title">Contact Information</h3>
                <p className="contact-info-desc" style={{ marginBottom: '2rem' }}>
                  Feel free to reach out via email or text.
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

              <div className="contact-helix-visual" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <CTHelix horizontal={true} />
              </div>
            </div>

            <div className="contact-image-container glass-card" style={{ overflow: 'hidden', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <img 
                src="/images/connect_picture.jpg" 
                alt="Connect" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: '600', zIndex: 1 }}>[Connect Image Placeholder]</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-section">
        <div className="container footer-wrapper">
          <p className="footer-text">
            © {new Date().getFullYear()} Daniel Lee. All rights reserved.
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
