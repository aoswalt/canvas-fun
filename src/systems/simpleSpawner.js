import World, { ball } from '../World'
import KeyState from '../World/KeyState'
import MouseState from '../World/MouseState'
import produce from 'immer'
import pipe from '../pipe'
import Ball from '../entities/Ball'

export default world => {
  const keyState = World.getKeyState(world)

  if(!KeyState.onKeyPress(keyState, KeyState.keys.ENTER)) return

  const position = pipe(world)
    .p(World.getMouseState)
    .p(MouseState.getPosition)
    .value()

  World.spawn(world, Ball.new({ position }))
}
