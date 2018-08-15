const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

export const context = () => ctx
export const width = () => canvas.width
export const height = () => canvas.height

export const resize = (width, height) => {
  canvas.width = width
  canvas.height = height
}

export const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const makeFullscreen = () =>
  resize(window.innerWidth, window.innerHeight)

export const autoResizeCanvas = () => {
  makeFullscreen()
  window.addEventListener('resize', makeFullscreen)
}
