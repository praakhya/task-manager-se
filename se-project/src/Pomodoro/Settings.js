import { useContext } from 'react';
import ReactSlider from 'react-slider'
import BackButton from './BackButton';
import SettingsContext from './SettingsContext';
import './slider.css'


function Settings(){
    console.log("Pomodoro Settings")
    const settingsInfo = useContext(SettingsContext)
    return(
        <div style={{textAlign:'left'}}>
            <label>Work Minutes:  {settingsInfo.workMinutes}:00</label>
            <ReactSlider 
            className = {'slider'}
            thumbClassName= {'thumb'}
            trackClassName = {'track'}
            value = {settingsInfo.workMinutes}
            onChange = {newValue => settingsInfo.setWorkMinutes(newValue)}
            min = {1}
            max = {120}
            />
            <label>Break Minutes: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider 
            className = {'slider green'}
            thumbClassName= {'thumb'}
            trackClassName = {'track'}
            value = {settingsInfo.breakMinutes}
            onChange = {newValue => settingsInfo.setBreakMinutes(newValue)}
            min = {1}
            max = {120}
            style={{ width: '100%' }}
            />
        <div style = {{textAlign:'center',marginTop:'20px'}}>
        <BackButton onClick={()=> settingsInfo.setShowSettings(false)} />
        </div>
        
        </div>
    )
}

export default Settings;