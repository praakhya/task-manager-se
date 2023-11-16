import React from 'react'
import video4 from './video5.mp4'
import "./App.css"

const Main = () =>{
  console.log("Pomodoro Main")
    const changePlaybackRate = () => {
        const videoElement = document.getElementById("myVideo");
        if (videoElement) {
          videoElement.playbackRate = 0.5;
        }
      };
    
    return(
        <div className = 'main'>
            <video id="myVideo" src = {video4} autoPlay loop muted />
        </div>
    )
}

export default Main;