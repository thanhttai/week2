document.getElementById("add-task").addEventListener("click", function () {
    addTask(taskInput.value);
    taskInput.value = "";
});

const taskInput = document.getElementById("task-value");
taskInput.onkeyup = function (e) {
    if (e.keyCode === 13 && taskInput.value !== "") {
        addTask(taskInput.value);
        taskInput.value = "";
    }
}

function updateValue(event, task) {
    const check = Boolean(event.target.className === 'editEl' || event.target.className === 'fa fa-edit');
    if (check) {
        const content = task.textContent;
        taskInput.value = content;
        const tasks = document.querySelector('.tasks').removeChild(task)
    }

}


function addTask(taskValue) {
    var task = document.createElement("li");
    task.classList.add("task");
    task.classList.add("fill");
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);


    var taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    taskContent.innerText = taskValue;

    var trash = document.createElement("div");
    trash.classList.add("trash");
    trash.innerHTML = "&times;";
    trash.addEventListener("click", removeTask);
    //
    var moveButtons = document.createElement("div");
    moveButtons.classList.add("button-group");
    var backLogButton = document.createElement('button');
    backLogButton.innerHTML = 'Log';
    backLogButton.addEventListener('click', moveTaskToBacklog);
    backLogButton.style.margin = '10px 4px';
    var inProgressButton = document.createElement('button');
    inProgressButton.innerHTML = 'Progress';
    inProgressButton.addEventListener('click', moveTaskToInProgress);
    inProgressButton.style.margin = '10px 4px';
    var reviewButton = document.createElement('button');
    reviewButton.innerHTML = 'Review';
    reviewButton.addEventListener('click', moveTaskToReview);
    reviewButton.style.margin = '10px 4px';
    var doneButton = document.createElement('button');
    doneButton.innerHTML = 'Done'
    doneButton.addEventListener('click', moveTaskToDone);
    doneButton.style.margin = '10px 4px';


    //
    var editEl = document.createElement("div");
    editEl.innerHTML = `<i class="fas fa-edit" style="font-size:15px; margin-right:20px;"></i>`
    editEl.classList.add("editEl");
    Object.assign(editEl.style, {
        position: 'relative',
        right: '-220px',
        top: '-30px',
        display: 'inline-block'
    })




    task.appendChild(taskContent);
    task.appendChild(editEl);
    task.appendChild(trash);
    task.appendChild(moveButtons);
    task.appendChild(backLogButton);
    task.appendChild(inProgressButton);
    task.appendChild(reviewButton);
    task.appendChild(doneButton);

    editEl.addEventListener('click', (e) => updateValue(e, task))

    var tasks = document.getElementById("tasks-added");
    tasks.insertBefore(task, tasks.childNodes[0]);
}

// start Add buttons/icons that move the task to specific columns automatically.
function moveTaskToBacklog(event) {
    let tasks = event.target.parentNode.parentNode;
    console.log(tasks);
    let task = event.target.parentNode;
    console.log(task);
    tasks.removeChild(task);
    let backLog = document.getElementById('tasks-added'); ~
        backLog.append(task);
}


function moveTaskToInProgress(event) {
    let tasks = event.target.parentNode.parentNode;
    console.log(tasks);
    let task = event.target.parentNode;
    console.log(task);
    tasks.removeChild(task);
    let inProgress = document.getElementById('tasks-in-progress'); ~
        inProgress.append(task);
}
function moveTaskToReview(event) {
    let tasks = event.target.parentNode.parentNode;
    console.log(tasks);
    let task = event.target.parentNode;
    console.log(task);
    tasks.removeChild(task);
    let review = document.getElementById('task-review'); ~
        review.append(task);
}
function moveTaskToDone(event) {
    let tasks = event.target.parentNode.parentNode;
    console.log(tasks);
    let task = event.target.parentNode;
    console.log(task);
    tasks.removeChild(task);
    let done = document.getElementById('tasks-done');
    done.append(task);
}
//end Add buttons/icons that move the task to specific columns automatically.


function removeTask(event) {
    // event represents the remove button
    // Access the <ul> list by moving 2 levels up
    var tasks = event.target.parentNode.parentNode;
    // Access the <li> element which is the direct parent
    var task = event.target.parentNode;
    tasks.removeChild(task);
}

// DRAG & DROP

// A global variable to store the selected task
var task;

function dragStart(event) {
    event.target.classList.add("hold");
    task = event.target;
    setTimeout(function () {
        event.target.classList.add("invisible");
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove("invisible");
}

function dragEnter(event) {
    if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("hovered");
    }
}

function dragOver(event) {
    event.preventDefault(); // https://stackoverflow.com/a/35428657
}

function dragLeave(event) {
    event.target.classList.remove("hovered");
}

function dragDrop(event) {
    event.target.classList.remove("hovered");
    // event represents the column
    // Add the task to the right child. Inspect the element to find the ul is index 3 in childnodes.
    event.target.childNodes[3].append(task);
}

var dropzones = document.getElementsByClassName("dropzone");

for (var index = 0; index < dropzones.length; index++) {
    const dropzone = dropzones[index];
    dropzone.addEventListener("dragenter", dragEnter);
    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragleave", dragLeave);
    dropzone.addEventListener("drop", dragDrop);
}

