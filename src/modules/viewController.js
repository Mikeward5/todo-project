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
  const form = document.createElement("form");
  const head = document.createElement("h2");
  head.textContent = "Add New Todo";
  const nameLabel = document.createElement("label");
  nameLabel.textContent = " Name";
  const nameField = document.createElement("input");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  const descriptionField = document.createElement("input");
  nameField.id = "name-field";
  descriptionField.id = "description-field";
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  const priority = document.createElement("select");
  priority.classList.add("priority");
  const options = ["Low", "Medium", "High"];

  options.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option;
    priorityOption.textContent = option;

    priority.appendChild(priorityOption);
  });
  const submit = document.createElement("input");
  submit.textContent = "Submit";
  submit.type = "submit";
  submit.value = "submit";

  form.append(
    head,
    nameLabel,
    nameField,
    descriptionLabel,
    descriptionField,
    priorityLabel,
    priority,
    submit,
  );

  const projectform = document.createElement("form");
  projectform.classList.add("projectForm");
  const projecthead = document.createElement("h2");
  projecthead.textContent = "Add New Project";
  const projectnameLabel = document.createElement("label");
  projectnameLabel.textContent = " Name";
  const projectnameField = document.createElement("input");
  const projectdescriptionLabel = document.createElement("label");
  projectdescriptionLabel.textContent = "Description";
  const projectdescriptionField = document.createElement("input");
  projectnameField.id = "projectname-field";
  projectdescriptionField.id = "projectdescription-field";

  const projectsubmit = document.createElement("input");
  projectsubmit.textContent = "Submit";
  projectsubmit.type = "submit";
  projectsubmit.value = "submit";

  projectform.append(
    projecthead,
    projectnameLabel,
    projectnameField,
    projectdescriptionLabel,
    projectdescriptionField,
    projectsubmit,
  );

  projectform.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewProject(projectnameField.value, projectdescriptionField.value);
    renderProjectList();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(nameField.value, descriptionField.value, priority.value);
    renderTodoList();
  });

  navigation.append(form, projectform);
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

  const list = document.createElement("ul");
  list.classList.add("todoList");
  const getProjectTodos = project.todoArray;
  getProjectTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo.name;
    list.appendChild(listItem);
  });
  card.append(cardHeader, list);

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

  const transfer = document.createElement("select");
  const projectNames = getProjects();
  const projectoptions = projectNames.map((item) => {
    return {
      name: item.name,
      projectID: item.projectID,
    };
  });
  projectoptions.forEach((option) => {
    const priorityOption = document.createElement("option");
    priorityOption.value = option.projectID;
    priorityOption.textContent = option.name;
    transfer.appendChild(priorityOption);
  });

  transfer.addEventListener("change", () => {
    pushTodoIntoProject(todo.id, transfer.value);
    renderTodoList();
  });

  cardFooter.append(creationDate, priority, transfer);

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
  console.log(getTodos());
  createNavElement();

  console.log(getProjects());
  renderProjectList();
}
