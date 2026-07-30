import "./styles.css";

const form = document.querySelector('.toDoForm')
const overlay = document.querySelector('.overlay');
const project = document.getElementById('project');
let toDos = [];

const toDo = {
    startToDoForm(){
        const addToDo = document.querySelector('.addToDo');

        addToDo.addEventListener('click', () => {
            showOverlay()
            if(project.children.length === 0){
                const filler = document.createElement('option');
                filler.value = "No Project";
                filler.textContent = "No Project Yet!"

                project.appendChild(filler)
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

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const toDoData = Object.fromEntries(formData.entries());

    hideOverlay();
    project.innerHTML = '';
    toDos.push(toDoData);
    toDo.addToDo(toDoData);
    form.reset();
});


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

