import { context } from './canvas'

export const circle = (
  { x, y },
  radius,
  { fill = 'black', stroke, strokeWidth = 1, alpha = 1 } = {},
) => {
  const ctx = context()
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)

  const currentAlpha = ctx.globalAlpha
  ctx.globalAlpha = alpha

  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }

  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeWidth
    ctx.stroke()
  }

  ctx.globalAlpha = currentAlpha
}
