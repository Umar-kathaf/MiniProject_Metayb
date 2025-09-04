import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4500/api",
});

//CRUD API calls
export const getTodos = () => API.get("/todos");
export const createTodos = (data) => API.post("/todos", data);
export const updateTodos = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodos = (id) => API.delete(`/todos/${id}`);
