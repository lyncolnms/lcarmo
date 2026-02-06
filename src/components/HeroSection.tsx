import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export function HeroSection() {
  const skills = [
    "React", "TypeScript", "Node.js", "Python",
    "Design Systems", "Coffee Brewing", "UX/UI"
  ];

  return (
    <section id="sobre" className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Olá, eu sou o
                <span className="text-primary block">Lyncoln</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Desenvolvedor full-stack apaixonado por criar experiências digitais
                incríveis e por descobrir os melhores cafés do mundo.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button size="lg" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-4 border-primary shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center relative">
                <svg className="w-full h-full pointer-events-none relative z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="url(#avatarBg)" opacity="0.2" />
                  <circle cx="100" cy="100" r="75" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
                  <text 
                    x="100" 
                    y="110" 
                    fontSize="56" 
                    fontWeight="900" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fill="white"
                    filter="url(#glow)"
                    style={{fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '2px'}}
                  >
                    LM
                  </text>
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl border-4 border-white dark:border-gray-900 z-10 pointer-events-auto">
                <div className="text-center whitespace-nowrap">
                  <div className="font-bold text-lg leading-tight">10+</div>
                  <div className="text-xs leading-tight">Anos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}