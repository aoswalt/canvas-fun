import { mouseDown, position as mousePosition } from '../mouse'
import { SHIFT, SPACE, anyKeysDown } from '../keys'
import { get, isAlive } from '../generationalIndexing.js'
import { updateWorld } from '../world'
import Vector from '../Vector'

const move = (position, velocity, forces) => {
  // only adding a force, but direct pos, etc. manipulation would be more stable
  if(mouseDown()) {
    const positionReset = Vector.subtract(mousePosition(), position)
    const forcesReset = Vector.scale(Vector.add(...forces), -1)
    const velocityReset = Vector.scale(velocity, -1)

    return Vector.add(positionReset, forcesReset, velocityReset)
  }

  if(anyKeysDown(SPACE, SHIFT)) {
    return new Vector(0, -1.5)
  }

  return new Vector()
}

export default world =>
  world.entities
    .map(gi => {
      if(!isAlive(world.allocator, gi)) return

      const position = get(world.position, gi)
      const velocity = get(world.velocity, gi)
      const forces = get(world.forces, gi)
      const player = get(world.player, gi)

      if(!player || !forces) return

      const moveForce = move(position, velocity, forces)

      return [gi, { forces: [...forces, moveForce] }]
    })
    .filter(u => u)
    .reduce(updateWorld, world)
