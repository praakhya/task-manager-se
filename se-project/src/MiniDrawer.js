import { IconButton } from "@mui/material"
import { useContext, useState } from "react";
import { MdMenu, MdStickyNote2, MdTaskAlt, MdOutlineTimer } from "react-icons/md";
import { useNavigate, Outlet } from "react-router-dom";
import AppContext from "./contexts/AppContext";
function MiniDrawer() {
  const [navBar, setNavBar] = useState(false)
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const toggleNavBar=()=>{
    setNavBar(!navBar)
  }
  const goToNotes = ()=>{
    navigate("/notes")
  }
  const goToToDo = () => {
    console.log("appContext:",appContext.userInfo)
    if (appContext.userInfo && appContext.userInfo.accessToken)
      navigate("/todo")
    else {
      navigate("/home")
    }
  }
  const goToPomodoro = () => {
    navigate("/pomodoro")
  }
  return (
    <div className="fullSideNav">
      <MdMenu onClick={toggleNavBar} className="icons"></MdMenu>
      <nav className="sidenav" hidden={!navBar}>
        <MdStickyNote2 className="icons" onClick={goToNotes}></MdStickyNote2>
        <MdTaskAlt className="icons" onClick={goToToDo}></MdTaskAlt>
        <MdOutlineTimer className="icons" onClick={goToPomodoro}></MdOutlineTimer>
      </nav>
    </div>
  )
}
export default MiniDrawer