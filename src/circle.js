import Entity from './entity'
import V from './vector'
import { height } from './canvas'
import pipe from './pipe'

const reboundScale = 0.8
const gravity = 1
const gravityV = V.create(0, gravity)

const atGround = yPos => yPos >= height()
const belowGround = yPos => yPos > height()

const moveStep = c => ({ ...c, pos: V.add(c.pos, c.velocity) })

const accelerate = c => ({ ...c, velocity: V.add(c.velocity, gravityV) })

const rebound = c => {
  const { pos, velocity, data: { radius } } = c
  const newVelocity = V.create(
    velocity.x,
    atGround(pos.y + radius)
      ? -velocity.y * reboundScale
      : velocity.y
  )
  return { ...c, velocity: newVelocity }
}

const keepInBounds = c => {
  const { pos, data: { radius } } = c
  const newPos = atGround(pos.y + radius)
    ? V.create(pos.x, height() - radius)
    : pos
  return { ...c, pos: newPos }
}

const circleUpdate = circle =>
  pipe(circle)
    .p(moveStep)
    .p(accelerate)
    .p(rebound)
    .p(keepInBounds)
    .value()

const circleRender = (entity, ctx) => {
  const { pos: { x, y }, data: { radius, color } } = entity

  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

const createData = (color, radius) => ({ color, radius })
const create = (
  color,
  radius,
  {
    pos = V.create(),
    velocity = V.create(),
    update = circleUpdate,
    render = circleRender,
    ...rest
  } = {}
) =>
  Entity.create(createData(color, radius), {
    pos,
    velocity,
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
  circleRender as render
}
