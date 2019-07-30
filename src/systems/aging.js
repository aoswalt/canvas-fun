import Vector from '../Vector'
import {
  GenerationalIndexAllocator,
  GenerationalIndexArray,
} from '../generationalIndexing'
import { setupSystem } from '../systems'
import pipe from '../pipe'
import { deallocate } from '../world'
import produce from 'immer'

const growOlder = ({ age }, gi, world, setValue) => {
  setValue('age', produce(age, draft => { draft.current++ }))
}

const aging = setupSystem(['age'], growOlder)

const expiration = world => {
  const expired = world.entities
    .filter(gi => GenerationalIndexAllocator.isAlive(world.allocator, gi))
    .filter(gi => {
      const age = GenerationalIndexArray.get(world.age, gi)
      return age && age.current > age.lifespan
    })
    .forEach(gi => {
      deallocate(world, gi)
    })
}

export default world => {
  aging(world)
  expiration(world)
}
