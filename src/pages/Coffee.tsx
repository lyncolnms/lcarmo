import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NewsItem {
  title: string;
  url: string;
}

const Coffee: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulando API de notícias sobre café
    const mockNews: NewsItem[] = [
      { title: 'Novo método de torra de café', url: 'https://example.com/news1' },
      { title: 'Tendências em cafés especiais', url: 'https://example.com/news2' }
    ];
    setNews(mockNews);
  }, []);

  return (
    <main className="coffee-theme" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
      <h2><i className="fa fa-coffee"></i> Sobre Café</h2>
      <p>Descubra tudo sobre café: dicas, receitas e ferramentas.</p>
      <section>
        <h3><i className="fa fa-wrench"></i> Ferramentas</h3>
        <ul>
          <li><Link to="/coffee/water-calc"><i className="fa fa-tint"></i> Cálculo de Água</Link></li>
          <li><Link to="/coffee/grind-calc"><i className="fa fa-cogs"></i> Tipo de Moagem</Link></li>
        </ul>
      </section>
      <section>
        <h3><i className="fa fa-newspaper-o"></i> Notícias sobre Café</h3>
        {news.map((item, index) => (
          <div key={index} className="news-item">
            <h4>{item.title}</h4>
            <a href={item.url} target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link"></i> Ler mais</a>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Coffee;
