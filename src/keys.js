import { canvasElement } from './canvas'

let keysDown = []

canvasElement().addEventListener(
  'keydown',
  ({ key }) => (keysDown = [...keysDown, key]),
)
canvasElement().addEventListener(
  'keyup',
  ({ key }) => (keysDown = keysDown.filter(k => k !== key)),
)

export const getKeysDown = () => [...keysDown]
export const isKeyDown = key => keysDown.includes(key)
export const areKeysDown = (...keys) => keys.every(isKeyDown)
export const anyKeysDown = (...keys) => keys.some(isKeyDown)

export const UP = 'ArrowUp'
export const DOWN = 'ArrowDown'
export const LEFT = 'ArrowLeft'
export const RIGHT = 'ArrowRight'
export const SPACE = ' '
export const ENTRER = 'Enter'
export const SHIFT = 'Shift'
export const CTRL = 'Control'
export const ALT = 'Alt'
export const CAPS = 'CapsLock'
export const TAB = 'Tab'
export const BACKSPACE = 'Backspace'
export const DELETE = 'Delete'
