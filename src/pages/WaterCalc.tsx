import React, { useState } from 'react';

const WaterCalc: React.FC = () => {
  const [coffee, setCoffee] = useState<string>('');
  const [water, setWater] = useState<string>('');

  const calculate = () => {
    const ratio = 16; // 1:16
    const coffeeNum = parseFloat(coffee);
    if (!isNaN(coffeeNum)) {
      setWater((coffeeNum * ratio).toString());
    }
  };

  return (
    <main className="coffee-theme">
      <h2><i className="fa fa-tint"></i> Cálculo de Água para Café</h2>
      <div className="calc-form">
        <label><i className="fa fa-coffee"></i> Quantidade de Café (g):</label>
        <input type="number" value={coffee} onChange={(e) => setCoffee(e.target.value)} />
        <button onClick={calculate}><i className="fa fa-calculator"></i> Calcular</button>
        {water && <p><i className="fa fa-info-circle"></i> Água necessária: {water} ml</p>}
      </div>
    </main>
  );
};

export default WaterCalc;
