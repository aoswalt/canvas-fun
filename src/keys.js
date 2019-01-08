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
