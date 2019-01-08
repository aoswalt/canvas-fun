import Vector from './Vector'
import Entity from './Entity'
import { height } from './canvas'
import pipe from './pipe'
import { circle } from './draw'
import { mouseDown, position as mousePosition } from './mouse'
import { anyKeysDown, SPACE, SHIFT } from './keys';

export default class Ball {
  constructor({ color = 'blue', radius = 10, entity = new Entity() } = {}) {
    this.color = color
    this.radius = radius
    this.entity = entity
  }
}

const atGround = ({
  entity: {
    position: { y },
  },
  radius,
}) => y + radius >= height()

const inertiaLoss = 0.8
const gravity = new Vector(0, 1)

const fall = ball =>
  new Ball({ ...ball, entity: Entity.applyForce(ball.entity, gravity) })

const bounce = ball =>
  atGround(ball)
    ? new Ball({
        ...ball,
        entity: new Entity({
          ...ball.entity,
          velocity: Vector.scale(ball.entity.velocity, -inertiaLoss),
          position: new Vector(ball.entity.position.x, height() - ball.radius),
        }),
      })
    : ball

const raise = ball =>
  anyKeysDown(SPACE, SHIFT)
    ? new Ball({
        ...ball,
        entity: Entity.applyForce(ball.entity, new Vector(0, -1.5)),
      })
    : ball

const place = ball =>
  mouseDown()
    ? new Ball({
        ...ball,
        entity: new Entity({
          ...ball.entity,
          position: mousePosition(),
          forces: [],
          velocity: new Vector(),
        }),
      })
    : ball

Ball.update = ball =>
  pipe(ball)
    .p(fall)
    .p(bounce)
    .p(raise)
    .p(place)
    .p(b => new Ball({ ...b, entity: Entity.update(b.entity) }))
    .value()
Ball.prototype.update = Ball.update

Ball.draw = ball => {
  const {
    entity: { position },
    radius,
    color,
  } = ball

  circle(position, radius, { fill: color })

  return ball
}
Ball.prototype.draw = Ball.draw
