/* Author @Kenneth Yiu */

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.classList.contains("task-column")) {
    var taskElement = document.getElementById(data);
    var newStatus = ev.target.getAttribute("data-status");
    taskElement.setAttribute("data-status", newStatus);
    ev.target.appendChild(taskElement);
  } else {
    console.log("Dropped on an invalid target");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSampleData();
});

function loadSampleData() {
  const sampleTaskData = [
    {
      task_name: "Complete Project Proposal",
      due_date: "2023-09-15",
      assignee: "Alice",
      status: "in-progress",
      priority: "Low",
    },
    {
      task_name: "Prepare Budget Report",
      due_date: "2023-09-18",
      assignee: "Tom",
      status: "pending",
      priority: "Medium",
    },
    {
      task_name: "Review Marketing Campaign",
      due_date: "2023-09-20",
      assignee: "Lucy",
      status: "pending",
      priority: "High",
    },
    {
      task_name: "Create Sales Presentation",
      due_date: "2023-09-22",
      assignee: "Alice",
      status: "completed",
      priority: "Medium",
    },
    {
      task_name: "Update Website Content",
      due_date: "2023-09-25",
      assignee: "Tom",
      status: "in-progress",
      priority: "High",
    },
  ];

  sampleTaskData.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.id = `task${index + 1}`;
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.setAttribute("data-due-date", task.due_date);
    taskElement.setAttribute("data-priority", task.priority);
    taskElement.setAttribute("data-status", task.status);
    taskElement.onclick = function () {
      const queryParams = new URLSearchParams(task).toString();
      window.location.href = `TaskDetail.html?${queryParams}`;
    };
    let prioritySign = "";

    if (task.priority === "High") {
      prioritySign = '<div id="hPriority">!!!</div>';
    } else if (task.priority === "Medium") {
      prioritySign = '<div id="mPriority">!!</div>';
    } else if (task.priority === "Low") {
      prioritySign = '<div id="lPriority">!</div>';
    }

    taskElement.innerHTML = `
      ${prioritySign}
      <strong>${task.task_name}</strong><br>
      Due Date: ${task.due_date}<br>
      Priority: ${task.priority}
    `;
    const columnId = getStatusColumnId(task.status);
    document.getElementById(columnId).appendChild(taskElement);
  });
}

function getStatusColumnId(status) {
  switch (status) {
    case "To Do":
      return "toDo";
    case "in-progress":
      return "doing";
    case "Completed":
      return "completed";
    default:
      return "toDo";
  }
}

function sortListByDate(columnId) {
  const column = document.getElementById(columnId);
  const tasks = Array.from(column.getElementsByClassName("task"));
  tasks.sort((a, b) => {
    const dateA = a.getAttribute("data-due-date");
    const dateB = b.getAttribute("data-due-date");
    return new Date(dateA) - new Date(dateB);
  });
  tasks.forEach((task) => column.appendChild(task));
}

function sortListByPriority(columnId) {
  const column = document.getElementById(columnId);
  const tasks = Array.from(column.getElementsByClassName("task"));
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  tasks.sort((a, b) => {
    const priorityA = a.getAttribute("data-priority");
    const priorityB = b.getAttribute("data-priority");
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });
  tasks.forEach((task) => column.appendChild(task));
}
