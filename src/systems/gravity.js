import Vector from '../Vector'
import { updateWorld } from '../world'
import { get, isAlive, set } from '../generationalIndexing'

const gravity = new Vector(0, 1)

const addGravity = (gravityScale, forces) => ({
  forces: [...forces, Vector.scale(gravity, gravityScale)],
})

export default world =>
  world.entities
    .map(gi => {
      if(!isAlive(world.allocator, gi)) return

      const gravity = get(world.gravity, gi)
      const forces = get(world.forces, gi)

      if(!gravity || !forces) return

      const updated = addGravity(gravity, forces)

      return [gi, updated]
    })
    .filter(u => u)
    .reduce(updateWorld, world)
