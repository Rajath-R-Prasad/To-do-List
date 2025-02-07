let todoinput=document.querySelector('.todo-input');
let addtask=document.querySelector('.add-task');
let todolist=document.querySelector('.todo-list');

let tasks= JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => rendertasks(task));
addtask.addEventListener('click',() => {
    const tasktext=todoinput.value.trim();
    if (tasktext===""){
        alert("enter a task!")
        return
    }

    const newtask={
        id:Date.now(),
        text: tasktext,
        completed:false
    }
    tasks.unshift(newtask);
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
            taskitem.classList.toggle('completed');
        }
    })
    todolist.insertAdjacentElement('afterbegin',taskitem);

 
}


