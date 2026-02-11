import React, { useState, useMemo } from 'react';

interface GrinderSettings {
  [method: string]: string;
}

interface Grinders {
  [brand: string]: {
    [model: string]: GrinderSettings;
  };
}

interface CustomGrindChartProps {
  methods: string[];
  settings: { [method: string]: string };
  parseSetting: (setting: string) => number;
}

const CustomGrindChart: React.FC<CustomGrindChartProps> = ({ methods, settings, parseSetting }) => {
  // Calcular os valores mínimo e máximo para a escala
  const allValues: number[] = [];
  methods.forEach(method => {
    const setting = settings[method];
    if (setting) {
      if (setting.includes('-')) {
        const [min, max] = setting.split('-').map(Number);
        allValues.push(min, max);
      } else if (setting.includes('+')) {
        const value = Number(setting.replace('+', ''));
        allValues.push(value);
      } else {
        allValues.push(Number(setting) || 0);
      }
    }
  });

  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const range = maxValue - minValue;
  const padding = Math.max(range * 0.15, 2); // Pelo menos 2 unidades de padding

  const chartMin = Math.max(0, minValue - padding);
  const chartMax = maxValue + padding;

  // Dimensões do gráfico
  const chartWidth = 1000;
  const chartHeight = Math.max(700, methods.length * 60 + 150); // Altura mantida
  const barHeight = 35;
  const barSpacing = 12;

  // Função para converter valor para coordenada X
  const valueToX = (value: number) => {
    return ((value - chartMin) / (chartMax - chartMin)) * (chartWidth - 100) + 50;
  };

  // Cores para os métodos
  const methodColors = [
    '#8B4513', '#A0522D', '#CD853F', '#D2691E', '#DEB887',
    '#F4A460', '#D2B48C', '#BC8F8F', '#F5DEB3', '#FFE4B5',
    '#DAA520', '#B8860B', '#CD853F'
  ];

  return (
    <svg width={chartWidth} height={chartHeight} style={{ border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      {/* Linha horizontal principal (eixo X) */}
      <line 
        x1="50" 
        y1={chartHeight - 50} 
        x2={chartWidth - 50} 
        y2={chartHeight - 50} 
        stroke="#333" 
        strokeWidth="2" 
      />

      {/* Marcas de escala no topo */}
      {Array.from({ length: Math.ceil((chartMax - chartMin) / 5) + 1 }, (_, i) => {
        const value = Math.round(chartMin + i * 5);
        const x = valueToX(value);
        return (
          <g key={i}>
            {/* Linha vertical da escala */}
            <line 
              x1={x} 
              y1={chartHeight - 50} 
              x2={x} 
              y2={chartHeight - 40} 
              stroke="#666" 
              strokeWidth="1" 
            />
            {/* Número da escala */}
            <text 
              x={x} 
              y={chartHeight - 55} 
              textAnchor="middle" 
              fontSize="12" 
              fill="#333"
            >
              {value}
            </text>
          </g>
        );
      })}

      {/* Linhas verticais principais (mínimo e máximo) */}
      <line 
        x1={valueToX(minValue)} 
        y1={chartHeight - 60} 
        x2={valueToX(minValue)} 
        y2={70} 
        stroke="#666" 
        strokeWidth="1" 
        strokeDasharray="3,3" 
      />
      <line 
        x1={valueToX(maxValue)} 
        y1={chartHeight - 60} 
        x2={valueToX(maxValue)} 
        y2={70} 
        stroke="#666" 
        strokeWidth="1" 
        strokeDasharray="3,3" 
      />

      {/* Labels para mínimo e máximo */}
      <text 
        x={valueToX(minValue)} 
        y={60} 
        textAnchor="middle" 
        fontSize="12" 
        fill="#666" 
        fontWeight="bold"
      >
        Min: {minValue}
      </text>
      <text 
        x={valueToX(maxValue)} 
        y={60} 
        textAnchor="middle" 
        fontSize="12" 
        fill="#666" 
        fontWeight="bold"
      >
        Max: {maxValue}
      </text>

      {/* Barras para cada método */}
      {methods.map((method, index) => {
        const setting = settings[method];
        if (!setting) return null;

        let barStart: number, barWidth: number;
        
        if (setting.includes('-')) {
          const [min, max] = setting.split('-').map(Number);
          barStart = valueToX(min);
          barWidth = valueToX(max) - barStart;
        } else if (setting.includes('+')) {
          const value = Number(setting.replace('+', ''));
          barStart = valueToX(value);
          barWidth = valueToX(chartMax) - barStart;
        } else {
          const value = Number(setting) || 0;
          barStart = valueToX(value);
          barWidth = 20; // Largura fixa para valores únicos
        }

        const y = 100 + index * (barHeight + barSpacing);

        return (
          <g key={method}>
            {/* Retângulo da barra */}
            <rect
              x={barStart}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={methodColors[index % methodColors.length]}
              stroke="#333"
              strokeWidth="1"
              rx="3"
            />
            {/* Nome do método dentro da barra */}
            <text
              x={barStart + barWidth / 2}
              y={y + barHeight / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fill="white"
              fontWeight="bold"
            >
              {method.length > 15 ? method.substring(0, 13) + '...' : method}
            </text>
            {/* Valor do setting */}
            <text
              x={barStart + barWidth + 10}
              y={y + barHeight / 2 + 5}
              fontSize="11"
              fill="#333"
            >
              {setting}
            </text>
          </g>
        );
      })}

      {/* Título */}
      <text 
        x={chartWidth / 2} 
        y={20} 
        textAnchor="middle" 
        fontSize="16" 
        fill="#333" 
        fontWeight="bold"
      >
        Grind Settings by Method
      </text>
    </svg>
  );
};

// Helper functions to generate settings based on grinder type (moved outside component to avoid recreation)
const generateManualGrinderSettings = () => ({
  'Turkish': '1-2',
  'Espresso': '5-8',
  'Filter Coffee Machine': '10-15',
  'AeroPress': '8-12',
  'Moka Pot': '6-10',
  'Siphon': '9-13',
  'V60': '10-12',
  'Pour-over': '11-14',
  'Steep-and-release': '12-14',
  'Cupping': '13-15',
  'French Press': '18-25',
  'Cold Brew': '25+',
  'Cold Drip': '22-28'
});

const generateElectricGrinderSettings = () => ({
  'Turkish': '1-2',
  'Espresso': '8-12',
  'Filter Coffee Machine': '15-20',
  'AeroPress': '12-18',
  'Moka Pot': '10-15',
  'Siphon': '13-17',
  'V60': '14-16',
  'Pour-over': '15-19',
  'Steep-and-release': '16-18',
  'Cupping': '17-19',
  'French Press': '25-30',
  'Cold Brew': '30+',
  'Cold Drip': '28-32'
});

const generatePremiumGrinderSettings = () => ({
  'Turkish': '1-2',
  'Espresso': '10-15',
  'Filter Coffee Machine': '18-25',
  'AeroPress': '15-22',
  'Moka Pot': '12-18',
  'Siphon': '16-20',
  'V60': '17-19',
  'Pour-over': '18-22',
  'Steep-and-release': '19-21',
  'Cupping': '20-22',
  'French Press': '28-35',
  'Cold Brew': '35+',
  'Cold Drip': '32-38'
});

// Large grinders dataset moved outside component to prevent recreation on every render
const grinders: Grinders = {
  '1Zpresso': {
    'J-Max': generateManualGrinderSettings(),
    'J-Max S': generateManualGrinderSettings(),
    'J-Ultra': generateManualGrinderSettings(),
      'JE': generateManualGrinderSettings(),
      'JX': generateManualGrinderSettings(),
      'JX S': generateManualGrinderSettings(),
      'JX-Pro': generateManualGrinderSettings(),
      'JX-Pro S': generateManualGrinderSettings(),
      'K-Max': generateManualGrinderSettings(),
      'K-Plus': generateManualGrinderSettings(),
      'K-Pro': generateManualGrinderSettings(),
      'K-Ultra': generateManualGrinderSettings(),
      'Q Air': generateManualGrinderSettings(),
      'Q2 (Heptagonal burrs)': generateManualGrinderSettings(),
      'Q2 (Pentagonal burrs)': generateManualGrinderSettings(),
      'Q2 S': generateManualGrinderSettings(),
      'X-Pro': generateManualGrinderSettings(),
      'X-Pro S': generateManualGrinderSettings(),
      'X-Ultra': generateManualGrinderSettings(),
      'ZP6': generateManualGrinderSettings(),
      'ZP6 Special': generateManualGrinderSettings()
    },
    'Acaia': {
      'Orbit': generatePremiumGrinderSettings()
    },
    'Anfim': {
      'Best': generatePremiumGrinderSettings()
    },
    'Balmuda': {
      'Coffee Mill': generateManualGrinderSettings()
    },
    'Baratza': {
      'Encore': generateElectricGrinderSettings(),
      'Encore ESP': generateElectricGrinderSettings(),
      'Forté AP': generateElectricGrinderSettings(),
      'Forté BG': generateElectricGrinderSettings(),
      'Maestro': generatePremiumGrinderSettings(),
      'Maestro Plus': generatePremiumGrinderSettings(),
      'Preciso': generatePremiumGrinderSettings(),
      'Sette 270': generateElectricGrinderSettings(),
      'Sette 270 W': generateElectricGrinderSettings(),
      'Sette 270 Wi': generateElectricGrinderSettings(),
      'Sette 30': generateElectricGrinderSettings(),
      'Starbucks Barista': generateElectricGrinderSettings(),
      'Vario': generateElectricGrinderSettings(),
      'Vario+': generateElectricGrinderSettings(),
      'Vario W': generateElectricGrinderSettings(),
      'Vario W+': generateElectricGrinderSettings(),
      'Virtuoso': generateElectricGrinderSettings(),
      'Virtuoso+': generateElectricGrinderSettings()
    },
    'Barista & Co': {
      'Core All Grind': generateManualGrinderSettings()
    },
    'Barista Space': {
      'Premium Coffee Hand Grinder': generateManualGrinderSettings()
    },
    'BelleLife': {
      'Electric Coffee Grinder': generateElectricGrinderSettings()
    },
    'Bentwood': {
      'Vertical 63': generateManualGrinderSettings()
    },
    'Bodum': {
      'Bistro 10903': generateElectricGrinderSettings()
    },
    'Breville (Sage)': {
      'The Dose Control Pro': generatePremiumGrinderSettings(),
      'The Smart Grinder Pro': generatePremiumGrinderSettings()
    },
    'Cafflano': {
      'Grinder': generateManualGrinderSettings()
    },
    'Capresso': {
      'Infinity': generateElectricGrinderSettings(),
      'Infinity Plus': generateElectricGrinderSettings()
    },
    'Comandante': {
      'C40 MK4': generateManualGrinderSettings(),
      'C40 MK4 (with Red Clix)': generateManualGrinderSettings(),
      'C60 Baracuda': generateManualGrinderSettings(),
      'C60 Baracuda (with Gold Clix)': generateManualGrinderSettings(),
      'X25 Trailmaster': generateManualGrinderSettings(),
      'X25 Trailmaster (with Red Clix)': generateManualGrinderSettings()
    },
    'Compak': {
      'K3 Push': generatePremiumGrinderSettings(),
      'K3 Touch': generatePremiumGrinderSettings(),
      'K3 Touch Advanced': generatePremiumGrinderSettings()
    },
    'Cores': {
      'Cone Grinder C330': generateManualGrinderSettings()
    },
    'Cuisinart': {
      'CBM-18': generateElectricGrinderSettings(),
      'DBM-8': generateElectricGrinderSettings()
    },
    'De\'Longhi': {
      'KG79': generateElectricGrinderSettings(),
      'KG89': generateElectricGrinderSettings()
    },
    'Epeios': {
      'Essense Go': generateManualGrinderSettings()
    },
    'Etzinger': {
      'etz-I (Regular)': generateManualGrinderSettings(),
      'etz-I (Trim)': generateManualGrinderSettings(),
      'etz-U': generateManualGrinderSettings()
    },
    'Eureka': {
      'Atom 60': generatePremiumGrinderSettings(),
      'Atom 75': generatePremiumGrinderSettings(),
      'Drogheria MCD4': generatePremiumGrinderSettings(),
      'Mignon Classico': generatePremiumGrinderSettings(),
      'Mignon Oro': generatePremiumGrinderSettings(),
      'Mignon Oro XL': generatePremiumGrinderSettings(),
      'Mignon Silenzio': generatePremiumGrinderSettings(),
      'Mignon Specialità': generatePremiumGrinderSettings()
    },
    'Fellow': {
      'Ode Brew Grinder Gen 1': generatePremiumGrinderSettings(),
      'Ode Brew Grinder Gen 2': generatePremiumGrinderSettings(),
      'Opus': generatePremiumGrinderSettings()
    },
    'Fiorenzato': {
      'Pietro': generatePremiumGrinderSettings()
    },
    'Fiorenzato (Sanremo)': {
      'Allground': generatePremiumGrinderSettings(),
      'Allground Sense': generatePremiumGrinderSettings()
    },
    'Flair Espresso': {
      'Royal Grinder': generateManualGrinderSettings()
    },
    'Fuji Royal': {
      'R-220': generateManualGrinderSettings()
    },
    'Goat Story': {
      'Arco': generateManualGrinderSettings()
    },
    'Handground': {
      'Precision Coffee Grinder': generateManualGrinderSettings()
    },
    'Hario': {
      'Mini Mill': generateManualGrinderSettings(),
      'Mini Mill PLUS': generateManualGrinderSettings(),
      'Mini Mill Slim': generateManualGrinderSettings(),
      'Mini Mill Slim PRO': generateManualGrinderSettings(),
      'Skerton': generateManualGrinderSettings(),
      'Skerton PLUS': generateManualGrinderSettings(),
      'Skerton PRO': generateManualGrinderSettings(),
      'Smart-G': generateManualGrinderSettings(),
      'V60 EVC-8B': generateManualGrinderSettings(),
      'V60 EVCG-8B-E': generateManualGrinderSettings()
    },
    'Helor': {
      '101': generateManualGrinderSettings(),
      '106 Flux': generateManualGrinderSettings()
    },
    'HeyCafé': {
      'H1': generateManualGrinderSettings()
    },
    'Hongbei': {
      'Coffee Grinder': generateManualGrinderSettings()
    },
    'JavaPresse': {
      'Manual Coffee Grinder': generateManualGrinderSettings()
    },
    'Joy Resolve': {
      'Groove Compact': generateManualGrinderSettings()
    },
    'Kaldi': {
      'Ceramic Coffee Mill': generateManualGrinderSettings()
    },
    'Kalita': {
      'C-90': generateManualGrinderSettings(),
      'DIA Coffee Mill': generateManualGrinderSettings(),
      'Next G': generateManualGrinderSettings(),
      'Nice Cut G': generateManualGrinderSettings()
    },
    'Kanso': {
      'Hiku': generateManualGrinderSettings()
    },
    'KINGrinder': {
      'K0': generateManualGrinderSettings(),
      'K1': generateManualGrinderSettings(),
      'K2': generateManualGrinderSettings(),
      'K3': generateManualGrinderSettings(),
      'K4': generateManualGrinderSettings(),
      'K5': generateManualGrinderSettings(),
      'K6': generateManualGrinderSettings(),
      'P0': generateManualGrinderSettings(),
      'P1': generateManualGrinderSettings(),
      'P2': generateManualGrinderSettings()
    },
    'Kinu': {
      'M47 Classic': generateManualGrinderSettings(),
      'M47 Phoenix': generateManualGrinderSettings(),
      'M47 Simplicity': generateManualGrinderSettings(),
      'M47 Traveller': generateManualGrinderSettings()
    },
    'KitchenAid': {
      'Artisan Coffee Grinder 5KCG0702': generateElectricGrinderSettings(),
      'Coffee Grinder 5KCG8433': generateElectricGrinderSettings()
    },
    'Knock': {
      'Aergrind': generateManualGrinderSettings(),
      'Feld2': generateManualGrinderSettings(),
      'Feldgrind': generateManualGrinderSettings()
    },
    'Krups': {
      'GVX1': generateElectricGrinderSettings(),
      'GVX2': generateElectricGrinderSettings(),
      'GX5000': generateElectricGrinderSettings(),
      'GX6000': generateElectricGrinderSettings()
    },
    'Mahlkönig': {
      'EK43 (0-16)': generatePremiumGrinderSettings(),
      'EK43 (1-11)': generatePremiumGrinderSettings(),
      'EK43 S': generatePremiumGrinderSettings(),
      'GH2 (HC880)': generatePremiumGrinderSettings(),
      'VTA 6S': generatePremiumGrinderSettings(),
      'VTA 6S W': generatePremiumGrinderSettings(),
      'X54': generatePremiumGrinderSettings()
    },
    'Mavo': {
      'Phantox Pro': generateManualGrinderSettings()
    },
    'Mazzer': {
      'ZM': generatePremiumGrinderSettings(),
      'ZM Plus': generatePremiumGrinderSettings()
    },
    'Melitta': {
      'Calibra': generateElectricGrinderSettings(),
      'Molino': generateElectricGrinderSettings()
    },
    'MHW-3BOMBER': {
      'Blade R3': generateManualGrinderSettings()
    },
    'MiiCoffee': {
      'D40+': generateManualGrinderSettings()
    },
    'Moccamaster': {
      'KM5': generateElectricGrinderSettings()
    },
    'montwave': {
      'GU2': generateManualGrinderSettings()
    },
    'Mueller': {
      'Ultra-Grind': generateElectricGrinderSettings()
    },
    'Niche': {
      'Zero': generateManualGrinderSettings()
    },
    'Option-O': {
      'Lagom Mini (Moonshine burrs)': generateManualGrinderSettings(),
      'Lagom Mini (Obsidian burrs)': generateManualGrinderSettings(),
      'Lagom P64': generateManualGrinderSettings()
    },
    'Orphan Espresso': {
      'Lido OG': generateManualGrinderSettings()
    },
    'OXO': {
      'Conical Burr Coffee Grinder': generateElectricGrinderSettings()
    },
    'Pinecone': {
      'Pinion': generateManualGrinderSettings()
    },
    'Porlex': {
      'Mini': generateManualGrinderSettings(),
      'Mini II': generateManualGrinderSettings(),
      'Tall': generateManualGrinderSettings(),
      'Tall II': generateManualGrinderSettings()
    },
    'Precision': {
      'GS30': generateManualGrinderSettings()
    },
    'Rancilio': {
      'Rocky': generatePremiumGrinderSettings(),
      'Rocky SD': generatePremiumGrinderSettings()
    },
    'ROK': {
      'GrinderGC': generateManualGrinderSettings()
    },
    'Saint Anthony Industries': {
      'Millwright Hand Grinder': generateManualGrinderSettings()
    },
    'Smeg': {
      'CGF01': generateElectricGrinderSettings(),
      'CGF11': generateElectricGrinderSettings()
    },
    'Timemore': {
      'C2': generateManualGrinderSettings(),
      'C2 Fold': generateManualGrinderSettings(),
      'C2 Max': generateManualGrinderSettings(),
      'C2 Max Pro': generateManualGrinderSettings(),
      'C3': generateManualGrinderSettings(),
      'C3 ESP': generateManualGrinderSettings(),
      'C3 ESP Pro': generateManualGrinderSettings(),
      'C3 Max': generateManualGrinderSettings(),
      'C3 Max Pro': generateManualGrinderSettings(),
      'C3 Pro': generateManualGrinderSettings(),
      'C3S': generateManualGrinderSettings(),
      'C3S Pro': generateManualGrinderSettings(),
      'Chestnut X': generateManualGrinderSettings(),
      'G1': generateManualGrinderSettings(),
      'G1 Plus': generateManualGrinderSettings(),
      'Nano': generateManualGrinderSettings(),
      'S3': generateManualGrinderSettings(),
      'Sculptor 064': generateManualGrinderSettings(),
      'Sculptor 064S': generateManualGrinderSettings(),
      'Sculptor 078': generateManualGrinderSettings(),
      'Sculptor 078S': generateManualGrinderSettings(),
      'Slim': generateManualGrinderSettings()
    },
    'Timemore x Millab': {
      'E01': generateManualGrinderSettings(),
      'M01': generateManualGrinderSettings()
    },
    'Turin': {
      'DF54': generateManualGrinderSettings(),
      'DF64 (Gen 1)': generateManualGrinderSettings(),
      'DF64 (Gen 2)': generateManualGrinderSettings(),
      'DF64V': generateManualGrinderSettings(),
      'DF83': generateManualGrinderSettings(),
      'DF83V': generateManualGrinderSettings(),
      'SD40 V1': generateManualGrinderSettings(),
      'SD40 V2': generateManualGrinderSettings()
    },
    'Varia': {
      'Evo Hybrid': generateManualGrinderSettings(),
      'Hand grinder': generateManualGrinderSettings(),
      'VS3 (Gen 1)': generateManualGrinderSettings(),
      'VS3 (Gen 2)': generateManualGrinderSettings(),
      'VS6': generateManualGrinderSettings()
    },
    'Vevok Chef': {
      '06': generateManualGrinderSettings(),
      '06 Slim': generateManualGrinderSettings()
    },
    'VSSL': {
      'JAVA': generateManualGrinderSettings()
    },
    'Wacaco': {
      'Exagrind': generateManualGrinderSettings()
    },
    'Weber Workshops': {
      'EG-1': generateManualGrinderSettings(),
      'KEY Mk1': generateManualGrinderSettings()
    },
    'Wilfa': {
      'Balance': generateElectricGrinderSettings(),
      'Svart': generateElectricGrinderSettings(),
      'Svart Aroma': generateElectricGrinderSettings(),
      'Uniform': generateElectricGrinderSettings()
    },
    'Zwilling': {
      'Enfinigy Coffee Grinder': generateElectricGrinderSettings()
    }
  };

const GrindCalc: React.FC = () => {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');

  // Function to parse grinder settings for chart
  const parseSetting = (setting: string): number => {
    if (setting.includes('-')) {
      const [min, max] = setting.split('-').map(Number);
      return (min + max) / 2;
    } else if (setting.includes('+')) {
      return Number(setting.replace('+', ''));
    } else {
      return Number(setting) || 0;
    }
  };

  const methods = [
    'Turkish', 'Espresso', 'Filter Coffee Machine', 'AeroPress', 'Moka Pot',
    'Siphon', 'V60', 'Pour-over', 'Steep-and-release', 'Cupping',
    'French Press', 'Cold Brew', 'Cold Drip'
  ];

  const selectedSettings = brand && model && grinders[brand] && grinders[brand][model] ? grinders[brand][model] : null;

  // Memoize statistics calculations to avoid redundant processing on every render
  const statistics = useMemo(() => {
    if (!selectedSettings) return null;
    
    const settings = methods.map(m => parseSetting(selectedSettings[m] || '0'));
    const minSetting = Math.min(...settings);
    const maxSetting = Math.max(...settings);
    
    return {
      minSetting,
      maxSetting,
      range: maxSetting - minSetting
    };
  }, [selectedSettings]);


  return (
    <main className="coffee-theme">
      <h2><i className="fa fa-cogs"></i> Coffee Grind Size Tool</h2>
      <p>Select your grinder brand and model to get recommended settings for each brewing method.</p>
      
      <div className="field">
        <label className="label"><i className="fa fa-industry"></i> Brand:</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }}>
              <option value="">Select Brand</option>
              {Object.keys(grinders).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label"><i className="fa fa-cog"></i> Model:</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
              <option value="">Select Model</option>
              {brand && grinders[brand] && Object.keys(grinders[brand]).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      {selectedSettings && (
        <div className="box">
          <h3 className="title is-4 has-text-centered">Grind Size Chart for {brand} {model}</h3>
          
          {/* Layout responsivo */}
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: '15px', 
            alignItems: 'flex-start',
            marginTop: '20px',
            width: '100%'
          }}>
            
            {/* Gráfico - ocupa mais espaço */}
            <div style={{ 
              flex: window.innerWidth < 768 ? '1' : '2.5', 
              display: 'flex', 
              justifyContent: 'center',
              minHeight: '800px',
              maxWidth: '1050px'
            }}>
              {selectedSettings && (
                <CustomGrindChart 
                  methods={methods} 
                  settings={selectedSettings} 
                  parseSetting={parseSetting}
                />
              )}
            </div>
            
            {/* Painel de detalhes - responsivo */}
            <div style={{ 
              flex: window.innerWidth < 768 ? '1' : '0 0 200px',
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '12px', 
              border: '1px solid #e9ecef',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              maxHeight: '800px',
              overflowY: 'auto',
              alignSelf: 'flex-start'
            }}>
              <h4 className="title is-5" style={{ 
                marginBottom: '20px', 
                color: '#2c3e50',
                borderBottom: '2px solid #8B4513',
                paddingBottom: '10px'
              }}>
                <i className="fa fa-info-circle" style={{ marginRight: '8px' }}></i>
                Method Details
              </h4>
              
              <div style={{ marginBottom: '25px' }}>
                {methods.map((method, index) => {
                  const setting = selectedSettings ? selectedSettings[method] : null;
                  const color = ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#DEB887', '#F4A460', '#D2B48C', '#BC8F8F', '#F5DEB3', '#FFE4B5', '#DAA520', '#B8860B', '#CD853F'][index % 13];
                  
                  return (
                    <div key={method} style={{ 
                      marginBottom: '12px', 
                      padding: '12px', 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: `2px solid ${color}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s'
                    }}>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '15px', 
                        color: '#2c3e50', 
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: color, 
                          borderRadius: '50%',
                          marginRight: '8px',
                          flexShrink: 0
                        }}></div>
                        {method}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6c757d' }}>
                        <strong>Setting:</strong> <span style={{ 
                          fontWeight: 'bold', 
                          color: color,
                          fontSize: '16px'
                        }}>{setting || 'N/A'}</span>
                      </div>
                      {setting && setting.includes('-') && (
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#868e96', 
                          marginTop: '4px',
                          fontStyle: 'italic'
                        }}>
                          Range: {setting}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Resumo estatístico */}
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#fff3cd', 
                borderRadius: '8px',
                border: '1px solid #ffeaa7'
              }}>
                <h5 style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  marginBottom: '12px', 
                  color: '#856404',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <i className="fa fa-chart-bar" style={{ marginRight: '8px' }}></i>
                  Statistics
                </h5>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <div style={{ marginBottom: '6px' }}>
                    <strong>Total methods:</strong> {methods.length}
                  </div>
                  {statistics && (
                    <>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>Min setting:</strong> {statistics.minSetting}
                      </div>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>Max setting:</strong> {statistics.maxSetting}
                      </div>
                      <div>
                        <strong>Range:</strong> {statistics.range} units
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GrindCalc;
