import { autoResizeCanvas, clear, context, height } from './canvas'
import * as V from './vector'

autoResizeCanvas()

const reboundScale = 0.8
const gravity = 1

const atGround = yPos => yPos >= height()

const update = shape => {
  const { pos, velocity, radius } = shape

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
    ...shape,
    pos: V.add(pos, newVelocity),
    velocity: newVelocity,
  }
}

const render = ({ pos: { x, y }, radius, color }) => {
  const ctx = context()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath
}

const animate = (shapes) =>
  shapes
    .map(update)
    .map(s => render(s) || s)

const renderLoop = (shapes) => {
  clear()
  const updatedShapes = animate(shapes)
  requestAnimationFrame(() => renderLoop(updatedShapes))
}

const initShapes = [
  {
    pos: V.create(200, 200),
    velocity: V.create(),
    color: 'blue',
    radius: 50,
  },
]

renderLoop(initShapes)
