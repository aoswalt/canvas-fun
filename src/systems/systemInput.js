import KeyState from '../world/KeyState'

export default world => {
  world._system.keyState = KeyState.update(world._system.keyState)
}
