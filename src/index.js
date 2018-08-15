import { autoResizeCanvas, clear, context, height } from './canvas'
import * as V from './vector'
import * as Circle from './circle';
import * as Entity from './entity';

autoResizeCanvas()


const update = Circle.update

const render = entity => {
  const ctx = context()
  ctx.beginPath()
  Circle.render(entity, ctx)
  ctx.closePath()

  return entity
}

const animate = entities =>
  entities
    .map(update)
    .map(render)

const renderLoop = entities => {
  clear()
  const updated = animate(entities)
  requestAnimationFrame(() => renderLoop(updated))
}

const initShapes = [
  Entity.create(
    {
      color: 'blue',
      radius: 50,
    },
    {
      pos: V.create(200, 200),
      velocity: V.create(),
    },
  )
]

renderLoop(initShapes)
