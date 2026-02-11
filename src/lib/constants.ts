/**
 * Constants for coffee brewing calculations.
 */

import { BrewMethod } from '../types';

/**
 * Standard brew methods with their recommended settings.
 * Each method includes grind size, ratio (water:coffee), and description.
 */
export const BREW_METHODS: BrewMethod[] = [
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
