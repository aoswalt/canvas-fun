import { clear } from './canvas'
import { allocate, initAllocator, initArray, set } from './generationalIndexing'

const systems = []

const run = world => {
  clear()

  const updatedWorld = systems.reduce(
    (currentWorld, system) => system(currentWorld),
    world,
  )

  requestAnimationFrame(() => run(updatedWorld))
}

const world = {
  allocator: initAllocator(),
  entities: [],
}

run(world)
