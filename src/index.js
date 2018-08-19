import { autoResizeCanvas, clear, context } from './canvas'
import Circle from './circle'
import Entity from './entity'
import V from './vector'

autoResizeCanvas()

const animate = entities =>
  entities.map(Entity.update).map(Entity.render(context()))

const renderLoop = entities => {
  clear()
  const updated = animate(entities)
  requestAnimationFrame(() => renderLoop(updated))
}

const initShapes = [Circle.create('blue', 50, { pos: V.create(200, 200) })]

renderLoop(initShapes)
