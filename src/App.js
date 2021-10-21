//import styling
import "./App.css";
//import @material-ui components
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//import useState hook
import { useState } from "react";

//create ToDo function
function ToDo({ todo, index, completeToDo, removeToDo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon onClick={() => removeToDo(index)} />
        </IconButton>
        <Button
          color="success"
          onClick={() => completeToDo(index)}
          variant="contained"
        >
          Completed
        </Button>
      </div>
    </div>
  );
}

//create the todo form where a new item will be added and submitted by the user
function ToDoForm({ addToDo }) {
  const [value, setValue] = useState("");

  //create the event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //if the value inside the input field is empty return the following
    if (!value) return;
    //add the new value entered by user
    addToDo(value);
    //set the value back to empty
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        color="success"
        placeholder="Enter an item"
        type="text"
        value={value}
        className="input"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  //use the useState hook to manage the state of each todo item
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Finish new book",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Learn new recipe",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Understand React Hooks",
      isCompleted: false,
    },
  ]);

  //create add to do function
  //taking in the text as a pop inside this function bc that's what we want to access
  const addToDo = (text) => {
    //the spread operator (...) allows us to copy all or part of an existing array/object into another array/object
    /*so here we're creating a variable and within it, we're copying all the items set in the intial 'todo' state, 
    and adding the new text*/
    const newToDo = [...todos, { text }];
    //change the state to the array with the newly added text prop created by user
    setTodos(newToDo);
  };

  //create complete to do function
  const completeToDo = (index) => {
    const newToDos = [...todos];
    newToDos[index].isCompleted = true;
    setTodos(newToDos);
  };

  //create removetodo function and then pass it as a prop above
  const removeToDo = (index) => {
    //pulling out the existing array of todos using the spread operator again
    const newToDos = [...todos];
    newToDos.splice(index, 1);
    setTodos(newToDos);
  };

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <header className="App-header">
        <h1> To Do List </h1>
        <Box className="container">
          <Paper elevation={10}>
            <ToDoForm addToDo={addToDo} />
            {/* map through each item of the array and dynamically display it  */}
            {todos.map((todo, index) => (
              <ToDo
                className="todo-form"
                key={index}
                index={index}
                todo={todo}
                completeToDo={completeToDo}
                removeToDo={removeToDo}
              >
                {" "}
                {todo.text}{" "}
              </ToDo>
            ))}
          </Paper>
        </Box>
      </header>
    </div>
  );
}

export default App;
