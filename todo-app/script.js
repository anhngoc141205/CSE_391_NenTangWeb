let tasks = [];

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Vui lòng nhập công việc.');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    isDone: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, isDone: !task.isDone } : task
  );
  saveTasksToLocalStorage();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function renderTasks(filtered = null) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const renderList = filtered || tasks;

  renderList.forEach(task => {
    const li = document.createElement('li');
    li.className = task.isDone ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    span.onclick = () => toggleTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Xóa';
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function filterTasks(filter) {
  switch (filter) {
    case 'active':
      renderTasks(tasks.filter(task => !task.isDone));
      break;
    case 'done':
      renderTasks(tasks.filter(task => task.isDone));
      break;
    default:
      renderTasks(tasks);
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
}

window.onload = loadTasksFromLocalStorage;
