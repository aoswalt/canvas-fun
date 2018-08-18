const pipe = v => ({
  value: () => v,
  p: fn => pipe(fn(v))
})

export default pipe
