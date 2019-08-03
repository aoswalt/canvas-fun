import Vector from './Vector'
import KeyState from './World/KeyState'
import MouseState from './World/MouseState'
import {
  GenerationalIndexAllocator,
  GenerationalIndexArray,
} from './generationalIndexing'
import produce from 'immer'

const worldStructure = {
  allocator: GenerationalIndexAllocator.new(),
  entities: [], // gi

  _system: { keyState: KeyState.new(), mouseState: MouseState.new() },
  _initialValues: GenerationalIndexArray.new(),

  position: GenerationalIndexArray.new(), // x, y
  velocity: GenerationalIndexArray.new(), // x, y
  body: GenerationalIndexArray.new(), // type, <any>?
  gravity: GenerationalIndexArray.new(), // float
  input: GenerationalIndexArray.new(), // ?
  player: GenerationalIndexArray.new(), // ?
  forces: GenerationalIndexArray.new(), // [{ x, y }]
  display: GenerationalIndexArray.new(), // color
  age: GenerationalIndexArray.new(), // current, lifespan
}

export default class World {}

World.isAlive = (world, gi) =>
  GenerationalIndexAllocator.isAlive(world.allocator, gi)

World.get = (world, component, gi) =>
  GenerationalIndexArray.get(world[component], gi)

World.deallocate = (world, gi) =>
  GenerationalIndexAllocator.deallocate(world.allocator, gi)

World.spawn = (world, skeleton) => {
  const genIndex = GenerationalIndexAllocator.allocate(world.allocator)

  world.entities[genIndex.index] = genIndex

  World.update(world, [genIndex, { ...skeleton, _initialValues: skeleton }])
}

World.new = (entities = []) =>
  produce(worldStructure, structure =>
    entities.forEach(e => World.spawn(structure, e)),
  )

World.update = (world, [gi, entityUpdate]) => {
  Object.entries(entityUpdate).forEach(([component, update]) =>
    GenerationalIndexArray.set(world[component], gi, update),
  )
}

World.setValue = (world, component, gi, value) =>
  GenerationalIndexArray.set(world[component], gi, value)

World.getMouseState = world => world._system.mouseState

World.setMouseState = (world, ms) => (world._system.mouseState = ms)

World.getKeyState = world => world._system.keyState

World.setKeyState = (world, ks) => (world._system.keyState = ks)
