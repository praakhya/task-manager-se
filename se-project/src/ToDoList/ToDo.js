import ToDoList from './ToDoList.js';
import EditToDo from './EditToDo';
import { Component } from 'react';
import { ToDoProvider, toDoContext } from './toDoContext.js';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, Tab, Box } from '@mui/material';
import { MdExpandMore, MdNoteAdd, MdClose } from "react-icons/md";
import "./ToDo.css"
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';


class ToDo extends Component {
    setToDoData = (toDoData) => {
        this.setState({ toDoData });
    }
    setView = (view) => {
        this.setState({ view })
    }
    setAddMode = (addMode) => {
        this.setState({ addMode })
    }
    state = {
        toDoData: [],
        view: "1",
        addMode: 0
    }
    renderEdit = () => {
        if (this.state.addMode) {
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
                            this.setAddMode(!this.state.addMode)
                        }}>
                        +
                    </button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="App">
                <toDoContext.Provider value={{ toDoData: this.state.toDoData, setToDoData: this.setToDoData, showEdit: this.state.addMode, toggleEdit: this.setAddMode }}>


                    <TabContext value={this.state.view}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={this.state.view}
                                onChange={(event, newValue) => {
                                    this.setState({ view: newValue })
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
                                    this.renderEdit()
                                }
                                <ToDoList disabled={false} defaultDone={false} />
                            </TabPanel>
                            <TabPanel value="2" className="tabPanel">
                                <ToDoList disabled={true} defaultDone={true} />
                            </TabPanel>
                        </div>
                    </TabContext>



                </toDoContext.Provider>
            </div>)
    }
}
export default ToDo;