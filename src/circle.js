import Entity from './entity'
import V from './vector'
import { height } from './canvas'
import pipe from './pipe'

const inertiaLoss = 0.8
const gravity = 1
const gravityV = V.create(0, gravity)

const atGround = ({ pos: { y }, data: { radius } }) => y + radius >= height()
const belowGround = ({ pos: { y }, data: { radius } }) => y + radius > height()

const moveStep = c => ({ ...c, pos: V.add(c.pos, c.velocity) })

const accelerate = c => {
  const { velocity } = c
  const newVelocity = atGround(c) ? velocity : V.add(velocity, gravityV)
  return { ...c, velocity: newVelocity }
}

const rebound = c => {
  const { pos, velocity } = c
  const nextCircle = { ...c, pos: V.add(pos, velocity) }
  const newVelocity = V.create(
    velocity.x,
    atGround(nextCircle) ? -velocity.y * inertiaLoss : velocity.y + gravity
  )
  return { ...c, velocity: newVelocity }
}

const keepInBounds = c => {
  const {
    pos,
    data: { radius },
  } = c
  const newPos = atGround(c) ? V.create(pos.x, height() - radius) : pos
  return { ...c, pos: newPos }
}

const circleUpdate = circle =>
  pipe(circle)
    .p(moveStep)
    // .p(accelerate)
    .p(rebound)
    .p(keepInBounds)
    .value()

const circleRender = (entity, ctx) => {
  const {
    pos: { x, y },
    data: { radius, color },
  } = entity

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
