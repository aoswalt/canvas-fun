import { canvasElement } from '../canvas'
import produce from 'immer'

const keysDown = new Set()

canvasElement().addEventListener('keydown', ({ key }) => {
  keysDown.add(key)
})

canvasElement().addEventListener('keyup', ({ key }) => {
  keysDown.delete(key)
})

export const keys = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: ' ',
  ENTER: 'Enter',
  SHIFT: 'Shift',
  CTRL: 'Control',
  ALT: 'Alt',
  CAPS: 'CapsLock',
  TAB: 'Tab',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
}

export default class KeyState {}

KeyState.new = () =>
  Object.values(keys).reduce(
    (map, k) => ({
      ...map,
      [k]: { isDown: false, wasDown: false, downCount: 0 },
    }),
    {},
  )

KeyState.isKeyDown = (world, k) => world._system.keyState[k].isDown

KeyState.wasKeyDown = (world, k) => world._system.keyState[k].wasDown

KeyState.anyKeysDown = (world, ks) => ks.any(k => KeyState.isKeyDown(world, k))

KeyState.allKeysDown = (world, ks) =>
  ks.every(k => KeyState.isKeyDown(world, k))

KeyState.onKeyPress = (world, k) =>
  KeyState.isKeyDown(world, k) && !KeyState.wasKeyDown(world, k)

KeyState.isKeyHeld = (world, k, count = 5) =>
  isKeyDown(world, k) && world._system.keyState[k].downCount >= count

KeyState.onKeyHold = (world, k, count = 5) =>
  isKeyDown(world, k) && world._system.keyState[k].downCount === count

KeyState.update = produce(ks =>
  Object.values(keys).forEach(k => {
    const kState = ks[k]

    const isDown = keysDown.has(k)
    const wasDown = kState.isDown

    kState.wasDown = wasDown
    kState.isDown = isDown

    if(isDown && wasDown) {
      kState.downCount++
    } else {
      kState.downCount = 0
    }
  }))
