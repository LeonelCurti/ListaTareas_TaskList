const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('mousedown', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks = obtenerLocalStore();
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (tarea) {
    const item = tarea.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      tarea.style.display = 'block';
    } else {
      tarea.style.display = 'none';
    }
  });
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLS(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLS(taskItem){
  let tasks = obtenerLocalStore();
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function obtenerLocalStore(){
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

function addTask(e) {
  if (taskInput.value === '') {
    alert("Debe agregar una tarea");
    return;
  }
  const li = document.createElement('li');
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  //store in local 
  guardarValorLocal(taskInput.value);

  taskInput.value = '';


  e.preventDefault();
}
function guardarValorLocal(task) {
  let tasks = obtenerLocalStore();  
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

}