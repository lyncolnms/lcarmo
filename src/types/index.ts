/**
 * Shared type definitions for coffee brewing calculators.
 */

/**
 * Represents a coffee brewing method with its recommended settings.
 */
export interface BrewMethod {
  name: string;
  grindSize: string;
  ratio: number;
  description: string;
}

/**
 * Represents a water source with mineral composition and calculated hardness values.
 */
export interface WaterSource {
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

/**
 * Represents the result of blending water sources.
 */
export interface BlendResult {
  amounts: Record<string, number>;
  percentages: Record<string, number>;
  finalAlkalinity: number;
  finalHardness: number;
  finalCalcium: number;
  finalMagnesium: number;
}
