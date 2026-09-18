import {
  addTodo,
  actionTodo,
  deleteTodo,
  changeTodoName,
  changeTodoDescription,
  changeTodoPriority,
  getTodos,
} from "./todoController.js";
import {
  createNewProject,
  getProjects,
  pushTodoIntoProject,
  deleteProject,
  changeProjectName,
  changeProjectDescription,
} from "./projectController.js";

const body = document.querySelector("body");
const todos = document.querySelector("#todos");
//const projects = document.querySelector('#projects');
//const spare = document.querySelector('#spare')

function createNavElement() {
  const navigation = document.createElement("div");
  navigation.classList.add("navigation");
  body.insertBefore(navigation, todos);
  const items = ["Todo List", "Projects"];
  items.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    button.classList.add("nav-buttons");
    navigation.appendChild(button);
    button.addEventListener("click", handleNavClick);
  });
}

function handleNavClick(e) {
  const elementClicked = e.target.textContent;
  switch (elementClicked) {
    case "Todo List":
      renderTodoList();
      break;
    case "Projects":
      renderProjectList();
      break;
  }
}

function createProjectElement(project) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardHeader = document.createElement("cardHeader");
  cardHeader.classList.add("card-header");

  const name = document.createElement("h2");
  name.classList.add("project-name");
  name.textContent = project.name;
  name.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = project.name;
    name.replaceWith(input);
    input.focus();

    input.addEventListener("change", () => {
      changeProjectName(project.projectID, input.value);
      name.textContent = project.name;
      input.replaceWith(name);
    });
  });
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", () => {
    deleteProject(project.projectID);
    renderProjectList();
  });
  cardHeader.append(name, deleteButton);
  const cardDescription = document.createElement("p");
  cardDescription.classList.add("cardDescription");
  cardDescription.textContent = project.description;

  cardDescription.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = project.description;
    cardDescription.replaceWith(input);
    input.focus();

    input.addEventListener("change", () => {
      changeProjectDescription(project.projectID, input.value);
      cardDescription.textContent = project.description;
      input.replaceWith(cardDescription);
    });
  });
  card.append(cardHeader, cardDescription);

  return card;
}

function createTodoElement(todo) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardHeader = document.createElement("cardHeader");
  cardHeader.classList.add("card-header");

  const name = document.createElement("h2");
  name.classList.add("todo-name");
  name.textContent = todo.name;
  name.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = todo.name;
    name.replaceWith(input);
    input.focus();

    input.addEventListener("change", () => {
      changeTodoName(todo.id, input.value);
      name.textContent = todo.name;
      input.replaceWith(name);
    });
  });

  const checklist = document.createElement("input");
  checklist.type = "checkbox";
  checklist.checked = todo.actioned;
  checklist.addEventListener("change", () => {
    actionTodo(todo.id);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id);
    renderTodoList();
  });

  cardHeader.append(checklist, name, deleteButton);

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("cardDescription");
  cardDescription.textContent = todo.description;

  cardDescription.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = todo.description;
    cardDescription.replaceWith(input);
    input.focus();

    input.addEventListener("change", () => {
      changeTodoDescription(todo.id, input.value);
      cardDescription.textContent = todo.description;
      input.replaceWith(cardDescription);
    });
  });

  const cardFooter = document.createElement("footer");
  cardFooter.classList.add("cardFooter");

  const creationDate = document.createElement("span");
  creationDate.classList.add("creationDate");
  creationDate.textContent = todo.date;

  const priority = document.createElement("select");
  priority.classList.add("priority");
  const options = ["Low", "Medium", "High"];

  options.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option;
    priorityOption.textContent = option;

    if (todo.priority === option) {
      priorityOption.selected = true;
    }

    priority.appendChild(priorityOption);
  });

  priority.addEventListener("change", () => {
    changeTodoPriority(todo.id, priority.value);
  });

  cardFooter.append(creationDate, priority);

  card.append(cardHeader, cardDescription, cardFooter);

  return card;
}

function renderTodoList() {
  const todoList = getTodos();
  todos.replaceChildren();
  todoList.forEach((item) => {
    const todoElement = createTodoElement(item);
    todos.appendChild(todoElement);
  });
}

function renderProjectList() {
  const projectList = getProjects();
  todos.replaceChildren();
  projectList.forEach((item) => {
    const projectElement = createProjectElement(item);
    todos.appendChild(projectElement);
  });
}

export function initialise() {
  addTodo(1, "fish", "go fishing", "low");
  addTodo(2, "climb", "Go Climbing at Stanage", "High");
  addTodo(3, "Walk", "Go Climbing at Stanage", "High");
  actionTodo(1);
  changeTodoName(1, "fishing");
  changeTodoDescription(1, "New Description to be added here");
  changeTodoPriority(1, "High");
  console.log(getTodos());
  createNavElement();
  //renderTodoList();
  createNewProject(1, "fishing", "fishing project");
  createNewProject(2, "climbing", "go climbing at stanage");
  createNewProject(3, "walking", "go walking in the highlands");
}
