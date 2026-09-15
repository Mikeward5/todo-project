import {
    addTodo,
    actionTodo,
    deleteTodo,
    changeTodoName,
    changeTodoDescription,
    changeTodoPriority,
    getTodos
} from './todoController.js';

const body = document.querySelector('body');
const todos = document.querySelector('#todos');
const projects = document.querySelector('#projects');
const spare = document.querySelector('#spare')

function renderTodoList() {
    const todoList = getTodos()
        todoList.forEach((item, i) => {
        const div = document.createElement('div');
        div.textContent = item.name
        div.classList.add(`item-${i}`)
        todos.appendChild(div)})
    }

projects.textContent = 'Projects';
spare.textContent = 'Spare';


export function initialise() {
addTodo(1, 'fish', 'go fishing', 'low')
addTodo(2, 'climb', 'Go Climbing at Stanage', 'High');
addTodo(3, 'Walk', 'Go Climbing at Stanage', 'High');
actionTodo(1);
changeTodoName(1, 'fishing');
changeTodoDescription(1, 'New Description to be added here');
changeTodoPriority(1, 'High');
    console.log(getTodos())
    renderTodoList()
}