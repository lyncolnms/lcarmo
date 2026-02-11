import React, { useState, useEffect } from 'react';

interface BrewMethod {
  name: string;
  grindSize: string;
  ratio: number;
  description: string;
}

export function WaterCalc() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [finalCoffee, setFinalCoffee] = useState<string>('');
  const [coffeePowder, setCoffeePowder] = useState<string>('');
  const [ratio, setRatio] = useState<string>('');
  const [water, setWater] = useState<string>('');

  const brewMethods: BrewMethod[] = [
    {
      name: 'V60',
      grindSize: 'Médio-fino (como sal marinho)',
      ratio: 16,
      description: 'Pour-over clássico'
    },
    {
      name: 'Chemex',
      grindSize: 'Médio (como areia grossa)',
      ratio: 17,
      description: 'Pour-over com papel'
    },
    {
      name: 'AeroPress',
      grindSize: 'Fino (como açúcar refinado)',
      ratio: 13,
      description: 'Imersão rápida'
    },
    {
      name: 'French Press',
      grindSize: 'Grosso (como sal grosso)',
      ratio: 12,
      description: 'Imersão completa'
    },
    {
      name: 'Moka Pot',
      grindSize: 'Médio-fino',
      ratio: 10,
      description: 'Extração pressurizada'
    },
    {
      name: 'Espresso',
      grindSize: 'Muito fino (como farinha)',
      ratio: 2,
      description: 'Extração sob pressão'
    },
    {
      name: 'Cold Brew',
      grindSize: 'Grosso',
      ratio: 8,
      description: 'Extração fria'
    }
  ];

  const selectedMethodData = brewMethods.find(method => method.name === selectedMethod);

  // Atualizar sugestões quando método mudar
  useEffect(() => {
    if (selectedMethodData) {
      setRatio(selectedMethodData.ratio.toString());
    }
  }, [selectedMethod, selectedMethodData]);

  // Função para calcular baseado em uma variável
  const calculateFromSingleInput = () => {
    const parsedFinalCoffeeVolume = parseFloat(finalCoffee);
    const parsedCoffeePowderWeight = parseFloat(coffeePowder);
    const parsedWaterRatio = parseFloat(ratio);
    const parsedWaterVolume = parseFloat(water);

    // Calcular água baseada em pó de café e proporção
    if (!isNaN(parsedCoffeePowderWeight) && !isNaN(parsedWaterRatio) && finalCoffee === '') {
      const calculatedWater = parsedCoffeePowderWeight * parsedWaterRatio;
      setWater(calculatedWater.toFixed(1));
      setFinalCoffee(calculatedWater.toFixed(1));
    }
    // Calcular água baseada em café final e proporção
    else if (!isNaN(parsedFinalCoffeeVolume) && !isNaN(parsedWaterRatio) && coffeePowder === '') {
      const calculatedPowder = parsedFinalCoffeeVolume / parsedWaterRatio;
      setCoffeePowder(calculatedPowder.toFixed(1));
      setWater(parsedFinalCoffeeVolume.toFixed(1));
    }
    // Calcular proporção baseada em café final e pó
    else if (!isNaN(parsedFinalCoffeeVolume) && !isNaN(parsedCoffeePowderWeight) && ratio === '') {
      const calculatedRatio = parsedFinalCoffeeVolume / parsedCoffeePowderWeight;
      setRatio(calculatedRatio.toFixed(1));
      setWater(parsedFinalCoffeeVolume.toFixed(1));
    }
    // Calcular café final baseado em água e proporção
    else if (!isNaN(parsedWaterVolume) && !isNaN(parsedWaterRatio) && finalCoffee === '') {
      setFinalCoffee(parsedWaterVolume.toFixed(1));
      setCoffeePowder((parsedWaterVolume / parsedWaterRatio).toFixed(1));
    }
  };

  // Função para limpar todos os campos
  const clearAll = () => {
    setFinalCoffee('');
    setCoffeePowder('');
    setRatio(selectedMethodData ? selectedMethodData.ratio.toString() : '');
    setWater('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cálculo Avançado de Água para Café</h2>
        <p className="text-muted-foreground">Calcule a quantidade ideal de água para diferentes métodos de extração</p>
      </div>

      <div className="bg-card rounded-lg border p-6 space-y-6">
        {/* Seleção de Método */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Método de Preparo:</label>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full p-3 border rounded-md bg-background"
          >
            <option value="">Selecione um método...</option>
            {brewMethods.map(method => (
              <option key={method.name} value={method.name}>
                {method.name} - {method.description}
              </option>
            ))}
          </select>
        </div>

        {/* Sugestões baseadas no método */}
        {selectedMethodData && (
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Sugestões para {selectedMethodData.name}:
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li><strong>Moagem:</strong> {selectedMethodData.grindSize}</li>
              <li><strong>Proporção sugerida:</strong> 1:{selectedMethodData.ratio}</li>
            </ul>
          </div>
        )}

        {/* Campos de entrada */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Café Final (ml):</label>
            <input
              className="w-full p-3 border rounded-md bg-background"
              type="number"
              placeholder="Ex: 240"
              value={finalCoffee}
              onChange={(e) => setFinalCoffee(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Quantidade total de café pronto</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pó de Café (g):</label>
            <input
              className="w-full p-3 border rounded-md bg-background"
              type="number"
              placeholder="Ex: 15"
              value={coffeePowder}
              onChange={(e) => setCoffeePowder(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Quantidade de café moído</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Proporção (1:X):</label>
            <input
              className="w-full p-3 border rounded-md bg-background"
              type="number"
              placeholder="Ex: 16"
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Relação água/café</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            onClick={calculateFromSingleInput}
            disabled={!selectedMethod}
          >
            Calcular
          </button>
          <button
            className="px-6 py-2 border rounded-md hover:bg-accent"
            onClick={clearAll}
          >
            Limpar
          </button>
        </div>

        {/* Resultados */}
        {water && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Resultado do Cálculo</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><strong>Café Final:</strong> {finalCoffee} ml</div>
              <div><strong>Pó de Café:</strong> {coffeePowder} g</div>
              <div><strong>Proporção:</strong> 1:{ratio}</div>
            </div>
            <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-md">
              <strong>Água necessária:</strong> {water} ml
            </div>
          </div>
        )}

        {/* Instruções */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Como usar:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Selecione o método de preparo desejado</li>
            <li>Preencha pelo menos um dos campos (café final, pó de café ou proporção)</li>
            <li>Clique em "Calcular" para obter os valores restantes</li>
            <li>Use as sugestões de moagem e proporção para melhores resultados</li>
          </ol>
        </div>
      </div>
    </div>
  );
}