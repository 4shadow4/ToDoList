import "./styles.css";
import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";
import { projects } from "./project";
import { toDos } from "./toDo";

const projectForm = document.getElementById("projectForm");
const toDoForm = document.getElementById("toDoForm");
const overlay = document.querySelector(".overlay");
const TableBody = document.querySelector(".tableBody");

function createDeleteButton() {
  const deleteButton = document.createElement("div");
  const deleteImage = document.createElement("img");
  const deleteGif = document.createElement("img");

  deleteImage.src = deleteImageSRC;
  deleteImage.classList.add("static-gif");
  deleteGif.src = deleteGifSRC;

  deleteButton.classList.add("deleteButton");
  deleteButton.appendChild(deleteImage);
  deleteButton.appendChild(deleteGif);

  return deleteButton;
}

function createEditButton() {
  const editButton = document.createElement("div");
  const editImage = document.createElement("img");

  editImage.src = editImageSRC;

  editButton.classList.add("editButton");
  editButton.appendChild(editImage);
}

function showForm(form) {
  toDoForm.style.display = "none";
  projectForm.style.display = "none";

  form.style.display = "flex";
}
function hideOverlay() {
  toDoForm.reset();
  projectForm.reset();
  overlay.style.display = "none";
}
function showOverlay() {
  overlay.style.display = "flex";
}
overlay.addEventListener("click", (event) =>
  event.target === overlay ? hideOverlay() : null,
);

function renderTable(filter = null) {
  toDoTable.innerHTML = `
        
      <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Deadline</th>
          <th>Prio</th>
          <th>Status</th>
      </tr>
      
    `;

  toDos.forEach((element, index) => {
    if (element.project === filter || filter === null) {
      const tableRow = document.createElement("tr");

      for (const key in element) {
        if (key === "status") {
          const checkboxCell = document.createElement("td");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = ellement[key];

          checkboxCell.appendChild(checkbox);
          tableRow.appendChild(checkboxCell);
        } else {
          const tableData = document.createElement("td");

          tableData.textContent = ellement[key];
          tableRow.appendChild(tableData);
        }
      }

      const deleteButton = createDeleteButton();
      const editButton = createEditButton();
      tableRow.addEventListener("mouseenter", () => {
        tableRow.append(deleteButton);
        tableRow.append(editButton);
      });
      tableRow.addEventListener("mouseleave", () => {
        tableRow.removeChild(deleteButton);
        tableRow.append(editButton);
      });

      deleteButton.addEventListener("click", () => {
        toDos.splice(index, 1);
        renderTable();
      });

      editButton.addEventListener("click", () => {
        showOverlay();
        showForm(toDoForm);

        element.editToDo();
        toDos.splice(index, 1);
      });

      toDoTable.appendChild(tableRow);
    }
  });
}

(() => {
  const prio = document.getElementById("prio");
  const prioOutput = document.getElementById("rangeValue");

  prio.addEventListener("input", () => {
    prioOutput.textContent = prio.value;
  });

  const seeAllToDos = document.getElementById("seeAllToDos");

  seeAllToDos.addEventListener("click", () => {
    renderTable();
  });
})();
export { hideOverlay, showOverlay, showForm, renderTable, renderProjects };
