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


export const create = (x = 0, y = 0) => ({ x, y })
export const add = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  create(x1 + x2, y1 + y2)
