import { clear } from './canvas'
import World from './World'
import systemInput from './systems/systemInput'
import aging from './systems/aging'
import bodyAging from './systems/bodyAging'
import gravity from './systems/gravity'
import worldCollision from './systems/worldCollision'
import playerControl from './systems/playerControl'
import physics from './systems/physics'
import displayAging from './systems/displayAging'
import draw from './systems/draw'
import simpleSpawner from './systems/simpleSpawner'
import produce from 'immer'

const systems = [
  systemInput,
  aging,
  bodyAging,
  simpleSpawner,
  gravity,
  worldCollision,
  playerControl,
  physics,
  displayAging,
  draw,
]

const runSystem = produce((world, system) => system(world))

const run = world => {
  clear()

  const updatedWorld = systems.reduce(runSystem, world)

  requestAnimationFrame(() => run(updatedWorld))
}

const world = World.new()

run(world)
