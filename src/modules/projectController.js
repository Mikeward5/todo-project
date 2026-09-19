import { Project } from "./project.js";
import { getTodos, deleteTodo, joinArray } from "./todoController.js";

let projects = [];

export function createNewProject(name, description) {
  projects.push(new Project(name, description));
}

export function pushTodoIntoProject(id, projectID) {
  if (!id || !projectID) {
    throw new Error("Cannot find the corresponding ID");
  }
  let todos = getTodos();
  let foundTodo = todos.find((todo) => {
    return todo.id === id;
  });
  let foundProject = projects.find((project) => {
    return project.projectID === projectID;
  });
  if (foundTodo && foundProject) {
    foundProject.todoArray.push(foundTodo);
    deleteTodo(id);
  } else {
    console.log("Either todo Id or the Project Id does not exist");
  }
}

export function deleteProject(projectID) {
  let foundProject = projects.find(
    (project) => project.projectID === projectID,
  );

  if (foundProject) {
    joinArray(foundProject.todoArray);
  }

  projects = projects.filter((project) => project.projectID !== projectID);
}

export function changeProjectName(projectID, newName) {
  let project = projects.find((item) => item.projectID === projectID);
  if (project) {
    project.name = newName;
  }
}

export function changeProjectDescription(projectID, newDescription) {
  let project = projects.find((item) => item.projectID === projectID);
  if (project) {
    project.description = newDescription;
  }
}

export function getProjects() {
  return projects;
}
