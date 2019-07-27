import { get, isAlive, set } from '../generationalIndexing'
import Vector from '../Vector'
import { updateWorld } from '../world'
import { height, width } from '../canvas'

const bounds = {
  top: {
    at: v => v.y <= 0,
    normal: new Vector(0, 1),
  },
  right: {
    at: v => v.x >= width(),
    normal: new Vector(-1, 0),
  },
  bottom: {
    at: v => v.y >= height(),
    normal: new Vector(0, -1),
  },
  left: {
    at: v => v.x <= 0,
    normal: new Vector(1, 0),
  },
}

const ballExtent = (position, body, side) => {
  switch(side) {
    case 'top': {
      const radiusSide = new Vector(0, -body.radius)
      return Vector.add(position, radiusSide)
    }
    case 'right': {
      const radiusSide = new Vector(body.radius, 0)
      return Vector.add(position, radiusSide)
    }
    case 'bottom': {
      const radiusSide = new Vector(0, body.radius)
      return Vector.add(position, radiusSide)
    }
    case 'left': {
      const radiusSide = new Vector(-body.radius, 0)
      return Vector.add(position, radiusSide)
    }
  }
}

const ballPositionReset = (extent, side) => {
  switch(side) {
    case 'top':
      return new Vector(0, -extent.y)
    case 'right':
      return new Vector(width() - extent.x, 0)
    case 'bottom':
      return new Vector(0, height() - extent.y)
    case 'left':
      return new Vector(-extent.x, 0)
  }
}

const dampenDirection = (velocity, side) => {
  switch(side) {
    case 'top':
    case 'bottom':
      return new Vector(0, velocity.y)
    case 'right':
    case 'left':
      return new Vector(velocity.x, 0)
  }
}

const frictionDirection = (velocity, side) => {
  switch(side) {
    case 'top':
    case 'bottom':
      return new Vector(velocity.x, 0)
    case 'right':
    case 'left':
      return new Vector(0, velocity.y)
  }
}

const ballBounce = ({ position, velocity, forces, body }, side) => {
  const extent = ballExtent(position, body, side)

  if(!bounds[side].at(extent, side)) return new Vector()

  // move entity back into bounds
  const positionReset = ballPositionReset(extent, side)

  const totalForce = Vector.add(...forces)
  const reflection = Vector.reflectAcross(totalForce, bounds[side].normal)
  const dampenedReflection = Vector.scale(reflection, body.elasticity - 1)

  const velocityDampening = Vector.scale(
    dampenDirection(velocity, side),
    body.elasticity - 1,
  )

  const friction = Vector.scale(
    frictionDirection(velocity, side),
    -body.friction,
  )

  return Vector.add(dampenedReflection, positionReset, velocityDampening, friction)
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

      if(body.type !== 'circle') return

      const reflection = Vector.add(
        ...Object.keys(bounds).map(b =>
          ballBounce({ position, velocity, forces, body }, b),
        ),
      )

      return [gi, { forces: [...forces, reflection] }]
    })
    .filter(u => u)
    .reduce(updateWorld, world)
