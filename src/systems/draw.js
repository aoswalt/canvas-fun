import { circle } from '../draw'
import { setupSystem } from '../systems'

const draw = ({position, body, display}) => {
  switch (body.type) {
    case 'circle': {
      circle(position, body.radius, { fill: display.color })
    }
  }
}

export default setupSystem(['position', 'body', 'display'], draw)
