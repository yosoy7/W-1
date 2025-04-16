const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskList = document.querySelector('#taskList');

let task =
JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(){
    taskList.innerHTML = '';
    task.forEach((task, index) => {
        const li = 
    document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-100 p-3 rounded-xl';
    
        const span = 
    document.createElement('span');
        span.textContent = task.text;
        span.className =
    task.completed ? 'line-through text-gray-500 crusor-pointer' :
    'cursor-pointer';
        span.onclick = () => 
    toggleComplete(index);
        
        const btn = 
    document.createElement('button');
        btn.innerHTML = '🗑️';
        btn.onclick = () => 
    deletetask(index)
        btn.className = 'text-red-500 hover:text-red-700';
        
        li.appendChild(span);
        li.appendChild(btn);
        taskList.appendChild(li);
    });
    localStorage.setItem('task', JSON.stringify(task));
}

function addTask() {
    const text = 
taskInput.value.trim();
    if (text !== '') {
        task.push({text, completed: false});
        taskInput.value = '';
        renderTasks();
    }
} 
    function toggleComplete(index) {
        task[index].completed = !
        task[index].completed;
        renderTasks();
    }
    
    function deletetask(index) {
        task.splice(index, 1);
        renderTasks();
    }
   

addBtn.addEventListener('click', 
addTask);
document.addEventListener('DOMContentLoaded', renderTasks);




