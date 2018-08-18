import * as V from './vector'

const entityUpdate = e => ({ ...e, age: e.age + 1 })

const create = (
  data,
  {
    pos = V.create(),
    velocity = V.create(),
    update = entityUpdate,
    render,
  } = {},
  age = 0
) =>
  ({ pos, velocity, data, update, render, age })

export {
  create,
  entityUpdate as update,
}
