import pipe from './pipe'

export default class Vector {}

Vector.new = (x = 0, y = 0) => ({ x, y })

Vector.add = (...vs) =>
  vs.length
    ? vs.reduce((v1, v2) => Vector.new(v1.x + v2.x, v1.y + v2.y))
    : Vector.new()

Vector.subtract = (...vs) =>
  vs.length
    ? vs.reduce((v1, v2) => Vector.new(v1.x - v2.x, v1.y - v2.y))
    : Vector.new()

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

Vector.scale = (v, s) => Vector.new(v.x * s, v.y * s)

Vector.scaleMagTo = (v, s) =>
  pipe(v)
    .p(Vector.normal)
    .p(m => Vector.scale(v, s / m))
    .value()

Vector.dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y

// −(2(n · v) n − v)
Vector.reflectAcross = (v, normal) => {
  const dot = Vector.dot(v, normal)

  const scaledNormal = Vector.scale(normal, 2 * dot)
  const diff = Vector.subtract(scaledNormal, v)

  return Vector.scale(diff, -1)
}
