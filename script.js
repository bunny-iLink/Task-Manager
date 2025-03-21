document.addEventListener("DOMContentLoaded", function () {
  const taskName = document.getElementById("taskName"); // Get task name input by ID
  const taskDescription = document.getElementById("taskDesc"); // Get task description input by ID
  const addTaskBtn = document.getElementById("addTaskBtn"); // Get add task button by ID
  const taskContainer = document.getElementById("taskContainer"); // Get task container by ID, will be used to add tasks dynamically

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks array from local storage, or create a new array if it doesn't exist

  function renderTasks(filter = "all") {
    taskContainer.innerHTML = ""; // Clear task container

    tasks.forEach((task, index) => {
      if (filter == "completed" && !task.completed) return; // If filter is "completed", only show completed tasks
      if (filter == "pending" && task.completed) return; // If filter is "pending", only show pending tasks

      const li = document.createElement("li");
      li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">
                    ${task.name} : ${task.description}
                </span>
                <button class="complete">${
                  task.completed ? "Undo" : "✔"
                }</button>
                <button class="edit">✏️</button>
                <button class="delete">❌</button>
            `;

        li.querySelector(".complete").addEventListener("click", function() {
            task.completed = !task.completed;
            saveAndRender();
        });

        li.querySelector(".edit").addEventListener("click", function() {
            taskName.value = task.name;
            taskDescription.value = task.description;
            tasks.splice(index, 1);
            saveAndRender();
        });

        li.querySelector(".delete").addEventListener("click", function() {
            tasks.splice(index, 1);
            saveAndRender();
        });

        taskContainer.appendChild(li);
    });
  }

  function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  addTaskBtn.addEventListener("click", function () {
    if (taskName.value.trim() === "") {
        alert("Task name is required");
        return;
    }

    tasks.push({
        name: taskName.value,
        description: taskDescription.value,
        completed: false,
    });

    taskName.value = "";
    taskDescription.value = "";

    saveAndRender();
  });

  document.getElementById("filterAll").addEventListener("click", () => renderTasks("all"));
  document.getElementById("filterPending").addEventListener("click", () => renderTasks("pending"));
  document.getElementById("filterCompleted").addEventListener("click", () => renderTasks("completed"));

  renderTasks();
});
