import { Component } from 'react';
import './App.css';
import ToDo from './ToDoList/ToDo';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'

  //This is the method to set the context data.
class App extends Component {
render() {
    return (
      <Login/>
    )
    /* return (
      <ToDo/>
    ); */
  }
}

export default App;
