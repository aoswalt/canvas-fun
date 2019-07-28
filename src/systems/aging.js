import Vector from '../Vector'
import { setupSystem } from '../systems'

const growOlder = ({ age }) => ({ age: { ...age, current: age.current + 1 } })

export default setupSystem(['age'], growOlder)
