import Vector from '../Vector'
import { setupSystem } from '../systems'

const applyForces = ({ position, velocity, forces }) => {
  // current velocity + net force
  const newVelocity = Vector.add(velocity, ...forces)
  const newPosition = Vector.add(position, newVelocity)

  return {
    position: newPosition,
    velocity: newVelocity,
    forces: [],
  }
}

export default setupSystem(['position', 'velocity', 'forces'], applyForces)
