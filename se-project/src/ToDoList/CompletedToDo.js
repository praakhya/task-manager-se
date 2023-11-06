import React, { Component } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { MdExpandMore } from "react-icons/md";
import { toDoContext } from "./toDoContext";
import ToDoList from "./ToDoList";
class CompletedToDo extends Component {
    static contextType = toDoContext;
    render() {
        
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<MdExpandMore/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Completed</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ToDoList disabled={true} defaultDone={true}/>
                </AccordionDetails>
            </Accordion>
        )
    }
}
CompletedToDo.contextType = toDoContext
export default CompletedToDo