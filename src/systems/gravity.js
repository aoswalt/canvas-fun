import Vector from '../Vector'
import { setupSystem } from '../systems'
import produce from 'immer'

const gravity = Vector.new(0, 1)

const addGravity = ({ gravity: gravityScale, forces }, gi, world, setValue) => {
  setValue(
    'forces',
    produce(forces, draft => {
      draft.push(Vector.scale(gravity, gravityScale))
    }),
  )
}

export default setupSystem(['gravity', 'forces'], addGravity)
