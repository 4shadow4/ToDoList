import {
  hideOverlay,
  showOverlay,
  showForm,
  renderTable,
  createDeleteButton,
} from "./main.js";
import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";

const projectForm = document.getElementById("projectForm");
const projectSelectToDoForm = document.getElementById("project");
const projectButton = document.getElementById("createProjectButton");
const projectContainer = document.getElementById("projects");
const projectNameProjectForm = document.getElementById("projectName");

let projects = [];

class project {
  constructor(name) {
    this.projectID = crypto.randomUUID();
    this.name = name;
  }
  editProject() {
    showOverlay();
    showForm(projectForm);
    projectNameProjectForm.value = this.name;

    this.deleteProject();
  }
  deleteProject() {
    projects.forEach((element, index) => {
      element.projectID === this.projectID ? projects.splice(index, 1) : null;
    });
    renderProjects();
  }
}

function showProjectForm() {
  showOverlay();
  showForm(projectForm);
}

function addProject(projectData) {
  const accessProject = document.createElement("button");
  accessProject.textContent = projectData.projectName;
  accessProject.classList.add("project");

  accessProject.addEventListener("click", () => {
    renderTable(accessProject.textContent);
  });

  projectContainer.appendChild(accessProject);
  const newProject = new project(projectData.projectName);
  projects.push(newProject);

  renderProjects();
}

function initProjectList() {
  projectSelectToDoForm.innerHTML = "";
  for (const project of projects) {
    const projectOption = document.createElement("option");
    projectOption.textContent = project.name;
    projectOption.value = project.name;

    projectSelectToDoForm.appendChild(projectOption);
  }
  if (projects.length === 0) {
    const filler = document.createElement("option");
    filler.value = "No Project";
    filler.textContent = "No Project Yet!";

    projectSelectToDoForm.appendChild(filler);
  }
}

function renderProjects() {
  projectContainer.innerHTML = `
    <h1>Projects</h1>
    <button id="createProjectButton">Create Project</button>
    <button id="seeAllToDos">See All</button>
  `;

  projects.forEach((element, index) => {
    const projectButton = document.createElement("button");
    projectButton.classList.add("project");
    projectButton.dataset.projectID = element.projectID;

    projectButton.addEventListener("click", () => {
      renderTable(element.name);
    });

    projectContainer.appendChild(projectButton);
  });
}

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(projectForm);
  projectForm.reset();
  const data = Object.fromEntries(formData.entries());
  hideOverlay();
  addProject(data);
});

projectButton.addEventListener("click", () => {
  showProjectForm();
});

export { projects, initProjectList };
