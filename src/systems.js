import World from './World'

export const setupSystem = (componentIds, updater) => world =>
  world.entities.forEach(gi => {
    if(!World.isAlive(world, gi)) return

    const components = componentIds.map(cId => [cId, World.get(world, cId, gi)])

    if(!components.length || !components.every(([, c]) => Boolean(c))) return

    const entity = Object.fromEntries(components)

    updater(entity, gi, world, (component, value) =>
      World.setValue(world, component, gi, value),
    )
  })
