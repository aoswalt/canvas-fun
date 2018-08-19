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
  vs.reduce(({ x: x1, y: y1 }, { x: x2, y: y2 }) => create(x1 + x2, y1 + y2))

const scale = ({ x, y }, s) => create(x * s, y * s)

const Vector = {
  create,
  add,
  scale,
}

export { Vector as default, add, create, scale }
