let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value.trim(), completed: false });
  input.value = "";
  saveAndRender();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function setFilter(filter, btn) {
  currentFilter = filter;

  // Update active button styling
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");

  render();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (t) { return !t.completed; });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (t) { return t.completed; });
  }
  return tasks;
}

function render() {
  const list = document.getElementById("taskList");
  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    list.innerHTML = `<li style="justify-content:center; color:#aaa;">No tasks to show</li>`;
  } else {
    list.innerHTML = filtered.map(function (t) {
      // Find the real index in the full tasks array (needed for delete/toggle)
      const realIndex = tasks.indexOf(t);
      return `
        <li class="${t.completed ? 'done' : ''}">
          <div class="task-left">
            <input type="checkbox" ${t.completed ? "checked" : ""} onchange="toggleComplete(${realIndex})">
            <span onclick="toggleComplete(${realIndex})">${t.text}</span>
          </div>
          <button onclick="deleteTask(${realIndex})">Delete</button>
        </li>`;
    }).join("");
  }

  const activeCount = tasks.filter(function (t) { return !t.completed; }).length;
  document.getElementById("taskCount").innerText =
    tasks.length === 0 ? "" : `${activeCount} task(s) remaining`;
}

// Allow pressing Enter to add a task
document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

// Initial render on page load
render();
