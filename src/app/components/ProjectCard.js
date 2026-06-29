'use client';

import { Github, ExternalLink, Code } from 'lucide-react';

export default function ProjectCard({ title, date, description, tags, githubLink, liveLink, imageUrl }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="project-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="project-image-fallback">
            <div className="project-image-fallback-pattern" />
            <div className="project-image-placeholder-text" style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', zIndex: '2' }}>
              [Project Image Placeholder]
            </div>
          </div>
        )}
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        {date && (
          <span 
            className="project-date" 
            style={{ 
              display: 'block', 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)', 
              marginBottom: '0.75rem', 
              fontFamily: 'var(--font-display)', 
              fontWeight: '500' 
            }}
          >
            {date}
          </span>
        )}
        <p className="project-description">{description}</p>
        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-links">
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link"
            >
              <ExternalLink size={16} /> Read
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
