import React, { useContext, useState } from "react";
import SettingsContext from "./SettingsContext";
import Timer from "./Timer";
import Settings from "./Settings";
import Main from "./main"; // Import the Main component
import "./App.css";
import AppContext from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
function Pomodoro() {
  console.log("Pomodoro")
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
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
    console.log("Rendering pomodoro")
    return (
      <main>
        <Main /> {/* Render the Main component as the background */}
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          <div className="content-overlay">
            {showSettings ? <Settings /> : <Timer />}
          </div>
        </SettingsContext.Provider>
      </main>
    );
  }
  else {
    console.log("Going back to home")
    navigate("/auth")
  }
}

export default Pomodoro;
