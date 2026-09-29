import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Radio,
  Newspaper,
  Activity,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Clock3,
  Sparkles,
} from 'lucide-react';
import './cybernews.css';

type NewsItem = {
  id: number;
  title: string;
  source: string;
  category: string;
  time: string;
  summary: string;
  href: string;
  highlight?: boolean;
};

const sampleNews: NewsItem[] = [
  {
    id: 1,
    title: 'Aumento de ataques a cadeias de suprimento pressiona times de segurança',
    source: 'CyberPulse Wire',
    category: 'Supply Chain',
    time: 'há 12 min',
    summary:
      'Organizações reforçam monitoramento de dependências, SBOM e processos de resposta após novas campanhas direcionadas a fornecedores críticos.',
    href: '#',
    highlight: true,
  },
  {
    id: 2,
    title: 'GRC ganha prioridade em programas de resiliência operacional',
    source: 'Risk Grid',
    category: 'GRC',
    time: 'há 28 min',
    summary:
      'Equipes de governança e compliance passam a integrar indicadores de risco, requisitos regulatórios e métricas de auditoria em painéis executivos.',
    href: '#',
    highlight: true,
  },
  {
    id: 3,
    title: 'Falhas de identidade seguem como vetor dominante em ambientes cloud',
    source: 'Cloud Sec Feed',
    category: 'Identity',
    time: 'há 41 min',
    summary:
      'Controles de privilégio mínimo, revisão de acessos e autenticação forte seguem entre as ações mais citadas por equipes blue team.',
    href: '#',
  },
  {
    id: 4,
    title: 'Programas de third-party risk retomam protagonismo em empresas reguladas',
    source: 'Compliance Watch',
    category: 'Third-party Risk',
    time: 'há 1 h',
    summary:
      'Mapeamento de fornecedores críticos e critérios de due diligence voltam ao centro das decisões após novas exigências de auditoria.',
    href: '#',
  },
  {
    id: 5,
    title: 'Threat intel operacional acelera triagem de alertas em SOCs enxutos',
    source: 'SOC Brief',
    category: 'Threat Intel',
    time: 'há 1 h 20 min',
    summary:
      'Correlação entre contexto de ameaça, ativos expostos e criticidade do negócio reduz ruído e melhora priorização de incidentes.',
    href: '#',
  },
  {
    id: 6,
    title: 'Zero trust avança com foco prático em segmentação e postura de dispositivo',
    source: 'InfraSec Daily',
    category: 'Architecture',
    time: 'há 2 h',
    summary:
      'Adoções mais maduras saem do discurso amplo e priorizam casos concretos em identidade, acesso e segmentação progressiva.',
    href: '#',
  },
];

export function CybernewsPage() {
  const [filter, setFilter] = useState('Todos');

  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(sampleNews.map((item) => item.category)))];
  }, []);

  const filteredNews = useMemo(() => {
    if (filter === 'Todos') return sampleNews;
    return sampleNews.filter((item) => item.category === filter);
  }, [filter]);

  const highlights = sampleNews.filter((item) => item.highlight);
  const totalSources = new Set(sampleNews.map((item) => item.source)).size;

  return (
    <div className="cybernews-page">
      <header className="cybernews-topbar">
        <div className="cybernews-wrap cybernews-topbar-inner">
          <div className="cybernews-brand">
            <div className="cybernews-logo">
              <Shield size={22} />
            </div>

            <div>
              <p className="cybernews-kicker">Monitoramento</p>
              <h1>CyberPulse GRC</h1>
            </div>
          </div>

          <div className="cybernews-actions">
            <Link to="/" className="cybernews-btn cybernews-btn-ghost">
              <ArrowLeft size={16} />
              <span>Voltar ao site</span>
            </Link>

            <button className="cybernews-btn cybernews-btn-primary" type="button">
              <RefreshCw size={16} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="cybernews-wrap cybernews-main">
        <section className="cybernews-hero">
          <article className="cybernews-panel cybernews-hero-panel">
            <div className="cybernews-panel-glow" />

            <div className="cybernews-chip-row">
              <span className="cybernews-chip">
                <Radio size={14} />
                <span>Live signals</span>
              </span>
              <span className="cybernews-chip">
                <Sparkles size={14} />
                <span>GRC spotlight</span>
              </span>
            </div>

            <div className="cybernews-hero-copy">
              <p className="cybernews-overline">Cybersecurity • Governance • Risk • Compliance</p>
              <h2>Painel de notícias e sinais críticos para acompanhar risco cibernético com foco executivo.</h2>
              <p className="cybernews-muted">
                Esta versão em React replica o dashboard como página dedicada dentro do seu site, pronta para viver em
                <strong> /cybernews</strong>.
              </p>
            </div>
          </article>

          <aside className="cybernews-stats-grid">
            <div className="cybernews-panel cybernews-stat-card">
              <div className="cybernews-stat-head">
                <Newspaper size={18} />
                <span>Itens carregados</span>
              </div>
              <strong>{sampleNews.length}</strong>
              <p>Notícias simuladas para a versão React inicial.</p>
            </div>

            <div className="cybernews-panel cybernews-stat-card">
              <div className="cybernews-stat-head">
                <Shield size={18} />
                <span>Destaques GRC</span>
              </div>
              <strong>{highlights.length}</strong>
              <p>Itens priorizados em governança, risco e compliance.</p>
            </div>

            <div className="cybernews-panel cybernews-stat-card">
              <div className="cybernews-stat-head">
                <Activity size={18} />
                <span>Fontes ativas</span>
              </div>
              <strong>{totalSources}</strong>
              <p>Feeds simulados ou integráveis na próxima etapa.</p>
            </div>
          </aside>
        </section>

        <section className="cybernews-grid">
          <div className="cybernews-feed">
            <div className="cybernews-section-head">
              <div>
                <p className="cybernews-section-kicker">Feed</p>
                <h3>Últimas publicações</h3>
              </div>

              <div className="cybernews-filter-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFilter(category)}
                    className={`cybernews-filter ${filter === category ? 'is-active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="cybernews-list">
              {filteredNews.map((item) => (
                <article key={item.id} className="cybernews-panel cybernews-card">
                  <div className="cybernews-card-top">
                    <div className="cybernews-meta">
                      <span className="cybernews-badge">{item.category}</span>
                      <span className="cybernews-source">{item.source}</span>
                    </div>

                    <div className="cybernews-time">
                      <Clock3 size={14} />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cybernews-link"
                  >
                    <span>Ler mais</span>
                    <ExternalLink size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>

          <aside className="cybernews-sidebar">
            <div className="cybernews-panel cybernews-sidebar-card">
              <p className="cybernews-section-kicker">Highlights</p>
              <h3>Radar GRC</h3>

              <div className="cybernews-mini-list">
                {highlights.map((item) => (
                  <div key={item.id} className="cybernews-mini-item">
                    <span className="cybernews-mini-dot" />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cybernews-panel cybernews-sidebar-card">
              <p className="cybernews-section-kicker">Status</p>
              <h3>Próxima etapa</h3>
              <p className="cybernews-muted">
                Depois de validar a rota, você pode substituir os dados mockados por feeds reais, API própria ou um
                proxy RSS para evitar bloqueios de CORS.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
