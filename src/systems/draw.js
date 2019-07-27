import { circle } from '../draw'
import { isAlive, get } from '../generationalIndexing'

const draw = (position, body, display) => {
  switch (body.type) {
    case 'circle': {
      circle(position, body.radius, { fill: display.color })
    }
  }
}

export default world => {
  world.entities.forEach(gi => {
    if(!isAlive(world.allocator, gi)) return

    const position = get(world.position, gi)
    const body = get(world.body, gi)
    const display = get(world.display, gi)

    if(!position || !body || !display) return

    draw(position, body, display)
  })

  return world
}
