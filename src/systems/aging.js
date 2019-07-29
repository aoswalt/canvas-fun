import Vector from '../Vector'
import { deallocate, get, isAlive } from '../generationalIndexing'
import { setupSystem } from '../systems'
import pipe from '../pipe'

const growOlder = ({ age }) => ({ age: { ...age, current: age.current + 1 } })

const aging = setupSystem(['age'], growOlder)

const expiration = world => {
  const expired = world.entities
    .filter(gi => isAlive(world.allocator, gi))
    .filter(gi => {
      const age = get(world.age, gi)
      return age && age.current > age.lifespan
    })

  if(!expired.length) return world

  return expired.reduce(
    (currentWorld, gi) => ({
      ...currentWorld,
      allocator: deallocate(currentWorld.allocator, gi),
    }),
    world,
  )
}

export default world =>
  pipe(world)
    .p(aging)
    .p(expiration)
    .value()
