const body = document.querySelector('body')
body.addEventListener('contextmenu', e => e.preventDefault())

const canvas = document.querySelector('canvas')
canvas.focus()

const ctx = canvas.getContext('2d')

export const canvasElement = () => canvas
export const context = () => ctx
export const width = () => canvas.width
export const height = () => canvas.height

export const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const resize = (newWidth, newHeight) => {
  canvas.width = newWidth
  canvas.height = newHeight
}

const makeFullscreen = () =>
  resize(window.innerWidth, window.innerHeight)

// keep canvas fullscreen
makeFullscreen()
window.addEventListener('resize', makeFullscreen)
