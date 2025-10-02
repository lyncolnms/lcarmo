import React, { useState, useMemo } from 'react';
import './MineralCalc.css';

/**
 * Calculates alkalinity in mg/L CaCO3 from bicarbonate (mg/L).
 * Formula: alkalinity = bicarbonate * 0.8
 * @param {number} bicarbonate - Bicarbonate concentration in mg/L
 * @returns {number} Alkalinity in mg/L CaCO3
 */
const calculateAlkalinity = (bicarbonate: number): number => {
  return bicarbonate * 0.8; // Conversion to mg/L CaCO3
};

/**
 * Calculates total hardness in mg/L CaCO3 from calcium and magnesium (mg/L).
 * Formula: totalHardness = calciumHardness + magnesiumHardness
 * @param {number} calcium - Calcium concentration in mg/L
 * @param {number} magnesium - Magnesium concentration in mg/L
 * @returns {number} Total hardness in mg/L CaCO3
 */
const calculateTotalHardness = (calcium: number, magnesium: number): number => {
  return calculateCalciumHardness(calcium) + calculateMagnesiumHardness(magnesium);
};

/**
 * Calculates calcium hardness in mg/L CaCO3 from calcium (mg/L).
 * Formula: calciumHardness = calcium * 2.5
 * @param {number} calcium - Calcium concentration in mg/L
 * @returns {number} Calcium hardness in mg/L CaCO3
 */
const calculateCalciumHardness = (calcium: number): number => {
  return calcium * 2.5; // 1 mg/L Ca = 2.5 mg/L CaCO3
};

/**
 * Calculates magnesium hardness in mg/L CaCO3 from magnesium (mg/L).
 * Formula: magnesiumHardness = magnesium * 4.1
 * @param {number} magnesium - Magnesium concentration in mg/L
 * @returns {number} Magnesium hardness in mg/L CaCO3
 */
const calculateMagnesiumHardness = (magnesium: number): number => {
  return magnesium * 4.1; // 1 mg/L Mg = 4.1 mg/L CaCO3
};

interface WaterSource {
  id: string;
  name: string;
  bicarbonate: number; // mg/L
  calcium: number; // mg/L
  magnesium: number; // mg/L
  alkalinity: number; // calculated automatically
  totalHardness: number; // calculado automaticamente
  calciumHardness: number; // dureza de cálcio
  magnesiumHardness: number; // dureza de magnésio
}

interface BlendResult {
  waterId: string;
  amount: number; // ml
  percentage: number;
}

