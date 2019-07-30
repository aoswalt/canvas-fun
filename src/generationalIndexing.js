import produce from 'immer'

export class GenerationalIndex {}

GenerationalIndex.new = (index = 0) => ({ index, generation: 0 })

export class AllocatorEntry {}

AllocatorEntry.new = () => ({ isAlive: true, generation: 0 })

export class GenerationalIndexAllocator {}

GenerationalIndexAllocator.new = () => ({ entries: [], free: [] })

GenerationalIndexAllocator.allocate = allocator => {
  if(!allocator.free.length) {
    allocator.entries.push(AllocatorEntry.new())

    return GenerationalIndex.new(allocator.entries.length - 1)
  }

  const nextIndex = allocator.free.shift()

  allocator.entries[nextIndex].generation++
  allocator.entries[nextIndex].isAlive = true

  return GenerationalIndex.new(nextIndex)
}

GenerationalIndexAllocator.deallocate = (allocator, genIndex) => {
  const index = genIndex.index

  allocator.entries[index].isAlive = false

  allocator.free.push(index)
  allocator.free.sort((a, b) => a - b)
}

GenerationalIndexAllocator.isAlive = (allocator, gi) => allocator.entries[gi.index].isAlive

const arrayEntry = {
  value: null,
  generation: 0,
}

export class GenerationalIndexArray {}

GenerationalIndexArray.new = () => []

GenerationalIndexArray.set = (array, gi, value) => {
  if(!array[gi.index]) {
    array[gi.index] = GenerationalIndex.new()
  }

  array[gi.index].value = value
}

GenerationalIndexArray.get = (array, gi) => {
  const entry = array[gi.index]

  return entry && entry.generation === gi.generation ? entry.value : null
}
