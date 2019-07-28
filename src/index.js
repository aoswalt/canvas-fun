import { clear } from './canvas'
import { init as initWorld } from './world'
import aging from './systems/aging'
import bodyAging from './systems/bodyAging'
import gravity from './systems/gravity'
import worldCollision from './systems/worldCollision'
import playerControl from './systems/playerControl'
import physics from './systems/physics'
import displayAging from './systems/displayAging'
import draw from './systems/draw'

const systems = [
  aging,
  bodyAging,
  gravity,
  worldCollision,
  playerControl,
  physics,
  displayAging,
  draw,
]

const run = world => {
  clear()

  const updatedWorld = systems.reduce(
    (currentWorld, system) => system(currentWorld),
    world,
  )

  requestAnimationFrame(() => run(updatedWorld))
}

const world = initWorld()

run(world)
