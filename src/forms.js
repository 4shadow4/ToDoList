const projectForm = document.getElementById("projectForm");
const toDoForm = document.getElementById("toDoForm");
const editToDoForm = document.getElementById("editToDoForm");
const editProjectForm = document.getElementById("editProjectForm");
const overlay = document.querySelector(".overlay");

function showForm(form) {
  toDoForm.style.display = "none";
  projectForm.style.display = "none";
  editProjectForm.style.display = "none";
  editToDoForm.style.display = "none";
  form.style.display = "flex";
}
function hideOverlay() {
  toDoForm.reset();
  projectForm.reset();
  editProjectForm.reset();
  editToDoForm.reset();
  overlay.style.display = "none";
}
function showOverlay() {
  overlay.style.display = "flex";
}
overlay.addEventListener("click", (event) =>
  event.target === overlay ? hideOverlay() : null,
);

export { showForm, hideOverlay, showOverlay };
