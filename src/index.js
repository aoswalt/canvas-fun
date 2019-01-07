import Entity from './Entity'
import Vector from './Vector'
import { autoResizeCanvas, clear } from './canvas'
import Ball from './Ball'
import { circle } from './draw'

autoResizeCanvas()

const animate = entities =>
  entities
    // .filter(e => e.age)
    .map(e => e.update(e))
    .map(e => e.draw(e))

const draw = () => {
  circle({ x: 100, y: 400 }, 30)
}

const drawLoop = entities => {
  clear()
  const updated = animate(entities)
  draw()
  requestAnimationFrame(() => drawLoop(updated))
}

const initShapes = [
  new Ball({
    color: 'blue',
    radius: 50,
    entity: new Entity({ position: new Vector(200, 200) }),
  }),
]

drawLoop(initShapes)
