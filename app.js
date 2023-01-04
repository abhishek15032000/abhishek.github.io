// selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners


// if all our content pn our page has been loaded then just run the function of getTodos
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', todoDelete);

filterOption.addEventListener('click', filterTodo);




// functions

function addTodo(event) {
    // prevent the default behaviour of button (when submitting refreshes.)
    event.preventDefault();
    // just to check if the function is working nicely or not
    console.log('hello');
    // create div element where all the details of the task created will be stored
    if (todoInput.value === "") {
        return;
    }
    const container = document.createElement('div');
    container.classList.add('todo');

    // li

    const taskData = document.createElement('li');

    taskData.innerText = todoInput.value;

    taskData.classList.add('todo-item');

    container.appendChild(taskData);


    // add to do to local storage

    saveLocalTodos(todoInput.value);




    // check button
    const mark = document.createElement('button');
    mark.innerHTML = '<i class="fas fa-check"></i>';
    mark.classList.add('complete-btn');

    container.appendChild(mark);

    // delete button

    const del = document.createElement('button');
    del.innerHTML = '<i class="fas fa-trash"></i>';
    del.classList.add('trash-btn');
    container.appendChild(del);

    // append to do list
    todoList.appendChild(container);

    todoInput.value = "";
}

function todoDelete(event) {
    const item = event.target;
    console.log(item);
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        console.log(todo);
        // add animation
        todo.classList.add('fall');
        // to prevent from instant deletion of element without even playing the animation

        // remove this value from local storage also
        removeLocalTodos(todo);

        todo.addEventListener("transitionend", function() {
            // now it waits for the transitionend to complete then it executes the function 
            todo.remove();
        });

    }

    // check mark

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(event) {
    const todos = todoList.children;
    console.log(todos);
    if (event.target.value === "all") {
        for (let i = 0; i < todos.length; i++) {
            todos[i].style.display = 'flex';
        }
    } else if (event.target.value === 'completed') {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains('completed')) {
                todos[i].style.display = 'flex';
            } else {
                todos[i].style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].classList.contains('completed')) {
                todos[i].style.display = 'flex';
            } else {
                todos[i].style.display = 'none';
            }
        }
    }
}

// save them on local storage

function saveLocalTodos(event) {
    // check if our local storage has values or not

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(event);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no value in local storage create an empty array
        todos = [];
    } else {
        // retreive the array back
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    console.log(todos);

    todos.forEach(function(todo) {

        // prevent the default behaviour of button (when submitting refreshes.)
        // event.preventDefault();
        // just to check if the function is working nicely or not
        console.log('hello');
        // create div element where all the details of the task created will be stored

        const container = document.createElement('div');
        container.classList.add('todo');

        // li

        const taskData = document.createElement('li');

        taskData.innerText = todo;

        taskData.classList.add('todo-item');

        container.appendChild(taskData);

        // check button
        const mark = document.createElement('button');
        mark.innerHTML = '<i class="fas fa-check"></i>';
        mark.classList.add('complete-btn');

        container.appendChild(mark);

        // delete button

        const del = document.createElement('button');
        del.innerHTML = '<i class="fas fa-trash"></i>';
        del.classList.add('trash-btn');
        container.appendChild(del);

        // append to do list
        todoList.appendChild(container);



    });

}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        // if no value in local storage create an empty array
        todos = [];
    } else {
        // retreive the array back
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // we can remove element at any index with the help of a method called splice

    console.log(todo.children[0].innerText); // gives the task name which is present in li

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    // todos.indeOf returns the index of the task name which we want to delete,
    // 1 here means that we want to delete just 1 element from the array
    // from the index 

    localStorage.setItem('todos', JSON.stringify(todos));

}