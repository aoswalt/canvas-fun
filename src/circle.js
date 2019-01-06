import * as V from './vector'
import Entity from './entity'
import { height } from './canvas'
import pipe from './pipe'
import { circle as drawCircle } from './draw'

const atGround = ({ position: { y }, data: { radius } }) =>
  y + radius >= height()

const inertiaLoss = 0.8
const gravity = 1
const gravityV = V.create(0, gravity)

/*
 * apply force => acc += force
 *
 * vel += acc
 * pos += vel
 * acc = 0
 */

const resetAcceleration = v => ({ ...v, acceleration: V.create() })

const applyForce = f => c => ({ ...c, acceleration: V.add(c.acceleration, f) })

const accelerate = c => ({ ...c, velocity: V.add(c.velocity, c.acceleration) })

const move = c => ({ ...c, position: V.add(c.position, c.velocity) })

const fall = applyForce(gravityV)

const bounce = c =>
  atGround(c)
    ? {
        ...c,
        velocity: V.scale(c.velocity, -inertiaLoss),
        position: V.create(c.position.x, height() - c.data.radius),
      }
    : c

const circleUpdate = circle =>
  pipe(circle)
    .p(fall)
    .p(accelerate)
    .p(move)
    .p(bounce)
    .p(resetAcceleration)
    .value()

const circleRender = entity => {
  const {
    position,
    data: { radius, color },
  } = entity

  drawCircle(position, radius, { fill: color })
}

const createData = (color, radius) => ({ color, radius })
const create = (
  color,
  radius,
  {
    position = V.create(),
    velocity = V.create(),
    acceleration = V.create(),
    update = circleUpdate,
    render = circleRender,
    ...rest
  } = {},
) =>
  Entity.create(createData(color, radius), {
    position,
    velocity,
    acceleration,
    update,
    render,
    ...rest,
  })

const Circle = {
  create,
  createData,
  update: circleUpdate,
  render: circleRender,
}

export {
  Circle as default,
  createData,
  create,
  circleUpdate as update,
  circleRender as render,
}
