document.addEventListener("DOMContentLoaded", function () {
  const taskName = document.getElementById("taskName");
  const taskDescription = document.getElementById("taskDesc");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskContainer = document.getElementById("taskContainer");

  const filterButtons = document.querySelectorAll(".filters button");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks(filter = "all") {
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {
      if (filter === "completed" && !task.completed) return;
      if (filter === "pending" && task.completed) return;

      const li = document.createElement("li");
      li.innerHTML = `
              <span class="${task.completed ? "completed" : ""}">
                  <strong>${task.name}</strong> : ${task.description}
              </span>
              <button class="complete">${
                task.completed ? "Undo" : "✅"
              }</button>
              <button class="edit">✏️</button>
              <button class="delete">❌</button>
          `;

      li.querySelector(".complete").addEventListener("click", function () {
        task.completed = !task.completed;
        saveAndRender();
      });

      li.querySelector(".edit").addEventListener("click", function () {
        taskName.value = task.name;
        taskDescription.value = task.description;
        tasks.splice(index, 1);
        saveAndRender();
      });

      li.querySelector(".delete").addEventListener("click", function () {
        tasks.splice(index, 1);
        saveAndRender();
      });

      taskContainer.appendChild(li);
    });

    // Highlight the active filter button
    filterButtons.forEach((button) => button.classList.remove("active"));
    document
      .getElementById(
        `filter${filter.charAt(0).toUpperCase() + filter.slice(1)}`
      )
      .classList.add("active");
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

  document
    .getElementById("filterAll")
    .addEventListener("click", () => renderTasks("all"));
  document
    .getElementById("filterPending")
    .addEventListener("click", () => renderTasks("pending"));
  document
    .getElementById("filterCompleted")
    .addEventListener("click", () => renderTasks("completed"));

  renderTasks();
});
