import Vector from './Vector'
import { allocate, initAllocator, initArray, set } from './generationalIndexing'

const structure = {
  allocator: initAllocator(),
  entities: [], // gi

  position: initArray(), // x, y
  body: initArray(), // type, <any>?
  display: initArray(), // color
}

const ball = {
  position: new Vector(200, 200),
  body: { type: 'circle', radius: 50 },
  display: { color: 'blue' },
}

const spawn = (world, skeleton) => {
  const [genIndex, allocator] = allocate(world.allocator)

  const entities = [...world.entities, genIndex]

  const worldWithEntity = {
    ...world,
    allocator,
    entities,
  }

  return updateWorld(worldWithEntity, [genIndex, skeleton])
}

export const init = () => spawn(structure, ball)

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
