import React from 'react';

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
  const padding = range * 0.1; // 10% de padding

  const chartMin = Math.max(0, minValue - padding);
  const chartMax = maxValue + padding;

  // Dimensões do gráfico
  const chartWidth = 800;
  const chartHeight = 400;
  const barHeight = 30;
  const barSpacing = 10;

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
        y1={chartHeight - 50} 
        x2={valueToX(minValue)} 
        y2={50} 
        stroke="#333" 
        strokeWidth="2" 
        strokeDasharray="5,5" 
      />
      <line 
        x1={valueToX(maxValue)} 
        y1={chartHeight - 50} 
        x2={valueToX(maxValue)} 
        y2={50} 
        stroke="#333" 
        strokeWidth="2" 
        strokeDasharray="5,5" 
      />

      {/* Labels para mínimo e máximo */}
      <text 
        x={valueToX(minValue)} 
        y={40} 
        textAnchor="middle" 
        fontSize="14" 
        fill="#333" 
        fontWeight="bold"
      >
        Min: {minValue}
      </text>
      <text 
        x={valueToX(maxValue)} 
        y={40} 
        textAnchor="middle" 
        fontSize="14" 
        fill="#333" 
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

        const y = 60 + index * (barHeight + barSpacing);

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
              y={y + barHeight / 2 + 5}
              textAnchor="middle"
              fontSize="12"
              fill="white"
              fontWeight="bold"
            >
              {method}
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

export default CustomGrindChart;
