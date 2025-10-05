import React, { useState, useMemo } from 'react';

/**
 * Calculates alkalinity in mg/L CaCO3 from bicarbonate (mg/L).
 * Formula: alkalinity = bicarbonate * 0.8
 */
const calculateAlkalinity = (bicarbonate: number): number => {
  return bicarbonate * 0.8;
};

/**
 * Calculates total hardness in mg/L CaCO3 from calcium and magnesium (mg/L).
 */
const calculateTotalHardness = (calcium: number, magnesium: number): number => {
  return calculateCalciumHardness(calcium) + calculateMagnesiumHardness(magnesium);
};

/**
 * Calculates calcium hardness in mg/L CaCO3 from calcium (mg/L).
 */
const calculateCalciumHardness = (calcium: number): number => {
  return calcium * 2.5;
};

/**
 * Calculates magnesium hardness in mg/L CaCO3 from magnesium (mg/L).
 */
const calculateMagnesiumHardness = (magnesium: number): number => {
  return magnesium * 4.1;
};

interface WaterSource {
  id: string;
  name: string;
  bicarbonate: number;
  calcium: number;
  magnesium: number;
  alkalinity: number;
  totalHardness: number;
  calciumHardness: number;
  magnesiumHardness: number;
}

interface BlendResult {
  amounts: { [waterId: string]: number };
  percentages: { [waterId: string]: number };
  finalAlkalinity: number;
  finalHardness: number;
  finalCalcium: number;
  finalMagnesium: number;
}

