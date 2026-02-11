import React from 'react';

interface ResultCardProps {
  title: string;
  variant?: 'success' | 'info' | 'warning';
  children: React.ReactNode;
}

const VARIANTS = {
  success: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  info: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  warning: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200'
} as const;

/**
 * Reusable result card component for displaying calculation results.
 * Used across calculator components (WaterCalc, MineralCalc, GrindCalc).
 */
export function ResultCard({ 
  title, 
  variant = 'success', 
  children 
}: ResultCardProps) {

  return (
    <div className={`border rounded-lg p-4 ${VARIANTS[variant]}`}>
      <h4 className="font-semibold mb-3">{title}</h4>
      {children}
    </div>
  );
}
