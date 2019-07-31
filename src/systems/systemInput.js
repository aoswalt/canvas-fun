import { keys, _isKeyDown } from '../world/KeyState'

// TODO(adam): move most of this into KeyState?
export default world => {
  Object.values(keys).forEach(k => {
    const isDown = _isKeyDown(k)
    const wasDown = world._system.keys[k].isDown

    world._system.keys[k].wasDown = wasDown
    world._system.keys[k].isDown = isDown

    if (isDown && wasDown) {
      world._system.keys[k].downCount++
    } else {
      world._system.keys[k].downCount = 0
    }
  })
}
