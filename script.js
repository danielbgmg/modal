// Seleção dos elementos

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');

let oldInputValue;
// Funções
const saveTodo = (text) => {
    const todoItem = document.createElement("li")
    todoItem.classList.add("todo-itens")

    const todoName = document.createElement("span")
    todoName.classList.add('todo-itemName')
    todoName.innerText = text
    todoItem.appendChild(todoName)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="ai-double-check"></i>'
    todoItem.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="ai-pencil"></i>'
    todoItem.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('delete-todo')
    deleteBtn.innerHTML = '<i class="ai-trash-can"></i>'
    todoItem.appendChild(deleteBtn)

    todoList.appendChild(todoItem)
    todoInput.value = ''
    todoInput.focus()
}

function toggleEdit() {
    editForm.classList.toggle('hide')
}

function updateTodo(text) {
    const todoTitle = document.querySelectorAll('.todo-itemName')

    todoTitle.forEach((todo) => {

        if(todo.innerText === oldInputValue){

            todo.innerText = text
        }
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue) {
        saveTodo(inputValue)

    }
    
})


document.addEventListener('click', (e) => {
    const targetEl = e.target
    //.closest vai pegar o elemento pai mais proximo
    const parentEl = targetEl.closest("li")
    let todoTitle

    if (parentEl && parentEl.querySelector)

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('delete-todo')) {
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')) {
        toggleEdit()
        todoTitle = parentEl.querySelector('.todo-itemName').innerText
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleEdit()
})