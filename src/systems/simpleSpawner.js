import { ball, spawn } from '../world'
import { position as mousePosition } from '../mouse'
import { ENTER, getKeysDown, isKeyDown } from '../keys'
import produce from 'immer'

export default world => {
  if(!isKeyDown(ENTER)) return

  const position = mousePosition()

  spawn(world, { ...ball, position })
}
