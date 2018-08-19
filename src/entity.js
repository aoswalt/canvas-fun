import V from './vector'
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

const create = (
  data,
  {
    pos = V.create(),
    velocity = V.create(),
    update = entityUpdate,
    render,
  } = {}
) => ({ pos, velocity, data, update, render, age: 1 })

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
