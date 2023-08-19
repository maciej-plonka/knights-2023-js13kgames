import { ALL_ACTIONS, Action, handleRPS } from './state'
import { randomElement } from './utils'

function getPlayerAction(): Promise<Action> {
  return Promise.resolve('slash')
}

function getEnemyAction(): Promise<Action> {
  return Promise.resolve(randomElement(ALL_ACTIONS))
}

async function game() {
  let playerHealth = 10
  let enemyHealth = 10
  while (playerHealth > 0 && enemyHealth > 0) {
    const [playerAction, enemyAction] = await Promise.all([getPlayerAction(), getEnemyAction()])
    const result = handleRPS(playerAction, enemyAction)
    console.log('p', playerAction, 'e', enemyAction, '=>', result)
    switch (result) {
      case 'won': {
        enemyHealth--
        break
      }

      case 'lost': {
        playerHealth--
        break
      }
      case 'draw': {
        break
      }
    }
    console.log('playerHealth', playerHealth, 'enemyHealth', enemyHealth)
  }
}
game()
