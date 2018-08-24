import * as V from './vector'
import pipe from './pipe'

const entityUpdate = entity =>
  pipe(entity)
    .p(e => e.update(e))
    .p(e => ({ ...e, age: e.age + 1 }))
    .value()

const entityRender = ctx => entity => {
  ctx.beginPath()
  entity.render(entity, ctx)
  ctx.closePath()
  ctx.globalAlpha = 1

  return entity
}

const create = (data, props = {}) => {
  const defaults = {
    position: V.create(),
    velocity: V.create(),
    acceleration: V.create(),
    update: entityUpdate,
    age: 1,
  }

  return { ...defaults, ...props, data }
}

const Entity = {
  create,
  update: entityUpdate,
  render: entityRender,
}

export {
  Entity as default,
  create,
  entityUpdate as update,
  entityRender as render
}
