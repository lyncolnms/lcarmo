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

  const calculateBlend = () => {
    const targetAlk = parseFloat(targetAlkalinity);
    const volume = parseFloat(targetVolume);

    if (!targetAlk || !volume || updatedSources.length < 2) return;

    const water1 = updatedSources[0];
    const water2 = updatedSources[1];

    if (water1.alkalinity === water2.alkalinity) return;

    // Cálculo da proporção
    const ratio = (targetAlk - water1.alkalinity) / (water2.alkalinity - water1.alkalinity);
    const water1Amount = volume * (1 - ratio);
    const water2Amount = volume * ratio;

    return {
      water1Amount: Math.max(0, water1Amount),
      water2Amount: Math.max(0, water2Amount),
      finalAlkalinity: targetAlk,
      finalHardness: (water1.totalHardness * (water1Amount / volume)) + (water2.totalHardness * (water2Amount / volume))
    };
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
          <h3 className="text-xl font-semibold">Análise das Águas</h3>

          {updatedSources.map((source, index) => (
            <div key={source.id} className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">{source.name}</h4>

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
          {blendResult && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Resultado do Blend</h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{updatedSources[0].name}:</span>
                  <span className="font-medium">{blendResult.water1Amount.toFixed(1)} ml</span>
                </div>
                <div className="flex justify-between">
                  <span>{updatedSources[1].name}:</span>
                  <span className="font-medium">{blendResult.water2Amount.toFixed(1)} ml</span>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Alcalinidade Final:</span>
                    <span className="font-medium">{blendResult.finalAlkalinity.toFixed(1)} mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dureza Final:</span>
                    <span className="font-medium">{blendResult.finalHardness.toFixed(1)} mg/L CaCO₃</span>
                  </div>
                </div>
              </div>
            </div>
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
          <li>Insira os valores de bicarbonato, cálcio e magnésio para cada água</li>
          <li>Defina a alcalinidade alvo desejada (recomendado: 40-75 mg/L)</li>
          <li>Especifique o volume total necessário</li>
          <li>O calculador determinará as proporções ideais de cada água</li>
        </ol>
      </div>
    </div>
  );
}