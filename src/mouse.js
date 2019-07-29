import { canvasElement } from './canvas';
import Vector from './Vector'

let mousePressed = false

canvasElement().addEventListener('mousedown', () => (mousePressed = true))
canvasElement().addEventListener('mouseup', () => (mousePressed = false))

export const mouseDown = () => mousePressed
export const mouseUp = () => mousePressed

let mousePosition = Vector.new()

canvasElement().addEventListener(
  'mousemove',
  ({ clientX: x, clientY: y }) => (mousePosition = Vector.new(x, y)),
)
canvasElement().addEventListener(
  'mouseenter',
  ({ clientX: x, clientY: y }) => (mousePosition = Vector.new(x, y)),
)

export const position = () => mousePosition
