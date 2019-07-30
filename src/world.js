import Vector from './Vector'
import { allocate, initAllocator, initArray, set } from './generationalIndexing'
import { blue, red } from './draw'
import produce from 'immer'

const worldStructure = {
  allocator: initAllocator(),
  entities: [], // gi

  _initialValues: initArray(),

  position: initArray(), // x, y
  velocity: initArray(), // x, y
  body: initArray(), // type, <any>?
  gravity: initArray(), // float
  input: initArray(), // ?
  player: initArray(), // ?
  forces: initArray(), // [{ x, y }]
  display: initArray(), // color
  age: initArray(), // current, lifespan
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
  const [genIndex, allocator] = allocate(world.allocator)

  const worldWithEntity = produce(world, draftWorld => {
    world.entities[genIndex.index] = genIndex
    world.allocator = allocator
  })

  return updateWorld(worldWithEntity, [
    genIndex,
    { ...skeleton, _initialValues: skeleton },
  ])
}

export const init = () => spawn(worldStructure, ball)

export const updateWorld = (world, [gi, entityUpdate]) => {
  const updates = Object.fromEntries(
    Object.entries(entityUpdate).map(([component, update]) => [
      component,
      set(world[component], gi, update),
    ]),
  )

  return { ...world, ...updates }
}
