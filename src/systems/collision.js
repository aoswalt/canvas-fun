import { get, isAlive, set } from '../generationalIndexing'
import Vector from '../Vector'
import { updateWorld } from '../world'
import { height } from '../canvas'

const floorNormal = new Vector(0, -1)

const atGround = ({ y }, radius) => y + radius >= height()

const bounce = (position, velocity, forces, body) => {
  if(!atGround(position, body.radius)) return new Vector()

  // move entity back into bounds
  const positionReset = new Vector(0, height() - (position.y + body.radius))

  const totalForce = Vector.add(...forces)
  const reflection = Vector.reflectAcross(totalForce, floorNormal)
  const dampenedReflection = Vector.scale(reflection, body.elasticity - 1)

  const velocityDampening = Vector.scale(new Vector(0, velocity.y), body.elasticity - 1)

  return Vector.add(dampenedReflection, positionReset, velocityDampening)
}

export default world =>
  world.entities
    .map(gi => {
      if(!isAlive(world.allocator, gi)) return

      const position = get(world.position, gi)
      const velocity = get(world.velocity, gi)
      const forces = get(world.forces, gi)
      const body = get(world.body, gi)

      if(!position || !velocity || !forces || !body) return

      const reflection = bounce(position, velocity, forces, body)

      return [gi, { forces: [...forces, reflection] }]
    })
    .filter(u => u)
    .reduce(updateWorld, world)
