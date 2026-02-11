import React from 'react';

interface InstructionCardProps {
  steps: string[];
  title?: string;
}

/**
 * Reusable instruction card component for displaying usage instructions.
 * Used across calculator components (WaterCalc, MineralCalc, GrindCalc).
 */
export function InstructionCard({ 
  steps, 
  title = "Como usar:" 
}: InstructionCardProps) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
        {steps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}
