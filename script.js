document.addEventListener("DOMContentLoaded", function() {
    const taskName = document.getElementById("taskName");   // Get task name input by ID
    const taskDescription = document.getElementById("taskDescription");  // Get task description input by ID
    const addTaskBtn = document.getElementById("addTaskBtn");   // Get add task button by ID
    const taskContainer = document.getElementById("taskContainer"); // Get task container by ID, will be used to add tasks dynamically

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];    // Retrieve tasks array from local storage, or create a new array if it doesn't exist
});