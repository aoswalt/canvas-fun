import Vector from './Vector'
import { allocate, initAllocator, initArray, set } from './generationalIndexing'

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

const ball = {
  position: new Vector(200, 200),
  velocity: new Vector(5, 5),
  body: { type: 'circle', radius: 50, elasticity: .8, friction: 0.02 },
  gravity: 1,
  input: {},
  player: {},
  forces: [],
  display: { color: 'blue' },
  age: { current: 0, lifespan: 200 },
}

const spawn = (world, skeleton) => {
  const [genIndex, allocator] = allocate(world.allocator)

  const entities = [...world.entities, genIndex]

  const worldWithEntity = {
    ...world,
    allocator,
    entities,
  }

  return updateWorld(worldWithEntity, [
    genIndex,
    { ...skeleton, _initialValues: skeleton },
  ])
}

export const init = () => spawn(worldStructure, ball)

export const updateWorld = (currentWorld, entityUpdate) => ({
  ...currentWorld,
  ...applyWorldUpdates(currentWorld, entityUpdate),
})

const applyWorldUpdates = (world, [gi, updates]) =>
  Object.entries(updates).reduce(applyUpdate(gi), world)

const applyUpdate = gi => (world, [component, update]) => ({
  ...world,
  [component]: set(world[component], gi, update),
})
