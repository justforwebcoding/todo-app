//Get todos from localStorage

const getTodos = () => {
    const todoJSON = localStorage.getItem('todos')

    return todoJSON ? JSON.parse(todoJSON) : []

}

//Set todos to localStorage
const setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//Toggle completed todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    
    if (todo) {
        todo.completed = !todo.completed
    }
}

//generate DOM for every element
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('div')
    const textElement = document.createElement('span')
    const buttonElement = document.createElement('button')
    const checkboxElement = document.createElement('input')

    checkboxElement.setAttribute('type', 'checkbox')
    checkboxElement.checked = todo.completed
    todoElement.appendChild(checkboxElement)
    checkboxElement.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        setTodos(todos)
        renderTodos(todos, filters)
    })

    if(todo.text.length > 0) {
        textElement.textContent = todo.text
    } else {
        textElement.textContent = 'Wtf dude'
    }
    
    todoElement.appendChild(textElement)

    buttonElement.textContent = 'x'
    todoElement.appendChild(buttonElement)
    buttonElement.addEventListener('click', (e) => {
        removeTodo(todo.id)
        setTodos(todos)
        renderTodos(todos, filters)
    })

    return todoElement
}

//generate summary DOM
const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompletedTodos.length} left`
    return summary
}

//Render todo-app
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })


    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todo-list').innerHTML = ''

    document.querySelector('#todo-list').appendChild(generateSummaryDOM(incompletedTodos))

    filteredTodos.forEach((todo) => {
        document.querySelector('#todo-list').appendChild(generateTodoDOM(todo))
    })
}
