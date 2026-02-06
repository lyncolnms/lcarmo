import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Coffee, Github, Linkedin, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/lyncolnms", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/lyncolnmauricio", label: "LinkedIn" },
    { icon: Mail, href: "mailto:lyncolnms@gmail.com", label: "Email" }
  ];

  const quickLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Currículo", href: "#curriculo" },
    { label: "Café", href: "#cafe" },
    { label: "Ferramentas", href: "#ferramentas" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary/20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Lyncoln do Carmo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Desenvolvedor full-stack apaixonado por tecnologia e café,
              criando experiências digitais excepcionais.
            </p>
            <div className="flex items-center space-x-2">
              {socialLinks.map((link, index) => (
                <Button key={index} variant="ghost" size="icon" asChild>
                  <a href={link.href} aria-label={link.label}>
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>lyncolnms@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Londrina, PR</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Receba dicas sobre café e desenvolvimento.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex space-x-2">
              <input
                type="email"
                placeholder="Seu email"
                required
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                aria-label="Email para newsletter"
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" size="sm">Assinar</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Lyncoln do Carmo. Todos os direitos reservados.</p>
          <p>Feito com ❤️ e muito ☕</p>
        </div>
      </div>
    </footer>
  );
}