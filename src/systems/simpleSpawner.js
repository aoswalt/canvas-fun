import World, { ball } from '../World'
import KeyState from '../World/KeyState'
import MouseState from '../World/MouseState'
import produce from 'immer'
import pipe from '../pipe'
import Ball from '../entities/Ball'
import Vector from '../Vector'

export default world => {
  const keyState = World.getKeyState(world)

  if(!KeyState.onKeyPress(keyState, KeyState.keys.ENTER)) return

  const mouseState = World.getMouseState(world)
  const motion = MouseState.getMotion(mouseState)

  const position = pipe(world)
    .p(World.getMouseState)
    .p(MouseState.getPosition)
    .value()

  World.spawn(
    world,
    Ball.new({ position, velocity: Vector.scale(motion, 0.66) }),
  )
}
