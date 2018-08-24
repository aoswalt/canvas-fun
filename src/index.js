import * as V from './vector'
import { autoResizeCanvas, clear, context } from './canvas'
import Circle from './circle'
import Entity from './entity'

autoResizeCanvas()

const animate = entities =>
  entities
    .filter(e => e.age)
    .map(Entity.update)
    .map(Entity.render(context()))

const renderLoop = entities => {
  clear()
  const updated = animate(entities)
  requestAnimationFrame(() => renderLoop(updated))
}

const initShapes = [Circle.create('blue', 50, { position: V.create(200, 200) })]

renderLoop(initShapes)
