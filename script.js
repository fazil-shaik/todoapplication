document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="taskText">${taskText}</span>
            <div class="taskActions">
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
                <button class="statusBtn">Mark as Completed</button>
            </div>
        `;
        taskList.appendChild(li);
        saveTasks();
    }

    taskList.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('deleteBtn')) {
            target.closest('li').remove();
            saveTasks();
        } else if (target.classList.contains('editBtn')) {
            const taskText = target.closest('li').querySelector('.taskText');
            const newText = prompt('Edit task:', taskText.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText.trim();
                saveTasks();
            }
        } else if (target.classList.contains('statusBtn')) {
            const taskText = target.closest('li').querySelector('.taskText');
            taskText.classList.toggle('completed');
            saveTasks();
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(task) {
            const taskText = task.querySelector('.taskText').textContent;
            const isCompleted = task.querySelector('.taskText').classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            addTask(task.text);
            if (task.completed) {
                taskList.lastElementChild.querySelector('.taskText').classList.add('completed');
            }
        });
    }

    loadTasks();
});
