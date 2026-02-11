import React, { useState } from 'react';
import { ResultCard } from './ui/result-card';
import { InstructionCard } from './ui/instruction-card';

interface GrinderSettings {
  [method: string]: string;
}

interface Grinders {
  [brand: string]: {
    [model: string]: GrinderSettings;
  };
}

export function GrindCalc() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const grinders: Grinders = {
    'Baratza': {
      'Encore': {
        'Espresso': '1-3',
        'V60': '15-20',
        'Chemex': '25-30',
        'French Press': '35-40',
        'AeroPress': '10-15',
        'Cold Brew': '40-45'
      },
      'Virtuoso': {
        'Espresso': '5-10',
        'V60': '20-25',
        'Chemex': '30-35',
        'French Press': '40-45',
        'AeroPress': '15-20',
        'Cold Brew': '45-50'
      }
    },
    'Breville': {
      'BCM4350XL': {
        'Espresso': '1-2',
        'V60': '12-17',
        'Chemex': '22-27',
        'French Press': '32-37',
        'AeroPress': '7-12',
        'Cold Brew': '37-42'
      }
    },
    'OXO': {
      'Brew': {
        'Espresso': '2-4',
        'V60': '18-23',
        'Chemex': '28-33',
        'French Press': '38-43',
        'AeroPress': '13-18',
        'Cold Brew': '43-48'
      }
    }
  };

  const methods = ['Espresso', 'V60', 'Chemex', 'French Press', 'AeroPress', 'Cold Brew'];
  const brands = Object.keys(grinders);
  const models = selectedBrand ? Object.keys(grinders[selectedBrand]) : [];

  const getSetting = () => {
    if (!selectedBrand || !selectedModel || !selectedMethod) return null;
    return grinders[selectedBrand][selectedModel][selectedMethod];
  };

  const setting = getSetting();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Calculadora de Moagem</h2>
        <p className="text-muted-foreground">Encontre as configurações ideais de moagem para diferentes moedores</p>
      </div>

      <div className="bg-card rounded-lg border p-6 space-y-6">
        {/* Seleções */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Marca do Moedor:</label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel('');
                setSelectedMethod('');
              }}
              className="w-full p-3 border rounded-md bg-background"
            >
              <option value="">Selecione uma marca...</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Modelo:</label>
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedMethod('');
              }}
              disabled={!selectedBrand}
              className="w-full p-3 border rounded-md bg-background disabled:opacity-50"
            >
              <option value="">Selecione um modelo...</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Método de Preparo:</label>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              disabled={!selectedModel}
              className="w-full p-3 border rounded-md bg-background disabled:opacity-50"
            >
              <option value="">Selecione um método...</option>
              {methods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultado */}
        {setting && (
          <ResultCard title="Configuração Recomendada">
            <div className="text-lg">
              <strong>{selectedBrand} {selectedModel}</strong> - <strong>{selectedMethod}</strong>
            </div>
            <div className="mt-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-md text-center">
              <span className="text-2xl font-bold text-green-800 dark:text-green-200">
                Configuração: {setting}
              </span>
            </div>
            <p className="text-sm mt-2">
              Use esta configuração como ponto de partida e ajuste conforme seu gosto pessoal.
            </p>
          </ResultCard>
        )}

        {/* Tabela de referência */}
        {selectedBrand && selectedModel && (
          <div className="space-y-4">
            <h4 className="font-semibold">Todas as configurações para {selectedBrand} {selectedModel}:</h4>
            <div className="grid gap-2">
              {methods.map(method => {
                const methodSetting = grinders[selectedBrand][selectedModel][method];
                return (
                  <div key={method} className="flex justify-between items-center p-3 border rounded-md">
                    <span className="font-medium">{method}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      method === selectedMethod
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {methodSetting}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Instruções */}
        <InstructionCard
          steps={[
            'Selecione a marca do seu moedor',
            'Escolha o modelo específico',
            'Selecione o método de preparo',
            'Use a configuração recomendada como ponto de partida',
            'Ajuste conforme necessário para obter o resultado desejado'
          ]}
        />
      </div>
    </div>
  );
}