document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(taskText => {
                createTaskElement(taskText, false);
            });
        }
    }

    function createTaskElement(taskText, saveToStorage = true) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            taskList.removeChild(taskItem);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTaskElement(taskText);
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});