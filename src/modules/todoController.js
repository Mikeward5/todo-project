import { Todo } from "./todo.js";

let todos = [];

export function addTodo(id, name, description, priority) {
  todos.push(new Todo(id, name, description, priority));
}

export function actionTodo(todoId) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.actioned = !todo.actioned;
  }
}

export function deleteTodo(todoId) {
  todos = todos.filter((item) => item.id !== todoId);
}

export function changeTodoName(todoId, newName) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.name = newName;
  }
}

export function changeTodoDescription(todoId, newDescription) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.description = newDescription;
  }
}

export function changeTodoPriority(todoId, newPriority) {
  let todo = todos.find((item) => item.id === todoId);
  if (todo) {
    todo.priority = newPriority;
  }
}

export function getTodos() {
  return todos;
}
