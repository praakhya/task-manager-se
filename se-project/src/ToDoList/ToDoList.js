import React, { Component } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';
import { toDoContext } from './toDoContext';
 
class ToDoList extends Component {
  static contextType = toDoContext;

    constructor(props) {
        super();
        this.placeholder=[
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Welcome to Zeme!",
            "description": "Browse through our various features",
            "done": false,
            "trashed":false
          },
          {
            "_id": "",
            "title": "This is a To Do Note",
            "description": "Write anything you wish to remember",
            "done": true,
            "trashed":false
          },
          {
            "_id": "",
            "title": "Enjoy the application!",
            "description": "",
            "done": true,
            "trashed":false
          }
        ]

//        const context = this.context;
        //It will get the data from context, and put it into the state.
  //      this.setState({ toDoData: context.toDoData });
    
    //    this.getToDo = this.getToDo.bind(this)
      //  this.initToDoData = this.initToDoData.bind(this)
        //this.setItemList = this.setItemList.bind(this)
    }  
    getToDo() {
        console.log("in get ToDo");
        var baseUrl = "/api";
        axios.get(baseUrl+'/load/todo')
        .then(response => {
          if (response.status != 200) {
            throw new Error(response.message);
          }
          return response.data})
        .then(data=>{
          console.log("data: ",data)
          this.setItemList(data) 
        })
        .catch((err) => {
          console.log("err /api",err);
          this.setItemList(this.placeholder)
        });
    }
    initToDoData(data){
      console.log("init data: ",data)
      const context = this.context;
      context.setToDoData(data)
      console.log("toDo state var: ",data, context)
    }
    setItemList(response) {
      var temp = []
      for (let todo of response) {
        temp.push({
          "title":todo.title,
          "description":todo.description,
          "done":todo.done,
          "_id":todo._id,
          "trashed":todo.trashed
        })
      }
      console.log("immediated response: ",response)
      this.initToDoData(temp)
      console.log("context var: ",this.context)
    }
    componentDidMount() {
      console.log("before getToDo")
      this.getToDo()
      console.log("ToDoList mounted")
    }
    render() {
          var itemList = []
          for (let todo of this.context.toDoData){
            console.log("TODOLIST: todo done: ",todo.done, "default done: ",this.props.defaultDone, "trashed: ",todo.trashed)
            if (todo.done==this.props.defaultDone && todo.trashed!=true)
              itemList.push(<ToDoItem todo={todo} disabled={this.props.disabled} defaultDone={this.props.defaultDone}/>)
          }
          console.log("itemList: ",this.props.defaultDone,itemList)
          return (
              <div className="todolist">
              {itemList}
              </div>
          );
        
    }
  }

ToDoList.contextType = toDoContext
export default ToDoList