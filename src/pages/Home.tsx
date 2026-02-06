import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { Info, FolderOpen } from 'lucide-react';

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
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-8 h-8" />
            Sobre Mim
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Olá, sou o Lyncoln, desenvolvedor apaixonado por tecnologia e café.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <FolderOpen className="w-8 h-8" />
          Meus Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
