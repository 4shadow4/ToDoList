import "./styles.css";

const form = document.querySelector('.form')
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

function toDo() {
    const addToDo = document.querySelector('.addToDo');
    const toDoTable = document.querySelector('.toDoTable');

    function createToDo(){
        overlay.style.display = "flex";
    }

    addToDo.addEventListener('click', createToDo);

}

toDo();
