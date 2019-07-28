import { context } from './canvas'

export const blue = (a = 1) => [240, 100, 50, a]
export const red = (a = 1) => [360, 100, 50, a]
export const black = (a = 1) => [360, 100, 0, a]

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

  const fillValue =
    typeof fill === 'string'
      ? fill
      : `hsl(${fill[0]}, ${fill[1]}%, ${fill[2]}%, ${fill[3] || 1})`

  if(fill) {
    ctx.fillStyle = fillValue
    ctx.fill()
  }

  if(stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeWidth
    ctx.stroke()
  }

  ctx.globalAlpha = currentAlpha
}
