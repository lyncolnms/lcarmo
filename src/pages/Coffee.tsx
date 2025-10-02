import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Coffee.css';

interface NewsItem {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  category: string;
  image?: string;
}

const Coffee: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeSection, setActiveSection] = useState<'overview' | 'tools' | 'news'>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    // Simulando API de notícias sobre café com dados mais ricos
    const mockNews: NewsItem[] = [
      {
        title: 'Revolução na Torra de Café Especial',
        excerpt: 'Novas técnicas de torra estão elevando a qualidade dos cafés especiais brasileiros...',
        url: 'https://example.com/news1',
        date: '2025-01-15',
        category: 'Torra',
        image: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400'
      },
      {
        title: 'Tendências em Cafés de Origem Única',
        excerpt: 'O mercado de cafés de origem única cresce 40% ao ano no Brasil...',
        url: 'https://example.com/news2',
        date: '2025-01-12',
        category: 'Mercado',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      },
      {
        title: 'Inovação em Métodos de Preparo',
        excerpt: 'Técnicas modernas de extração estão revolucionando a experiência do café...',
        url: 'https://example.com/news3',
        date: '2025-01-10',
        category: 'Preparação',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400'
      },
      {
        title: 'Sustentabilidade na Cadeia do Café',
        excerpt: 'Iniciativas verdes transformam a produção de café no Brasil...',
        url: 'https://example.com/news4',
        date: '2025-01-08',
        category: 'Sustentabilidade',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      }
    ];
    setNews(mockNews);
  }, []);

  const tools = [
    {
      id: 'water-calc',
      title: 'Calculadora de Proporções',
      description: 'Calcule a quantidade perfeita de água e café para seu método de preparo',
      icon: 'fa-tint',
      color: 'is-info',
      path: '/coffee/water-calc'
    },
    {
      id: 'grind-calc',
      title: 'Guia de Moagem',
      description: 'Descubra a moagem ideal para cada método de extração',
      icon: 'fa-cogs',
      color: 'is-success',
      path: '/coffee/grind-calc'
    },
    {
      id: 'mineral-calc',
      title: 'Calculadora de Sais Minerais',
      description: 'Calcule blends perfeitos de água para sua extração baseada em alcalinidade e dureza',
      icon: 'fa-flask',
      color: 'is-warning',
      path: '/coffee/mineral-calc'
    }
  ];

  return (
    <div className="coffee-page">
      {/* Header Moderno */}
      <section className="hero is-medium coffee-hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-6">
                <h1 className="title is-1 has-text-white">
                  <i className="fa fa-coffee"></i> Universo do Café
                </h1>
                <h2 className="subtitle is-3 has-text-white">
                  Ferramentas profissionais para baristas e entusiastas
                </h2>
                <p className="has-text-white is-size-5">
                  Domine a arte da extração com nossas calculadoras precisas e guias especializados.
                </p>
              </div>
              <div className="column is-6">
                <figure className="image is-4by3">
                  <img
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600"
                    alt="Café especial"
                    style={{ borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Sidebar */}
      <div className="coffee-layout">
        <aside className="coffee-sidebar">
          {/* Mobile Navigation Toggle */}
          <div className="coffee-mobile-nav-toggle">
            <button
              className="coffee-nav-toggle-btn"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle navigation"
            >
              <i className={`fa ${isMobileNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
              <span className="ml-2">
                Navegação {activeSection === 'overview' && '- Visão Geral'}
                {activeSection === 'tools' && '- Ferramentas'}
                {activeSection === 'news' && '- Notícias'}
              </span>
            </button>
          </div>

          <nav className={`coffee-nav ${isMobileNavOpen ? 'is-open' : ''}`}>
            <div className="coffee-nav-header">
              <h3 className="title is-4">
                <i className="fa fa-compass"></i> Navegação
              </h3>
            </div>
            <div className="coffee-nav-menu">
              <button
                className={`coffee-nav-item ${activeSection === 'overview' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveSection('overview');
                  setIsMobileNavOpen(false);
                }}
              >
                <i className="fa fa-home"></i>
                <span>Visão Geral</span>
              </button>
              <button
                className={`coffee-nav-item ${activeSection === 'tools' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveSection('tools');
                  setIsMobileNavOpen(false);
                }}
              >
                <i className="fa fa-wrench"></i>
                <span>Ferramentas</span>
              </button>
              <button
                className={`coffee-nav-item ${activeSection === 'news' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveSection('news');
                  setIsMobileNavOpen(false);
                }}
              >
                <i className="fa fa-newspaper"></i>
                <span>Notícias</span>
              </button>
            </div>
          </nav>
        </aside>

        <main className="coffee-content">
          {/* Visão Geral */}
          {activeSection === 'overview' && (
            <section className="coffee-overview">
              <div className="container">
                <h2 className="title is-2 has-text-centered mb-6">
                  <i className="fa fa-star"></i> Bem-vindo ao Universo do Café
                </h2>

                <div className="columns">
                  <div className="column is-4">
                    <div className="card coffee-feature-card">
                      <div className="card-content has-text-centered">
                        <div className="coffee-feature-icon">
                          <i className="fa fa-calculator fa-3x has-text-info"></i>
                        </div>
                        <h3 className="title is-4">Cálculos Precisos</h3>
                        <p>Ferramentas matemáticas para extração perfeita do café.</p>
                      </div>
                    </div>
                  </div>

                  <div className="column is-4">
                    <div className="card coffee-feature-card">
                      <div className="card-content has-text-centered">
                        <div className="coffee-feature-icon">
                          <i className="fa fa-graduation-cap fa-3x has-text-success"></i>
                        </div>
                        <h3 className="title is-4">Conhecimento Técnico</h3>
                        <p>Guias especializados baseados em ciência e experiência.</p>
                      </div>
                    </div>
                  </div>

                  <div className="column is-4">
                    <div className="card coffee-feature-card">
                      <div className="card-content has-text-centered">
                        <div className="coffee-feature-icon">
                          <i className="fa fa-users fa-3x has-text-warning"></i>
                        </div>
                        <h3 className="title is-4">Comunidade</h3>
                        <p>Conecte-se com baristas e entusiastas de todo o Brasil.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Ferramentas */}
          {activeSection === 'tools' && (
            <section className="coffee-tools">
              <div className="container">
                <h2 className="title is-2 has-text-centered mb-6">
                  <i className="fa fa-wrench"></i> Ferramentas Profissionais
                </h2>

                <div className="grid-responsive grid-responsive-2">
                  {tools.map((tool) => (
                    <div key={tool.id} className="tool-item">
                      <Link to={tool.path} className="coffee-tool-card">
                        <div className={`card ${tool.color} is-hoverable`}>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-left">
                                <figure className="image is-48x48">
                                  <i className={`fa ${tool.icon} fa-2x`}></i>
                                </figure>
                              </div>
                              <div className="media-content">
                                <h3 className="title is-4">{tool.title}</h3>
                                <p className="subtitle is-6">{tool.description}</p>
                              </div>
                            </div>
                          </div>
                          <footer className="card-footer">
                            <span className="card-footer-item">
                              <i className="fa fa-arrow-right mr-2"></i>
                              Acessar Ferramenta
                            </span>
                          </footer>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Notícias */}
          {activeSection === 'news' && (
            <section className="coffee-news">
              <div className="container">
                <h2 className="title is-2 has-text-centered mb-6">
                  <i className="fa fa-newspaper"></i> Últimas Notícias
                </h2>

                <div className="columns is-multiline">
                  {news.map((item, index) => (
                    <div key={index} className="column is-6">
                      <div className="card coffee-news-card">
                        {item.image && (
                          <div className="card-image">
                            <figure className="image is-4by3">
                              <img src={item.image} alt={item.title} />
                            </figure>
                          </div>
                        )}
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4">{item.title}</p>
                              <p className="subtitle is-6">
                                <span className="tag is-primary">{item.category}</span>
                                <span className="ml-2">
                                  <i className="fa fa-calendar"></i> {new Date(item.date).toLocaleDateString('pt-BR')}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="content">
                            {item.excerpt}
                          </div>
                        </div>
                        <footer className="card-footer">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-footer-item has-text-primary"
                          >
                            <i className="fa fa-external-link mr-2"></i>
                            Ler notícia completa
                          </a>
                        </footer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Coffee;
