import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ResumeSection } from './components/ResumeSection';
import { CoffeeSection } from './components/CoffeeSection';
import { ToolsSection } from './components/ToolsSection';
import { Footer } from './components/Footer';
import { CybernewsPage } from './pages/CybernewsPage';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ResumeSection />
        <CoffeeSection />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cybernews" element={<CybernewsPage />} />
    </Routes>
  );
};

export default App;
