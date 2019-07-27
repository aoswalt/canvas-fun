import { clear } from './canvas'
import { init as initWorld } from './world'
import gravity from './systems/gravity'
import collision from './systems/collision'
import physics from './systems/physics'
import draw from './systems/draw'

const systems = [gravity, collision, physics, draw]

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
