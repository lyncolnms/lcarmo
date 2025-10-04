import React from 'react';
import { User, Info, Briefcase, GraduationCap, Award, Mail, Phone, Linkedin, Github } from 'lucide-react';

const Curriculum: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <User className="w-8 h-8" />
          Currículo - Lyncoln Mauricio S. Do Carmo
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Resumo
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Engenheiro de Software com foco em Cibersegurança, experiência em desenvolvimento mobile e web, migração de tecnologias e arquitetura de software.
          </p>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Contato</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              lyncolnms@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (43) 99954 4482
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a href="https://www.linkedin.com/in/lyncolnmauricio" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <a href="https://github.com/lyncolnms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Experiência Profissional
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="font-semibold text-lg">Desenvolvedor Full Stack Mobile | Conexa - Hub de Inovação Aliare</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">04/2024 - 07/2025</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Aplicativo AgriQ:</strong> Migração de Xamarin.Forms para .NET MAUI, manutenção e novas interfaces.</li>
              <li><strong>Aplicativo My Farm:</strong> Migração e adição de funcionalidades.</li>
              <li><strong>Arquitetura Mobile:</strong> Criação e gerenciamento de componentes comuns.</li>
              <li><strong>Tecnologias:</strong> .NET MAUI, Xamarin Forms, C#, MVVM, SOLID, Clean Code.</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="font-semibold text-lg">Engenheiro de Software | Asaas</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">07/2021 - 12/2023</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Aplicativo Asaas:</strong> Desenvolvimento de recursos como links de pagamento, transferências.</li>
              <li><strong>Aplicativo Asaas Money:</strong> Pagamentos de contas via diversos métodos.</li>
              <li><strong>Api Asaas:</strong> Manutenção, novas rotas e documentação.</li>
              <li><strong>Tecnologias:</strong> Xamarin Forms, C#, MVVM, SOLID, Clean Code, Groovy, Markdown, DDD.</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="font-semibold text-lg">Engenheiro de Software | Londrisoft</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">06/2017 - 07/2021</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Gestor MobVendas:</strong> Aplicativo para vendas móveis com controle de estoque.</li>
              <li><strong>Tecnologias:</strong> Xamarin Android, C#, MVVM, SOLID.</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="font-semibold text-lg">Programador Web | Yankton Technologies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">08/2016 - 05/2017</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Cinemark:</strong> Aplicativo para filmes e compras.</li>
              <li><strong>Santander Universitário:</strong> Aplicativo com puzzles para bolsas.</li>
              <li><strong>Tecnologias:</strong> Cordova, Ionic, AngularJS.</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="font-semibold text-lg">Estagiário de desenvolvimento | Yankton Technologies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">12/2015 - 08/2016</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>OED's:</strong> Puzzles educacionais web.</li>
              <li><strong>Tecnologias:</strong> Javascript, AngularJS, HTML5, CSS.</li>
            </ul>
          </div>

          <div className="border-l-4 border-indigo-500 pl-6">
            <h4 className="font-semibold text-lg">Estagiário de T.I. | Embrapa Soja</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">07/2013 - 05/2015</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>SiGCo:</strong> Sistema de gerenciamento de competências.</li>
              <li><strong>Tecnologias:</strong> Java Web, JSF, JPA, Hibernate, PrimeFaces, Spring Security, Spring LDAP, Wildfly 8.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Educação
        </h3>
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold">Pós-graduação Lato Sensu em Cibersegurança</h4>
            <p className="text-gray-600 dark:text-gray-400">Pontifícia Universidade Católica do Paraná (PUCPR) - 2025 - 2026</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold">Graduação em Análise e Desenvolvimento de Sistemas</h4>
            <p className="text-gray-600 dark:text-gray-400">UniCesumar - 2018 - 2020</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Cursos e Certificações
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Formação Cybersecurity Specialist - DIO.me",
            "Formação DevOps Fundamentals - DIO.me",
            "Formação DevOps para Desenvolvedores - desenvolvedor.io",
            "Desenvolvimento Seguro de Aplicações - Academia Clavis",
            "Bootcamp Engenheiro de Software - IGTI",
            "Desenvolvedor Mobile Multiplataforma Xamarin - Alura",
            "Desenvolvedor Android Iniciante - Udemy",
            "Xamarin: Desenvolvimento para Android, iOS e WP - Udemy"
          ].map((certification, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">{certification}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Curriculum;
