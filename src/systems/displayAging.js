import Vector from '../Vector'
import { setupSystem } from '../systems'
import produce from 'immer'

const mapValue = (v1, v2, amount) => {
  const diff = v2 - v1
  return v1 + diff * amount
}

const transitionColor = (hsl1, hsl2, amount) =>
  hsl1.map((v, i) => [v, hsl2[i]]).map(([v1, v2]) => mapValue(v1, v2, amount))

const grow = ({ _initialValues, age, display }, gi, world, setValue) => {
  if(!display.aging || !display.aging.type === 'color_cycle') {
    return
  }

  const cycleValue = Math.cos((age.current / 10) * display.aging.speed)

  const transitionAmount = -cycleValue / 2 + 0.5

  setValue(
    'display',
    produce(display, draft => {
      draft.color = transitionColor(
        _initialValues.display.color,
        display.aging.color,
        transitionAmount,
      )
    }),
  )
}

export default setupSystem(['_initialValues', 'age', 'display'], grow)
