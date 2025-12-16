import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import { useState } from "react";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const experiences = [
    {
      title: "Desenvolvedor Full Stack Mobile",
      company: "Conexa - Hub de Inovação Aliare",
      period: "04/2024 - 07/2025",
      location: "São Paulo, SP",
      description: "Migração de Xamarin.Forms para .NET MAUI, manutenção e novas interfaces.",
      achievements: [
        "Aplicativo AgriQ: Migração e manutenção",
        "Aplicativo My Farm: Migração e adição de funcionalidades",
        "Arquitetura Mobile: Criação de componentes comuns"
      ]
    },
    {
      title: "Engenheiro de Software",
      company: "Asaas",
      period: "07/2021 - 12/2023",
      location: "São Paulo, SP",
      description: "Desenvolvimento de aplicativos móveis e APIs.",
      achievements: [
        "Aplicativo Asaas: Recursos de pagamento e transferências",
        "Aplicativo Asaas Money: Pagamentos via diversos métodos",
        "Api Asaas: Manutenção e novas rotas"
      ]
    },
    {
      title: "Engenheiro de Software",
      company: "Londrisoft",
      period: "06/2017 - 07/2021",
      location: "São Paulo, SP",
      description: "Desenvolvimento de aplicativos móveis para vendas.",
      achievements: [
        "Gestor MobVendas: Aplicativo para controle de vendas e estoque",
        "Tecnologias: Xamarin Android, C#, MVVM, SOLID"
      ]
    }
  ];

  const education = [
    {
      degree: "Pós-graduação Lato Sensu em Cibersegurança",
      institution: "Pontifícia Universidade Católica do Paraná (PUCPR)",
      period: "2025 - 2026",
      location: "Curitiba, PR"
    },
    {
      degree: "Graduação em Análise e Desenvolvimento de Sistemas",
      institution: "UniCesumar",
      period: "2018 - 2020",
      location: "Maringá, PR"
    }
  ];

  const certifications = [
    "Formação Cybersecurity Specialist - DIO.me",
    "Formação DevOps Fundamentals - DIO.me",
    "Formação DevOps para Desenvolvedores - desenvolvedor.io",
    "Desenvolvimento Seguro de Aplicações - Academia Clavis",
    "Bootcamp Engenheiro de Software - IGTI",
    "Desenvolvedor Mobile Multiplataforma Xamarin - Alura"
  ];

  return (
    <section id="curriculo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Currículo</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Minha trajetória profissional e acadêmica no desenvolvimento de software.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-96 mx-auto">
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="education">Formação</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="certifications">Certificações</TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="mt-8">
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{exp.period}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        Principais Conquistas:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium">
                      {edu.institution}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {edu.period}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {edu.location}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
                <div className="space-y-2">
                  {[".NET MAUI", "Xamarin.Forms", "Xamarin.Android", "React Native", "TypeScript", "JavaScript"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Backend & APIs</h3>
                <div className="space-y-2">
                  {["C#", ".NET Core", "ASP.NET", "API REST", "SQL Server", "PostgreSQL"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Arquitetura & Padrões</h3>
                <div className="space-y-2">
                  {["MVVM", "Clean Architecture", "SOLID", "Git", "Azure DevOps", "CI/CD"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Café</h3>
                <div className="space-y-2">
                  {["Espresso", "Pour Over", "Latte Art", "Cupping", "Roasting"].map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">{cert}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}