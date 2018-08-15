import * as V from './vector'
import { height } from './canvas';

const reboundScale = 0.8
const gravity = 1

const atGround = yPos => yPos >= height()

export const create = (color, radius) => ({
  color,
  radius
})

export const update = ({ pos, velocity, data, data: { radius } }) => {
  const nextPos = V.create(
    pos.x + velocity.x,
    pos.y + velocity.y + gravity
  )

  const newVelocity = V.create(
    velocity.x,
    atGround(nextPos.y + radius)
      ? -velocity.y * reboundScale
      : velocity.y + gravity
  )

  return {
    data,
    pos: V.add(pos, newVelocity),
    velocity: newVelocity,
  }
}

export const render = (entity, ctx) => {
  const { pos: { x, y }, data: { radius, color } } = entity

  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}
