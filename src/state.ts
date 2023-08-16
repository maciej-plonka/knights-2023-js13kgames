export const ALL_ACTIONS = ['slash', 'parry', 'kick'] as const

export type Action = (typeof ALL_ACTIONS)[number]

export function handleRPS(player: Action, enemy: Action): 'won' | 'lost' | 'draw' {
  if (player === enemy) return 'draw'
  if (player === 'slash' && enemy === 'kick') return 'won'
  if (player === 'parry' && enemy === 'slash') return 'won'
  if (player === 'kick' && enemy === 'parry') return 'won'
  return 'lost'
}
