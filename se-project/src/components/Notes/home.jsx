import React, { useContext, useEffect } from 'react'
import SideMenu from '../../components/SideMenu'
import { NavLink, Outlet } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'
import Tabs from 'react-bootstrap/Tabs'
import TabContainer from 'react-bootstrap/TabContainer'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "./Notes.css"
const NotesView = () => {
	console.log("Navigated to home")
	return (
	<div className='home-view'>
			<div style={{ display: 'flex', flexDirection: "row", gap:"1em"}}>
					<SideMenu />
					<Outlet />
			</div>
		</div> 
	)
}

export default NotesView
