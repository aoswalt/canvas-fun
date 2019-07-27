const generationalIndex = {
  index: 0,
  generation: 0,
}

const init = () => generationalIndex

const allocatorEntry = {
  isAlive: true,
  generation: 0,
}

const generationalIndexAllocator = {
  entries: [],
  free: [],
}

export const initAllocator = () => generationalIndexAllocator

export const allocate = ({ entries, free }) => {
  if(!free.length) {
    const gi = { index: entries.length, generation: 0 }

    return [gi, { entries: [...entries, allocatorEntry], free: [] }]
  }

  const [nextIndex, ...remainingFree] = free
  const existing = entries[nextIndex]
  const nextEntry = { isAlive: true, generation: existing.generation + 1 }

  const newEntries = entries.map((e, i) => (i === nextIndex ? nextEntry : e))

  const gi = { index: nextIndex, generation: 0 }

  return [gi, { entries: newEntries, free: remainingFree }]
}

export const deallocate = ({ entries, free }, genIndex) => {
  const index = genIndex.index

  const entry = entries[index]
  const newEntry = { ...entry, isAlive: false }

  const newEntries = entries.map((e, i) => (i === index ? newEntry : e))
  const newFree = [...free, index].sort()

  return { entries: newEntries, free: newFree }
}

export const isAlive = (allocator, gi) => allocator.entries[gi.index].isAlive

const arrayEntry = {
  value: null,
  generation: 0,
}

const generationalIndexArray = []

export const initArray = () => generationalIndexArray

export const set = (array, gi, value) => {
  const entry = { generation: gi.generation, value }

  if(!array[gi.index]) return [entry]

  return array.map((e, i) => (i === gi.index ? entry : e))
}

export const get = (array, gi) => {
  const entry = array[gi.index]

  return entry.generation === gi.generation ? entry.value : null
}
