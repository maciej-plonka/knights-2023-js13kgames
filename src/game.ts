import { ALL_ACTIONS, Action, handleRPS } from './state'
import { Button, GameLoop, Scene, init, Text, initPointer } from 'kontra'
import { randomElement } from './utils'

const { canvas } = init('gameCanvas')
initPointer()

function battle(playerAction: Action) {
  const enemyAction = randomElement(ALL_ACTIONS)
  return handleRPS(playerAction, enemyAction)
}

function createBattleScene(playerHealth: number, enemyHealth: number) {
  function onButtonClicked(action: Action) {
    const result = battle(action)
    switch (result) {
      case 'won': {
        enemyHealth--
        break
      }
      case 'lost': {
        playerHealth--
        break
      }
    }
    currentScene?.destroy()
    currentScene = createBattleScene(playerHealth, enemyHealth)
  }
  const playerHealthText = Text({
    text: playerHealth.toString(),
  })
  const enemyHealthText = Text({
    text: enemyHealth.toString(),
    x: 128 + 16,
  })

  const slashButton = Button({
    onDown() {
      onButtonClicked('slash')
    },
    y: 32 + 8,
    x: 0,
    color: 'red',
    width: 64,
    height: 32,
  })
  const kickButton = Button({
    onDown() {
      onButtonClicked('kick')
    },
    color: 'green',
    x: 64 + 8,
    y: 32 + 8,
    width: 64,
    height: 32,
  })
  const parryButton = Button({
    onDown() {
      onButtonClicked('parry')
    },
    color: 'blue',
    x: 128 + 16,
    y: 32 + 8,
    width: 64,
    height: 32,
  })
  return Scene({
    id: 'battle',
    objects: [playerHealthText, enemyHealthText, slashButton, kickButton, parryButton],
  })
}
let currentScene = createBattleScene(10, 10)

const loop = GameLoop({
  render() {
    currentScene.render()
  },
})

loop.start()
