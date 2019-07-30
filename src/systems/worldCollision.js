import Vector from '../Vector'
import { height, width } from '../canvas'
import { setupSystem } from '../systems'
import { setValue } from '../world'
import produce from 'immer'

const bounds = {
  top: {
    at: v => v.y <= 0,
    normal: Vector.new(0, 1),
  },
  right: {
    at: v => v.x >= width(),
    normal: Vector.new(-1, 0),
  },
  bottom: {
    at: v => v.y >= height(),
    normal: Vector.new(0, -1),
  },
  left: {
    at: v => v.x <= 0,
    normal: Vector.new(1, 0),
  },
}

const ballExtent = (position, body, side) => {
  switch(side) {
    case 'top': {
      const radiusSide = Vector.new(0, -body.radius)
      return Vector.add(position, radiusSide)
    }
    case 'right': {
      const radiusSide = Vector.new(body.radius, 0)
      return Vector.add(position, radiusSide)
    }
    case 'bottom': {
      const radiusSide = Vector.new(0, body.radius)
      return Vector.add(position, radiusSide)
    }
    case 'left': {
      const radiusSide = Vector.new(-body.radius, 0)
      return Vector.add(position, radiusSide)
    }
  }
}

const ballPositionReset = (extent, side) => {
  switch(side) {
    case 'top':
      return Vector.new(0, -extent.y)
    case 'right':
      return Vector.new(width() - extent.x, 0)
    case 'bottom':
      return Vector.new(0, height() - extent.y)
    case 'left':
      return Vector.new(-extent.x, 0)
  }
}

const dampenDirection = (velocity, side) => {
  switch(side) {
    case 'top':
    case 'bottom':
      return Vector.new(0, velocity.y)
    case 'right':
    case 'left':
      return Vector.new(velocity.x, 0)
  }
}

const frictionDirection = (velocity, side) => {
  switch(side) {
    case 'top':
    case 'bottom':
      return Vector.new(velocity.x, 0)
    case 'right':
    case 'left':
      return Vector.new(0, velocity.y)
  }
}

const ballBounce = ({ position, velocity, forces, body }, side) => {
  const extent = ballExtent(position, body, side)

  if(!bounds[side].at(extent, side)) return Vector.new()

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

  return Vector.add(
    dampenedReflection,
    positionReset,
    velocityDampening,
    friction,
  )
}

const bounce = (entity, gi, world, setValue) => {
  if(entity.body.type !== 'circle') return

  const reflection = Vector.add(
    ...Object.keys(bounds).map(b => ballBounce(entity, b)),
  )

  if(!reflection.x && !reflection.y) return

  setValue(
    'forces',
    produce(entity.forces, draft => {
      draft.push(reflection)
    }),
  )
}

export default setupSystem(['position', 'velocity', 'forces', 'body'], bounce)
