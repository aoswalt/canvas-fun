import Vector from '../Vector'
import { blue, red } from '../draw'

export default class Ball {}

const base = {
  position: Vector.new(200, 200),
  velocity: Vector.new(5, 5),
  body: {
    type: 'circle',
    radius: 50,
    elasticity: 0.8,
    friction: 0.02,
    aging: { type: 'pulse', amount: 0.25, speed: 0.5 },
  },
  gravity: 1,
  input: {},
  player: {},
  forces: [],
  display: {
    color: blue(),
    aging: { type: 'color_cycle', color: red(), speed: 0.5 },
  },
  age: { current: 0, lifespan: 200 },
}

Ball.new = params => ({ ...base, ...params })
