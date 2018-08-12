import { autoResizeCanvas, clear, ctx } from './canvas'

autoResizeCanvas()

const drag = 0.8
const gravity = 1

const atGround = yPos => yPos >= innerHeight

const update = shape => {
  const { x, y, speedX, speedY, radius } = shape

  const nextX = x + speedX
  const nextY = y + speedY + gravity


  const newSpeedX = speedX
  // NOTE(adam): bounce off of ground with drag
  const newSpeedY =  atGround(nextY + radius)
    ? -speedY * drag
    : speedY + gravity

  return {
    ...shape,
    x: x + newSpeedX,
    y: y + newSpeedY,
    speedX: newSpeedX,
    speedY: newSpeedY,
  }
}

const render = ({ x, y, radius, color }) => {
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
    x: 200,
    y: 200,
    speedX: 0,
    speedY: 0,
    color: 'blue',
    radius: 50,
  },
]

renderLoop(initShapes)
