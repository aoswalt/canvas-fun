import World, { ball } from '../World'
import KeyState from '../World/KeyState'
import MouseState from '../World/MouseState'
import produce from 'immer'
import pipe from '../pipe'

export default world => {
  const keyState = World.getKeyState(world)

  if(!KeyState.onKeyPress(keyState, KeyState.keys.ENTER, 20)) return

  const position = pipe(world)
    .p(World.getMouseState)
    .p(MouseState.getPosition)
    .value()

  World.spawn(world, { ...ball, position })
}
