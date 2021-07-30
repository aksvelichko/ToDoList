const inputBox = document.getElementById('myInput');
const deleteAllBtn = document.querySelector('.footer');
const allBtn = document.querySelector('.all');
const list = document.querySelector('ul');
const progress = document.querySelector('.inProgress');
const completed = document.querySelector('.completed');
const elements = document.getElementsByClassName('checked');
const li = document.getElementsByTagName('LI');

list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    ev.target.classList.toggle('no-checked');

  } else if (ev.target.tagName === 'SPAN') {
    const div = ev.target.parentNode;
    div.remove();

  }
  updateToDoList()
  setLocal();
}, false);

function updateToDoList() {
  const page = localStorage.getItem('page');

  if (page === 'all') return

  if (page === 'progress') clickButton('.checked')

  clickButton('.no-checked')

}
allBtn.addEventListener('click', function (ev) {
  clickButton('', ev);
});

progress.addEventListener('click', function (ev) {
  clickButton('.checked', ev);
});

completed.addEventListener('click', function (ev) {
  clickButton('.no-checked', ev);
});

function clickButton(type, event) {///
  const elems = Array.from(document.querySelectorAll('li'));
  const localStoragePage = localStorage.getItem('page');
  const page = event ? event.target.getAttribute('name') : localStoragePage
  localStorage.setItem('page', page);

  if (!type) {
    getLocal();
    return
  }

  for (let i = 0, len = elems.length; i < len; i++) {
    if (elems[i].matches(type)) {
      elems[i].hidden = true;
    } else {
      elems[i].hidden = false;
    }
  }

}

function setLocal() {
  const elems = Array.from(document.querySelectorAll('li'));
  const arrayTodo = [];
  for (let i = 0, len = elems.length; i < len; i++) {
    console.log(`elems[i]`, elems[i].className)
    arrayTodo.push(`<li class='${elems[i].className}'>${elems[i].innerHTML}</li>`)

  }
  localStorage.setItem('todo', JSON.stringify(arrayTodo));
}

function getLocal() {
  const getLocalStorageData = localStorage.getItem('todo');

  if (getLocalStorageData === null) {
    arrayTodo = [];
  } else {
    arrayTodo = JSON.parse(getLocalStorageData);
  }
  let newLiTag = '';
  arrayTodo.forEach(element => {
    newLiTag += `${element}`;
  });

  myUL.innerHTML = newLiTag;
  inputBox.value = '';
}

function newElement() {
  const li = document.createElement('li');
  li.className += 'no-checked';

  const inputValue = document.getElementById('myInput').value;

  if (inputValue === '') {
    alert('Вы должны что-то написать!');
    return
  } else {
    document.getElementById('myUL').appendChild(li);
  }

  const tekst = document.createTextNode(inputValue);
  li.appendChild(tekst);

  document.getElementById('myInput').value = '';

  const span = document.createElement('SPAN');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  setLocal();
}

deleteAllBtn.addEventListener('click', () => {
  arrayTodo = [];
  localStorage.setItem('todo', JSON.stringify(arrayTodo));
  getLocal();
});

getLocal();
