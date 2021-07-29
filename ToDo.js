const inputBox = document.getElementById("myInput");
const deleteAllBtn = document.querySelector(".footer");
const list = document.querySelector('ul');
// const completed = document.getElementById('completed');
// const elem = document.querySelector(".todoList");
const elements = document.getElementsByClassName('checked');
const progress = document.getElementsByClassName('inProgress');
const li = document.getElementsByTagName('LI')

list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    } else if (ev.target.tagName === 'SPAN') {
        const div = ev.target.parentNode;
        div.remove();
        // showTasks();
    }
    // showTasks();
}, false);


// function inProgress() {
//     for (let i = 0; i < elements.length; i++) {
//         elements[i].hidden = true;
//     }

// }

// function completed() {

//     for (let i = 0; i < li.length; i++) {
//         console.log(`completed`, li[i])
//         li[i].hidden = false;
//     }

// }

function showTasks() {
    const getLocalStorageData = localStorage.getItem("todo");
    if (getLocalStorageData == null) {
        arrayTodo = [];
    } else {
        arrayTodo = JSON.parse(getLocalStorageData);
    }
    let newLiTag = "";
    arrayTodo.forEach(element => {
        newLiTag += `<li>${element}</li>`;
    });
    myUL.innerHTML = newLiTag;
    inputBox.value = "";

}

// Создайте новый элемент списка при нажатии на кнопку "Добавить"
function newElement() {
    const li = document.createElement("li");
    // li.setAttribute('is-done', false);
    const inputValue = document.getElementById("myInput").value;
    const t = document.createTextNode(inputValue);
    li.appendChild(t);
    showTasks();
    if (inputValue === '') {
        alert("Вы должны что-то написать!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    // showTasks();
    document.getElementById("myInput").value = "";
    // showTasks();
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    // showTasks();
    const getLocalStorageData = localStorage.getItem("todo");
    const arrayTodo = JSON.parse(getLocalStorageData)
    arrayTodo.push(li.innerHTML)
    localStorage.setItem("todo", JSON.stringify(arrayTodo));
}

deleteAllBtn.onclick = () => {
    arrayTodo = [];
    localStorage.setItem("todo", JSON.stringify(arrayTodo));
    showTasks();
}