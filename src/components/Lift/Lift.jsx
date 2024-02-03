import {useState} from 'react'
import LiftConfig from '../LiftConfig/LiftConfig';
import {LiftConfigContext} from '../../context/lift-config'

function Lift() {
    const [liftConfigValue, setLiftConfigValue] = useState({lifts: 0, floors: 0})
  return (
    <LiftConfigContext.Provider value={{liftConfigValue, setLiftConfigValue}}>
        <h1>Lift Simulation</h1>
        <LiftConfig />
    </LiftConfigContext.Provider>
  )
}

export default Lift