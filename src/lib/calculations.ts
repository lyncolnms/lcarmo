/**
 * Water chemistry calculation utilities for coffee brewing.
 * These functions help calculate water hardness and alkalinity from mineral concentrations.
 */

/**
 * Calculates alkalinity in mg/L CaCO3 from bicarbonate (mg/L).
 * Formula: alkalinity = bicarbonate * 0.8
 */
export const calculateAlkalinity = (bicarbonate: number): number => {
  return bicarbonate * 0.8;
};

/**
 * Calculates calcium hardness in mg/L CaCO3 from calcium (mg/L).
 * Formula: calcium hardness = calcium * 2.5
 */
export const calculateCalciumHardness = (calcium: number): number => {
  return calcium * 2.5;
};

/**
 * Calculates magnesium hardness in mg/L CaCO3 from magnesium (mg/L).
 * Formula: magnesium hardness = magnesium * 4.1
 */
export const calculateMagnesiumHardness = (magnesium: number): number => {
  return magnesium * 4.1;
};

/**
 * Calculates total hardness in mg/L CaCO3 from calcium and magnesium (mg/L).
 * Formula: total hardness = calcium hardness + magnesium hardness
 */
export const calculateTotalHardness = (calcium: number, magnesium: number): number => {
  return calculateCalciumHardness(calcium) + calculateMagnesiumHardness(magnesium);
};
