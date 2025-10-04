import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calculator, Beaker, BarChart3, Droplets, Settings, ExternalLink, Coffee, X } from "lucide-react";
import { WaterCalc } from "./WaterCalc";
import { GrindCalc } from "./GrindCalc";
import { MineralCalc } from "./MineralCalc";
import { useState } from "react";

export function ToolsSection() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: "water-calc",
      title: "Calculadora de Água",
      description: "Calcule a quantidade ideal de água para diferentes métodos de extração de café.",
      icon: Droplets,
      category: "Extração",
      features: ["13 métodos suportados", "Relações personalizáveis", "Cálculo automático"],
      isActive: true,
      component: WaterCalc
    },
    {
      id: "grind-calc",
      title: "Calculadora de Moagem",
      description: "Encontre as configurações ideais de moagem para diferentes moedores e métodos.",
      icon: Beaker,
      category: "Moagem",
      features: ["70+ marcas", "200+ modelos", "Gráficos visuais"],
      isActive: true,
      component: GrindCalc
    },
    {
      id: "mineral-calc",
      title: "Calculadora de Minerais",
      description: "Calcule blends perfeitos de água para extração de café specialty.",
      icon: BarChart3,
      category: "Água",
      features: ["Análise de minerais", "Blends automáticos", "Correção de pH"],
      isActive: true,
      component: MineralCalc
    },
    {
      id: "ratio-calc",
      title: "Calculadora de Proporção",
      description: "Calcule proporções ideais de café e água para diferentes intensidades.",
      icon: Calculator,
      category: "Proporção",
      features: ["Proporções personalizáveis", "Múltiplos métodos", "Conversão de unidades"],
      isActive: false,
      component: null
    }
  ];

  return (
    <section id="ferramentas" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Settings className="h-8 w-8" />
            Ferramentas Profissionais
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas especializadas para baristas e entusiastas de café specialty.
          </p>
        </div>

        {activeTool ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {tools.find(t => t.id === activeTool)?.title}
              </h3>
              <Button variant="outline" onClick={() => setActiveTool(null)}>
                <X className="h-4 w-4 mr-2" />
                Fechar
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                {activeTool === "water-calc" && <WaterCalc />}
                {activeTool === "grind-calc" && <GrindCalc />}
                {activeTool === "mineral-calc" && <MineralCalc />}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <tool.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {tool.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {tool.description}
                  </CardDescription>
                  <div className="space-y-2 mb-4">
                    {tool.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  {tool.isActive ? (
                    <Button
                      className="w-full"
                      onClick={() => setActiveTool(tool.id)}
                    >
                      <Coffee className="h-4 w-4 mr-2" />
                      Usar Ferramenta
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Em Breve
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}