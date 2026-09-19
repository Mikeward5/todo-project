import { Todo } from "./todo.js";

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function addTodo(name, description, priority) {
  todos.push(new Todo(name, description, priority));
  saveTodos();
}

export function actionTodo(todoId) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.actioned = !todo.actioned;
    saveTodos();
  }
}

export function deleteTodo(todoId) {
  todos = todos.filter((item) => {
    return item.id !== todoId;
  });
  saveTodos();
}

export function changeTodoName(todoId, newName) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.name = newName;
    saveTodos();
  }
}

export function changeTodoDescription(todoId, newDescription) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.description = newDescription;
    saveTodos();
  }
}

export function changeTodoPriority(todoId, newPriority) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.priority = newPriority;
    saveTodos();
  }
}

export function getTodos() {
  return todos;
}

export function joinArray(array) {
  array.forEach((item) => {
    todos.push(item);
  });
  saveTodos();
}
