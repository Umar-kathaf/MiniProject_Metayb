import React, { useState } from "react";
import {
  TextField,
  Typography,
  List,
  ListItem,
  Container,
} from "@mui/material";
import TodoButtons from "../ReusableComp/TodoButtons";
import { createTodos, deleteTodos, getTodos, updateTodos } from "../../API/todoApi";
import { useEffect } from "react";

const To_Do_App = () => {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);

  useEffect(() => {
    fetchTodos()
  },[])
 

  const fetchTodos  = async () => {
    try {
      const res = await getTodos()
      console.log(res.data);
      
      setTodos(res.data)
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  

  const handleClick = async () => {
    try {
      if (!isEdited) {
        await createTodos({ description: inputVal})
      } else {
        
        await updateTodos(editedId, {description: inputVal})
      }
  
      fetchTodos()
      setInputVal("");
      setIsEdited(false);
      setEditedId(null);
    } catch (error) {
      console.error("error saving todo:",error);
       
    }
  }
  const onDelete = async (id) => {
    try {
      await deleteTodos(id)
      const refsData = await getTodos()
      setTodos(refsData.data)
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    
  };

  const handleEdit = (id,description) => {
    setEditedId(id);
    setInputVal(description);
    setIsEdited(true);
  };
  return (
    <Container component="main" sx={{ textAlign: "center", marginTop: 15 }}>
      <TextField
        variant="outlined"
        onChange={(e) => setInputVal(e.target.value)}
        label="Type your task"
        value={inputVal}
        sx={{ width: "50%" }}
      />
      <TodoButtons
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        sx={{
          height: 55,
          backgroundColor: "green",
          marginLeft: 2,
          color: "#fff",
        }}
        disabled={!inputVal}
      >
        {isEdited ? "Edit Task" : " Add Task"}
      </TodoButtons>
      <List>
        {todos.map((todo, index) => {
          return (
            <ListItem
              key={todo.id}
              divider="bool"
              sx={{
                width: "50%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid light-gray",
              }}
            >
              <Typography sx={{ width: "70%" }}>{todo.description}</Typography>
              <TodoButtons
                onClick={() => handleEdit(todo.id, todo.description)}
                variant="contained"
                sx={{ backgroundColor: "black" }}
              >
                Edit
              </TodoButtons>
              <TodoButtons
                onClick={() => onDelete(todo.id)}
                variant="contained"
                sx={{ marginLeft: 3, backgroundColor: "red" }}
              >
                Delete
              </TodoButtons>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default To_Do_App;
