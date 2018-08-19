import Entity from './entity'
import V from './vector'
import { height } from './canvas'

const reboundScale = 0.8
const gravity = 1

const atGround = yPos => yPos >= height()
const belowGround = yPos => yPos > height()

const circleUpdate = ({ pos, velocity, data, data: { radius }, ...rest }) => {
  const nextPos = V.create(pos.x + velocity.x, pos.y + velocity.y + gravity)

  const newVelocity = V.create(
    velocity.x,
    atGround(nextPos.y + radius)
      ? -velocity.y * reboundScale
      : velocity.y + gravity
  )

  const updatedPos = V.add(pos, newVelocity)

  const newPos = belowGround(updatedPos.y + radius)
    ? V.create(updatedPos.x, height() - radius)
    : updatedPos

  return {
    data,
    pos: newPos,
    velocity: newVelocity,
    ...rest,
  }
}

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
