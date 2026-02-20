let todos = [];
let currentFilter = "all";

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value.trim() === '' || todoDate.value === '') {
        alert('Please enter a todo item and select a due date.');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: todoInput.value,
        date: todoDate.value,
        completed: false
    };

    todos.push(newTodo);

    todoInput.value = '';
    todoDate.value = '';

    displayTodos();
}

function displayTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (currentFilter === "active") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li class="text-gray-500">No todos available</li>`;
        return;
    }

    filteredTodos.forEach(todo => {
        todoList.innerHTML += `
        <li class="flex justify-between items-center border p-2 rounded mb-2">
            <div>
                <p class="${todo.completed ? 'line-through text-gray-400' : ''}">
                    ${todo.text}
                </p>
                <span class="text-sm text-gray-500">${todo.date}</span>
            </div>
            <div class="flex gap-2">
                <button onclick="toggleComplete(${todo.id})"
                    class="bg-green-500 text-white px-2 py-1 rounded">
                    ✓
                </button>
                <button onclick="deleteTodo(${todo.id})"
                    class="bg-red-500 text-white px-2 py-1 rounded">
                    ✕
                </button>
            </div>
        </li>`;
    });
}

function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    displayTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    displayTodos();
}

function deleteAllTodo() {
    todos = [];
    displayTodos();
}

function filterTodos(type) {
    currentFilter = type;
    displayTodos();
}