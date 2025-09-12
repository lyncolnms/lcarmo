import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, link }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">Ver Projeto</a>
    </div>
  );
};

export default ProjectCard;
