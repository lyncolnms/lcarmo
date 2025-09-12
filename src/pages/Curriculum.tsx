import React from 'react';

const Curriculum: React.FC = () => {
  return (
    <main className="container">
      <section className="section">
        <h2 className="title is-2"><i className="fa fa-user-circle"></i> Currículo - Lyncoln Mauricio S. Do Carmo</h2>
        <div className="content">
          <h3 className="subtitle is-4"><i className="fa fa-info-circle"></i> Resumo</h3>
          <p>Engenheiro de Software com foco em Cibersegurança, experiência em desenvolvimento mobile e web, migração de tecnologias e arquitetura de software.</p>
        </div>
      </section>
      <section className="section">
        <h3 className="subtitle is-4"><i className="fa fa-address-card"></i> Contato</h3>
        <div className="columns">
          <div className="column">
            <p><i className="fa fa-envelope"></i> lyncolnms@gmail.com</p>
            <p><i className="fa fa-phone"></i> (43) 99954 4482</p>
          </div>
          <div className="column">
            <p><i className="fa fa-linkedin"></i> <a href="https://www.linkedin.com/in/lyncolnmauricio" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            <p><i className="fa fa-github"></i> <a href="https://github.com/lyncolnms" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
        </div>
      </section>
      <section className="section">
        <h3 className="subtitle is-4"><i className="fa fa-briefcase"></i> Experiência Profissional</h3>
        <div className="content">
          <ul>
            <li><strong>Desenvolvedor Full Stack Mobile | Conexa - Hub de Inovação Aliare</strong> - 04/2024 - 07/2025<br />
              <strong>Aplicativo AgriQ:</strong> Migração de Xamarin.Forms para .NET MAUI, manutenção e novas interfaces.<br />
              <strong>Aplicativo My Farm:</strong> Migração e adição de funcionalidades.<br />
              <strong>Arquitetura Mobile:</strong> Criação e gerenciamento de componentes comuns.<br />
              Tecnologias: .NET MAUI, Xamarin Forms, C#, MVVM, SOLID, Clean Code.</li>
            <li><strong>Engenheiro de Software | Asaas</strong> - 07/2021 - 12/2023<br />
              <strong>Aplicativo Asaas:</strong> Desenvolvimento de recursos como links de pagamento, transferências.<br />
              <strong>Aplicativo Asaas Money:</strong> Pagamentos de contas via diversos métodos.<br />
              <strong>Api Asaas:</strong> Manutenção, novas rotas e documentação.<br />
              Tecnologias: Xamarin Forms, C#, MVVM, SOLID, Clean Code, Groovy, Markdown, DDD.</li>
            <li><strong>Engenheiro de Software | Londrisoft</strong> - 06/2017 - 07/2021<br />
              <strong>Gestor MobVendas:</strong> Aplicativo para vendas móveis com controle de estoque.<br />
              Tecnologias: Xamarin Android, C#, MVVM, SOLID.</li>
            <li><strong>Programador Web | Yankton Technologies</strong> - 08/2016 - 05/2017<br />
              <strong>Cinemark:</strong> Aplicativo para filmes e compras.<br />
              <strong>Santander Universitário:</strong> Aplicativo com puzzles para bolsas.<br />
              Tecnologias: Cordova, Ionic, AngularJS.</li>
            <li><strong>Estagiário de desenvolvimento | Yankton Technologies</strong> - 12/2015 - 08/2016<br />
              <strong>OED’s:</strong> Puzzles educacionais web.<br />
              Tecnologias: Javascript, AngularJS, HTML5, CSS.</li>
            <li><strong>Estagiário de T.I. | Embrapa Soja</strong> - 07/2013 - 05/2015<br />
              <strong>SiGCo:</strong> Sistema de gerenciamento de competências.<br />
              Tecnologias: Java Web, JSF, JPA, Hibernate, PrimeFaces, Spring Security, Spring LDAP, Wildfly 8.</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <h3 className="subtitle is-4"><i className="fa fa-graduation-cap"></i> Educação</h3>
        <div className="content">
          <ul>
            <li><strong>Pós-graduação Lato Sensu em Cibersegurança</strong> - Pontifícia Universidade Católica do Paraná (PUCPR) - 2025 - 2026</li>
            <li><strong>Graduação em Análise e Desenvolvimento de Sistemas</strong> - UniCesumar - 2018 - 2020</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <h3 className="subtitle is-4"><i className="fa fa-certificate"></i> Cursos e Certificações</h3>
        <div className="content">
          <ul>
            <li>Formação Cybersecurity Specialist - DIO.me</li>
            <li>Formação DevOps Fundamentals - DIO.me</li>
            <li>Formação DevOps para Desenvolvedores - desenvolvedor.io</li>
            <li>Desenvolvimento Seguro de Aplicações - Academia Clavis</li>
            <li>Bootcamp Engenheiro de Software - IGTI</li>
            <li>Desenvolvedor Mobile Multiplataforma Xamarin - Alura</li>
            <li>Desenvolvedor Android Iniciante - Udemy</li>
            <li>Xamarin: Desenvolvimento para Android, iOS e WP - Udemy</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Curriculum;
