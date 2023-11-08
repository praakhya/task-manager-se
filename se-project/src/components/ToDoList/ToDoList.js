import React, { Component, useContext } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';
import { ToDoContext } from './toDoContext';
import AppContext from '../../contexts/AppContext';
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

  //        const context = this.context;
  //It will get the data from context, and put it into the state.
  //      this.setState({ toDoData: context.toDoData });

  //    this.getToDo = this.getToDo.bind(this)
  //  this.initToDoData = this.initToDoData.bind(this)
  //this.setItemList = this.setItemList.bind(this)

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
    var header = this.getHeader()
    axios.get(baseUrl + '/load/todo', { headers: header })
      .then(response => {
        if (response.status != 200) {
          throw new Error(response.message);
        }
        return response.data
      })
      .then(data => {
        console.log("data: ", data)
        this.setItemList(data)
      })
      .catch((err) => {
        console.log("err /api", err);
        this.setItemList(this.placeholder)
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
    for (let todo of response) {
      temp.push({
        "title": todo.title,
        "description": todo.description,
        "done": todo.done,
        "_id": todo._id,
        "trashed": todo.trashed
      })
    }
    console.log("immediated response: ", response)
    this.initToDoData(temp)
    console.log("context var: ", toDoContext)
  }
  const componentDidMount = () => {
    console.log("before getToDo")
    this.getToDo()
    console.log("ToDoList mounted")
  }
  var itemList = []
  for (let todo of toDoContext.toDoData) {
    console.log("TODOLIST: todo done: ", todo.done, "default done: ", props.defaultDone, "trashed: ", todo.trashed)
    if (todo.done == props.defaultDone && todo.trashed != true)
      itemList.push(<ToDoItem todo={todo} disabled={props.disabled} defaultDone={props.defaultDone} />)
  }
  console.log("itemList: ", props.defaultDone, itemList)
  return (
    <div className="todolist">
      {itemList}
    </div>
  );
}

export default ToDoList