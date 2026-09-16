import {
    addTodo,
    actionTodo,
    deleteTodo,
    changeTodoName,
    changeTodoDescription,
    changeTodoPriority,
    getTodos
} from './todoController.js';

//const body = document.querySelector('body');
const todos = document.querySelector('#todos');
//const projects = document.querySelector('#projects');
//const spare = document.querySelector('#spare')

function createTodoElement(todo) {
    const card = document.createElement('div')
    card.classList.add('card')

    const cardHeader = document.createElement('cardHeader')
    cardHeader.classList.add('card-header')

    const name = document.createElement('h2')
    name.classList.add('todo-name')
    name.textContent = todo.name
    name.addEventListener('click', () => {
        const input = document.createElement('input')
        input.value = todo.name
        name.replaceWith(input);
        input.focus()

        input.addEventListener('change', () => {
            changeTodoName(todo.id, input.value)
            name.textContent = todo.name
            input.replaceWith(name)
        })
    })

    const checklist = document.createElement('input')
    checklist.type = 'checkbox'
    checklist.checked = todo.actioned
    checklist.addEventListener('change', () => {
        actionTodo(todo.id)
    })

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => { 
        deleteTodo(todo.id)
        renderTodoList()
    })

    cardHeader.append(checklist, name, deleteButton)

    const cardDescription = document.createElement('p')
    cardDescription.classList.add('cardDescription')
    cardDescription.textContent = todo.description

    cardDescription.addEventListener('click', () => {
        const input = document.createElement('input')
        input.value = todo.description
        cardDescription.replaceWith(input)
        input.focus()


        input.addEventListener('change', () => {
            changeTodoDescription(todo.id, input.value)
            cardDescription.textContent = todo.description
            input.replaceWith(cardDescription)
        })
    })

    const cardFooter = document.createElement('footer')
    cardFooter.classList.add('cardFooter')
    
    const creationDate = document.createElement('span')
    creationDate.classList.add('creationDate')
    creationDate.textContent = todo.date

    const priority = document.createElement('select')
    priority.classList.add('priority')
    const options = ['Low', 'Medium', 'High']

    options.forEach((option) => {
        const priorityOption = document.createElement('option')
        priorityOption.value = option;
        priorityOption.textContent = option

        if(todo.priority === option) {
            priorityOption.selected = true;
        }

        priority.appendChild(priorityOption)
    })

    priority.addEventListener('change', () => {
        changeTodoPriority(todo.id, priority.value)
    })

    cardFooter.append(creationDate, priority)

    card.append(cardHeader, cardDescription, cardFooter)

    return card
}

function renderTodoList() {
    const todoList = getTodos()
        todos.replaceChildren()
        todoList.forEach((item) => {
        const todoElement = createTodoElement(item)
        todos.appendChild(todoElement)})
    }

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