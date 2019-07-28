import Vector from '../Vector'
import { setupSystem } from '../systems'

const grow = ({ _initialValues, age, body }) => {
  if(!body.type === 'circle' || !body.aging || !body.aging.type === 'pulse') { return }

  const cycleValue = Math.sin((age.current / 10) * body.aging.speed)

  const newRadius =
    _initialValues.body.radius * (1 + cycleValue * body.aging.amount)

  return { body: { ...body, radius: newRadius } }
}

export default setupSystem(['_initialValues', 'age', 'body'], grow)
