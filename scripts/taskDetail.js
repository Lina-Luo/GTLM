document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const fields = ["task-name", "due-date", "status", "priority"];
  fields.forEach((field) => {
    const value = urlParams.get(field.replace("-", "_"));
    if (value) {
      document.getElementById(field).value = decodeURIComponent(
        value.replace(/\+/g, " ")
      );
    }
  });

  const assigneeValues = urlParams.get("assignee");
  if (assigneeValues) {
    const assigneeContainer = document.getElementById("assignee-container");
    assigneeContainer.innerHTML = "";
    const assignees = assigneeValues.split(",");
    assignees.forEach((assignee) => {
      const newAssignee = document.createElement("select");
      newAssignee.name = "assignee[]";
      newAssignee.innerHTML = `
      <option value="Tom">Tom</option>
      <option value="Alice">Alice</option>
      <option value="Sam">Sam</option>
  `;
      newAssignee.value = decodeURIComponent(assignee.replace(/\+/g, " "));
      assigneeContainer.appendChild(newAssignee);
    });
  }
});

function addAssignee() {
  const container = document.getElementById("assignee-container");

  const newAssignee = document.createElement("select");
  newAssignee.name = "assignee[]";
  newAssignee.innerHTML = `
      <option value="Tom">Tom</option>
      <option value="Alice">Alice</option>
      <option value="Sam">Sam</option>
  `;

  container.appendChild(newAssignee);
}
