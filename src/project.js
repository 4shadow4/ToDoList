import { showForm, hideOverlay, showOverlay } from "./forms.js";
import { createDeleteButton, createEditButton } from "./buttons.js";
import { renderToDo } from "./toDo.js";
import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";

const projectForm = document.getElementById("projectForm");
const editProjectForm = document.getElementById("editProjectForm");
const projectSelectToDoForm = document.querySelectorAll(".projectName");
const projectButton = document.getElementById("createProjectButton");
const projectContainer = document.getElementById("projectContainer");
const projectNameProjectForm = document.getElementById("editProjectName");
const projectIDFormE = document.getElementById("projectID");
let projects = [];
let renderToDoBOOL = false;

class project {
  constructor(name) {
    this.projectID = crypto.randomUUID();
    this.name = name;
  }
  editProject() {
    showOverlay();
    showForm(editProjectForm);
    projectNameProjectForm.value = this.name;
    projectIDFormE.value = this.projectID;
  }
  deleteProject() {
    projects.forEach((element, index) => {
      element.projectID === this.projectID ? projects.splice(index, 1) : null;
    });
    renderProjects();
  }
}

function addProject(projectData) {
  const newProject = new project(projectData.projectName);
  projects.push(newProject);
  initProjectList();
  renderProjects();
}

function initProjectList() {
  projectSelectToDoForm.innerHTML = "";
  if (projects.length === 0) {
    projectSelectToDoForm.forEach((element) => {
      const filler = document.createElement("option");
      filler.value = "No Project";
      filler.textContent = "No Project Yet!";

      element.appendChild(filler);
    });
  } else {
    for (const project of projects) {
      projectSelectToDoForm.forEach((element) => {
        const projectOption = document.createElement("option");
        projectOption.textContent = project.name;
        projectOption.value = project.name;

        element.appendChild(projectOption);
      });
    }
  }
}

function renderProjects() {
  projects.forEach((element, index) => {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project");
    projectButton.dataset.projectID = element.projectID;
    projectButton.textContent = element.name;

    projectButton.addEventListener("click", () => {
      renderToDo(element.name);
    });

    projectContainer.appendChild(projectButton);
  });
}

function initProjectForms() {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);
    projectForm.reset();
    const data = Object.fromEntries(formData.entries());
    hideOverlay();
    addProject(data);
  });

  editProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(projectForm);
    projectForm.reset();
    const Data = Object.fromEntries(formData.entries());
    hideOverlay();

    projects.find((project) => project.projectID === Data.projectID).name =
      Data.editProjectName;
    renderProjects();
    initProjectList();
  });

  projectButton.addEventListener("click", () => {
    showForm(projectForm);
    showOverlay();
  });
}

export { projects, initProjectList, initProjectForms };
