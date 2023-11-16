import React, { Component, useState, useContext, useEffect } from 'react';
import './ToDo.css'
import { Button, Checkbox } from '@mui/material';
import { ToDoContext } from './toDoContext';
import axios from 'axios';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MdDelete } from "react-icons/md";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import AppContext from '../../contexts/AppContext';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormText from 'react-bootstrap/FormText'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { ListGroup, Badge, ListGroupItem } from 'react-bootstrap';

function ToDoItem(props) {
    console.log("props in ToDoitem:", props)
    const toDoContext = useContext(ToDoContext);
    const appContext = useContext(AppContext);
    const [checked, setChecked] = useState(props.defaultDone)
    const [titleText, setTitleText] = useState(props.todo.title)
    const [descriptionText, setDescriptionText] = useState(props.todo.description)
    const [trashed, setTrashed] = useState(props.defaultTrash)
    const getHeader = () => {
        var headers = {}
        if (appContext.userInfo) {
            headers = {
                Authorization: 'accessToken=' + appContext.userInfo.accessToken + ';username=' + appContext.userInfo.username
            }
            return headers
        }
        headers = {
            Authorization: 'accessToken=;username='
        }
        return headers
    }
    const updateToDo = (text, id, label) => {
        var header = getHeader()
        console.log("in update ToDo: id=", id, "text=", text, "label=", label);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/ToDo/update', { "_id": id, [label]: text, "label": label }, { headers: header })
            .then(response => {
                console.log("response on edit: ", response)
                addUpdatedToDo(response.data)
            })
            .catch((err) => {
                console.log("err /api", err);
            });
    }
    const setText = (val, id, label) => {
        console.log("val: ", val, "id: ", id, "label: ", label)
        if (label == "title") {
            setTitleText(val)
        }
        else if (label == "description") {
            setDescriptionText(val)
        }

    }
    const callUpdateToDo = () => {
        console.log(props.todo._id, "title")
        updateToDo(titleText, props.todo._id, "title")
        updateToDo(descriptionText, props.todo._id, "description")
    }
    const addCheckedToDo = (todo) => {
        var list = toDoContext.toDoData;
        var indexOfObject;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                indexOfObject = list.indexOf(list[i])
            }
        }
        list[indexOfObject].done = todo.done
        toDoContext.setToDoData(list)
        console.log(toDoContext.toDoData)
    }
    const addTrashedToDo = (todo) => {
        var list = toDoContext.toDoData;
        var indexOfObject;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                indexOfObject = list.indexOf(list[i])
                break
            }
        }
        list[indexOfObject].trashed = todo.trashed
        var newtodo = list.filter((t) => { return t._id != todo._id })
        var deleted = list.filter((t) => { return t._id == todo._id })
        toDoContext.setToDoData(newtodo)
        toDoContext.setDeleted(deleted)
        console.log(toDoContext.toDoData)
    }
    const addUpdatedToDo = (todo) => {
        var list = toDoContext.toDoData;
        var indexOfObject;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                indexOfObject = list.indexOf(list[i])
                break
            }
        }
        list[indexOfObject].title = todo.title
        list[indexOfObject].description = todo.description
        toDoContext.setToDoData(list)
        console.log(toDoContext.toDoData)
    }
    const toggleToDo = (id, done) => {
        console.log("in complete ToDo: ", id, done);
        var baseUrl = "/api";
        var header = getHeader()
        axios.put(baseUrl + '/load/todo/complete', { "_id": id, "done": done }, { headers: header })
            .then(response => {
                console.log("response on edit: ", response)
                addCheckedToDo(response.data)
            })
            .catch((err) => {
                console.log("/api", err);
            });
    }
    const toggleTrash = (id, trashed) => {
        console.log("in complete ToDo: ", id, trashed);
        var baseUrl = "/api";
        var header = getHeader()
        axios.put(baseUrl + '/load/ToDo/trash', { "_id": id, "trashed": trashed }, { headers: header })
            .then(response => {
                console.log("response on trash: ", response)
                addTrashedToDo(response.data)
            })
            .catch((err) => {
                console.log("err /api", err);
            });
    }
    const handleChange = () => {
        var newDone = !checked
        setChecked(newDone);
        console.log("NEW CHECK: ", checked)
        toggleToDo(props.todo._id, newDone)
    }
    const trashToDo = () => {
        var newTrashed = !trashed
        setTrashed(newTrashed);
        console.log("NEW CHECK: ", trashed)
        toggleTrash(props.todo._id, newTrashed)
    }
    var textStyle = "toDoText"
    if (checked == true) {
        textStyle = "toDoText disabled"
    }
    if (checked == props.defaultDone) {
        return (


            <ListGroup.Item
                className="d-flex flex-row justify-content-between align-items-start"
            >
                <Inplace closable onClose={callUpdateToDo} className='ToDoContent'>
                    <InplaceDisplay>
                        <div className="w-80">
                            <div className="fw-bold">{titleText}</div>
                            {descriptionText}
                        
                        </div>
                    </InplaceDisplay>
                    <InplaceContent>
                        <Form.Group >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter title'
                                value={titleText}
                                onChange={(e) => setText(e.target.value, props.todo._id, "title")}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={descriptionText}
                                onChange={(e) => setText(e.target.value, props.todo._id, "description")}
                            />
                        </Form.Group>
                    </InplaceContent>
                </Inplace>
                <div className='tools'>
                            <input type="checkbox"
                                checked={checked}
                                onChange={handleChange}
                                className='tool-item' />
                            <DeleteIcon className='tool-item trash' onClick={trashToDo} />
                        </div>
            </ListGroup.Item>


        );
    }
}

export default ToDoItem;