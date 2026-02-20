let todos = [];
let currentFilter = "all";

function addTodo() {
    const input = document.getElementById("todo-input");
    const date = document.getElementById("todo-date");

    if (input.value.trim() === "" || date.value === "") {
        alert("Please enter todo and date.");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: input.value,
        date: date.value,
        completed: false
    };

    todos.push(newTodo);

    input.value = "";
    date.value = "";

    displayTodos();
}

function displayTodos() {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {
        filtered = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        filtered = todos.filter(todo => todo.completed);
    }

    if (filtered.length === 0) {
        list.innerHTML = '<li class="empty">No todos available</li>';
        return;
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.innerHTML = `
            <strong class="${todo.completed ? 'completed' : ''}">
                ${todo.text}
            </strong>
            <br>
            <small>${todo.date}</small>
        `;

        const rightDiv = document.createElement("div");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.className = "primary";
        completeBtn.onclick = () => toggleComplete(todo.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.className = "danger";
        deleteBtn.onclick = () => deleteTodo(todo.id);

        rightDiv.appendChild(completeBtn);
        rightDiv.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        list.appendChild(li);
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
// //
function filterTodos(type) {
    currentFilter = type;
    displayTodos();
}