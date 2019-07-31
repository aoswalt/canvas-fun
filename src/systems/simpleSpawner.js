import { ball, spawn } from '../world'
import KeyState, { keys } from '../world/KeyState'
import { position as mousePosition } from '../mouse'
import produce from 'immer'

export default world => {
  if(!KeyState.onKeyPress(world, keys.ENTER, 20)) return

  const position = mousePosition()

  spawn(world, { ...ball, position })
}
