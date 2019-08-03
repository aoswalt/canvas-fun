import Vector from '../Vector'
import { setupSystem } from '../systems'
import pipe from '../pipe'
import World from '../World'
import produce from 'immer'

const growOlder = ({ age }, gi, world, setValue) => {
  setValue('age', produce(age, draft => { draft.current++ }))
}

const aging = setupSystem(['age'], growOlder)

const expiration = world => {
  const expired = world.entities
    .filter(gi => World.isAlive(world, gi))
    .filter(gi => {
      const age = World.get(world, 'age', gi)
      return age && age.current > age.lifespan
    })
    .forEach(gi => {
      World.deallocate(world, gi)
    })
}

export default world => {
  aging(world)
  expiration(world)
}
