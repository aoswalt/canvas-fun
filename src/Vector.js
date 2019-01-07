import pipe from './pipe'

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

Vector.add = (...vs) =>
  vs.reduce(
    ({ x: x1, y: y1 }, { x: x2, y: y2 }) => new Vector(x1 + x2, y1 + y2),
    new Vector(),
  )

Vector.subtract = (...vs) =>
  vs.reduce(
    ({ x: x1, y: y1 }, { x: x2, y: y2 }) => new Vector(x1 - x2, y1 - y2),
    new Vector(),
  )

Vector.magnitudeSq = ({ x, y }) => x ** 2 + y ** 2

Vector.magnitude = v =>
  pipe(v)
    .p(magnitudeSq)
    .p(Math.sqrt)
    .value()

Vector.normal = v =>
  pipe(v)
    .p(magnitude)
    .p(m => scale(v, 1 / m))
    .value()

Vector.scale = ({ x, y }, s) => new Vector(x * s, y * s)

Vector.scaleMagTo = (v, s) =>
  pipe(v)
    .p(normal)
    .p(m => scale(v, s / m))
    .value()
