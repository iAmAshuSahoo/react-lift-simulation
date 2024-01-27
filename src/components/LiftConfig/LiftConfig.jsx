import {useContext} from 'react';
import {LiftConfigContext} from '../../context/lift-config'

function LiftConfig() {
    const {liftConfigValue, setLiftConfigValue} = useContext(LiftConfigContext);

    const handleConfigChange = (key, value) => {
        if(!isNaN(parseInt(value))) {
            setLiftConfigValue({...liftConfigValue, [key]: parseInt(value)})
        } else {
            setLiftConfigValue({...liftConfigValue, [key]: 0})
        }
    }
  return (
    <>
    <div>Lift Configuration</div>
    <div>
        <label>Number of Floors</label>
        <input type='text' 
            value={liftConfigValue.floors}
            onChange={(e) => handleConfigChange('floors', e.target.value)} />
    </div>
    <div>
        <label>Number of Lifts</label>
        <input type='text' 
            value={liftConfigValue.lifts}
            onChange={(e) => handleConfigChange('lifts', e.target.value)} />
    </div>
    </>
  )
}

export default LiftConfig;