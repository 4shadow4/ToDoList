import "./styles.css";
import deleteImageSRC from "../Images/icons8-löschen-50.png";
import deleteGifSRC from "../Images/icons8-löschen.gif";
import editImageSRC from "../Images/icons8-neu-erstellen-64.png";


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
            for(const project of projects){
                const projectOption = document.createElement('option');
                projectOption.textContent = project;
                projectOption.value = project;

                projectToDo.appendChild(projectOption);
            }
            if(projects.length === 0){
                const filler = document.createElement('option');
                filler.value = "No Project";
                filler.textContent = "No Project Yet!"

                projectToDo.appendChild(filler)
            }
        });
    },
    addToDo(){
        renderTable();
    },
}
toDo.startToDoForm();

const projectObject = {
    startProjectForm(){
        const addProject = document.getElementById('createProjectButton');

        addProject.addEventListener('click', () => {
            showOverlay()
            showForm(projectForm);
        });
    },
    addProject(projectData){
        const projectContainer = document.getElementById('projects');
        const accessProject = document.createElement('button');

        accessProject.textContent = projectData["projectName"];
        accessProject.classList.add("project");

        accessProject.addEventListener('click', () => {
            renderTable(accessProject.textContent);
        });

        projectContainer.appendChild(accessProject);

    },
}
projectObject.startProjectForm();

toDoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(toDoForm);
        toDoForm.reset();
        const data = Object.fromEntries(formData.entries());
        hideOverlay();
        projectToDo.innerHTML = '';
        
        toDos.push(data);
        toDos[toDos.length - 1].status = 0;

        toDo.addToDo();

});

projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(projectForm);
        projectForm.reset();
        const data = Object.fromEntries(formData.entries());
        hideOverlay();
        projects.push(data["projectName"]);
        projectObject.addProject(data);
        

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
    toDoForm.reset();
    projectForm.reset();
    overlay.style.display = "none";
};
function showOverlay(){
    overlay.style.display = "flex";
}
overlay.addEventListener('click', (event) => (event.target === overlay)? hideOverlay():null );

function renderTable(filter = null){

    const toDoTable = document.querySelector('.tableBody');
    toDoTable.innerHTML = `
        <colgroup>
            <col class="nameT">
            <col class="projectT">
            <col class="deadlineT">
            <col class="prioT">
            <col class="StatusT">
        </colgroup>
        <tbody class="tableBody">
            <tr>
                <th>Name</th>
                <th>Project</th>
                <th>Deadline</th>
                <th>Prio</th>
                <th>Status</th>
            </tr>
        </tbody>
    `;

    toDos.forEach((ellement, index) => {
        
        if(ellement.project === filter || filter === null){ 
            const tableRow = document.createElement('tr');

            for(const key in ellement){
            
                if(key === "status"){
                    const checkboxCell = document.createElement('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.checked = ellement[key]

                    checkboxCell.appendChild(checkbox)
                    tableRow.appendChild(checkboxCell)
                } else {
                    const tableData = document.createElement('td');

                    tableData.textContent = ellement[key];
                    tableRow.appendChild(tableData);
                }
            
                
            }

            const deleteButton = document.createElement('div');
            const deleteImage = document.createElement('img');
            const deleteGif = document.createElement('img');

            deleteImage.src = deleteImageSRC;
            deleteImage.classList.add('static-gif');
            deleteGif.src = deleteGifSRC;

            deleteButton.classList.add('deleteButton');
            deleteButton.appendChild(deleteImage);
            deleteButton.appendChild(deleteGif);
            
            tableRow.addEventListener('mouseenter', () => {
                
                tableRow.append(deleteButton);
            });
            tableRow.addEventListener('mouseleave', () => {

                tableRow.removeChild(deleteButton);
            });

            deleteButton.addEventListener('click', () => {
                toDos.splice(index, 1);
                renderTable();
            });
            const editButton = document.createElement('div');
            const editImage = document.createElement('img');

            editImage.src = editImageSRC;

            editButton.classList.add('editButton');
            editButton.appendChild(editImage);
            
            tableRow.addEventListener('mouseenter', () => {
                
                tableRow.append(editButton);
            });
            tableRow.addEventListener('mouseleave', () => {

                tableRow.removeChild(editButton);
            });

            editButton.addEventListener('click', () => {
                showOverlay();
                showForm(toDoForm);

                const toDoEllement = document.getElementById('toDo');
                const projectEllement = document.getElementById('project');
                const deadlineEllement = document.getElementById('deadline');
                const prioEllement = document.getElementById('prio');

                toDoEllement.value = ellement.toDo;

                const optionEllement = document.createElement('option');
                optionEllement.value = ellement.project;
                optionEllement.textContent = ellement.project;
                projectEllement.appendChild(optionEllement); 

                deadlineEllement.value = ellement.deadline;
                prioEllement.value = ellement.prio;

                toDos.splice(index, 1);
                
                for(const project of projects){
                    const projectOption = document.createElement('option');
                    projectOption.textContent = project;
                    projectOption.value = project;

                    projectToDo.appendChild(projectOption);
                }
                if(projects.length === 0){
                    const filler = document.createElement('option');
                    filler.value = "No Project";
                    filler.textContent = "No Project Yet!"

                    projectToDo.appendChild(filler)
                }
            });


            toDoTable.appendChild(tableRow);
        }
        
    })

    
}



( () => {
    const prio = document.getElementById('prio');
    const prioOutput = document.getElementById('rangeValue');

    prio.addEventListener('input', () => {
        prioOutput.textContent = prio.value;
    }); 

    const seeAllToDos = document.getElementById('seeAllToDos');

    seeAllToDos.addEventListener('click', () => {
        renderTable();
    });

})();


