//Get todos from localStorage

const getTodos = function() {
    const todoJSON = localStorage.getItem('todos')

    if(todoJSON !== null) {
        return JSON.parse(todoJSON)
    }  else {
        return []
    }   

}

//Set todos to localStorage
const setTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Remove todo
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//Toggle completed todo
const toggleTodo = function(id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })
    
    if(todo !== undefined) {
        todo.completed = !todo.completed
    }
}

//generate DOM for every element
const generateTodoDOM = function (todo) {
    const todoElement = document.createElement('div')
    const textElement = document.createElement('span')
    const buttonElement = document.createElement('button')
    const checkboxElement = document.createElement('input')

    checkboxElement.setAttribute('type', 'checkbox')
    checkboxElement.checked = todo.completed
    todoElement.appendChild(checkboxElement)
    checkboxElement.addEventListener('change', function(e) {
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
    buttonElement.addEventListener('click', function(e) {
        removeTodo(todo.id)
        setTodos(todos)
        renderTodos(todos, filters)
    })

    return todoElement
}

//generate summary DOM
const generateSummaryDOM = function(incompletedTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompletedTodos.length} left`
    return summary
}

//Render todo-app
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function(todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })


    const incompletedTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todo-list').innerHTML = ''

    document.querySelector('#todo-list').appendChild(generateSummaryDOM(incompletedTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todo-list').appendChild(generateTodoDOM(todo))
    })
}
