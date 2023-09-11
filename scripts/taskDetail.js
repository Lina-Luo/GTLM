document.addEventListener("DOMContentLoaded", function () {
  // Get query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);

  // Fields to populate if query parameters exist
  const fields = ["task-name", "due-date", "assignee", "status", "priority"];

  // Populate form fields
  fields.forEach((field) => {
    const value = urlParams.get(field.replace("-", "_"));
    if (value) {
      document.getElementById(field).value = decodeURIComponent(
        value.replace(/\+/g, " ")
      );
    }
  });
});
