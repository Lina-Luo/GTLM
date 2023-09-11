/* Author @Kenneth Yiu */

function init() {
  document.addEventListener("DOMContentLoaded", function () {
    // Function to load a component into a div
    function loadComponent(componentId, componentPath) {
      const component = document.getElementById(componentId);
      fetch(componentPath)
        .then((response) => response.text())
        .then((html) => (component.innerHTML = html))
        .catch((error) =>
          console.warn(`Error loading ${componentPath}: ${error}`)
        );
    }

    // Load navbar and footer
    loadComponent("sidebar", "Sidebar.html");
  });
}

init();
