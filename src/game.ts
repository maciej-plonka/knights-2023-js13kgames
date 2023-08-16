import { ALL_ACTIONS, Action, handleRPS } from './state'

function getPlayerAction(): Promise<Action> {
  return Promise.resolve('slash')
}

function getEnemyAction(): Promise<Action> {
  return Promise.resolve(ALL_ACTIONS[Math.floor(Math.random() * ALL_ACTIONS.length)])
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
