import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ResumeSection } from './components/ResumeSection';
import { CoffeeSection } from './components/CoffeeSection';
import { ToolsSection } from './components/ToolsSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
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

export default App;
