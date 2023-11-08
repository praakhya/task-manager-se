import ToDoList from './ToDoList.js';
import EditToDo from './EditToDo';
import { Component, useContext, useState } from 'react';
import { ToDoProvider, ToDoContext } from './toDoContext.js';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, Box, Fade } from '@mui/material';
import { MdExpandMore, MdNoteAdd, MdClose } from "react-icons/md";
import "./ToDo.css"
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem.js';
/* import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs'; */
import AppContext from '../../contexts/AppContext.js';
import { useNavigate } from 'react-router-dom';
function ToDo(props) {
    const [key, setKey] = useState("Incomplete")
    const appContext = useContext(AppContext)
    const toDoContext = useContext(ToDoContext)
    const navigate = useNavigate()
    const [toDoData, setToDoData] = useState([])
    const [view, setView] = useState("1")
    const [addMode, setAddMode] = useState(0)
    var userInfo = appContext.userInfo
    if (!userInfo) {
        userInfo = sessionStorage.getItem("userInfo")
        if (!userInfo || !userInfo.accessToken) {
            console.log("Going home")
            navigate("/", { replace: true })
            return
        }
    }


    const renderEdit = () => {
        if (addMode) {
            return (
                <div className="editCluster">
                    <EditToDo></EditToDo>
                </div>)
        }
        else {
            return (
                <div className="editCluster">
                    <button
                        className="addToDoButton btn-grad"
                        onClick={() => {
                            setAddMode(!addMode)
                        }}>
                        +
                    </button>
                </div>
            )
        }
    }
    return (
        <div className="App">
            <AppContext.Consumer>
                {(userInfo) => {
                    console.log("in userinfo consumer:", userInfo)
                    return (userInfo.userInfo && userInfo.userInfo.accessToken) ? (
                        <ToDoContext.Provider value={{ toDoData: toDoData, setToDoData: setToDoData, showEdit: addMode, toggleEdit: setAddMode }}>
                            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                <Row style={{ width: "80vw", left: 0 }}>
                                    <Col sm={2}>
                                        <ListGroup >
                                            <ListGroupItem action href="#link1" className='bg-success p-2 text-dark bg-opacity-50 border-0'>
                                                Incomplete
                                            </ListGroupItem>
                                            <ListGroupItem action href="#link2" className='bg-success p-2 text-dark bg-opacity-10 border-0'>
                                                Completed
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                    <Col lg={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="#link1">
                                                {
                                                    renderEdit()
                                                }
                                                <ToDoList disabled={false} defaultDone={false} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="#link2">                                    <ToDoList disabled={true} defaultDone={true} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>


                            {/* <TabContext value={view}>

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={view}
                                    onChange={(event, newValue) => {
                                        setView(newValue)
                                    }}
                                    TabIndicatorProps={{ style: { background: 'var(--dark-green)' } }}
                                    sx={{
                                        ".Mui-selected": {
                                            color: 'var(--dark-green)',
                                            backgroundColor: "var(--sage)"
                                        }
                                    }}
                                    textColor="var(--dark-green)">
                                    <Tab label="Incomplete" value="1" />
                                    <Tab label="Completed" value="2" />
                                </Tabs>
                            </Box>
                            <div className="contentFlow">

                                <TabPanel value="1" className="tabPanel">
                                    {
                                        renderEdit()
                                    }
                                    <ToDoList disabled={false} defaultDone={false} />
                                </TabPanel>
                                <TabPanel value="2" className="tabPanel">
                                    <ToDoList disabled={true} defaultDone={true} />
                                </TabPanel>
                            </div>
                        </TabContext> */}



                        </ToDoContext.Provider>) : <div></div>
                }}
            </AppContext.Consumer>
        </div>)
}
export default ToDo;