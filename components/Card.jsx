import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { chipClass, diffClass, BLUR_DATA_URL } from '../lib/ui';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop';

const CardMedia = ({ project, index }) => (
  <div className="card-media">
    <Image
      src={project?.image || FALLBACK_IMAGE}
      alt={project.title || 'NamasteTech'}
      fill
      style={{ objectFit: 'cover' }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      priority={index === 0}
    />
    {project?.problemNo && <span className="card-num">#{project.problemNo}</span>}
  </div>
);

const Card = ({ projects = [], isBlog = false, accent }) => {
  return (
    <div className="card-grid">
      {projects.map((project, index) => {
        const difficulty = project?.category?.[0];
        const lang = project?.tags?.[0];

        if (isBlog) {
          return (
            <div
              className="card"
              key={project.id ?? index}
              style={accent ? { '--accent': accent } : undefined}
            >
              <CardMedia project={project} index={index} />
              <a
                className="card-body"
                href={project.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="card-title">{project.title}</h3>
                <div className="card-foot">
                  <span className="card-date">{project.date}</span>
                  <span className="card-read">read ↗</span>
                </div>
              </a>
            </div>
          );
        }

        return (
          <div
            className="card"
            key={project.id ?? index}
            style={accent ? { '--accent': accent } : undefined}
          >
            <CardMedia project={project} index={index} />
            <Link className="card-body" href={project.link || '#'}>
              <div className="card-body-head">
                <h3 className="card-title">{project.title}</h3>
                {difficulty && (
                  <span className={diffClass(difficulty)}>{difficulty}</span>
                )}
              </div>
              {lang && (
                <div className="card-chips">
                  <span className={chipClass(lang)}>{lang}</span>
                </div>
              )}
              {project?.compnies?.length > 0 && (
                <div className="card-companies">
                  {project.compnies.map((co, i) => (
                    <span key={i} className="chip-company">
                      {co}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
