import { canvasElement } from '../canvas'
import produce from 'immer'

const keysDown = new Set()

canvasElement().addEventListener('keydown', ({ key }) => {
  keysDown.add(key)
})

canvasElement().addEventListener('keyup', ({ key }) => {
  keysDown.delete(key)
})

const keys = {
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

KeyState.keys = keys

KeyState.isKeyDown = (kState, k) => kState[k].isDown

KeyState.wasKeyDown = (kState, k) => kState[k].wasDown

KeyState.anyKeysDown = (kState, ks) => ks.any(k => KeyState.isKeyDown(kState, k))

KeyState.allKeysDown = (kState, ks) =>
  ks.every(k => KeyState.isKeyDown(kState, k))

KeyState.onKeyPress = (kState, k) =>
  KeyState.isKeyDown(kState, k) && !KeyState.wasKeyDown(kState, k)

KeyState.isKeyHeld = (kState, k, count = 5) =>
  isKeyDown(kState, k) && kState[k].downCount >= count

KeyState.onKeyHold = (kState, k, count = 5) =>
  isKeyDown(kState, k) && kState[k].downCount === count

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
