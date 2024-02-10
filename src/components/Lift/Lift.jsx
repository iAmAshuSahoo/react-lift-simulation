import {useState} from 'react'
import LiftConfig from '../LiftConfig/LiftConfig';
import Building from '../Building/Building'
import {LiftConfigContext} from '../../context/lift-config'

function LiftSimulation() {
    const [simulateValue, setSimulateValue] = useState({lifts: 0, floors: 0})
  return (
    <LiftConfigContext.Provider value={{simulateValue, setSimulateValue}}>
        <h1>Lift Simulation</h1>
        <LiftConfig />
        <Building />
    </LiftConfigContext.Provider>
  )
}

export default LiftSimulation