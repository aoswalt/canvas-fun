import {
  GenerationalIndexAllocator,
  GenerationalIndexArray,
} from './generationalIndexing'
import { setValue, updateWorld } from './world'

export const setupSystem = (componentIds, updater) => world =>
  world.entities.forEach(gi => {
    if(!GenerationalIndexAllocator.isAlive(world.allocator, gi)) return

    const components = componentIds.map(cId => [
      cId,
      GenerationalIndexArray.get(world[cId], gi),
    ])

    if(!components.every(([, c]) => Boolean(c))) return

    const entity = Object.fromEntries(components)

    updater(entity, gi, world, (component, value) => setValue(world, component, gi, value))
  })
