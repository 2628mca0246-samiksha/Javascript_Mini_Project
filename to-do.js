
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();

    // Do not add an empty task
    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a list item
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = taskName;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    // Mark task as completed
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounts();
    });

    // Delete individual task
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCounts();
    });

    // Add elements to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add task to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
    taskInput.focus();

    updateCounts();
}

// Update pending and completed counts
function updateCounts() {
    const tasks = taskList.querySelectorAll("li");

    let pending = 0;
    let completed = 0;

    tasks.forEach(function (task) {
        const checkbox = task.querySelector(
            'input[type="checkbox"]'
        );

        if (checkbox.checked) {
            completed++;
        } else {
            pending++;
        }
    });

    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

// Add task on button click
addBtn.addEventListener("click", addTask);

// Also add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
