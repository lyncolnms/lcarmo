import React, { useState, useEffect } from 'react';
import { BREW_METHODS } from '../lib/constants';
import { ResultCard } from './ui/result-card';
import { InstructionCard } from './ui/instruction-card';

export function WaterCalc() {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [finalCoffee, setFinalCoffee] = useState<string>('');
  const [coffeePowder, setCoffeePowder] = useState<string>('');
  const [ratio, setRatio] = useState<string>('');
  const [water, setWater] = useState<string>('');

  const selectedMethodData = BREW_METHODS.find(method => method.name === selectedMethod);

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
            {BREW_METHODS.map(method => (
              <option key={method.name} value={method.name}>
                {method.name} - {method.description}
              </option>
            ))}
          </select>
        </div>

        {/* Sugestões baseadas no método */}
        {selectedMethodData && (
          <ResultCard title={`Sugestões para ${selectedMethodData.name}:`} variant="info">
            <ul className="space-y-1 text-sm">
              <li><strong>Moagem:</strong> {selectedMethodData.grindSize}</li>
              <li><strong>Proporção sugerida:</strong> 1:{selectedMethodData.ratio}</li>
            </ul>
          </ResultCard>
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
          <ResultCard title="Resultado do Cálculo">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><strong>Café Final:</strong> {finalCoffee} ml</div>
              <div><strong>Pó de Café:</strong> {coffeePowder} g</div>
              <div><strong>Proporção:</strong> 1:{ratio}</div>
            </div>
            <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-md">
              <strong>Água necessária:</strong> {water} ml
            </div>
          </ResultCard>
        )}

        {/* Instruções */}
        <InstructionCard
          steps={[
            'Selecione o método de preparo desejado',
            'Preencha pelo menos um dos campos (café final, pó de café ou proporção)',
            'Clique em "Calcular" para obter os valores restantes',
            'Use as sugestões de moagem e proporção para melhores resultados'
          ]}
        />
      </div>
    </div>
  );
}