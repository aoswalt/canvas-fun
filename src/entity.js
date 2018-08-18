import * as V from './vector'

export const create = (data, { pos = V.create(), velocity = V.create(), update, render } = {}) =>
  ({ pos, velocity, data, update, render })
