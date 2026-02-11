import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, MapPin, GraduationCap, Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  const experiences = [
    {
      title: "Desenvolvedor Full Stack Mobile",
      company: "Conexa - Hub de Inovação Aliare",
      period: "04/2024 - 07/2025",
      location: "Remoto",
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
      location: "Remoto",
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
      location: "Londrina, PR",
      description: "Desenvolvimento de aplicativos móveis para vendas.",
      achievements: [
        "Gestor MobVendas: Aplicativo para controle de vendas e estoque",
        "Tecnologias: Xamarin Android, C#, MVVM, SOLID"
      ]
    },
    {
      title: "Programador Web",
      company: "Yankton Technologies",
      period: "08/2016 - 05/2017",
      location: "Londrina, PR",
      description: "Desenvolvimento de aplicativos mobile híbridos.",
      achievements: [
        "Cinemark: Aplicativo para filmes e compras de ingressos",
        "Santander Universitário: Aplicativo com puzzles para concorrer a bolsas",
        "Tecnologias: Cordova, Ionic, AngularJS"
      ]
    },
    {
      title: "Estagiário de Desenvolvimento",
      company: "Yankton Technologies",
      period: "12/2015 - 08/2016",
      location: "Londrina, PR",
      description: "Desenvolvimento de aplicações web interativas.",
      achievements: [
        "OED's: Desenvolvimento de puzzles educacionais web",
        "Tecnologias: Javascript, AngularJS, HTML5, CSS"
      ]
    },
    {
      title: "Estagiário de T.I.",
      company: "Embrapa Soja",
      period: "07/2013 - 05/2015",
      location: "Londrina, PR",
      description: "Desenvolvimento de sistema de gestão empresarial.",
      achievements: [
        "SiGCo: Sistema de gerenciamento de competências",
        "Tecnologias: Java Web, JSF, JPA, Hibernate, PrimeFaces, Spring Security, Wildfly 8"
      ]
    }
  ];

  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, 3);

  const education = [
    {
      degree: "Pós-graduação Lato Sensu em Cibersegurança",
      institution: "Pontifícia Universidade Católica do Paraná (PUCPR)",
      period: "2025 - 2026"
    },
    {
      degree: "Graduação em Análise e Desenvolvimento de Sistemas",
      institution: "UniCesumar",
      period: "2018 - 2020"
    }
  ];

  const certifications = [
    { name: "Formação .NET Developer", provider: "DIO.me", url: "https://hermes.dio.me/certificates/U2Z7ZOBL.pdf" },
    { name: "Cognizant - Mobile Developer", provider: "DIO.me", url: "https://hermes.dio.me/certificates/SWHA0GOS.pdf" },
    { name: "Network Fundamentals II", provider: "Lets Defend", url: "https://app.letsdefend.io/my-rewards/detail/bbb6c3d648914b57b688cfb2a457ec56" },
    { name: "Network Fundamentals", provider: "Lets Defend", url: "https://app.letsdefend.io/my-rewards/detail/b966e29f59da471db9da75da73f70012" },
    { name: "Formação Cybersecurity Specialist", provider: "DIO.me", url: "https://hermes.dio.me/certificates/BSS5XI1S.pdf" },
    { name: "Formação DevOps Fundamentals", provider: "DIO.me", url: "https://hermes.dio.me/certificates/UQZDNBBE.pdf" },
    { name: "Formação DevOps para Desenvolvedores", provider: "desenvolvedor.io", url: "https://desenvolvedor.io/certificado/d116a536-1a24-48d9-a7de-34e31e2b6396" },
    { name: "Desenvolvimento Seguro de Aplicações", provider: "Academia Clavis" },
    { name: "Bootcamp Engenheiro de Software", provider: "IGTI" },
    { name: "Desenvolvedor Mobile Multiplataforma Xamarin", provider: "Alura", url: "https://cursos.alura.com.br/user/lyncolnmauricio/career/desenvolvedor-mobile-xamarin/certificate" },
    { name: "Desenvolvedor Android", provider: "Udemy", url: "https://www.udemy.com/certificate/UC-G8KJADHT" },
    { name: "Desenvolvedor Android, iOS e WP", provider: "Udemy", url: "https://www.udemy.com/certificate/UC-UPQUDK4G" }
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
              {displayedExperiences.map((exp) => (
                <Card key={`${exp.company}-${exp.period}`}>
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
            
            {experiences.length > 3 && (
              <div className="flex justify-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllExperiences(!showAllExperiences)}
                  className="flex items-center gap-2"
                >
                  {showAllExperiences ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Mostrar menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Carregar mais ({experiences.length - 3} experiências anteriores)
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="education" className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <Card key={edu.degree + edu.institution}>
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
                  {[".NET MAUI", "Xamarin.Forms", "Xamarin.Android"].map((skill) => (
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
              {certifications.map((cert) => (
                <Card key={`${cert.name}::${cert.provider}`} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{cert.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{cert.provider}</p>
                        </div>
                      </div>
                      {cert.url && (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                          aria-label={`Ver certificado ${cert.name}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
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