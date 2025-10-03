import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
                Olá, eu sou
                <span className="text-primary block">Lyncoln Carmo</span>
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
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5MzAyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional developer workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full">
                <div className="text-center">
                  <div className="font-bold">3+</div>
                  <div className="text-xs">Anos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}