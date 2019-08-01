import Vector from './Vector'
import KeyState from './world/KeyState'
import MouseState from './world/MouseState'
import {
  GenerationalIndexAllocator,
  GenerationalIndexArray,
} from './generationalIndexing'
import { blue, red } from './draw'
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

export const ball = {
  position: Vector.new(200, 200),
  velocity: Vector.new(5, 5),
  body: {
    type: 'circle',
    radius: 50,
    elasticity: 0.8,
    friction: 0.02,
    aging: { type: 'pulse', amount: 0.25, speed: 0.5 },
  },
  gravity: 1,
  input: {},
  player: {},
  forces: [],
  display: {
    color: blue(),
    aging: { type: 'color_cycle', color: red(), speed: 0.5 },
  },
  age: { current: 0, lifespan: 200 },
}

export const spawn = (world, skeleton) => {
  const genIndex = GenerationalIndexAllocator.allocate(world.allocator)

  world.entities[genIndex.index] = genIndex

  updateWorld(world, [genIndex, { ...skeleton, _initialValues: skeleton }])
}

export const init = () =>
  produce(worldStructure, structure => spawn(structure, ball))

export const updateWorld = (world, [gi, entityUpdate]) => {
  Object.entries(entityUpdate).forEach(([component, update]) =>
    GenerationalIndexArray.set(world[component], gi, update),
  )
}

export const setValue = (world, key, gi, value) =>
  GenerationalIndexArray.set(world[key], gi, value)
export const deallocate = (world, gi) =>
  GenerationalIndexAllocator.deallocate(world.allocator, gi)
