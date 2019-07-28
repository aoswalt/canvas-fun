import Vector from '../Vector'
import { setupSystem } from '../systems'

const gravity = new Vector(0, 1)

const addGravity = ({ gravity: gravityScale, forces }) => ({
  forces: [...forces, Vector.scale(gravity, gravityScale)],
})

export default setupSystem(['gravity', 'forces'], addGravity)
