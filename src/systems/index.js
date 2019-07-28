import { get, isAlive, set } from '../generationalIndexing'
import { updateWorld } from '../world'

export const setupSystem = (componentIds, updater) => world =>
  world.entities
    .map(gi => {
      if(!isAlive(world.allocator, gi)) return

      const components = componentIds.map(cId => [cId, get(world[cId], gi)])

      if(!components.every(([, c]) => Boolean(c))) return

      const entity = Object.fromEntries(components)

      const updated = updater(entity, gi, world)

      return updated && [gi, updated]
    })
    .filter(Boolean)
    .reduce(updateWorld, world)
