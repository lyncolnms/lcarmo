import React from 'react';
import ProjectCard from '../components/ProjectCard';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Home: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Projeto 1',
      description: 'Descrição do projeto 1.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      link: 'https://github.com/lyncolnms/projeto1'
    },
    {
      title: 'Projeto 2',
      description: 'Descrição do projeto 2.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      link: 'https://github.com/lyncolnms/projeto2'
    }
  ];

  return (
    <main className="container">
      <section className="section">
        <div className="content">
          <h2 className="title is-2"><i className="fa fa-info-circle"></i> Sobre Mim</h2>
          <p>Olá, sou Lyncoln Carmo, desenvolvedor apaixonado por tecnologia e café.</p>
        </div>
      </section>
      <section className="section">
        <h2 className="title is-2"><i className="fa fa-folder-open"></i> Meus Projetos</h2>
        <div className="grid-responsive grid-responsive-3">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
