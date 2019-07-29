import produce from 'immer'

const generationalIndex = {
  index: 0,
  generation: 0,
}

const allocatorEntry = {
  isAlive: true,
  generation: 0,
}

const generationalIndexAllocator = {
  entries: [],
  free: [],
}

export const initAllocator = () => generationalIndexAllocator

export const allocate = allocator => {
  if(!allocator.free.length) {
    const gi = { index: allocator.entries.length, generation: 0 }

    return [
      gi,
      produce(allocator, draftAllocator => {
        draftAllocator.entries.push(allocatorEntry)
      }),
    ]
  }

  const nextIndex = allocator.free[0]
  const gi = { index: nextIndex, generation: 0 }

  return [
    gi,
    produce(allocator, draftAllocator => {
      draftAllocator.free.shift()

      draftAllocator.entries[nextIndex].generation++
      draftAllocator.entries[nextIndex].isAlive = true
    }),
  ]
}

export const deallocate = produce((allocator, genIndex) => {
  const index = genIndex.index

  allocator.entries[index].isAlive = false

  allocator.free.push(index)
  allocator.free.sort((a, b) => a - b)
})

export const isAlive = (allocator, gi) => allocator.entries[gi.index].isAlive

const arrayEntry = {
  value: null,
  generation: 0,
}

const generationalIndexArray = []

export const initArray = () => generationalIndexArray

export const set = produce((array, gi, value) => {
  // TODO(adam): this could use some cleanup
  if(!array[gi.index]) {
    array[gi.index] = { ...generationalIndex }
  }

  array[gi.index].value = value
})

export const get = (array, gi) => {
  const entry = array[gi.index]

  return entry && entry.generation === gi.generation ? entry.value : null
}
