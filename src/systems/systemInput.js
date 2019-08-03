import KeyState from '../World/KeyState'
import MouseState from '../World/MouseState'

export default world => {
  world._system.keyState = KeyState.update(world._system.keyState)
  world._system.mouseState = MouseState.update(world._system.mouseState)
}
