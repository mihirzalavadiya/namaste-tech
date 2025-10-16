import Link from 'next/link';
import React from 'react';

const Card = ({ projects, isDescription = true }) => {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <Link href={project.link || '#'} key={project.id}>
          <div key={project.id} className="project-card">
            <div className="card-image-wrapper">
              {project?.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-image"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
                  alt="Namaste Dev"
                  className="card-image"
                />
              )}
              <div className="card-overlay"></div>
              {project?.problemNo && (
                <div className="problem-number">#{project.problemNo}</div>
              )}
            </div>

            <div className="card-content">
              <div className="card-header">
                <h3 className="card-title">{project.title}</h3>
                {project?.category?.length > 0 && (
                  <span className="question-category">
                    {project?.category[0]}
                  </span>
                )}
              </div>
              {project?.date && <div className="blog-date">{project.date}</div>}
              {isDescription && (
                <p className="card-description">{project.description}</p>
              )}

              <div className="card-tags">
                {project?.tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project?.compnies && (
                <div className="card-tags">
                  {project?.compnies?.map((tag, index) => (
                    <span key={index} className="compnies-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
