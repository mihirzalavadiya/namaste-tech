import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  const projects = [
    {
      id: 1,
      title: 'Namaste Dev',
      description:
        'Solution to all Namaste Dev problems with all test cases passed.',
      image:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      tags: ['React', 'JavaScript'],
      link: '/namastedev',
    },
    {
      id: 2,
      title: 'Blog Post',
      description:
        'In-depth articles and blog posts on web development, programming, and technology.',
      image:
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      tags: ['React', 'Next.js', 'JavaScript'],
      link: '/blog',
    },
  ];

  return (
    <>
      <div className="home-container">
        <div className="section-header">
          <h1 className="section-title">Namaste Tech</h1>
          <p className="section-subtitle">
            Solution to all Namaste Dev problems, blog posts, project ideas and
            more...
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <Link href={project.link || '#'} key={project.id}>
              <div key={project.id} className="project-card">
                <div className="card-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card-image"
                  />
                  <div className="card-overlay"></div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-description">{project.description}</p>

                  <div className="card-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
