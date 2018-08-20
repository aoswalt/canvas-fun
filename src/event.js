const listeners = {}

export const create = (type, ...data) => ({ type, ...data })

export const register = (type, fun) =>
  (listeners[type] = [...(listeners[type] || []), fun])

export const unregister = (type, fun) =>
  (listeners[type] = (listeners[type] || []).filter(l => l !== fun))

export const emit = event => {
  const { type } = event;
  (listeners['*'] || []).forEach(fun => fun(event));
  (listeners[type] || []).forEach(fun => fun(event))
}
