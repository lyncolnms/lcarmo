import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Coffee, Clock, BookOpen, Heart } from "lucide-react";

export function CoffeeSection() {
  const articles = [
    {
      id: 1,
      title: "A Arte do Espresso Perfeito",
      description: "Descubra os segredos para extrair um espresso equilibrado, desde a moagem até o tempo de extração.",
      image: "https://images.unsplash.com/photo-1663145359355-de435f252352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGJhcmlzdGF8ZW58MXx8fHwxNzU5Mjk0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Técnicas",
      readTime: "5 min",
      date: "15 Set 2024"
    },
    {
      id: 2,
      title: "Origem dos Grãos: Brazil Santos",
      description: "Explorando as características únicas dos cafés brasileiros da região de Santos e suas notas de sabor.",
      image: "https://images.unsplash.com/photo-1748894851733-be6747a9c061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBicmV3aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1OTMyNjM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Origem",
      readTime: "8 min",
      date: "10 Set 2024"
    },
    {
      id: 3,
      title: "Latte Art: Primeiros Passos",
      description: "Um guia completo para iniciantes que querem começar a desenhar no leite vaporizado.",
      image: "https://images.unsplash.com/photo-1663145359355-de435f252352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGJhcmlzdGF8ZW58MXx8fHwxNzU5Mjk0MTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Arte",
      readTime: "6 min",
      date: "5 Set 2024"
    }
  ];

  const curiosities = [
    {
      title: "Café é a segunda commodity mais negociada no mundo",
      description: "Perdendo apenas para o petróleo, o café movimenta bilhões de dólares anualmente."
    },
    {
      title: "O café descafeinado ainda contém cafeína",
      description: "Mesmo após o processo de descafeinação, ainda restam cerca de 2-12mg de cafeína por xícara."
    },
    {
      title: "Existem mais de 120 espécies de café",
      description: "Mas apenas duas representam 99% do consumo mundial: Arábica e Robusta."
    }
  ];

  return (
    <section id="cafe" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Coffee className="h-8 w-8" />
            Universo do Café
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorando a arte e ciência por trás da bebida mais amada do mundo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.date}</span>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ler mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Curiosidades sobre Café
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {curiosities.map((curiosity, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">{curiosity.title}</h4>
                <p className="text-sm text-muted-foreground">{curiosity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}