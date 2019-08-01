import { ball, spawn } from '../world'
import KeyState, { keys } from '../world/KeyState'
import produce from 'immer'

export default world => {
  if(!KeyState.onKeyPress(world, keys.ENTER, 20)) return

  spawn(world, { ...ball, position: world._system.mouseState.position })
}
