import { mouseDown, position as mousePosition } from '../mouse'
import Vector from '../Vector'
import { setupSystem } from '../systems'
import { setValue } from '../world'
import KeyState, { keys } from '../world/KeyState'
import produce from 'immer'

const getMove = ({ position, velocity, forces }, world) => {
  // only adding a force, but direct pos, etc. manipulation would be more stable
  if(mouseDown()) {
    const positionReset = Vector.subtract(mousePosition(), position)
    const forcesReset = Vector.scale(Vector.add(...forces), -1)
    const velocityReset = Vector.scale(velocity, -1)

    return Vector.add(positionReset, forcesReset, velocityReset)
  }

  if(KeyState.isKeyDown(world, keys.SPACE)) {
    return Vector.new(0, -1.5)
  }
}

const move = (entity, gi, world, setValue) => {
  const moveVector = getMove(entity, world)

  if(moveVector) {
    setValue(
      'forces',
      produce(entity.forces, draft => {
        draft.push(moveVector)
      }),
    )
  }
}

export default setupSystem(['position', 'velocity', 'forces', 'player'], move)
