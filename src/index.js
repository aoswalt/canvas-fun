import Ball from './Ball'
import Entity from './Entity'
import Vector from './Vector'
import { clear } from './canvas'

const animate = entities =>
  entities
    .filter(e => !e.isAlive || e.isAlive(e))
    .map(e => e.update(e))
    .map(e => e.draw(e))

const drawLoop = entities => {
  clear()
  const updated = animate(entities)
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
