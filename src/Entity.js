import Vector from './Vector'
import pipe from './pipe'

/*
 * apply force => acc += force
 *
 * vel += acc
 * pos += vel
 * acc = 0
 */

export default class Entity {
  constructor({
    position = new Vector(),
    velocity = new Vector(),
    acceleration = new Vector(),
    forces = [],
    age = 1,
  } = {}) {
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.forces = forces
    this.age = age
  }
}

Entity.applyForce = force => entity =>
  new Entity({
    ...entity,
    forces: [...entity.forces, force],
  })

Entity.sumForces = entity =>
  new Entity({
    ...entity,
    acceleration: Vector.add(...entity.forces),
  })

Entity.accelerate = entity =>
  new Entity({
    ...entity,
    velocity: Vector.add(entity.velocity, entity.acceleration),
  })

Entity.move = entity =>
  new Entity({
    ...entity,
    position: Vector.add(entity.position, entity.velocity),
  })

Entity.resetAcceleration = entity =>
  new Entity({ ...entity, acceleration: new Vector() })

Entity.resetForces = entity => new Entity({ ...entity, forces: [] })

const getOlder = entity => new Entity({ ...entity, age: entity.age + 1 })

Entity.update = entity =>
  pipe(entity)
    .p(Entity.sumForces)
    .p(Entity.accelerate)
    .p(Entity.resetAcceleration)
    .p(Entity.resetForces)
    .p(Entity.move)
    .p(getOlder)
    .value()