const MineralCalc: React.FC = () => {
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

  const [targetAlkalinity, setTargetAlkalinity] = useState<string>('');
  const [targetVolume, setTargetVolume] = useState<string>('300');
  const [blendResults, setBlendResults] = useState<BlendResult[]>([]);
  const [finalAlkalinity, setFinalAlkalinity] = useState<number>(0);
  const [finalHardness, setFinalHardness] = useState<number>(0);
  const [finalCalciumHardness, setFinalCalciumHardness] = useState<number>(0);
  const [finalMagnesiumHardness, setFinalMagnesiumHardness] = useState<number>(0);

  // Cálculos SCA recomendados
  const scaRecommendations = {
    alkalinity: {
      light: { min: 40, max: 75 },
      medium: { min: 75, max: 150 },
      dark: { min: 150, max: 250 }
    }
  };

  // Calcular valores derivados usando useMemo para evitar loops
  const calculatedWaterSources = useMemo(() => {
    return waterSources.map(source => ({
      ...source,
      alkalinity: calculateAlkalinity(source.bicarbonate),
      totalHardness: calculateTotalHardness(source.calcium, source.magnesium),
      calciumHardness: calculateCalciumHardness(source.calcium),
      magnesiumHardness: calculateMagnesiumHardness(source.magnesium)
    }));
  }, [waterSources]);

  // Adicionar nova fonte de água
  const addWaterSource = () => {
    const newId = (waterSources.length + 1).toString();
    const newSource: WaterSource = {
      id: newId,
      name: `Água ${newId}`,
      bicarbonate: 0,
      calcium: 0,
      magnesium: 0,
      alkalinity: 0,
      totalHardness: 0,
      calciumHardness: 0,
      magnesiumHardness: 0
    };
    setWaterSources([...waterSources, newSource]);
  };

  // Remover fonte de água
  const removeWaterSource = (id: string) => {
    if (waterSources.length > 2) {
      setWaterSources(waterSources.filter(source => source.id !== id));
    }
  };

  // Atualizar fonte de água
  const updateWaterSource = (id: string, field: keyof WaterSource, value: string | number) => {
    setWaterSources(waterSources.map(source =>
      source.id === id ? { ...source, [field]: value } : source
    ));
  };

  // Calcular blend
  const calculateBlend = () => {
    const targetAlk = parseFloat(targetAlkalinity);
    const targetVol = parseFloat(targetVolume);

    if (!targetAlk || !targetVol || targetAlk <= 0 || targetVol <= 0) {
      alert('Por favor, preencha a alcalinidade desejada e quantidade total com valores válidos');
      return;
    }

    // Filtrar águas com dados válidos
    const validSources = calculatedWaterSources.filter(s =>
      s.bicarbonate > 0 || s.calcium > 0 || s.magnesium > 0
    );

    if (validSources.length < 2) {
      alert('Precisa de pelo menos 2 águas com dados válidos (bicarbonato, cálcio ou magnésio > 0)');
      return;
    }

    // Usar as duas primeiras águas válidas para o cálculo
    const source1 = validSources[0];
    const source2 = validSources[1];

    const alk1 = source1.alkalinity;
    const alk2 = source2.alkalinity;

    // Verificar se as alcalinidades são diferentes
    if (Math.abs(alk1 - alk2) < 0.1) {
      alert('As águas precisam ter alcalinidades diferentes para fazer o blend');
      return;
    }

    // Verificar se o alvo está dentro do range possível
    const minAlk = Math.min(alk1, alk2);
    const maxAlk = Math.max(alk1, alk2);

    if (targetAlk < minAlk || targetAlk > maxAlk) {
      alert(`A alcalinidade desejada (${targetAlk} mg/L) está fora do range possível (${minAlk.toFixed(1)} - ${maxAlk.toFixed(1)} mg/L) com essas águas`);
      return;
    }

    // Calcular proporções usando interpolação linear
    const ratio1 = (targetAlk - alk2) / (alk1 - alk2);
    const ratio2 = 1 - ratio1;

    const amount1 = targetVol * ratio1;
    const amount2 = targetVol * ratio2;

    const results: BlendResult[] = [
      { waterId: source1.id, amount: Math.round(amount1 * 10) / 10, percentage: Math.round(ratio1 * 100) },
      { waterId: source2.id, amount: Math.round(amount2 * 10) / 10, percentage: Math.round(ratio2 * 100) }
    ];

    // Calcular valores finais ponderados
    const finalAlk = (source1.alkalinity * ratio1) + (source2.alkalinity * ratio2);
    const finalHard = (source1.totalHardness * ratio1) + (source2.totalHardness * ratio2);
    const finalCalciumHard = (source1.calciumHardness * ratio1) + (source2.calciumHardness * ratio2);
    const finalMagnesiumHard = (source1.magnesiumHardness * ratio1) + (source2.magnesiumHardness * ratio2);

    setBlendResults(results);
    setFinalAlkalinity(Math.round(finalAlk * 10) / 10);
    setFinalHardness(Math.round(finalHard * 10) / 10);
    setFinalCalciumHardness(Math.round(finalCalciumHard * 10) / 10);
    setFinalMagnesiumHardness(Math.round(finalMagnesiumHard * 10) / 10);
  };

  const getScaHint = () => {
    const target = parseFloat(targetAlkalinity);
    if (!target) return '';

    if (target >= scaRecommendations.alkalinity.light.min && target <= scaRecommendations.alkalinity.light.max) {
      return ' (Recomendado para cafés claros - SCA)';
    }
    if (target >= scaRecommendations.alkalinity.medium.min && target <= scaRecommendations.alkalinity.medium.max) {
      return ' (Recomendado para cafés médios - SCA)';
    }
    if (target >= scaRecommendations.alkalinity.dark.min && target <= scaRecommendations.alkalinity.dark.max) {
      return ' (Recomendado para cafés escuros - SCA)';
    }
    return ' (Fora das recomendações SCA)';
  };

  return (
    <div className="mineral-calc-page">
      <div className="container">
        <div className="mineral-calc-header">
          <h1 className="title is-2">
            <i className="fa fa-flask"></i> Calculadora de Sais Minerais
          </h1>
          <p className="subtitle is-5">
            Calcule blends de água perfeitos para sua extração de café
          </p>
        </div>

        <div className="mineral-calc-content">
          {/* Fontes de Água */}
          <section className="water-sources-section">
            <h2 className="title is-4">
              <i className="fa fa-tint"></i> Fontes de Água
            </h2>

            <div className="water-sources-grid">
              {calculatedWaterSources.map((source) => (
                <div key={source.id} className="water-source-card">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">
                        <input
                          type="text"
                          value={source.name}
                          onChange={(e) => updateWaterSource(source.id, 'name', e.target.value)}
                          className="input is-small"
                          style={{ border: 'none', background: 'transparent', fontWeight: 'bold' }}
                        />
                      </p>
                      {waterSources.length > 2 && (
                        <button
                          className="delete"
                          onClick={() => removeWaterSource(source.id)}
                          aria-label="Remover água"
                        ></button>
                      )}
                    </header>

                    <div className="card-content">
                      <div className="field">
                        <label className="label">Bicarbonato (mg/L)</label>
                        <div className="control">
                          <input
                            type="number"
                            value={source.bicarbonate}
                            onChange={(e) => updateWaterSource(source.id, 'bicarbonate', parseFloat(e.target.value) || 0)}
                            className="input"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Cálcio (mg/L)</label>
                        <div className="control">
                          <input
                            type="number"
                            value={source.calcium}
                            onChange={(e) => updateWaterSource(source.id, 'calcium', parseFloat(e.target.value) || 0)}
                            className="input"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Magnésio (mg/L)</label>
                        <div className="control">
                          <input
                            type="number"
                            value={source.magnesium}
                            onChange={(e) => updateWaterSource(source.id, 'magnesium', parseFloat(e.target.value) || 0)}
                            className="input"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>

                      <hr />

                      <div className="calculated-values">
                        <div className="value-item">
                          <span className="value-label">Alcalinidade:</span>
                          <span className="value-result">{source.alkalinity.toFixed(1)} ppm</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">Dureza Total:</span>
                          <span className="value-result">{source.totalHardness.toFixed(1)} ppm</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">Dureza de Cálcio:</span>
                          <span className="value-result">{source.calciumHardness.toFixed(1)} ppm</span>
                        </div>
                        <div className="value-item">
                          <span className="value-label">Dureza de Magnésio:</span>
                          <span className="value-result">{source.magnesiumHardness.toFixed(1)} ppm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="add-water-button">
              <button
                className="button is-info is-outlined"
                onClick={addWaterSource}
              >
                <i className="fa fa-plus"></i>
                Adicionar Água
              </button>
            </div>
          </section>

          {/* Configuração do Blend */}
          <section className="blend-config-section">
            <h2 className="title is-4">
              <i className="fa fa-cogs"></i> Configuração do Blend
            </h2>

            <div className="blend-config-card">
              <div className="field">
                <label className="label">
                  Alcalinidade Desejada (ppm)
                  <span className="sca-hint">{getScaHint()}</span>
                </label>
                <div className="control">
                  <input
                    type="number"
                    value={targetAlkalinity}
                    onChange={(e) => setTargetAlkalinity(e.target.value)}
                    className="input"
                    placeholder="70"
                    min="0"
                  />
                </div>
                <p className="help">
                  Recomendações SCA: Claro (40-75), Médio (75-150), Escuro (150-250)
                </p>
              </div>

              <div className="field">
                <label className="label">Quantidade Total (ml)</label>
                <div className="control">
                  <input
                    type="number"
                    value={targetVolume}
                    onChange={(e) => setTargetVolume(e.target.value)}
                    className="input"
                    placeholder="300"
                    min="0"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={calculateBlend}
                  >
                    <i className="fa fa-calculator"></i>
                    Calcular Blend
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Resultados */}
          {blendResults.length > 0 && (
            <section className="results-section">
              <div className="results-header">
                <h2 className="title is-4">
                  <i className="fa fa-chart-bar"></i> Resultado do Blend
                </h2>
                <button
                  className="button is-small is-light"
                  onClick={() => {
                    setBlendResults([]);
                    setFinalAlkalinity(0);
                    setFinalHardness(0);
                    setFinalCalciumHardness(0);
                    setFinalMagnesiumHardness(0);
                  }}
                >
                  <i className="fa fa-times"></i> Limpar
                </button>
              </div>

              <div className="results-card">
                <div className="blend-results">
                  <h3 className="subtitle is-5">Proporções:</h3>
                  {blendResults.map((result) => {
                    const source = calculatedWaterSources.find(s => s.id === result.waterId);
                    return (
                      <div key={result.waterId} className="blend-result-item">
                        <div className="blend-source-info">
                          <strong>{source?.name}:</strong> {result.amount}ml ({result.percentage}%)
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr />

                <div className="final-values">
                  <div className="value-item">
                    <span className="value-label">Alcalinidade Final:</span>
                    <span className="value-result">{finalAlkalinity} ppm</span>
                  </div>
                  <div className="value-item">
                    <span className="value-label">Dureza Total Final:</span>
                    <span className="value-result">{finalHardness} ppm</span>
                  </div>
                  <div className="value-item">
                    <span className="value-label">Dureza de Cálcio Final:</span>
                    <span className="value-result">{finalCalciumHardness} ppm</span>
                  </div>
                  <div className="value-item">
                    <span className="value-label">Dureza de Magnésio Final:</span>
                    <span className="value-result">{finalMagnesiumHardness} ppm</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recomendações SCA */}
          <section className="sca-recommendations">
            <div className="notification is-info">
              <h4 className="title is-5">
                <i className="fa fa-info-circle"></i> Recomendações SCA
              </h4>
              <div className="sca-grid">
                <div className="sca-item">
                  <strong>Cafés Claros:</strong> 40-75 ppm de alcalinidade
                </div>
                <div className="sca-item">
                  <strong>Cafés Médios:</strong> 75-150 ppm de alcalinidade
                </div>
                <div className="sca-item">
                  <strong>Cafés Escuros:</strong> 150-250 ppm de alcalinidade
                </div>
              </div>
              <p className="mt-3">
                <small>
                  A dureza total ideal geralmente fica entre 50-150 ppm para melhor extração.
                </small>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MineralCalc;