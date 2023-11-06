import { Component } from 'react';
import './App.css';
import ToDo from './ToDoList/ToDo';
import Notes from './Notes/Note';

  //This is the method to set the context data.
class App extends Component {
render() {
    return (
      <Notes/>
    )
    /* return (
      <ToDo/>
    ); */
  }
}

export default App;
