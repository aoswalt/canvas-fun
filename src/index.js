import * as Circle from './circle'
import * as Entity from './entity'
import * as V from './vector'
import { autoResizeCanvas, clear, context } from './canvas'
import pipe from './pipe'

autoResizeCanvas()

const update = entity =>
  pipe(entity)
    .p(e => e.update(e))
    .p(Entity.update)
    .value()

const render = entity => {
  const ctx = context()
  ctx.beginPath()
  entity.render(entity, ctx)
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
    Circle.create('blue', 50),
    {
      pos: V.create(200, 200),
      update: Circle.update,
      render: Circle.render,
    },
  ),
]

renderLoop(initShapes)
