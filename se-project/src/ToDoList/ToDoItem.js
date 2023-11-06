import '../App.css';
import React, { Component, useState, setState } from 'react';
import './ToDo.css'
import { Button, Card, Checkbox } from '@mui/material';
import { toDoContext } from './toDoContext';
import axios from 'axios';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MdDelete } from "react-icons/md";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
class ToDoItem extends Component {
    static contextType = toDoContext;

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.defaultDone,
            titleText: this.props.todo.title,
            descriptionText: this.props.todo.description,
            trashed: this.props.defaultTrash
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.addCheckedToDo = this.addCheckedToDo.bind(this);
        this.callUpdateToDo = this.callUpdateToDo.bind(this)
        this.toggleTrash = this.toggleTrash.bind(this)
        this.trashToDo = this.trashToDo.bind(this)
    }
    updateToDo(text, id, label) {
        console.log("in update ToDo: id=", id, "text=", text, "label=", label);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/ToDo/update', { "_id": id, [label]: text, "label": label })
            .then(response => {
                console.log("response on edit: ", response)
                this.addUpdatedToDo(response.data)
            })
            .catch((err) => {
                console.log("err /api",err);
            });
    }
    setText(val, id, label) {
        console.log("val: ", val, "id: ", id, "label: ", label, this.state)
        if (label == "title") {
            this.setState({ "titleText": val })
        }
        else if (label == "description") {
            this.setState({ "descriptionText": val })
        }

    }
    callUpdateToDo() {
        console.log(this.state, this.props.todo._id, "title")
        this.updateToDo(this.state.titleText, this.props.todo._id, "title")
        this.updateToDo(this.state.descriptionText, this.props.todo._id, "description")
    }
    addCheckedToDo(todo) {
        var list = this.context.toDoData;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                list[i].done = todo.done
            }
        }
        this.context.setToDoData(list)
        console.log(this.context.toDoData)
    }
    addTrashedToDo(todo) {
        var list = this.context.toDoData;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                list[i].trashed = todo.trashed
            }
        }
        this.context.setToDoData(list)
        console.log(this.context.toDoData)
    }
    addUpdatedToDo(todo) {
        var list = this.context.toDoData;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                list[i].title = todo.title
                list[i].description = todo.description
            }
        }
        this.context.setToDoData(list)
        console.log(this.context.toDoData)
    }
    toggleToDo(id, done) {
        console.log("in complete ToDo: ", id, done);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/todo/complete', { "_id": id, "done": done })
            .then(response => {
                console.log("response on edit: ", response)
                this.addCheckedToDo(response.data)
            })
            .catch((err) => {
                console.log("/api",err);
            });
    }
    toggleTrash(id, trashed) {
        console.log("in complete ToDo: ", id, trashed);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/ToDo/trash', { "_id": id, "trashed": trashed })
            .then(response => {
                console.log("response on trash: ", response)
                this.addTrashedToDo(response.data)
            })
            .catch((err) => {
                console.log("err /api",err);
            });
    }
    handleChange() {
        var newDone = !this.state.checked
        this.setState({ checked: newDone });
        console.log("NEW CHECK: ", this.state.checked)
        this.toggleToDo(this.props.todo._id, newDone)
    }
    trashToDo() {
        var newTrashed = !this.state.trashed
        this.setState({ trashed: newTrashed });
        console.log("NEW CHECK: ", this.state.trashed)
        this.toggleTrash(this.props.todo._id, newTrashed)
    }
    render() {
        var textStyle = "toDoText"
        if (this.state.checked == true) {
            textStyle = "toDoText disabled"
        }
        if (this.state.checked == this.props.defaultDone) {
            return (
                <Card variant="outlined" className="updateToDo" style={{backgroundColor:"var(--sage)"}}>

                    <div className="ToDoItem">
                        {/* <div class={textStyle}>
                            <div>{this.props.todo.title}</div>
                            <div>{this.props.todo.description}</div>
                        </div> */}

                        <Inplace closable onClose={this.callUpdateToDo} className='ToDoContent'>
                            <InplaceDisplay>
                                <div class={textStyle}>
                                    <div style={{fontWeight: "bold"}}>{this.state.titleText || this.props.todo.title}</div>
                                    <div>{this.state.descriptionText || this.props.todo.description}</div>
                                </div>
                            </InplaceDisplay>
                            <InplaceContent className="InplaceContent">
                                <div class={textStyle}>
                                    <TextField
                                        id="standard-basic"
                                        label="Title"
                                        variant="standard"
                                        size='small'
                                        spellCheck="true"
                                        value={this.state.titleText}
                                        style={{fontWeight: "bold"}}
                                        onChange={(e) => this.setText(e.target.value, this.props.todo._id, "title")} />
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Description"
                                        multiline
                                        minRows={5}
                                        maxRows={5}
                                        spellCheck="true"
                                        value={this.state.descriptionText}
                                        onChange={(e) => this.setText(e.target.value, this.props.todo._id, "description")}
                                    />
                                    {/* <Button variant="outlined" id="editButton" onClick={this.callUpdateToDo}>Confirm</Button> */}
                                </div>
                                {/* <InputText value={this.state.titleText} onChange={(e) => this.setText(e.target.value, this.props.todo._id, "title")} autoFocus /> */}
                            </InplaceContent>
                        </Inplace>
                    <div className='tools'>
                        <input type="checkbox"
                            checked={this.state.checked}
                            onChange={this.handleChange} 
                            className='tool-item'/>
                        <IconButton aria-label="delete" onClick={this.trashToDo}>
                            <DeleteIcon className='tool-item'/>
                        </IconButton>
                    </div>
                </div>
                </Card >
            );
        }
    }
}

ToDoItem.contextType = toDoContext
export default ToDoItem;