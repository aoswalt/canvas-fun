import pipe from './pipe'

// export const create = (x = 0, y = 0) =>
//   Object.create(null, {
//     x: {
//       value: x,
//       enumerable: true,
//     },
//     y: {
//       value: y,
//       enumerable: true,
//     },
//   })

const create = (x = 0, y = 0) => ({ x, y })

const add = (...vs) =>
  vs.reduce(
    ({ x: x1, y: y1 }, { x: x2, y: y2 }) => create(x1 + x2, y1 + y2),
    create(),
  )

const subtract = (...vs) =>
  vs.reduce(
    ({ x: x1, y: y1 }, { x: x2, y: y2 }) => create(x1 - x2, y1 - y2),
    create(),
  )

const magnitudeSq = ({ x, y }) => x ** 2 + y ** 2

const magnitude = v =>
  pipe(v)
    .p(magnitudeSq)
    .p(Math.sqrt)
    .value()

const normal = v =>
  pipe(v)
    .p(magnitude)
    .p(m => scale(v, 1 / m))
    .value()

const scale = ({ x, y }, s) => create(x * s, y * s)

const scaleMagTo = (v, s) =>
  pipe(v)
    .p(normal)
    .p(m => scale(v, s / m))
    .value()

const V = {
  add,
  create,
  magnitude,
  magnitudeSq,
  normal,
  scale,
  scaleMagTo,
  subtract,
}

export {
  V as default,
  add,
  create,
  magnitude,
  magnitudeSq,
  normal,
  scale,
  scaleMagTo,
  subtract,
}
