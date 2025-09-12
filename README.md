# ☕ LCarmo - Portfolio & Coffee Tools

[![React](https://img.shields.io/badge/React-16.12.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Bulma](https://img.shields.io/badge/Bulma-0.9.4-blue.svg)](https://bulma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Um portfólio pessoal moderno combinando apresentação profissional com ferramentas especializadas para entusiastas de café.

## 📋 Sobre o Projeto

LCarmo é uma aplicação web desenvolvida em React que serve como portfólio pessoal e centro de ferramentas para amantes de café. O projeto combina um currículo profissional moderno com calculadoras especializadas para extração de café, oferecendo uma experiência única que demonstra habilidades técnicas através de ferramentas práticas e úteis.

### 🎯 Objetivos

- **Portfólio Profissional**: Apresentar experiência, projetos e habilidades de forma moderna e interativa
- **Ferramentas de Café**: Fornecer calculadoras precisas para extração de café specialty
- **Experiência do Usuário**: Interface responsiva e intuitiva com animações suaves
- **Demonstração Técnica**: Showcase de habilidades em React, TypeScript e design responsivo

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 16.12.0** - Framework principal para construção da interface
- **TypeScript 5.9.2** - Tipagem estática para maior robustez
- **Bulma CSS** - Framework CSS para design responsivo e moderno
- **React Router** - Navegação entre páginas
- **Font Awesome** - Ícones para melhor UX

### Ferramentas de Desenvolvimento

- **Create React App** - Setup inicial do projeto
- **Azure Static Web Apps** - Hospedagem e CI/CD
- **ESLint** - Linting e qualidade de código

### Bibliotecas Adicionais

- **Recharts** - Gráficos interativos para visualização de dados
- **Axios** - Requisições HTTP (para futuras integrações)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Navegação principal
│   └── ProjectCard.tsx # Cards de projetos
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial com projetos
│   ├── Curriculum.tsx  # Currículo profissional
│   ├── Coffee.tsx      # Hub de ferramentas de café
│   ├── WaterCalc.tsx   # Calculadora de água
│   └── GrindCalc.tsx   # Calculadora de moagem
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada
└── index.css           # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/lyncolnms/lcarmo.git
   cd lcarmo
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto**

   ```bash
   npm start
   ```

4. **Acesse no navegador**

   ```
   http://localhost:3000
   ```

### Build para Produção

```bash
npm run build
```

## 📖 Seções do Site

### 🏠 Home (Página Inicial)

A página inicial apresenta:

- **Apresentação pessoal** com foto e descrição profissional
- **Grid responsivo de projetos** com cards interativos
- **Links para redes sociais** e contato
- **Navegação intuitiva** para outras seções

**Funcionalidades:**

- Hover effects nos cards de projetos
- Links diretos para repositórios e demos
- Design responsivo para todos os dispositivos

### 👨‍💼 Curriculum (Currículo)

Seção profissional contendo:

- **Informações pessoais** e contato
- **Experiência profissional** cronologicamente organizada
- **Formação acadêmica** e certificações
- **Habilidades técnicas** categorizadas
- **Projetos destacados** com descrições detalhadas

**Características:**

- Layout limpo e profissional
- Ícones para melhor visualização
- Informações atualizadas e organizadas

### ☕ Coffee Tools (Ferramentas de Café)

Hub central para ferramentas especializadas em café:

#### 💧 Water Calculator (Calculadora de Água)

**Finalidade:** Calcular a quantidade ideal de água para diferentes métodos de extração.

**Como usar:**
1. Selecione o **método de preparo** (ex: V60, AeroPress, French Press)
2. Digite a **quantidade de café** em gramas
3. Escolha a **relação água/café** desejada
4. A calculadora retorna a **quantidade de água** necessária

**Métodos suportados:**

- Pour-over (V60, Chemex, etc.)
- AeroPress
- French Press
- Moka Pot
- Espresso
- Cold Brew

**Fórmula utilizada:**

```javascript
Água = Café × (Relação / 1000)
```

*Exemplo: 20g de café com relação 16:1 = 320ml de água*

#### ⚙️ Grind Calculator (Calculadora de Moagem)

**Finalidade:** Encontrar as configurações ideais de moagem para diferentes métodos de extração baseado no moedor utilizado.

**Como usar:**
1. **Selecione a marca** do moedor no primeiro dropdown
2. **Selecione o modelo** específico no segundo dropdown
3. Visualize as **configurações recomendadas** para cada método
4. Use o **gráfico interativo** para comparação visual

**Características especiais:**

- **Database abrangente** com 70+ marcas e 200+ modelos
- **Gráfico personalizado** mostrando ranges visuais
- **Configurações precisas** baseadas em dados reais
- **Interface responsiva** com detalhes organizados

**Marcas suportadas:**

- 1Zpresso (JX, K-Max, X-Pro, etc.)
- Baratza (Encore, Virtuoso, Sette, etc.)
- Eureka (Mignon, Atom, etc.)
- Fellow (Ode, Opus)
- Mahlkönig (EK43, VTA, etc.)
- E muitas outras...

**Visualização:**

- Gráfico horizontal com barras coloridas
- Escala de moagem no topo
- Nomes dos métodos dentro das barras
- Detalhes estatísticos no painel lateral

## 🎨 Design e UX

### Tema Visual

- **Cores principais:** Tons de café (#8B4513, #D2691E, #DEB887)
- **Tipografia:** Moderna e legível
- **Espaçamento:** Consistente e respirável

### Responsividade

- **Mobile-first approach**
- **Breakpoints otimizados** para tablets e desktops
- **Flexbox e Grid** para layouts flexíveis

### Interatividade

- **Hover effects** suaves
- **Transições animadas**
- **Feedback visual** para ações do usuário

## 🔧 Funcionalidades Técnicas

### TypeScript Integration

- **Tipagem completa** para maior robustez
- **Interfaces** para dados estruturados
- **Type safety** em todos os componentes

### Component Architecture

- **Componentes reutilizáveis**
- **Separação de responsabilidades**
- **Props bem tipadas**

### Performance

- **Lazy loading** para otimização
- **Memoização** de componentes
- **Bundle otimizado** para produção

## 📊 Dados Técnicos

### Coffee Tools Database

- **70+ marcas** de moedores catalogadas
- **200+ modelos** com configurações específicas
- **13 métodos** de extração suportados
- **Ranges precisos** baseados em dados reais

### Performance Metrics

- **Bundle size:** ~200KB (produção)
- **First paint:** < 1.5s
- **Time to interactive:** < 2s

## 🤝 Como Contribuir

1. **Fork** o projeto
2. **Clone** sua fork: `git clone https://github.com/seu-usuario/lcarmo.git`
3. **Crie uma branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Commit suas mudanças**: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push para a branch**: `git push origin feature/nova-funcionalidade`
6. **Abra um Pull Request**

### Sugestões de Contribuição

- Adicionar novas marcas/modelos de moedores
- Implementar novos métodos de extração
- Melhorar a precisão dos cálculos
- Adicionar testes automatizados
- Traduções para outros idiomas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Lyncoln Mauricio**

- LinkedIn: [in/lyncolnmauricio](https://www.linkedin.com/in/lyncolnmauricio)
- GitHub: [@lyncolnms](https://github.com/lyncolnms)
- Email: [lyncolnms@gmail.com](mailto:lyncolnms@gmail.com)

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**

Feito com ☕ e ❤️ para a comunidade de café e desenvolvimento
