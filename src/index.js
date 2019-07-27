import { clear } from './canvas'
import { init as initWorld } from './world'
import draw from './systems/draw'

const systems = [draw]

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
