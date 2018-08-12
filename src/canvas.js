const canvas = document.querySelector('canvas')

export const resizeCanvas = (width, height) => {
  canvas.width = width
  canvas.height = height
}

const fullscreenCanvas = () =>
  resizeCanvas(window.innerWidth, window.innerHeight)

export const autoResizeCanvas = () => {
  fullscreenCanvas()
  window.addEventListener('resize', fullscreenCanvas)
}
