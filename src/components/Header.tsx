import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Menu,
  Coffee,
  User,
  Briefcase,
  FileText,
  Wrench,
  Shield,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsOpen(false);
  };

  const menuItems = [
    { id: "sobre", label: "Sobre", icon: User },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "curriculo", label: "Currículo", icon: FileText },
    { id: "cafe", label: "Café", icon: Coffee },
    { id: "ferramentas", label: "Ferramentas", icon: Wrench },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="font-semibold">Lyncoln do Carmo</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => scrollToSection(item.id)}
              className="flex items-center space-x-2"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}

          <Button variant="outline" asChild className="ml-2">
            <Link to="/cybernews" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Cybernews</span>
            </Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72" aria-label="Menu de navegação">
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-2">
                <Coffee className="h-5 w-5 text-primary" />
                <span className="font-semibold">Início</span>
              </Link>

              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-2 justify-start"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}

              <Button variant="outline" asChild className="justify-start">
                <Link to="/cybernews" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Cybernews</span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
