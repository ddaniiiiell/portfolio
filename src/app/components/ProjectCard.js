'use client';

import { ExternalLink, FileText } from 'lucide-react';

export default function ProjectCard({ title, date, presentation, description, tags, liveLink, pdfLink, imageUrl, imagePosition = 'center' }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="project-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imagePosition }}
          />
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
        {(date || presentation) && (
          <div 
            style={{ 
              display: 'flex', 
              gap: '0.6rem', 
              alignItems: 'center', 
              marginBottom: '0.75rem', 
              flexWrap: 'wrap' 
            }}
          >
            {date && (
              <span 
                className="project-date" 
                style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--text-secondary)', 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: '500' 
                }}
              >
                {date}
              </span>
            )}
            {date && presentation && (
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-muted)' }} />
            )}
            {presentation && (
              <span 
                className="project-presentation-badge" 
                style={{ 
                  fontSize: '0.75rem', 
                  background: 'var(--accent-glow)', 
                  color: 'var(--accent-primary)', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  border: '1px solid var(--border-color)', 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: '600',
                  letterSpacing: '0.01em'
                }}
              >
                {presentation}
              </span>
            )}
          </div>
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
              <ExternalLink size={16} /> Official Paper
            </a>
          )}
          {pdfLink && (
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <FileText size={16} /> PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
