import { mouseDown, position as mousePosition } from '../mouse'
import { SHIFT, SPACE, anyKeysDown } from '../keys'
import Vector from '../Vector'
import { setupSystem } from '../systems'

const getMove = ({ position, velocity, forces }) => {
  // only adding a force, but direct pos, etc. manipulation would be more stable
  if(mouseDown()) {
    const positionReset = Vector.subtract(mousePosition(), position)
    const forcesReset = Vector.scale(Vector.add(...forces), -1)
    const velocityReset = Vector.scale(velocity, -1)

    return Vector.add(positionReset, forcesReset, velocityReset)
  }

  if(anyKeysDown(SPACE, SHIFT)) {
    return new Vector(0, -1.5)
  }
}

const move = (entity) => {
  const moveVector = getMove(entity)

  if(moveVector) {
    return { forces: [...entity.forces, moveVector] }
  }
}

export default setupSystem(['position', 'velocity', 'forces', 'player'], move)