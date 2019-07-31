import { _isKeyDown, keys } from '../world/KeyState'

// TODO(adam): move most of this into KeyState?
export default world => {
  Object.values(keys).forEach(k => {
    const isDown = _isKeyDown(k)
    const wasDown = world._system.keyState[k].isDown

    world._system.keyState[k].wasDown = wasDown
    world._system.keyState[k].isDown = isDown

    if(isDown && wasDown) {
      world._system.keyState[k].downCount++
    } else {
      world._system.keyState[k].downCount = 0
    }
  })
}
