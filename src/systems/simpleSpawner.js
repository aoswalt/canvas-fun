import { ball, spawn } from '../world'
import { position as mousePosition } from '../mouse'
import { ENTER, isKeyDown, getKeysDown } from '../keys'

export default world => {
  if(!isKeyDown(ENTER)) return world

  const position = mousePosition()

  return spawn(world, {...ball, position})
}
