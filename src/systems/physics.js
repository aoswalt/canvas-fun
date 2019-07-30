import Vector from '../Vector'
import { setupSystem } from '../systems'

// current velocity + net force
const applyForces = ({ position, velocity, forces }, gi, world, setValue) => {
  const newVelocity = Vector.add(velocity, ...forces)
  setValue('velocity', newVelocity)

  const newPosition = Vector.add(position, newVelocity)
  setValue('position', newPosition)

  const newForces = []
  setValue('forces', [])
}

export default setupSystem(['position', 'velocity', 'forces'], applyForces)
