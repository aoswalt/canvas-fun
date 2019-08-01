import { canvasElement } from '../canvas'
import Vector from '../Vector'
import produce from 'immer'

const buttonsDown = new Set()

canvasElement().addEventListener('mousedown', e => {
  buttonsDown.add(e.button)
})

canvasElement().addEventListener('mouseup', e => {
  buttonsDown.delete(e.button)
})

let mousePosition = Vector.new()

canvasElement().addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
  mousePosition = Vector.new(x, y)
  // track movementX, movementY ?
})

// canvasElement().addEventListener('mouseenter', ({ clientX: x, clientY: y }) => {
//   mousePosition = Vector.new(x, y)
// })

export const _currentPosition = () => mousePosition

// NOTE(adam): MDN reports mouse buttons ranging from 0 to 4
export const buttons = Object.fromEntries(
  Array.from({ length: 5 }).map((_e, i) => [`MOUSE${i}`, i]),
)

export default class MouseState {}

MouseState.new = () => ({
  buttons: Object.values(buttons).map(() => ({
    isDown: false,
    wasDown: false,
    downCount: 0,
  })),
  position: Vector.new(),
  recentPositions: [],
})

MouseState.update = produce(ms => {
  Object.values(buttons).forEach(b => {
    const bState = ms.buttons[b]

    const isDown = buttonsDown.has(b)
    const wasDown = bState.isDown

    bState.isDown = isDown
    bState.wasDown = wasDown

    if(isDown && wasDown) {
      bState.downCount++
    } else {
      bState.downCount = 0
    }
  })

  ms.position = mousePosition

  ms.recentPositions.push(mousePosition)

  if(ms.recentPositions.length > 3) {
    ms.recentPositions.shift()
  }
})
