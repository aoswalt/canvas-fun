import Vector from '../Vector'
import { setupSystem } from '../systems'
import World from '../World'
import KeyState from '../World/KeyState'
import MouseState from '../World/MouseState'
import produce from 'immer'

const getMove = ({ position, velocity, forces }, world) => {
  const mouseState = World.getMouseState(world)

  // only adding a force, but direct pos, etc. manipulation would be more stable
  if(MouseState.isButtonDown(mouseState, MouseState.buttons.MOUSE0)) {
    const mousePosition = MouseState.getPosition(mouseState)

    const positionReset = Vector.subtract(mousePosition, position)
    const forcesReset = Vector.scale(Vector.add(...forces), -1)
    const velocityReset = Vector.scale(velocity, -1)

    return Vector.add(positionReset, forcesReset, velocityReset)
  }

  const keyState = World.getKeyState(world)

  if(KeyState.isKeyDown(keyState, KeyState.keys.SPACE)) {
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
