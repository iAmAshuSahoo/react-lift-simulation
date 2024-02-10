import {useContext, useState} from 'react';
import {LiftConfigContext} from '../../context/lift-config'
import './LiftConfig.css';

function LiftConfig() {
    const {setSimulateValue} = useContext(LiftConfigContext);
    const [liftConfigValue, setLiftConfigValue] = useState({lifts: 0, floors: 0});

    const handleConfigChange = (key, value) => {
        if(!isNaN(parseInt(value))) {
            setLiftConfigValue({...liftConfigValue, [key]: parseInt(value)})
        } else {
            setLiftConfigValue({...liftConfigValue, [key]: 0})
        }
    }
  return (
    <>
    <div className='lift-config-heading'>Lift Configuration</div>
    <div className="config-container">
        <div>
            <label>Number of Floors</label>
            <input type='text' 
                className='inp-style'
                value={liftConfigValue.floors}
                onChange={(e) => handleConfigChange('floors', e.target.value)} />
        </div>
        <div>
            <label>Number of Lifts</label>
            <input type='text' 
                className='inp-style'
                value={liftConfigValue.lifts}
                onChange={(e) => handleConfigChange('lifts', e.target.value)} />
        </div>
        <div>
            <button 
                className='btn-lift'
                onClick={() => setSimulateValue({...liftConfigValue})}>Simulate</button>
        </div>
    </div>
    </>
  )
}

export default LiftConfig;