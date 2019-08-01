import KeyState from '../world/KeyState'
import MouseState from '../world/MouseState'

export default world => {
  world._system.keyState = KeyState.update(world._system.keyState)
  world._system.mouseState = MouseState.update(world._system.mouseState)
}
