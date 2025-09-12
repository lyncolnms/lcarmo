import React, { useState, useEffect } from 'react';

interface BrewMethod {
  name: string;
  grindSize: string;
  ratio: number;
  description: string;
}

const WaterCalc: React.FC = () => {
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
    const finalCoffeeNum = parseFloat(finalCoffee);
    const coffeePowderNum = parseFloat(coffeePowder);
    const ratioNum = parseFloat(ratio);

    // Calcular água baseada em pó de café e proporção
    if (!isNaN(coffeePowderNum) && !isNaN(ratioNum) && finalCoffee === '') {
      const calculatedWater = coffeePowderNum * ratioNum;
      setWater(calculatedWater.toFixed(1));
      setFinalCoffee(calculatedWater.toFixed(1));
    }
    // Calcular água baseada em café final e proporção
    else if (!isNaN(finalCoffeeNum) && !isNaN(ratioNum) && coffeePowder === '') {
      const calculatedPowder = finalCoffeeNum / ratioNum;
      setCoffeePowder(calculatedPowder.toFixed(1));
      setWater(finalCoffeeNum.toFixed(1));
    }
    // Calcular proporção baseada em café final e pó
    else if (!isNaN(finalCoffeeNum) && !isNaN(coffeePowderNum) && ratio === '') {
      const calculatedRatio = finalCoffeeNum / coffeePowderNum;
      setRatio(calculatedRatio.toFixed(1));
      setWater(finalCoffeeNum.toFixed(1));
    }
    // Calcular café final baseado em água e proporção
  };

  // Função para limpar todos os campos
  const clearAll = () => {
    setFinalCoffee('');
    setCoffeePowder('');
    setRatio(selectedMethodData ? selectedMethodData.ratio.toString() : '');
    setWater('');
  };

  return (
    <>
      <style>
        {`
          .water-calc-input::placeholder {
            color: #6c757d !important;
            opacity: 0.7 !important;
          }
          .water-calc-select::placeholder {
            color: #6c757d !important;
            opacity: 0.7 !important;
          }
        `}
      </style>
      <main className="coffee-theme" style={{ 
        backgroundColor: '#f8f9fa', 
        color: '#2c3e50',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2>
          <i className="fa fa-tint"></i> Cálculo Avançado de Água para Café
        </h2>
        
        <div className="calc-form">
          {/* Seleção de Método */}
          <div className="field">
            <label className="label">
              <i className="fa fa-coffee"></i> Método de Preparo:
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  value={selectedMethod} 
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="water-calc-select"
                  style={{ 
                    borderColor: '#8B4513',
                    backgroundColor: 'white',
                    color: '#2c3e50'
                  }}
                >
                  <option value="">Selecione um método...</option>
                  {brewMethods.map(method => (
                    <option key={method.name} value={method.name}>
                      {method.name} - {method.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sugestões baseadas no método */}
          {selectedMethodData && (
            <div className="notification is-info is-light">
              <div className="content">
                <p><strong>Sugestões para {selectedMethodData.name}:</strong></p>
                <ul>
                  <li><strong>Moagem:</strong> {selectedMethodData.grindSize}</li>
                  <li><strong>Proporção sugerida:</strong> 1:{selectedMethodData.ratio}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Campos de entrada */}
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">
                  <i className="fa fa-flask"></i> Café Final (ml):
                </label>
                <div className="control">
                  <input 
                    className="input water-calc-input" 
                    type="number" 
                    placeholder="Ex: 240"
                    value={finalCoffee} 
                    onChange={(e) => setFinalCoffee(e.target.value)}
                    style={{ 
                      borderColor: '#8B4513',
                      backgroundColor: 'white',
                      color: '#2c3e50'
                    }}
                  />
                </div>
                <p className="help">Quantidade total de café pronto</p>
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">
                  <i className="fa fa-balance-scale"></i> Pó de Café (g):
                </label>
                <div className="control">
                  <input 
                    className="input water-calc-input" 
                    type="number" 
                    placeholder="Ex: 15"
                    value={coffeePowder} 
                    onChange={(e) => setCoffeePowder(e.target.value)}
                    style={{ 
                      borderColor: '#8B4513',
                      backgroundColor: 'white',
                      color: '#2c3e50'
                    }}
                  />
                </div>
                <p className="help">Quantidade de café moído</p>
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label">
                  <i className="fa fa-percentage"></i> Proporção (1:X):
                </label>
                <div className="control">
                  <input 
                    className="input water-calc-input" 
                    type="number" 
                    placeholder="Ex: 16"
                    value={ratio} 
                    onChange={(e) => setRatio(e.target.value)}
                    style={{ 
                      borderColor: '#8B4513',
                      backgroundColor: 'white',
                      color: '#2c3e50'
                    }}
                  />
                </div>
                <p className="help">Relação água/café</p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="field is-grouped">
            <div className="control">
              <button 
                className="button is-primary" 
                onClick={calculateFromSingleInput}
                disabled={!selectedMethod}
              >
                <i className="fa fa-calculator"></i> Calcular
              </button>
            </div>
            <div className="control">
              <button 
                className="button is-light" 
                onClick={clearAll}
              >
                <i className="fa fa-eraser"></i> Limpar
              </button>
            </div>
          </div>

          {/* Resultados */}
          {water && (
            <div className="notification is-success">
              <div className="content">
                <h4>
                  <i className="fa fa-check-circle"></i> Resultado do Cálculo
                </h4>
                <div className="columns">
                  <div className="column">
                    <strong>Café Final:</strong> {finalCoffee} ml
                  </div>
                  <div className="column">
                    <strong>Pó de Café:</strong> {coffeePowder} g
                  </div>
                  <div className="column">
                    <strong>Proporção:</strong> 1:{ratio}
                  </div>
                </div>
                <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>
                  <strong>Água necessária:</strong> {water} ml
                </p>
              </div>
            </div>
          )}

          {/* Instruções */}
          <div className="content">
            <h4 style={{ color: '#8B4513', marginBottom: '15px' }}>
              <i className="fa fa-info-circle"></i> Como usar:
            </h4>
            <ol style={{ color: '#2c3e50' }}>
              <li>Selecione o método de preparo desejado</li>
              <li>Preencha pelo menos um dos campos (café final, pó de café ou proporção)</li>
              <li>Clique em "Calcular" para obter os valores restantes</li>
              <li>Use as sugestões de moagem e proporção para melhores resultados</li>
            </ol>
          </div>
        </div>
      </main>
    </>
  );
};

export default WaterCalc;
