//why DOMContentLoaded is used ?
/* =>to ensure that your JavaScript code runs only after the HTML document has been completely parsed and the DOM (Document Object Model) has been fully constructed
*/
document.addEventListener('DOMContentLoaded', function() {
    // everything else we type will go inside this!!  
    const taskContainer = document.querySelector('#task-container');
    const taskURL='http://localhost:3000/data';
    let tasks = []
    fetch(`${taskURL}`)
    .then(res=>res.json())
    .then(data=>data.forEach(function(task){
        tasks=data;
        taskContainer.innerHTML+=`
        <div class="col-lg-4 py-2">
        <div class="card p-2">
        <div id=${task.id}>
        <h4 class="card-header">${task.title}</h4>
        <p class="card-body fs-5">${task.description}</p>
        <div class="d-flex justify-content-end gap-2">
        <button  class="btn btn-secondary " data-bs-toggle="modal"
        data-bs-target="#editTask" data-id="${task.id}" id="edit-${task.id}" data-action="edit" >Edit</button>
        <button class="btn btn-danger" data-id="${task.id}" id="delete-${task.id}" data-action="delete">Delete</button>
        </div>
        </div>
        </div>
        </div>
`
        
    }));
    const taskForm = document.querySelector('#task-form');
    taskForm.addEventListener('submit',(e)=>{
    //preventdefault helps to prevent default form submition
     e.preventDefault();
     const titleText = taskForm.querySelector('#title').value;
     const descriptionText = taskForm.querySelector('#description').value;
     fetch(`${taskURL}`, {
        method: 'POST',
        body: JSON.stringify({
          title: titleText,
          description:descriptionText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    })
    taskContainer.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'edit') {
            
            // const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
            // editButton.disabled = true
      
      const task = tasks.find((t) => {
        return t.id == e.target.dataset.id
      })
      // e.target.parentElement.innerHTML += `
      // <div id='edit-task'>
      //   <form id="task-form">
      //     <input required id="edit-title" placeholder="${task.title}">
      //     <input required id="edit-description" placeholder="${task.description}">
      //     <input type="submit" value="Edit Task">
      // </div>`
        } else if (e.target.dataset.action === 'delete') {
          console.log('you pressed delete')
        }
      }) 
 })