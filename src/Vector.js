import pipe from './pipe'

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

Vector.add = (...vs) =>
  vs.length
    ? vs.reduce((v1, v2) => new Vector(v1.x + v2.x, v1.y + v2.y))
    : new Vector()

Vector.subtract = (...vs) =>
  vs.length
    ? vs.reduce((v1, v2) => new Vector(v1.x - v2.x, v1.y - v2.y))
    : new Vector()

Vector.magnitudeSq = v => v.x ** 2 + v.y ** 2

Vector.magnitude = v =>
  pipe(v)
    .p(Vector.magnitudeSq)
    .p(Math.sqrt)
    .value()

Vector.normal = v =>
  pipe(v)
    .p(Vector.magnitude)
    .p(m => scale(v, 1 / m))
    .value()

Vector.scale = (v, s) => new Vector(v.x * s, v.y * s)

Vector.scaleMagTo = (v, s) =>
  pipe(v)
    .p(Vector.normal)
    .p(m => Vector.scale(v, s / m))
    .value()
