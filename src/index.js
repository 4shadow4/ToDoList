import "./styles.css";

const toDoForm = document.getElementById('toDoForm')
const projectForm = document.getElementById('projectForm')
const overlay = document.querySelector('.overlay');
const projectToDo = document.getElementById('project');
let toDos = [];
let projects = [];


const toDo = {
    startToDoForm(){
        const addToDo = document.querySelector('.addToDo');

        addToDo.addEventListener('click', () => {
            showOverlay()
            showForm(toDoForm);
            if(projectToDo.children.length === 0){
                const filler = document.createElement('option');
                filler.value = "No Project";
                filler.textContent = "No Project Yet!"

                projectToDo.appendChild(filler)
            }
        });
    },
    addToDo(toDoData){
        const toDoTable = document.querySelector('.tableBody');
        const tableRow = document.createElement('tr');

        for(const data in toDoData){
            const tableData = document.createElement('td');

            tableData.textContent = toDoData[data];
            tableRow.appendChild(tableData);
        }

        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox)
        tableRow.appendChild(checkboxCell)

        toDos[toDos.length - 1].status = 0;


        toDoTable.appendChild(tableRow);
    },
}
toDo.startToDoForm();

const project = {
    startProjectForm(){
        const addProject = document.getElementById('createProjectButton');

        addProject.addEventListener('click', () => {
            showOverlay()
            showForm(projectForm);
        });
    },
    addProject(projectData){
        const projectContainer = document.querySelector('#projects');
        const accessProject = document.createElement('div');

        accessProject.textContent = projectData.name;
        accessProject.classList.add("project");

        projectContainer.appendChild(accessProject);

    },
}
project.startProjectForm();

toDoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(toDoForm);
        toDoForm.reset();
        const data = Object.fromEntries(formData.entries());
        hideOverlay();
        projectToDo.innerHTML = '';
        toDos.push(data);
        toDo.addToDo(data);

});

projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(projectForm);
        projectForm.reset();
        const data = Object.fromEntries(formData.entries());
        hideOverlay();
        projects.push(data);
        project.addProject(data);
        

});


function showForm(form){
    if(form === toDoForm){
        toDoForm.style.display = "flex";
        projectForm.style.display = "none";
    } else {
        projectForm.style.display = "flex";
        toDoForm.style.display = "none";
    }

}


function hideOverlay(){
        overlay.style.display = "none";
};
function showOverlay(){
    overlay.style.display = "flex";
}
overlay.addEventListener('click', (event) => (event.target === overlay)? hideOverlay():null );


( () => {
    const prio = document.getElementById('prio');
    const prioOutput = document.getElementById('rangeValue');

    prio.addEventListener('input', () => {
        prioOutput.textContent = prio.value;
    }); 

})();

console.log(toDos);

