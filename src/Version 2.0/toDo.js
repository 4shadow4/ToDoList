import { hideOverlay, showOverlay, showForm, renderTable } from "./main.js";
import { projects, initProjectList } from "./project.js";
import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";

const toDoForm = document.getElementById("toDoForm");
const addToDo = document.querySelector(".addToDo");
const toDoFormElement = document.getElementById("toDo");
const projectFormElement = document.getElementById("project");
const deadlineFormElement = document.getElementById("deadline");
const priorityFormElement = document.getElementById("prio");

let toDos = [];

class toDo {
  constructor(name, project, deadline, priority, status) {
    this.name = name;
    this.project = project;
    this.deadline = deadline;
    this.priority = priority;
    this.status = status;
    this.toDoID = crypto.randomUUID();
  }
  editToDo() {
    showOverlay();
    showForm(toDoForm);

    toDoFormElement.value = this.name;
    projectFormElement.value = this.project;
    initProjectList();
    deadlineFormElement.value = this.deadline;
    priorityFormElement.value = this.priority;
  }
}
function initToDoForm() {
  addToDo.addEventListener("click", () => {
    showOverlay();
    showForm(toDoForm);
    initProjectList();
  });
}
function addToDo(toDoData) {
  const newToDo = new toDo(
    toDoData.name,
    toDoData.project,
    toDoData.deadline,
    toDoData.prioraty,
    toDoData.status,
  );
  toDos.push(newToDo);
  renderTable();
}

toDoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(toDoForm);
  toDoForm.reset();
  const data = Object.fromEntries(formData.entries());
  hideOverlay();
  addToDo(data);
});

export { toDos };
