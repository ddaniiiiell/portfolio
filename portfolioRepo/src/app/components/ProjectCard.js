'use client';

import { Github, ExternalLink, Code } from 'lucide-react';

export default function ProjectCard({ title, description, tags, githubLink, liveLink }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <div className="project-image-fallback">
          <div className="project-image-fallback-pattern" />
          <Code className="project-image-icon" size={48} />
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link"
            >
              <Github size={16} /> Code
            </a>
          )}
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
