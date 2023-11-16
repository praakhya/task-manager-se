import React, { Component, useContext, useState } from 'react';
import './ToDo.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import { ToDoContext } from './toDoContext';
import { MdExpandMore, MdNoteAdd, MdClose } from "react-icons/md";
import AppContext from '../../contexts/AppContext';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormText from 'react-bootstrap/FormText'
import FormControl from 'react-bootstrap/FormControl'
import { ListGroup } from 'react-bootstrap';
function EditToDo() {
    var toDoContext = useContext(ToDoContext)
    var appContext = useContext(AppContext)
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')

    /*        this.context = toDoContext;
            this.initToDoData = this.initToDoData.bind(this)
            this.updateToDoData = this.updateToDoData.bind(this)
            this.postToDo = this.postToDo.bind(this)*/

    /*    initToDoData(data) {
            this.context.setToDoData(data)
        }*/
    const updateToDoData = (data) => {
        console.log("data in update: ", data)
        var oldList = toDoContext.toDoData
        var newdata = { title: data.title, description: data.description, done: data.done, _id: data._id }
        oldList.push(newdata)
        toDoContext.setToDoData(oldList)
        toDoContext.toggleEdit()
    }
    const getHeader = () => {
        const userInfo = appContext.userInfo
        var headers = {}
        if (userInfo) {
            headers = {
                Authorization: 'accessToken=' + userInfo.accessToken + ';username=' + userInfo.username
            }
            return headers
        }
        headers = {
            Authorization: 'accessToken=;username='
        }
        return headers
    }
    const postToDo = () => {
        console.log("in get ToDo");
        var baseUrl = "/api";
        var header = getHeader()
        var todo = { title: title, description: description };
        axios.post(baseUrl + '/load/todo', todo, { headers: header })
            .then(response => {
                console.log("response on edit: ", response)
                updateToDoData(response.data)
            })
            .catch((err) => {
                console.log("err /api: ", err);
            });
    }

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const changeDesc = (e) => {
        setDesc(e.target.value)
    }
    const newToDo = () => {
        console.log(title, description)
        postToDo()
        setTitle("")
        setDesc("")
    }
    console.log("edittodo render")

    return (
        <ListGroup horizontal className='editCluster' style={{width:"80vw"}}>
            <ListGroup.Item className="addToDoButton closeButton"
                    onClick={() => { toDoContext.toggleEdit(0) }}>
                    <MdClose />
            </ListGroup.Item>
            <ListGroup.Item>
                <div className="EditToDo">
                    <span>Write a new Task</span>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            value={title}
                            onChange={changeTitle}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            value={description}
                            onChange={changeDesc}
                            as="textarea"
                        />
                    </InputGroup>
                    <Button variant="primary" onClick={newToDo}>Submit</Button>
                </div>
            </ListGroup.Item>
        </ListGroup>
    )
}
export default EditToDo
