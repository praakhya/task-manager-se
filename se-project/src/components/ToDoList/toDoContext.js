import React, { Children } from "react";
import { useEffect, useState, useContext, createContext } from "react";

const toDoContext = React.createContext();
function ToDoProvider({ children }) {
    // The useState() hook defines a state variable.
    const [toDoData, setToDoData] = useState([]);
    const [showEdit, toggleEdit] = useState(false);
    
    // The useEffect() hook registers a function to run after render.
    useEffect(() => {
        console.log("context change: ",toDoData)
    }, [toDoContext,toDoData, showEdit]);  // This empty array means the effect will only run once.
    // On the first render userData will have the default value null.
    // But after that render, the effect function will run and will
    // start a fetch of the real user data. When the data arrives, it
    // will be passed to setUserData(), which changes state and
    // triggers a new render. On this second render, we'll have real
    // user data to provide to any consumers. (And the effect will not
    // run again.)
    return (
        <toDoContext.Provider value={{ toDoData, setToDoData, showEdit, toggleEdit}}>
            {children}
        </toDoContext.Provider>
    );
}

const ToDoConsumer = toDoContext.Consumer;
ToDoProvider.context = toDoContext;

export { toDoContext, ToDoProvider, ToDoConsumer };