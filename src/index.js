import { clear } from './canvas'
import { init as initWorld } from './world'
import gravity from './systems/gravity'
import worldCollision from './systems/worldCollision'
import physics from './systems/physics'
import draw from './systems/draw'

const systems = [gravity, worldCollision, physics, draw]

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
