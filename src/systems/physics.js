import { get, isAlive, set } from '../generationalIndexing'
import Vector from '../Vector'
import { updateWorld } from '../world'

const applyForces = (position, velocity, forces) => {
  // current velocity + net force
  const newVelocity = Vector.add(velocity, ...forces)
  const newPosition = Vector.add(position, newVelocity)

  return {
    position: newPosition,
    velocity: newVelocity,
    forces: [],
  }
}

export default world =>
  world.entities
    .map(gi => {
      if(!isAlive(world.allocator, gi)) return

      const position = get(world.position, gi)
      const velocity = get(world.velocity, gi)
      const forces = get(world.forces, gi)

      if(!position || !velocity || !forces) return

      const updated = applyForces(position, velocity, forces)

      return [gi, updated]
    })
    .filter(u => u)
    .reduce(updateWorld, world)
