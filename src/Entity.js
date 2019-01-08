import Vector from './Vector'

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
    forces = [],
    age = 1,
  } = {}) {
    this.position = position
    this.velocity = velocity
    this.forces = forces
    this.age = age
  }
}

Entity.applyForce = (entity, force) =>
  new Entity({
    ...entity,
    forces: [...entity.forces, force],
  })

Entity.update = ({ position, velocity, forces, age }) => {
  // current velocity + net force
  const newVelocity = Vector.add(velocity, ...forces)
  const newPosition = Vector.add(position, newVelocity)

  return new Entity({
    position: newPosition,
    velocity: newVelocity,
    forces: [],
    age: age + 1,
  })
}
