let todoinput=document.querySelector('.todo-input');
let addtask=document.querySelector('.add-task');
let todolist=document.querySelector('.todo-list');

let tasks= JSON.parse(localStorage.getItem('tasks')) || [];//renders the saved tasks or empty list if nothing is saved.
tasks.forEach(task => rendertasks(task)); //for each of the tasks added in array, it provides styles and creates a list element wiith delete button
addtask.addEventListener('click',() => {
    const tasktext=todoinput.value.trim();
    if (tasktext===""){    //to check if 
        alert("enter a task!")
        return
    }

    const newtask={
        id:Date.now(),
        text: tasktext,
        completed:false
    }//each task is given a unique id
    tasks.unshift(newtask);//unshift adds newer tasks on top.
    savetasks();
    console.log(tasks);
    todoinput.value=""//clear value
    
    rendertasks(newtask);
});

function savetasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function rendertasks(task){
    const taskitem=document.createElement('li');
    taskitem.setAttribute('data-key',task.id);
    if (task.completed){
        taskitem.classList.add('completed');
    }
    taskitem.innerHTML=`
    <div class="listelements">${task.text}</div>
    <button class="delete">Delete</button>
    `;
    taskitem.addEventListener('click',e=>{
        if(e.target.tagName==='BUTTON'){
            tasks.pop(taskitem);
            taskitem.remove();
            savetasks();
        }
        else{
            task.completed=!task.completed;
            savetasks();
            taskitem.classList.toggle('completed');//completed is utility made to indicate the completion of task
        }
    })
    todolist.insertAdjacentElement('afterbegin',taskitem);

 
}