export function MineralCalc() {
  const [waterSources, setWaterSources] = useState<WaterSource[]>([
    {
      id: '1',
      name: 'Água 1',
      bicarbonate: 0,
      calcium: 0,
      magnesium: 0,
      alkalinity: 0,
      totalHardness: 0,
      calciumHardness: 0,
      magnesiumHardness: 0
    },
    {
      id: '2',
      name: 'Água 2',
      bicarbonate: 0,
      calcium: 0,
      magnesium: 0,
      alkalinity: 0,
      totalHardness: 0,
      calciumHardness: 0,
      magnesiumHardness: 0
    }
  ]);

  const [targetAlkalinity, setTargetAlkalinity] = useState<string>('60');
  const [targetVolume, setTargetVolume] = useState<string>('300');

  // Função para adicionar nova água
  const addWaterSource = () => {
    const newId = Date.now().toString();
    const newWater: WaterSource = {
      id: newId,
      name: `Água ${waterSources.length + 1}`,
      bicarbonate: 0,
      calcium: 0,
      magnesium: 0,
      alkalinity: 0,
      totalHardness: 0,
      calciumHardness: 0,
      magnesiumHardness: 0
    };
    setWaterSources([...waterSources, newWater]);
  };

  // Função para remover água
  const removeWaterSource = (id: string) => {
    if (waterSources.length > 2) {
      setWaterSources(waterSources.filter(source => source.id !== id));
    }
  };

  // Função para atualizar nome da água
  const updateWaterName = (id: string, name: string) => {
    setWaterSources(sources =>
      sources.map(source =>
        source.id === id ? { ...source, name } : source
      )
    );
  };

  // Atualizar cálculos quando os valores mudam
  const updatedSources = useMemo(() => {
    return waterSources.map(source => ({
      ...source,
      alkalinity: calculateAlkalinity(source.bicarbonate),
      calciumHardness: calculateCalciumHardness(source.calcium),
      magnesiumHardness: calculateMagnesiumHardness(source.magnesium),
      totalHardness: calculateTotalHardness(source.calcium, source.magnesium)
    }));
  }, [waterSources]);

  const updateWaterSource = (id: string, field: keyof WaterSource, value: string) => {
    const numValue = parseFloat(value) || 0;
    setWaterSources(sources =>
      sources.map(source =>
        source.id === id ? { ...source, [field]: numValue } : source
      )
    );
  };

  const calculateBlend = (): BlendResult | null => {
    const targetAlk = parseFloat(targetAlkalinity);
    const volume = parseFloat(targetVolume);

    if (!targetAlk || !volume || updatedSources.length < 2) return null;

    // Filtrar águas válidas
    const sources = updatedSources.filter(s => 
      s.alkalinity >= 0 && 
      s.calcium >= 0 && 
      s.magnesium >= 0 &&
      s.bicarbonate >= 0
    );
    
    if (sources.length < 2) return null;

    // Verificar se é possível atingir o alvo
    const minAlkalinity = Math.min(...sources.map(s => s.alkalinity));
    const maxAlkalinity = Math.max(...sources.map(s => s.alkalinity));
    
    if (targetAlk < minAlkalinity || targetAlk > maxAlkalinity) {
      // Se o alvo está fora do range, usar aproximação
      // console.warn('Alcalinidade alvo fora do range das águas disponíveis');
    }

    if (sources.length === 2) {
      // Caso especial para 2 águas - usar método linear exato
      const water1 = sources[0];
      const water2 = sources[1];
      
      // Verificar se as águas são diferentes
      if (Math.abs(water1.alkalinity - water2.alkalinity) < 0.1) {
        // Águas muito similares, usar proporção 50/50
        return {
          amounts: {
            [water1.id]: volume / 2,
            [water2.id]: volume / 2
          },
          percentages: {
            [water1.id]: 50,
            [water2.id]: 50
          },
          finalAlkalinity: water1.alkalinity,
          finalHardness: (water1.totalHardness + water2.totalHardness) / 2,
          finalCalcium: (water1.calcium + water2.calcium) / 2,
          finalMagnesium: (water1.magnesium + water2.magnesium) / 2
        };
      }
      
      const ratio = (targetAlk - water1.alkalinity) / (water2.alkalinity - water1.alkalinity);
      const clampedRatio = Math.max(0, Math.min(1, ratio));
      const water1Amount = volume * (1 - clampedRatio);
      const water2Amount = volume * clampedRatio;
      
      return {
        amounts: {
          [water1.id]: water1Amount,
          [water2.id]: water2Amount
        },
        percentages: {
          [water1.id]: ((1 - clampedRatio) * 100),
          [water2.id]: (clampedRatio * 100)
        },
        finalAlkalinity: water1.alkalinity * (1 - clampedRatio) + water2.alkalinity * clampedRatio,
        finalHardness: water1.totalHardness * (1 - clampedRatio) + water2.totalHardness * clampedRatio,
        finalCalcium: water1.calcium * (1 - clampedRatio) + water2.calcium * clampedRatio,
        finalMagnesium: water1.magnesium * (1 - clampedRatio) + water2.magnesium * clampedRatio
      };
    }

    // Para 3+ águas, usar algoritmo de otimização por aproximação
    let bestResult: BlendResult | null = null;
    let bestError = Infinity;

    // Gerar combinações possíveis usando programação dinâmica simplificada
    const iterations = 2000; // Aumentar iterações para melhor precisão
    
    for (let i = 0; i < iterations; i++) {
      const proportions: number[] = [];
      let total = 0;
      
      // Gerar proporções aleatórias que somem 1
      for (let j = 0; j < sources.length - 1; j++) {
        const remaining = 1 - total;
        const maxProp = remaining / (sources.length - j);
        const prop = Math.random() * maxProp;
        proportions.push(prop);
        total += prop;
      }
      proportions.push(1 - total); // Última proporção para somar 1
      
      // Garantir que todas as proporções são válidas
      if (proportions.some(p => p < 0 || p > 1)) continue;
      
      // Calcular propriedades resultantes
      let resultAlkalinity = 0;
      let resultHardness = 0;
      let resultCalcium = 0;
      let resultMagnesium = 0;
      
      for (let j = 0; j < sources.length; j++) {
        resultAlkalinity += sources[j].alkalinity * proportions[j];
        resultHardness += sources[j].totalHardness * proportions[j];
        resultCalcium += sources[j].calcium * proportions[j];
        resultMagnesium += sources[j].magnesium * proportions[j];
      }
      
      const error = Math.abs(resultAlkalinity - targetAlk);
      
      if (error < bestError) {
        bestError = error;
        
        const amounts: { [waterId: string]: number } = {};
        const percentages: { [waterId: string]: number } = {};
        
        sources.forEach((source, index) => {
          amounts[source.id] = proportions[index] * volume;
          percentages[source.id] = proportions[index] * 100;
        });
        
        bestResult = {
          amounts,
          percentages,
          finalAlkalinity: resultAlkalinity,
          finalHardness: resultHardness,
          finalCalcium: resultCalcium,
          finalMagnesium: resultMagnesium
        };
      }
    }
    
    return bestResult;
  };

  const blendResult = calculateBlend();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Calculadora de Minerais da Água</h2>
        <p className="text-muted-foreground">Calcule blends perfeitos de água para extração de café specialty</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Entrada de Dados das Águas */}
        <div className="bg-card rounded-lg border p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Análise das Águas</h3>
            <button
              onClick={addWaterSource}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563EB'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3B82F6'}
              type="button"
            >
              <span style={{fontSize: '16px'}}>+</span> Adicionar Água
            </button>
          </div>

          {updatedSources.map((source, index) => (
            <div key={source.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={source.name}
                  onChange={(e) => updateWaterName(source.id, e.target.value)}
                  className="font-medium bg-transparent border-none outline-none focus:bg-background focus:border focus:rounded px-2 py-1"
                />
                {waterSources.length > 2 && (
                  <button
                    onClick={() => removeWaterSource(source.id)}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1"
                  >
                    ✕ Remover
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bicarbonato (mg/L)</label>
                  <input
                    type="number"
                    value={source.bicarbonate || ''}
                    onChange={(e) => updateWaterSource(source.id, 'bicarbonate', e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cálcio (mg/L)</label>
                  <input
                    type="number"
                    value={source.calcium || ''}
                    onChange={(e) => updateWaterSource(source.id, 'calcium', e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Magnésio (mg/L)</label>
                  <input
                    type="number"
                    value={source.magnesium || ''}
                    onChange={(e) => updateWaterSource(source.id, 'magnesium', e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Resultados calculados */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <span className="text-sm text-muted-foreground">Alcalinidade:</span>
                  <div className="font-medium">{source.alkalinity.toFixed(1)} mg/L CaCO₃</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Dureza Total:</span>
                  <div className="font-medium">{source.totalHardness.toFixed(1)} mg/L CaCO₃</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cálculo de Blend */}
        <div className="bg-card rounded-lg border p-6 space-y-6">
          <h3 className="text-xl font-semibold">Cálculo de Blend</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Alcalinidade Alvo (mg/L)</label>
              <input
                type="number"
                value={targetAlkalinity}
                onChange={(e) => setTargetAlkalinity(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="60"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Volume Total (ml)</label>
              <input
                type="number"
                value={targetVolume}
                onChange={(e) => setTargetVolume(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
                placeholder="300"
              />
            </div>
          </div>

          {/* Resultado do Blend */}
          {blendResult ? (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Resultado do Blend</h4>

              <div className="space-y-3">
                {updatedSources.map(source => {
                  const amount = blendResult.amounts[source.id] || 0;
                  const percentage = blendResult.percentages[source.id] || 0;
                  
                  if (amount > 0.1) { // Mostrar apenas águas com quantidade significativa
                    return (
                      <div key={source.id} className="flex justify-between items-center">
                        <span>{source.name}:</span>
                        <div className="text-right">
                          <span className="font-medium">{amount.toFixed(1)} ml</span>
                          <span className="text-sm text-muted-foreground ml-2">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Alcalinidade Final:</span>
                    <span className="font-medium">{blendResult.finalAlkalinity.toFixed(1)} mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dureza Final:</span>
                    <span className="font-medium">{blendResult.finalHardness.toFixed(1)} mg/L CaCO₃</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cálcio Final:</span>
                    <span className="font-medium">{blendResult.finalCalcium.toFixed(1)} mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Magnésio Final:</span>
                    <span className="font-medium">{blendResult.finalMagnesium.toFixed(1)} mg/L</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            updatedSources.length >= 2 && parseFloat(targetAlkalinity) > 0 && parseFloat(targetVolume) > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Não é possível calcular o blend</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                  <li>• Verifique se os valores das águas estão corretos</li>
                  <li>• A alcalinidade alvo deve estar dentro do range das águas disponíveis</li>
                  <li>• Certifique-se de ter pelo menos 2 águas com valores diferentes</li>
                </ul>
              </div>
            )
          )}

          {/* Recomendações SCA */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Recomendações SCA</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div><strong>Alcalinidade:</strong> 40-75 mg/L (torra clara), 75-150 mg/L (torra escura)</div>
              <div><strong>Dureza Total:</strong> 50-150 mg/L CaCO₃</div>
              <div><strong>Relação Ca:Mg:</strong> 2:1 a 4:1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Como usar:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Adicione quantas águas desejar usando o botão "+ Adicionar Água"</li>
          <li>Insira os valores de bicarbonato, cálcio e magnésio para cada água</li>
          <li>Defina a alcalinidade alvo desejada (recomendado: 40-75 mg/L)</li>
          <li>Especifique o volume total necessário</li>
          <li>O calculador determinará as proporções ótimas de cada água</li>
          <li>Para 2 águas: cálculo exato | Para 3+ águas: otimização por aproximação</li>
        </ol>
      </div>
    </div>
  );
}