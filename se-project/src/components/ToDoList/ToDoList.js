import React, { Component, useContext, useEffect } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';
import { ToDoContext } from './toDoContext';
import AppContext from '../../contexts/AppContext';
import { ListGroup, Badge } from 'react-bootstrap';
import { ListItem } from '@mui/material';
function ToDoList(props) {
  const toDoContext = useContext(ToDoContext)
  const appContext = useContext(AppContext)
  const placeholder = [
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Welcome to Zeme!",
      "description": "Browse through our various features",
      "done": false,
      "trashed": false
    },
    {
      "_id": "",
      "title": "This is a To Do Note",
      "description": "Write anything you wish to remember",
      "done": true,
      "trashed": false
    },
    {
      "_id": "",
      "title": "Enjoy the application!",
      "description": "",
      "done": true,
      "trashed": false
    }
  ]

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
  const getToDo = () => {
    console.log("in get ToDo");
    var baseUrl = "/api";
    var header = getHeader()
    axios.get(baseUrl + '/load/todo', { headers: header })
      .then(response => {
        if (response.status != 200) {
          throw new Error(response.message);
        }
        return response.data
      })
      .then(data => {
        console.log("data: ", data)
        setItemList(data)
      })
      .catch((err) => {
        console.log("err /api", err);
        setItemList(placeholder)
      });
  }
  const initToDoData = (data) => {
    console.log("init data: ", data)
    const context = toDoContext;
    context.setToDoData(data)
    console.log("toDo state var: ", data)
  }
  const setItemList = (response) => {
    var temp = []
    console.log("response:",response)
    for (let todo of response) {
      temp.push({
        "title": todo.title,
        "description": todo.description,
        "done": todo.done,
        "_id": todo._id,
        "trashed": todo.trashed,
        "username": todo.username
      })
    }
    console.log("immediated response: ", response)
    initToDoData(temp)
    console.log("context var: ", toDoContext)
  }
  useEffect(()=>{
    if (toDoContext.toDoData.length==0) {
      getToDo()
    }
  },[toDoContext.toDoData,appContext,itemList])
  console.log("TODODATA:",toDoContext.toDoData)
  console.log("TODO was EMPTY:",toDoContext.toDoData.length == 0)
  console.log("TODODATA:",toDoContext.toDoData)
  var itemList = []
  for (let todo of toDoContext.toDoData) {
    console.log("TODOLIST: todo done: ", todo.done, "default done: ", props.defaultDone, "trashed: ", todo.trashed)
    if (todo.done == props.defaultDone && todo.trashed != true)
      itemList.push(<ToDoItem todo={todo} disabled={props.disabled} defaultDone={props.defaultDone} />)
  }
  console.log("itemList: ", props.defaultDone, itemList)
  return (
    
    <ListGroup className="todolist" style={{width:"100%"}}>
      {itemList}
    </ListGroup>
  );
}

export default ToDoList