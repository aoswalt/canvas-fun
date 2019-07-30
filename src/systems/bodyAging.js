import Vector from '../Vector'
import { setupSystem } from '../systems'
import produce from 'immer'

const grow = ({ _initialValues, age, body }, gi, world, setValue) => {
  if(!body.type === 'circle' || !body.aging || !body.aging.type === 'pulse') {
    return
  }

  const cycleValue = Math.sin((age.current / 10) * body.aging.speed)

  setValue(
    'body',
    produce(body, draft => {
      draft.radius =
        _initialValues.body.radius * (1 + cycleValue * body.aging.amount)
    }),
  )
}

export default setupSystem(['_initialValues', 'age', 'body'], grow)
