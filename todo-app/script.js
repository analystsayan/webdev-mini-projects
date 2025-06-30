document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const addBtn = document.getElementById("addBtn");

    // Load todos from local storage
    const loadTodos = () => {
        // Clear existing items in the DOM
        todoList.innerHTML = "";
        // Retrieve todos from localStorage
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            addTodoElement(todo.text, todo.checked);
        });
    };

    // Save todos to local storage
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll(".todo").forEach(todo => {
            const text = todo.querySelector(".todo-text").textContent;
            const checked = todo.querySelector("input[type='checkbox']").checked;
            todos.push({ text, checked });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // Add a new todo item to the DOM
    const addTodoElement = (text, checked = false) => {
        const todoId = `todo-${Date.now()}`;
        const todo = document.createElement("li");
        todo.classList.add("todo");

        todo.innerHTML = `
            <input type="checkbox" id="${todoId}" ${checked ? "checked" : ""}>
            <label class="custom-checkbox" for="${todoId}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="transparent" viewBox="0 -960 960 960" width="24px">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
            <label for="${todoId}" class="todo-text">${text}</label>
            <button class="del-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" fill="var(--secondary-color)" viewBox="0 -960 960 960" width="24px">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
        `;

        // Delete button functionality
        todo.querySelector(".del-btn").addEventListener("click", () => {
            todo.remove();
            saveTodos();
        });

        // Checkbox change handler
        todo.querySelector("input[type='checkbox']").addEventListener("change", saveTodos);

        todoList.appendChild(todo);
    };

    // Add new todo on form submission
    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodoElement(text);
            todoInput.value = "";
            saveTodos();
        }
    });

    // Load todos on page load
    loadTodos();
});
