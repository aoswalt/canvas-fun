import { canvasElement } from './canvas';
import Vector from './Vector'

let mousePressed = false

canvasElement().addEventListener('mousedown', () => (mousePressed = true))
canvasElement().addEventListener('mouseup', () => (mousePressed = false))

export const mouseDown = () => mousePressed
export const mouseUp = () => mousePressed

let mousePosition = new Vector()

canvasElement().addEventListener(
  'mousemove',
  ({ clientX: x, clientY: y }) => (mousePosition = new Vector(x, y)),
)
canvasElement().addEventListener(
  'mouseenter',
  ({ clientX: x, clientY: y }) => (mousePosition = new Vector(x, y)),
)

export const position = () => mousePosition
