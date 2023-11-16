import React, { useContext, useState } from "react";
// import "./App.css";
import VideoCarousel from "./components/VideoCarousel";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
function MusicPlayer() {
  console.log("MusicPlayer")
  const context = useContext(AppContext);
  const navigate = useNavigate();

  var login = context.userInfo
  if (!login) {
    login = sessionStorage.getItem("userInfo")
    if (login) {
      login = JSON.parse(login)
    }
  }
  if (login && login.accessToken) {
    console.log("Rendering Music Player")

    return(
      <div className="App1">
      <VideoCarousel />
    </div>
    )
  }
  else {
    console.log("Going back to home")
    navigate("/auth")
  }
}

export default MusicPlayer;
