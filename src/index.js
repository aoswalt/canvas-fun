const resizeCanvas = () => {
  const canvas = document.querySelector('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas, false)
